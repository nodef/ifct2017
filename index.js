const Sql = require('sql-extra');
const path = require('path');

var corpus = new Map();
var ready = false;


function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='frequencydistribution', opt={}) {
  return Sql.setupTable(tab, {districts: 'TEXT', states: 'INT', selected: 'INT', sampled: 'INT'},
    corpus.values(), Object.assign({pk: 'districts', index: true, tsvector: {districts: 'A'}}, opt));
};

function load() {
  if(ready) return true;
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
  return ready = true;
};

function frequencyDistribution(dis) {
  if(!ready) return null;
  if(dis<=5) return corpus.get(1);
  if(dis<=10) return corpus.get(6);
  if(dis>70) return corpus.get(71);
  return corpus.get(Math.floor((dis-1)/10)*10+1);
};
frequencyDistribution.csv = csv;
frequencyDistribution.sql = sql;
frequencyDistribution.load = load;
frequencyDistribution.corpus = corpus;
module.exports = frequencyDistribution;
