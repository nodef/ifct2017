const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('region');
    this.field('region');
    this.field('states');
    for (var r of corpus.values())
      this.add({region: r.region, states: r.states.replace(/\W/g, ' ')});
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

function sql(tab='regions', opt={}) {
  return esql.setupTable(tab, {region: 'TEXT', states: 'TEXT'}, require('./corpus').values(),
    Object.assign({pk: 'region', index: true, tsvector: {region: 'A', states: 'B'}}, opt));
}


function regions(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for(var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for(var m of ms)
    if(Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
};
regions.load = load;
regions.csv = csv;
regions.sql = sql;
module.exports = regions;
