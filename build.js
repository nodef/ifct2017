const fs    = require('extra-fs');
const build = require('extra-build');
const csv   = require('csv-parse');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');




function readAsset() {
  return new Promise(resolve => {
    var asset  = new Map();
    var stream = fs.createReadStream('asset.csv').pipe(csv.parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      var {code, parents} = r;
      parents = parents? new Set(parents.split(' ')) : new Set();
      asset.set(code, {parents});
    });
    stream.on('end', () => resolve(asset));
  });
}


function getAncestry(asset, code, a=new Set()) {
  var par = asset.get(code).parents;
  if (par.size===0) return a;
  for (p of par)
    getAncestry(asset, p, a.add(p));
  return a;
}

function getChildren(asset, code) {
  var a = new Set();
  for (var [k, v] of asset)
    if (v.parents.has(code)) a.add(k);
  return a;
}


function updateAsset(asset) {
  var a = new Map();
  for (var [code, r] of asset) {
    var {parents} = r;
    var parents  = Array.from(parents).join(' ');
    var ancestry = Array.from(getAncestry(asset, code)).join(' ');
    var children = Array.from(getChildren(asset, code)).join(' ');
    a.set(code, {parents, ancestry, children});
  }
  return a;
}


function writeIndex(asset) {
  var a = `code,parents,ancestry,children\n`;
  for (var [code, r] of asset)
    a += `${code},${r.parents},${r.ancestry},${r.children}\n`;
  fs.writeFileTextSync('index.csv', a);
}


function writeCorpus(asset) {
  var a = `var CORPUS = new Map([\n`;
  for (var [code, r] of asset)
    a += `  ["${code}", ${JSON.stringify(r).replace(/\"(\w+)\":/g, '$1:')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  fs.writeFileTextSync('corpus.js', a);
}


async function writeIndexAndCorpus() {
  var asset = await readAsset();
  var asset = updateAsset(asset);
  writeIndex(asset);
  writeCorpus(asset);
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
