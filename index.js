const path = require('path');
const esql = require('sql-extra');
const columns = require('@ifct2017/columns');

var corpus = null;




function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  columns.load();
  return corpus;
}


function csv() {
  return path.join(__dirname, 'index.csv');
}


function sql(tab='hierarchy', opt={}) {
  var vals = new Set(load().values());
  vals.delete(null);
  return esql.setupTable(tab, {code: 'TEXT', parents: 'TEXT', ancestry: 'TEXT', children: 'TEXT'}, vals,
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', parents: 'B', ancestry: 'C', children: 'B'}}, opt));
}


function hierarchy(txt) {
  if (!corpus) load();
  var cs = columns(txt);
  if (!cs.length) return null;
  return corpus.get(cs[0].code) || null;
}
hierarchy.load = load;
hierarchy.csv = csv;
hierarchy.sql = sql;
module.exports = hierarchy;
