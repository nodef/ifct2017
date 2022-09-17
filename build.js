const fs    = require('extra-fs');
const build = require('extra-build');
const csv   = require('csv-parse');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');




function writeCorpus() {
  return new Promise(resolve => {
    var map    = new Map();
    var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      r.entries = parseInt(r.entries, 10);
      map.set(r.code, r);
    });
    stream.on('end', () => {
      var a = `const CORPUS = new Map([\n`;
      for (var [k, v] of map)
        a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],\n`;
      a += `]);\n`;
      a += `module.exports = CORPUS;\n`;
      fs.writeFileTextSync('corpus.js', a);
      resolve();
    });
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
async function publishPackages() {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  await writeCorpus();
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
  else await writeCorpus();
}
main(process.argv);
