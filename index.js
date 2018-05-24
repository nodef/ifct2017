const Sql = require('sql-extra');
const lunr = require('lunr');
const corpus = require('./corpus');
const path = require('path');

var index = lunr(function() {
  this.ref('sno');
  this.field('sno');
  this.field('title');
  this.field('pagenos');
  for(var r of corpus.values())
    this.add(r);
});

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='contents', opt={}) {
  return Sql.setupTable(tab, {sno: 'TEXT', title: 'TEXT', pagenos: 'TEXT'}, corpus.values(),
    {pk: 'sno', index: true, tsvector: {sno: 'A', title: 'B', pagenos: 'C'}});
};

function contents(txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
contents.csv = csv;
contents.sql = sql;
contents.corpus = corpus;
module.exports = contents;
