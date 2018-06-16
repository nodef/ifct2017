const Sql = require('sql-extra');
const lunr = require('lunr');
const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');

var corpus = new Map();
var index = null;
var ready = null;

function csv() {
  return path.join(__dirname, 'index.csv');
};

async function sql(tab='descriptions', opt={}) {
  var cols = {code: 'TEXT', name: 'TEXT', scie: 'TEXT', desc: 'TEXT'};
  var tsv = {code: 'A', name: 'B', scie: 'B', desc: 'B'};
  var opt = Object.assign({pk: 'code', index: true, tsvector: tsv}, opt);
  var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
  var z = Sql.createTable(tab, cols, opt);
  z = await Sql.insertInto.stream(tab, stream, opt, z);
  z = Sql.setupTable.index(tab, cols, opt, z);
  return z;
};

function loadCorpus() {
  return new Promise((fres) => {
    var stream = fs.createReadStream(csv()).pipe(parse({columns: true, comment: '#'}));
    stream.on('data', (r) => corpus.set(r.code, r));
    stream.on('end', fres);
  });
};

function setupIndex() {
  index = lunr(function() {
    this.ref('code');
    this.field('code');
    this.field('name');
    this.field('scie');
    this.field('desc');
    for(var r of corpus.values()) {
      var {code, name, scie, desc} = r;
      name = name.replace(/^(\w+),/g, '$1 $1 $1 $1,');
      desc = desc.replace(/\[.*?\]/g, '').replace(/\w+\.\s([\w\',\/\(\)\- ]+)[;\.]?/g, '$1');
      desc = desc.replace(/[,\/\(\)\- ]+/g, ' ').trim();
      this.add({code, name, scie, desc});
    }
  });
};

function load() {
  ready = ready||loadCorpus();
  return ready.then(setupIndex);
};

function descriptions(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};
descriptions.csv = csv;
descriptions.sql = sql;
descriptions.load = load;
descriptions.corpus = corpus;
module.exports = descriptions;
