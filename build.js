const fs = require('fs');
const os = require('os');
const deepEqual    = require('deep-equal');
const compositions = require('@ifct2017/compositions');

const IGNORE = new Set(['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags']);
const UNIT   = new Map([
  [1, 'g'],
  [1e+3, 'mg'],
  [1e+6, 'ug'],
  [1e+9, 'ng'],
]);

var representations = new Map();
var values = [];




function arrayIndexOf(arr, val) {
  for (var i=0, I=arr.length; i<I; i++)
    if (deepEqual(arr[i], val)) return i;
  return -1;
}

function imapSet(map, arr, key, val) {
  var i = arrayIndexOf(arr, val);
  if (i<0) arr[i = arr.length] = val;
  map.set(key, i);
}


function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


function getType(k) {
  if (k==='regn')    return 'integer';
  if (k==='enerc')   return 'energy';
  if (IGNORE.has(k)) return 'string';
  return 'mass';
}

function getFactor(map, k) {
  if (k==='regn')    return 1;
  if (IGNORE.has(k)) return 0;
  if (k==='enerc')   return 1;
  var n = 0, s = 0;
  for (var r of map.values())
    if (r[k]>0) { s += r[k]; n++; }
  if (!n) return 0;
  var l3 = Math.log(s/n) / Math.log(1000);
  var e  = -3 * Math.round(l3-0.55);
  return Math.pow(10, Math.max(e, 0));
}

function getUnit(k, f) {
  if (IGNORE.has(k)) return null;
  if (k==='enerc')   return 'kJ';
  return UNIT.get(f);
}


function writeIndex(map, arr) {
  var a = `code,type,factor,unit\n`;
  for (var [code, i] of map) {
    var {type, factor, unit} = arr[i];
    a += `${code},${type},${factor},${unit||''}\n`;
  }
  writeFile('index.csv', a);
}

function writeCorpus(map, arr) {
  var a = '';
  for (var i=0, I=arr.length; i<I; i++)
    a += `const I${i} = ${JSON.stringify(arr[i]).replace(/\"(\w+)\":/g, '$1:')};\n`;
  a += `const CORPUS = new Map([\n`;
  for (var [code, i] of map)
    a += `  ["${code}", I${i}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
}

async function main() {
  var map  = await compositions.load();
  var cols = Object.keys(map.get('A001'));
  for (var c of cols) {
    if (c.endsWith('_e')) continue;
    var code = c;
    var type = getType(c);
    var factor = getFactor(map, c);
    var unit = getUnit(c, factor);
    imapSet(representations, values, code, {type, factor, unit});
  }
  writeIndex(representations, values);
  writeCorpus(representations, values);
}
main();
