const columns = require('@ifct2017/columns');
const corpus = require('./corpus');
const path = require('path');

function csv() {
  return path.join(__dirname, 'index.csv');
};

function methods(txt) {
  var cs = columns(txt);
  return cs.length>0? corpus.get(cs[0].code):null;
};
methods.csv = csv;
methods.corpus = corpus;
module.exports = methods;
