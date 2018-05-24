const Sql = require('sql-extra');
const corpus = require('./corpus');
const path = require('path');

function csv() {
  return path.join(__dirname, 'index.csv');
};

function sql(tab='frequencydistribution', opt={}) {
  return Sql.setupTable(tab, {districts: 'TEXT', states: 'INT', selected: 'INT', sampled: 'INT'},
    corpus.values(), {pk: 'districts', index: true, tsvector: {districts: 'A'}});
};

function frequencyDistribution(dis) {
  if(dis<=5) return corpus.get(1);
  if(dis<=10) return corpus.get(6);
  if(dis>70) return corpus.get(71);
  return corpus.get(Math.floor((dis-1)/10)*10+1);
};
frequencyDistribution.csv = csv;
frequencyDistribution.sql = sql;
frequencyDistribution.corpus = corpus;
module.exports = frequencyDistribution;
