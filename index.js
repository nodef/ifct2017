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
    this.ref('sno');
    this.field('sno');
    this.field('state');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of corpus.values())
      this.add(r);
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='samplingunits', opt={}) {
  return Sql.setupTable(tab, {sno: 'TEXT', state: 'TEXT', districts: 'INT', selected: 'INT'},
    require('./corpus').values(), Object.assign({pk: 'sno', index: true, tsvector: {sno: 'A', state: 'B'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function samplingUnits(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
samplingUnits.csv = csv;
samplingUnits.sql = sql;
samplingUnits.load = load;
samplingUnits.corpus = corpus;
module.exports = samplingUnits;
