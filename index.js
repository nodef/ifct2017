const lunr = require('lunr');
const path = require('path');
const corpus = require('./corpus');

var index = lunr(function() {
  this.ref('code');
  this.field('code');
  this.field('name');
  this.field('tags');
  this.pipeline.remove(lunr.stopWordFilter);
  for(var r of corpus.values())
    this.add(r);
});

function csv() {
  return path.join(__dirname, 'index.csv');
};

function columns(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
columns.csv = csv;
columns.corpus = corpus;
module.exports = columns;
