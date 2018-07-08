const columns = require('@ifct2017/columns');
const lunr = require('lunr');
const csv = require('csv');
const fs = require('fs');
const os = require('os');

const OVERRIDE = new Map([
  ['crypxb', 'Carotenoids'],
  ['cartg', 'Carotenoids'],
  ['carta', 'Carotenoids'],
  ['cartb', 'Carotenoids'],
  ['fasat', 'Fatty acid profile'],
  ['fams', 'Fatty acid profile'],
  ['fapu', 'Fatty acid profile'],
  ['cholc', 'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['fauns', 'Fatty acid profile'],
  ['faess', 'Fatty acid profile'],
  ['facn3', 'Fatty acid profile'],
  ['facn6', 'Fatty acid profile'],
  ['facn9', 'Fatty acid profile'],
  ['famscis', 'Fatty acid profile'],
  ['fatrn', 'Fatty acid profile'],
  ['phytac', 'Phyates'],
  ['vitb', null],
  ['vitd', 'Vitamin D2 & D3'],
  ['vitk', 'Vitamin K1 & K2'],
  ['olsac', 'Oligosaccharides (Raffinose, Stachyose, Verbascose and Ajugose)'],
  ['phystr', 'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['mnrleq', null],
  ['mnrlet', null],
  ['mnrlpet', null],
  ['mnrlnet', null],
  ['mnrltx', null],
  ['vit', null],
]);

function bestMatch(idx, txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = idx.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(mat);
  return z;
};

function createIndex(arr) {
  return lunr(function() {
    this.ref('index');
    this.field('analyte');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var i=0, I=arr.length; i<I; i++)
      this.add({index: i, analyte: arr[i].analyte.replace(/\W+/g, ' ')});
  });
};

function createMap(idx) {
  var z = new Map();
  for(var c of columns.corpus.values()) {
    if(OVERRIDE.has(c.code)) {
      var analyte = OVERRIDE.get(c.code);
      var index = analyte!=null? mapping.get(analyte):-1;
    }
    else {
      var tags = (c.code+' '+c.name+' '+c.tags).replace(/\W+/g, ' ').toLowerCase().trim();
      var mats = idx.search(tags);
      var index = mats.length>0? mats[0].ref:-1;
    }
    z.set(c.code, index);
    if(index>=0) console.log(c.code, '->', array[index].analyte);
  }
  return z;
};

columns.load();
var array = [], mapping = new Map();
var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
stream.on('data', (r) => {
  mapping.set(r.analyte, array.length);
  array.push(r);
});
stream.on('end', () => {
  var z = '';
  var index = createIndex(array);
  var map = createMap(index);
  for(var i=0, I=array.length; i<I; i++)
    z += `const I${i} = ${JSON.stringify(array[i]).replace(/\"(\w+)\":/g, '$1:')};${os.EOL}`;
  z += `const CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${v>=0? 'I'+v:'null'}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
});
