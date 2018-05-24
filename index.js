const Sql = require('sql-extra');
const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('component');
  this.field('component');
  for(var r of corpus.values())
    this.add(r);
});

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='energies', opt={}) {
  return Sql.setupTable(tab, {component: 'TEXT', kj: 'REAL', kcal: 'REAL'}, corpus.values(),
    Object.assign({pk: 'component', index: true, tsvector: {component: 'A'}}, opt));
};

function energies(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
energies.csv = csv;
energies.sql = sql;
energies.corpus = corpus;
module.exports = energies;
