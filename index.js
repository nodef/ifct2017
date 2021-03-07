const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function fixRow(r) {
  if (r.sno==='1') r.monosaccharide = 1;
  r.hydrolysis = r.hydrolysis||NaN;
  r.monosaccharide = r.monosaccharide||NaN;
  return r;
}

function createIndex() {
  return lunr(function() {
    this.ref('sno');
    this.field('sno');
    this.field('carbohydrate');
    for (var r of corpus.values())
      this.add(fixRow(r));
  });
}

function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  index = createIndex();
  return corpus;
}

function csv() {
  return path.join(__dirname, 'index.csv');
}

function sql(tab='carbohydrates', opt={}) {
  return esql.setupTable(tab, {sno: 'TEXT', carbohydrate: 'TEXT', hydrolysis: 'REAL', monosaccharide: 'REAL'},
    loadCorpus().values(), Object.assign({pk: 'sno', index: true, tsvector: {sno: 'A', carbohydrate: 'B'}}, opt));
}


function carbohydrates(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
carbohydrates.load = load;
carbohydrates.csv = csv;
carbohydrates.sql = sql;
module.exports = carbohydrates;
