const columns = require('@ifct2017/columns');
const Sql = require('sql-extra');
const corpus = require('./corpus');
const path = require('path');

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='methods', opt={}) {
  return Sql.setupTable(tab, {analyte: 'TEXT', method: 'TEXT', reference: 'TEXT'}, corpus.values(),
    Object.assign({pk: 'analyte', index: true, tsvector: {analyte: 'A', method: 'B', reference: 'C'}}, opt));
};

function methods(txt) {
  var cs = columns(txt);
  return cs.length>0? corpus.get(cs[0].code):null;
};
methods.csv = csv;
methods.sql = sql;
methods.corpus = corpus;
module.exports = methods;
