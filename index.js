const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('code');
    this.field('code');
    this.field('group');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var r of corpus.values())
      this.add(r);
  });
}

function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  index = createIndex();
  return ready = true;
}


function csv() {
  return path.join(__dirname, 'index.csv');
}


function sql(tab='groups', opt={}) {
  return esql.setupTable(tab, {code: 'TEXT', group: 'TEXT', entries: 'INT', tags: 'TEXT'}, load().values(),
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', group: 'B', tags: 'C'}}, opt));
}


function groups(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
groups.load = load;
groups.csv = csv;
groups.sql = sql;
module.exports = groups;
