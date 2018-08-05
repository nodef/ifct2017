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

function sql(tab='hierarchy', opt={}) {
  var vals = new Set(require('./corpus').values());
  vals.delete(null);
  return Sql.setupTable(tab, {code: 'TEXT', parents: 'TEXT', ancestry: 'TEXT', children: 'TEXT'}, vals,
    Object.assign({pk: 'code', index: true, tsvector: {code: 'A', parents: 'B', ancestry: 'C', children: 'B'}}, opt));
};

function load() {
  if(ready) return true;
  columns.load(); loadCorpus();
  return ready = true;
};

function hierarchy(txt) {
  if(!ready) return null;
  var cs = columns(txt);
  return cs.length>0? corpus.get(cs[0].code):null;
};
hierarchy.csv = csv;
hierarchy.sql = sql;
hierarchy.load = load;
hierarchy.corpus = corpus;
module.exports = hierarchy;
