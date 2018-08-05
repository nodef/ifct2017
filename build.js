const parse = require('csv-parse');
const fs = require('fs');
const os = require('os');


// global variables
var asset = new Map();


function readAsset() {
  return new Promise((fres) => {
    var stream = fs.createReadStream('asset.csv').pipe(parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      var {code, parents} = r;
      parents = new Set(parents.split(' '));
      asset.set(code, {code, parents});
    });
    stream.on('end', () => fres(asset));
  });
};

function getLineage(cod, z) {
  var par = asset.get(cod).parents;
  if(par.size===0) return z.add(cod);
  for(p of par)
    getLineage(p, z);
  return z;
};
function getAncestry(cod) {
  var z = getLineage(cod, new Set());
  z.delete(cod);
  return z;
};
function getChildren(cod) {
  var z = new Set();
  for(var [k, v] of asset)
    if(v.parents.has(cod)) z.add(k);
  return z;
};

function updateAsset() {
  for(var r of asset.values()) {
    var {code, parents} = r;
    parents = Array.from(parents).join(' ');
    var ancestry = Array.from(getAncestry(code)).join(' ');
    var children = Array.from(getChildren(code)).join(' ');
    asset.set(code, {code, parents, ancestry, children});
  }
};

function writeIndex() {
  var z = `code,parents,ancestry,children${os.EOL}`;
  for(var {code, parents, ancestry, children} of asset.values())
    z += `${code},${parents},${ancestry},${children}${os.EOL}`;
  fs.writeFileSync('index.csv', z);
};

function writeCorpus() {
  var z = `var CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of asset)
    z += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
};

async function main() {
  await readAsset();
  updateAsset();
  writeIndex();
  writeCorpus();
};
main();
