const path = require('path');
const lunr = require('lunr');
const esql = require('sql-extra');

var corpus = null;
var index = null;




function createIndex() {
  return lunr(function() {
    this.ref('sno');
    this.field('sno');
    this.field('state');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var r of corpus.values())
      this.add(r);
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

function sql(tab='samplingunits', opt={}) {
  return esql.setupTable(tab, {sno: 'TEXT', state: 'TEXT', districts: 'INT', selected: 'INT'},
    require('./corpus').values(), Object.assign({pk: 'sno', index: true, tsvector: {sno: 'A', state: 'B'}}, opt));
}


function samplingUnits(txt) {
  if (!corpus) load();
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
samplingUnits.load = load;
samplingUnits.csv = csv;
samplingUnits.sql = sql;
module.exports = samplingUnits;
