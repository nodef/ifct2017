const lunr = require('lunr');
const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');

var corpus = new Map();
var index = null;

function loadCorpus() {
  return new Promise((fres) => {
    var stream = fs.createReadStream('index.csv').pipe(parse({columns: true, comment: '#'}));
    stream.on('data', (r) => corpus.set(r.code, r));
    stream.on('end', fres);
  });
};

function setupIndex() {
  index = lunr(function() {
    this.ref('code');
    this.field('code');
    this.field('name');
    this.field('scie');
    this.field('desc');
    for(var r of corpus.values()) {
      var {code, name, scie, desc} = r;
      name = name.replace(/^(\w+),/g, '$1 $1 $1 $1,');
      desc = desc.replace(/^\[.*\]$/g).replace(/ā/g, 'a').replace(/ḍ/g, 'd').replace(/ī/g, 'i');
      desc = desc.replace(/ḷ/g, 'l').replace(/ṃ/g, 'm').replace(/ṇ/g, 'n').replace(/ṅ/g, 'n');
      desc = desc.replace(/\w+\.\s([\w\',\/\(\)\- ]+)[;\.]?/g, '$1').replace(/[,\/\(\)\- ]+/g, ' ');
      this.add({code, name, scie, desc});
    }
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};
function load() {
  return loadCorpus().then(setupIndex);
};
function descriptions(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
descriptions.csv = csv;
descriptions.load = load;
descriptions.corpus = corpus;
module.exports = descriptions;
