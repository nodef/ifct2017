const Sql = require('sql-extra');
const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('region');
  this.field('region');
  this.field('centre');
  for(var r of corpus.values())
    this.add(r);
});

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='compositingcentres', opt={}) {
  return Sql.setupTable(tab, {region: 'TEXT', centre: 'TEXT', samples: 'INT'}, corpus.values(),
    {pk: 'region', index: true, tsvector: {region: 'A', centre: 'B'}});
};

function compositingCentres(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
compositingCentres.csv = csv;
compositingCentres.sql = sql;
compositingCentres.corpus = corpus;
module.exports = compositingCentres;
