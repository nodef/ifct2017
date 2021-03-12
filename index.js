const path = require('path');
const esql = require('sql-extra');
const columns = require('@ifct2017/columns');

var corpus = null;




function load() {
  if (corpus) return corpus;
  columns.load();
  corpus = require('./corpus');
  return corpus;
}


function csv() {
  return path.join(__dirname, 'index.csv');
}


function sql(tab='intakes', opt={}) {
  return esql.setupTable(tab, {code: 'TEXT', whorda: 'REAL', usear: 'REAL', usrdam: 'REAL',
    usrdaf: 'REAL', euprim: 'REAL', euprif: 'REAL', ulus: 'REAL', uleu: 'REAL', uljapan: 'REAL'},
    load().values(), Object.assign({pk: 'code', index: true, tsvector: {code: 'A'}}, opt));
}


function intakes(txt) {
  if (!corpus) load();
  return columns(txt).map(r => corpus.get(r.code));
}
intakes.load = load;
intakes.csv = csv;
intakes.sql = sql;
module.exports = intakes;
