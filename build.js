const fs    = require('extra-fs');
const build = require('extra-build');
const lunr  = require('lunr');
const csv   = require('csv-parse');
const columns = require('@ifct2017/columns');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');
const OVERRIDE = new Map([
  ['crypxb',  'Carotenoids'],
  ['cartg',   'Carotenoids'],
  ['carta',   'Carotenoids'],
  ['cartb',   'Carotenoids'],
  ['cholc',   'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['phytac',  'Phyates'],
  ['vitb',    null],
  ['vitd',    'Vitamin D2 & D3'],
  ['vitk',    'Vitamin K1 & K2'],
  ['olsac',   'Oligosaccharides (Raffinose, Stachyose, Verbascose and Ajugose)'],
  ['phystr',  'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['mnrleq',  null],
  ['mnrlet',  null],
  ['mnrlpet', null],
  ['mnrlnet', null],
  ['mnrltx',  null],
  ['vit',     null],
]);




function bestMatch(idx, txt) {
  var a  = [], txt = txt.replace(/\W/g, ' ');
  var ms = idx.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(m);
  return a;
}


function createIndex(arr) {
  return lunr(function() {
    this.ref('index');
    this.field('analyte');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var i=0, I=arr.length; i<I; i++)
      this.add({index: i, analyte: arr[i].analyte.replace(/\W+/g, ' ')});
  });
}


function createMap(idx, mapping) {
  var a = new Map();
  for (var c of columns.load().values()) {
    if (OVERRIDE.has(c.code)) {
      var analyte = OVERRIDE.get(c.code);
      var index   = analyte!=null? mapping.get(analyte):-1;
    }
    else {
      var tags  = `${c.code} ${c.code} ${c.code} ${c.name} ${c.name} ${c.tags}`;
      var tags  = tags.replace(/\W+/g, ' ').toLowerCase().trim();
      var ms    = idx.search(tags);
      // if (c.code==='as') console.log(c, tags, ms);
      var index = ms.length>0? ms[0].ref : -1;
    }
    a.set(c.code, index);
    // if (index>=0) console.log(c.code, '->', array[index].analyte, tags);
    // if (c.code==='facis') console.log(ms);
  }
  return a;
}


function writeCorpus() {
  return new Promise(resolve => {
    columns.load();
    var array  = [], mapping = new Map();
    var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      mapping.set(r.analyte, array.length);
      array.push(r);
    });
    stream.on('end', () => {
      var a = '';
      var index = createIndex(array);
      var map   = createMap(index, mapping);
      for (var i=0, I=array.length; i<I; i++)
        a += `const I${i} = ${JSON.stringify(array[i]).replace(/\"(\w+)\":/g, '$1:')};\n`;
      a += `const CORPUS = new Map([\n`;
      for (var [k, v] of map)
        a += `  ["${k}", ${v>=0? 'I'+v:'null'}],\n`;
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
