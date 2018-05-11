const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('sno');
  this.field('sno');
  this.field('carbohydrate');
  for(var r of corpus.values()) {
    if(r.sno==='1') r.monosaccharide = 1;
    r.hydrolysis = r.hydrolysis||NaN;
    r.monosaccharide = r.monosaccharide||NaN;
    this.add(r);
  }
});

function csv() {
  return path.join(__dirname, 'index.csv');
};
function carbohydrates(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
carbohydrates.csv = csv;
carbohydrates.corpus = corpus;
module.exports = carbohydrates;
