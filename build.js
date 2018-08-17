const compositions = require('@ifct2017/compositions');
const deepEqual = require('deep-equal');
const fs = require('fs');
const os = require('os');


// global variables
const IGNORE = new Set(['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags']);
const UNIT = new Map([
  [1, 'g'],
  [1e+3, 'mg'],
  [1e+6, 'ug'],
  [1e+9, 'ng'],
]);
var representations = new Map();
var values = [];


function arrayIndexOf(arr, val) {
  for(var i=0, I=arr.length; i<I; i++)
    if(deepEqual(arr[i], val)) return i;
  return -1;
};
function imapSet(map, arr, key, val) {
  var i = arrayIndexOf(arr, val);
  if(i<0) arr[i=arr.length] = val;
  map.set(key, i);
};

function getType(k) {
  if(k==='regn') return 'integer';
  if(k==='enerc') return 'energy';
  if(IGNORE.has(k)) return 'string';
  return 'mass';
};
function getFactor(map, k) {
  if(k==='regn') return 1;
  if(IGNORE.has(k)) return 0;
  if(k==='enerc') return 1;
  var n = 0, s = 0;
  for(var r of map.values())
    if(r[k]>0) { s += r[k]; n++; }
  if(!n) return 0;
  var l3 = Math.log(s/n)/Math.log(1000);
  var e = -3*Math.round(l3-0.33);
  return Math.pow(10, Math.max(e, 0));
};
function getUnit(k, f) {
  if(IGNORE.has(k)) return null;
  if(k==='enerc') return 'kJ';
  return UNIT.get(f);
};

function writeIndex(map, arr) {
  var z = `code,type,factor,unit${os.EOL}`;
  for(var [code, i] of map) {
    var {type, factor, unit} = arr[i];
    z += `${code},${type},${factor},${unit||''}${os.EOL}`;
  }
  fs.writeFileSync('index.csv', z);
};
function writeCorpus(map, arr) {
  var z = '';
  for(var i=0, I=arr.length; i<I; i++)
    z += `const I${i} = ${JSON.stringify(arr[i]).replace(/\"(\w+)\":/g, '$1:')};${os.EOL}`;
  z += `const CORPUS = new Map([${os.EOL}`;
  for(var [code, i] of map)
    z += `  ["${code}", I${i}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
};

async function main() {
  await compositions.load();
  var map = compositions.corpus;
  var cols = Object.keys(map.get('A001'));
  for(var c of cols) {
    if(c.endsWith('_e')) continue;
    var code = c;
    var type = getType(c);
    var factor = getFactor(map, c);
    var unit = getUnit(c, factor);
    imapSet(representations, values, code, {type, factor, unit});
  }
  writeIndex(representations, values);
  writeCorpus(representations, values);
};
main();
