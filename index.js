const Sql = require('sql-extra');
const lunr = require('lunr');
const path = require('path');

var corpus = new Map();
var index = null;
var ready = false;


function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

function setupIndex() {
  index = lunr(function() {
    this.ref('sno');
    this.field('sno');
    this.field('carbohydrate');
    for(var r of corpus.values()) {
      if(r.sno==='1') r.monosaccharide = 1;
      r.hydrolysis = r.hydrolysis||NaN;
      r.monosaccharide = r.monosaccharide||NaN;
      this.add(r);
    }
  });
};

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='carbohydrates', opt={}) {
  return Sql.setupTable(tab, {sno: 'TEXT', carbohydrate: 'TEXT', hydrolysis: 'REAL', monosaccharide: 'REAL'},
    require('./corpus').values(), Object.assign({pk: 'sno', index: true, tsvector: {sno: 'A', carbohydrate: 'B'}}, opt));
};

function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};

function carbohydrates(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
carbohydrates.csv = csv;
carbohydrates.sql = sql;
carbohydrates.load = load;
carbohydrates.corpus = corpus;
module.exports = carbohydrates;
