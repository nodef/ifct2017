const lunr = require('lunr');
const csvParse = require('csv-parse/lib/sync');
const path = require('path');
const fs = require('fs');

function corpus() {
  var z = new Map();
  var text = fs.readFileSync('index.csv', 'utf8');
  var data = csvParse(text, {columns: true, comment: '#'});
  for(var r of data)
    z.set(r.name, r);
  return z;
};
const CORPUS = corpus();

var index = lunr(function() {
  this.ref('key');
  this.field('name');
  this.field('code');
  this.pipeline.remove(lunr.stopWordFilter);
  for(var r of CORPUS.values())
    this.add({key: r.name, name: r.name.replace(/\W+/g, ' '), code: r.code});
});

function csv() {
  return path.join(__dirname, 'index.csv');
};
function codes(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(CORPUS.get(mat.ref));
  return z;
};
codes.csv = csv;
codes.corpus = CORPUS;
module.exports = codes;
