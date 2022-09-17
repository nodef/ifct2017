const fs    = require('extra-fs');
const build = require('extra-build');
const deepEqual    = require('deep-equal');
const compositions = require('@ifct2017/compositions');

const owner  = 'ifct2017';
const repo   = build.readMetadata('.').name.replace(/@.+\//g, '');
const IGNORE = new Set(['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags']);
const UNIT   = new Map([
  [1, 'g'],
  [1e+3, 'mg'],
  [1e+6, 'ug'],
  [1e+9, 'ng'],
]);





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
  fs.writeFileTextSync('index.csv', a);
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
  fs.writeFileTextSync('corpus.js', a);
}

async function writeIndexAndCorpus() {
  var representations = new Map(), values = [];
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




// Publish a root package to NPM, GitHub.
function publishRootPackage(ver) {
  var _package = build.readDocument('package.json');
  var m = build.readMetadata('.');
  m.version = ver;
  build.writeMetadata('.', m);
  build.publish('.');
  try { build.publishGithub('.', owner); }
  catch {}
  build.writeDocument(_package);
}


// Publish root, sub packages to NPM, GitHub.
async function publishPackages() {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  await writeIndexAndCorpus();
  publishRootPackage(ver);
}


// Publish docs.
function publishDocs() {
  var m = build.readMetadata('.');
  build.updateGithubRepoDetails({owner, repo, topics: m.keywords});
}


// Finally.
async function main(a) {
  if (a[2]==='publish-docs') publishDocs();
  else if (a[2]==='publish-packages') await publishPackages();
  else await writeIndexAndCorpus();
}
main(process.argv);
