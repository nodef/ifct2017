const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('code');
    this.field('code', {boost: 3});
    this.field('name', {boost: 2});
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var {code, name, tags} of corpus.values())
      this.add({code, name: name.replace(/\W/g, ' '), tags});
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


function sql(tab='columns', opt={}) {
  return esql.setupTable(tab, {code: 'TEXT', name: 'TEXT', tags: 'TEXT'}, load().values(),
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', name: 'B', tags: 'C'}}, opt));
}


function columns(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
columns.load = load;
columns.csv = csv;
columns.sql = sql;
module.exports = columns;
