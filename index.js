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


function sql(tab='representations', opt={}) {
  return esql.setupTable(tab, {code: 'TEXT', type: 'TEXT', factor: 'REAL', unit: 'TEXT'},
    load().values(), Object.assign({pk: 'code', index: true, tsvector: {code: 'A', type: 'B', unit: 'C'}}, opt));
}


function representations(txt) {
  if (!corpus) load();
  var ms = columns(txt);
  if (ms.length===0) return null;
  return corpus.get(ms[0].code)||null;
}
representations.load = load;
representations.csv = csv;
representations.sql = sql;
module.exports = representations;
