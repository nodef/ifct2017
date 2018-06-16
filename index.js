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
    this.field('code');
    this.field('group');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of corpus.values())
      this.add(r);
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='groups', opt={}) {
  return Sql.setupTable(tab, {code: 'TEXT', group: 'TEXT', entries: 'INT', tags: 'TEXT'}, require('./corpus').values(),
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', group: 'B', tags: 'C'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function groups(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
groups.csv = csv;
groups.sql = sql;
groups.load = load;
groups.corpus = corpus;
module.exports = groups;
