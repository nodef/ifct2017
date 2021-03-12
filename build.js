const parse = require('csv-parse');
const fs = require('fs');
const os = require('os');

var asset = new Map();




function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


function readAsset() {
  return new Promise((fres) => {
    var stream = fs.createReadStream('asset.csv').pipe(parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      var {code, parents} = r;
      parents = parents? new Set(parents.split(' ')) : new Set();
      asset.set(code, {parents});
    });
    stream.on('end', () => fres(asset));
  });
}


function getAncestry(cod, a=new Set()) {
  var par = asset.get(cod).parents;
  if (par.size===0) return a;
  for (p of par)
    getAncestry(p, a.add(p));
  return a;
}

function getChildren(cod) {
  var a = new Set();
  for (var [k, v] of asset)
    if (v.parents.has(cod)) a.add(k);
  return a;
}


function updateAsset() {
  var a = new Map();
  for (var [code, r] of asset) {
    var {parents} = r;
    parents = Array.from(parents).join(' ');
    var ancestry = Array.from(getAncestry(code)).join(' ');
    var children = Array.from(getChildren(code)).join(' ');
    a.set(code, {parents, ancestry, children});
  }
  asset = a;
}


function writeIndex() {
  var a = `code,parents,ancestry,children\n`;
  for (var [code, r] of asset)
    a += `${code},${r.parents},${r.ancestry},${r.children}\n`;
  writeFile('index.csv', a);
}


function writeCorpus() {
  var a = `var CORPUS = new Map([\n`;
  for (var [code, r] of asset)
    a += `  ["${code}", ${JSON.stringify(r).replace(/\"(\w+)\":/g, '$1:')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
}


async function main() {
  await readAsset();
  updateAsset();
  writeIndex();
  writeCorpus();
}
main();
