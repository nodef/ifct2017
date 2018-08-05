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

function sql(tab='representations', opt={}) {
  return Sql.setupTable(tab, {code: 'TEXT', type: 'TEXT', factor: 'REAL', unit: 'TEXT'},
    require('./corpus').values(), Object.assign({pk: 'code', index: true, tsvector: {code: 'A', type: 'B', unit: 'C'}}, opt));
};

function load() {
  if(ready) return true;
  columns.load(); loadCorpus();
  return ready = true;
};

function representations(txt) {
  if(!ready) return null;
  var mats = columns(txt);
  if(mats.length===0) return null;
  return corpus.get(mats[0].code)||null;
};
representations.csv = csv;
representations.sql = sql;
representations.load = load;
representations.corpus = corpus;
module.exports = representations;
