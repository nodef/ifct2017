const columns = require('@ifct2017/columns');
const Sql = require('sql-extra');
const path = require('path');

var corpus = new Map();
var ready = false;


function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='methods', opt={}) {
  var vals = new Set(require('./corpus').values());
  vals.delete(null);
  return Sql.setupTable(tab, {analyte: 'TEXT', method: 'TEXT', reference: 'TEXT'}, vals,
    Object.assign({pk: 'analyte', index: true, tsvector: {analyte: 'A', method: 'B', reference: 'C'}}, opt));
};

function load() {
  if(ready) return true;
  columns.load(); loadCorpus();
  return ready = true;
};

function methods(txt) {
  if(!ready) return null;
  var cs = columns(txt);
  return cs.length>0? corpus.get(cs[0].code):null;
};
methods.csv = csv;
methods.sql = sql;
methods.load = load;
methods.corpus = corpus;
module.exports = methods;
