const fs = require('fs');
const path = require('path');
const lunr = require('lunr');
const parse = require('csv-parse');
const esql = require('sql-extra');

const COLUMNS = {name: 'TEXT', code: 'TEXT'};
const OPTIONS = {pk: 'name', index: true, tsvector: {name: 'A', code: 'B'}};
var corpus = new Map();
var index = null;
var ready = null;




function csv() {
  return path.join(__dirname, 'index.csv');
}


function sqlCorpus(tab, opt) {
  return esql.setupTable(tab, COLUMNS, corpus.values(), Object.assign({}, OPTIONS, opt));
}

async function sqlCsv(tab, opt) {
  var opt = Object.assign({}, OPTIONS, opt);
  var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
  var a = esql.createTable(tab, COLUMNS, opt);
  a = await esql.insertInto.stream(tab, stream, opt, a);
  a = esql.setupTable.index(tab, COLUMNS, opt, a);
  return a;
}

async function sql(tab='codes', opt={}) {
  if (index) return sqlCorpus(tab, opt);
  return await sqlCsv(tab, opt);
}


function loadCorpus() {
  return new Promise((fres) => {
    var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
    stream.on('data', r => corpus.set(r.name, r));
    stream.on('end', fres);
  });
}

function createIndex() {
  return lunr(function() {
    this.ref('key');
    this.field('name');
    this.field('code');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var r of corpus.values())
      this.add({key: r.name, name: r.name.replace(/\W+/g, ' '), code: r.code});
  });
}

async function load() {
  if (ready) await ready;
  if (index) return corpus;
  ready = loadCorpus();
  await ready;
  index = createIndex();
  return corpus;
}


function codes(txt) {
  if (!index) { load(); return []; }
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(corpus.get(m.ref));
  return a;
}
codes.load = load;
codes.csv = csv;
codes.sql = sql;
module.exports = codes;
