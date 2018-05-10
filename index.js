const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('region');
  this.field('region');
  this.field('states');
  for(var r of corpus.values())
    this.add({region: r.region, states: r.states.replace(/\W/g, ' ')});
});

function csv() {
  return path.join(__dirname, 'index.csv');
};
function regions(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
regions.csv = csv;
regions.corpus = corpus;
module.exports = regions;
