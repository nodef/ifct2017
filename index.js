const columns = require('@ifct2017/columns');
const Sql = require('sql-extra');
const path = require('path');

var corpus = new Map();
var ready = false;


function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='intakes', opt={}) {
  return Sql.setupTable(tab, {code: 'TEXT', who: 'REAL', usear: 'REAL', usrdam: 'REAL', usrdaf: 'REAL',
    euprim: 'REAL', euprif: 'REAL', ulus: 'REAL', uleu: 'REAL', uljapan: 'REAL'},
    require('./corpus').values(), Object.assign({pk: 'code', index: true, tsvector: {code: 'A'}}, opt));
};

function load() {
  if(ready) return true;
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
  return ready = true;
};

function intakes(txt) {
  if(!ready) return null;
  var mats = columns(txt);
  if(mats.length===0) return null;
  return corpus.get(mats[0].code)||null;
};
intakes.csv = csv;
intakes.sql = sql;
intakes.load = load;
intakes.corpus = corpus;
module.exports = intakes;
