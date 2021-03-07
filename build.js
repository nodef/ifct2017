const path = require('path');
const fs = require('fs');
const os = require('os');

const A = process.argv;




function readFile(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n/g, '\n');
}

function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


function readAssets() {
  var a = new Map();
  for(var f of fs.readdirSync('assets'))
    a.set(f.replace('.txt', ''), readFile(path.join('assets', f)));
  return a;
}


function readIndex() {
  var a = new Map(), txt = readFile('index.txt');
  var re = /\[\[([\w:]+)\]\]\n([\w\W]*?)\n\n\n/g, m;
  while ((m = re.exec(txt)) != null) {
    var k = m[1], v = m[2].trim();
    if (!k.endsWith(':')) a.set(k, [v]);
    else a.set(k.replace(/:.*/, ''), v.split('\n'));
  }
  return a;
}

function writeCorpus(map) {
  var a = `const CORPUS = new Map([\n`;
  for (var [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v)}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
}

var map = /index/i.test(A[2]||'')? readIndex() : readAssets();
writeCorpus(map);
