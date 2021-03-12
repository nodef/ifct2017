const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('sno');
    this.field('sno');
    this.field('title');
    this.field('pagenos');
    for (var r of corpus.values())
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


function sql(tab='contents', opt={}) {
  return esql.setupTable(tab, {sno: 'TEXT', title: 'TEXT', pagenos: 'TEXT'}, load().values(),
    Object.assign({pk: 'sno', index: true, tsvector: {sno: 'A', title: 'B', pagenos: 'C'}}, opt));
}


function contents(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
contents.load = load;
contents.csv = csv;
contents.sql = sql;
module.exports = contents;
