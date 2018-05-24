const Sql = require('sql-extra');
const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('key');
  this.field('food');
  for(var r of corpus.values())
    this.add({key: r.food, food: r.food.replace(/[\W\s]+/g, ' ')});
});

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='jonesfactors', opt={}) {
  return Sql.setupTable(tab, {food: 'TEXT', factor: 'REAL'}, corpus.values(),
    Object.assign({pk: 'food', index: true, tsvector: {food: 'A'}}, opt));
};

function jonesFactors(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z.length>0? z:[corpus.get('Food where specific factor is not listed')];
};
jonesFactors.csv = csv;
jonesFactors.sql = sql;
jonesFactors.corpus = corpus;
module.exports = jonesFactors;
