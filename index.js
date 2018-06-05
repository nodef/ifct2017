const Sql = require('sql-extra');
const lunr = require('lunr');
const path = require('path');

var corpus = new Map();
var index = null;
var ready = false;

function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

function setupIndex() {
  index = lunr(function() {
    this.ref('region');
    this.field('region');
    this.field('states');
    for(var r of corpus.values())
      this.add({region: r.region, states: r.states.replace(/\W/g, ' ')});
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='regions', opt={}) {
  return Sql.setupTable(tab, {region: 'TEXT', states: 'TEXT'}, require('./corpus').values(),
    Object.assign({pk: 'region', index: true, tsvector: {region: 'A', states: 'B'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function regions(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
regions.csv = csv;
regions.sql = sql;
regions.load = load;
regions.corpus = corpus;
module.exports = regions;
