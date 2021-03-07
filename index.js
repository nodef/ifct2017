const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('region');
    this.field('region');
    this.field('centre');
    for(var r of corpus.values())
      this.add(r);
  });
}

function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  index = createIndex();
  return corpus;
}

function csv() {
  return path.join(__dirname, 'index.csv');
}

function sql(tab='compositingcentres', opt={}) {
  return esql.setupTable(tab, {region: 'TEXT', centre: 'TEXT', samples: 'INT'}, require('./corpus').values(),
    Object.assign({pk: 'region', index: true, tsvector: {region: 'A', centre: 'B'}}, opt));
}


function compositingCentres(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for(var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for(var m of ms)
    if(Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
compositingCentres.load = load;
compositingCentres.csv = csv;
compositingCentres.sql = sql;
module.exports = compositingCentres;
