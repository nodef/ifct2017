const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('key');
    this.field('food');
    for (var r of corpus.values())
      this.add({key: r.food, food: r.food.replace(/[\W\s]+/g, ' ')});
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

function sql(tab='jonesfactors', opt={}) {
  return esql.setupTable(tab, {food: 'TEXT', factor: 'REAL'}, require('./corpus').values(),
    Object.assign({pk: 'food', index: true, tsvector: {food: 'A'}}, opt));
}


function jonesFactors(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ').replace(/factor/gi, '');
  var ms = index.search(txt), max = 0;
  for(var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for(var m of ms)
    if(Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a.length>0? a : [corpus.get('Food where specific factor is not listed')];
}
jonesFactors.load = load;
jonesFactors.csv = csv;
jonesFactors.sql = sql;
module.exports = jonesFactors;
