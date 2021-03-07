const path = require('path');
const esql = require('sql-extra');

var corpus = null;




function load() {
  if (corpus) return corpus;
  corpus = require('./corpus')
  return corpus;
}

function csv() {
  return path.join(__dirname, 'index.csv');
}

function sql(tab='frequencydistribution', opt={}) {
  return esql.setupTable(tab, {districts: 'TEXT', states: 'INT', selected: 'INT', sampled: 'INT'},
    require('./corpus').values(), Object.assign({pk: 'districts', index: true, tsvector: {districts: 'A'}}, opt));
}


function frequencyDistribution(dis) {
  if (!corpus) load();
  if (dis <= 5) return corpus.get(1);
  if (dis <= 10) return corpus.get(6);
  if (dis > 70) return corpus.get(71);
  return corpus.get(Math.floor((dis-1)/10)*10+1);
}
frequencyDistribution.load = load;
frequencyDistribution.csv = csv;
frequencyDistribution.sql = sql;
module.exports = frequencyDistribution;
