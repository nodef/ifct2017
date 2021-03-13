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


function sql(tab='methods', opt={}) {
  var vals = new Set(load().values()); vals.delete(null);
  return esql.setupTable(tab, {analyte: 'TEXT', method: 'TEXT', reference: 'TEXT'}, vals,
    Object.assign({pk: 'analyte', index: true, tsvector: {analyte: 'A', method: 'B', reference: 'C'}}, opt));
}


function methods(txt) {
  if (!corpus) load();
  var cs = columns(txt);
  return cs.length>0? corpus.get(cs[0].code) : null;
}
methods.load = load;
methods.csv = csv;
methods.sql = sql;
module.exports = methods;
