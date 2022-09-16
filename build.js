const fs    = require('extra-fs');
const build = require('extra-build');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');




function readAssets() {
  var a = new Map();
  for (var f of fs.readdirSync('assets'))
    a.set(f.replace('.txt', ''), fs.readFileTextSync(`assets/${f}`));
  return a;
}

function readIndex() {
  var a = new Map(), txt = fs.readFileTextSync('index.txt');
  var re = /\[\[([\w:]+)\]\]\n([\w\W]*?)\n\n\n/g, m;
  while ((m = re.exec(txt)) != null) {
    var k = m[1], v = m[2].trim();
    if (!k.endsWith(':')) a.set(k, [v]);
    else a.set(k.replace(/:.*/, ''), v.split('\n'));
  }
  return a;
}

function writeCorpus(map) {
  var a = `const CORPUS = new Map([\n`;
  for (var [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v)}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  fs.writeFileTextSync('corpus.js', a);
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


// Pushish root, sub packages to NPM, GitHub.
function publishPackages() {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  if (fs.existsSync('index.txt')) writeCorpus(readIndex());
  else writeCorpus(readAssets());
  publishRootPackage(ver);
}


// Publish docs.
function publishDocs() {
  var m = build.readMetadata('.');
  build.updateGithubRepoDetails({owner, repo, topics: m.keywords});
}


// Finally.
function main(a) {
  if (a[2]==='publish-docs') publishDocs();
  else if (a[2]==='publish-packages') publishPackages();
  else if (/index/i.test(a[2])) writeCorpus(readIndex());
  else writeCorpus(readAssets());
}
main(process.argv);
