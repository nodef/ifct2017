const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('sno');
  this.field('sno');
  this.field('state');
  this.pipeline.remove(lunr.stopWordFilter);
  for(var r of corpus.values())
    this.add(r);
});

function csv() {
  return path.join(__dirname, 'index.csv');
};
function samplingUnits(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
samplingUnits.csv = csv;
samplingUnits.corpus = corpus;
module.exports = samplingUnits;
