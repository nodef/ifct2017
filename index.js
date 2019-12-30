const Sql = require('sql-extra');
const parse = require('csv-parse');
const lunr = require('lunr');
const path = require('path');
const fs = require('fs');

const corpus = new Map();
var index = null;
var ready = null;

function csv() {
  return path.join(__dirname, 'index.csv');
};

async function sql(tab='codes', opt={}) {
  var cols = {name: 'TEXT', code: 'TEXT'};
  var opt = Object.assign({pk: 'name', index: true, tsvector: {name: 'A', code: 'B'}}, opt);
  var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
  var z = Sql.createTable(tab, cols, opt);
  z = await Sql.insertInto.stream(tab, stream, opt, z);
  z = Sql.setupTable.index(tab, cols, opt, z);
  return z;
};

function loadCorpus() {
  return new Promise((fres) => {
    var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
    stream.on('data', (r) => corpus.set(r.name, r));
    stream.on('end', fres);
  });
};

function setupIndex() {
  index = lunr(function() {
    this.ref('key');
    this.field('name');
    this.field('code');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of corpus.values())
      this.add({key: r.name, name: r.name.replace(/\W+/g, ' '), code: r.code});
  });
};

function load() {
  ready = ready||loadCorpus();
  return ready.then(setupIndex);
};

function codes(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
codes.csv = csv;
codes.sql = sql;
codes.load = load;
codes.corpus = corpus;
module.exports = codes;
