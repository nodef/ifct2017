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
    this.ref('code');
    this.field('code', {boost: 3});
    this.field('name', {boost: 2});
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var {code, name, tags} of corpus.values())
      this.add({code, name: name.replace(/\W/g, ' '), tags});
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='columns', opt={}) {
  return Sql.setupTable(tab, {code: 'TEXT', name: 'TEXT', tags: 'TEXT'}, require('./corpus').values(),
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', name: 'B', tags: 'C'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function columns(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
columns.csv = csv;
columns.sql = sql;
columns.load = load;
columns.corpus = corpus;
module.exports = columns;
