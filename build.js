const fs    = require('extra-fs');
const build = require('extra-build');
const csv   = require('csv-parse');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');




function writeCorpus() {
  var map    = new Map();
  var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
  stream.on('data', r => {
    r.kj   = parseFloat(r.kj);
    r.kcal = parseFloat(r.kcal);
    map.set(r.component, r);
  });
  stream.on('end', () => {
    var a = `const CORPUS = new Map([\n`;
    for (var [k, v] of map)
      a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],\n`;
    a += `]);\n`;
    a += `module.exports = CORPUS;\n`;
    fs.writeFileTextSync('corpus.js', a);
  });
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
function publishPackages() {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  writeCorpus();
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
  else writeCorpus();
}
main(process.argv);
