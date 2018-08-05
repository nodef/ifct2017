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
      parents = parents? new Set(parents.split(' ')):new Set();
      asset.set(code, {parents});
    });
    stream.on('end', () => fres(asset));
  });
};

function getAncestry(cod, z=new Set()) {
  var par = asset.get(cod).parents;
  if(par.size===0) return z;
  for(p of par)
    getAncestry(p, z.add(p));
  return z;
};
function getChildren(cod) {
  var z = new Set();
  for(var [k, v] of asset)
    if(v.parents.has(cod)) z.add(k);
  return z;
};

function updateAsset() {
  var z = new Map();
  for(var [code, r] of asset) {
    var {parents} = r;
    parents = Array.from(parents).join(' ');
    var ancestry = Array.from(getAncestry(code)).join(' ');
    var children = Array.from(getChildren(code)).join(' ');
    z.set(code, {parents, ancestry, children});
  }
  asset = z;
};

function writeIndex() {
  var z = `code,parents,ancestry,children${os.EOL}`;
  for(var [code, r] of asset)
    z += `${code},${r.parents},${r.ancestry},${r.children}${os.EOL}`;
  fs.writeFileSync('index.csv', z);
};

function writeCorpus() {
  var z = `var CORPUS = new Map([${os.EOL}`;
  for(var [code, r] of asset)
    z += `  ["${code}", ${JSON.stringify(r).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
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
