const path = require('path');
const fs = require('fs');
const os = require('os');

const A = process.argv;

function readAssets() {
  var z = new Map();
  for(var f of fs.readdirSync('assets'))
    z.set(f.replace('.txt', ''), fs.readFileSync(path.join('assets', f), 'utf8'));
  return z;
};

function readIndex() {
  var z = new Map(), txt = fs.readFileSync('index.txt', 'uf8');
  var regex = /\[\[([\w:]+)\]\]\r?\n([\w\W]*?)\r?\n\r?\n\r?\n/g;
  while(true) {
    var m = regex.exec(txt);
    if(m==null) break;
    var k = m[1], v = m[2].trim();
    if(!k.endsWith(':')) z.set(k, [v]);
    else z.set(k.replace(/:.*/, ''), v.split(/\r?\n/g));
  }
  return z;
};

function writeCorpus(map) {
  var z = `const CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${JSON.stringify(v)}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
};

var map = /index/i.test(A[2]||'')? readIndex():readAssets();
writeCorpus(map);
