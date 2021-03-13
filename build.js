const fs = require('fs');
const os = require('os');
const lunr = require('lunr');
const parse = require('csv-parse');
const columns = require('../columns');

const OVERRIDE = new Map([
  ['crypxb', 'Carotenoids'],
  ['cartg', 'Carotenoids'],
  ['carta', 'Carotenoids'],
  ['cartb', 'Carotenoids'],
  ['cholc', 'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
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




function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


function bestMatch(idx, txt) {
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = idx.search(txt), max = 0;
  for(var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for(var m of ms)
    if(Object.keys(m.matchData.metadata).length===max) a.push(m);
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


function createMap(idx) {
  var a = new Map();
  for (var c of columns.load().values()) {
    if (OVERRIDE.has(c.code)) {
      var analyte = OVERRIDE.get(c.code);
      var index = analyte!=null? mapping.get(analyte):-1;
    }
    else {
      var tags = `${c.code} ${c.code} ${c.code} ${c.name} ${c.name} ${c.tags}`;
      tags = tags.replace(/\W+/g, ' ').toLowerCase().trim();
      var ms = idx.search(tags);
      // if (c.code==='as') console.log(c, tags, ms);
      var index = ms.length>0? ms[0].ref : -1;
    }
    a.set(c.code, index);
    // if (index>=0) console.log(c.code, '->', array[index].analyte, tags);
    // if (c.code==='facis') console.log(ms);
  }
  return a;
}


columns.load();
var array = [], mapping = new Map();
var stream = fs.createReadStream('index.csv').pipe(parse({columns: true, comment: '#'}));

stream.on('data', r => {
  mapping.set(r.analyte, array.length);
  array.push(r);
});

stream.on('end', () => {
  var a = '';
  var index = createIndex(array);
  var map = createMap(index);
  for (var i=0, I=array.length; i<I; i++)
    a += `const I${i} = ${JSON.stringify(array[i]).replace(/\"(\w+)\":/g, '$1:')};\n`;
  a += `const CORPUS = new Map([\n`;
  for (var [k, v] of map)
    a += `  ["${k}", ${v>=0? 'I'+v:'null'}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
});
