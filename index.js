const lunr = require('lunr');
const path = require('path');
const corpus = require('./corpus');

function csv() {
  return path.join(__dirname, 'index.csv');
};

var index = lunr(function() {
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

function descriptions(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
descriptions.csv = csv;
descriptions.corpus = corpus;
module.exports = descriptions;
