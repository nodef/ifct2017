const parse = require('csv-parse');
const fs = require('fs');
const os = require('os');

var map = new Map();
var stream = fs.createReadStream('index.csv').pipe(parse({columns: true, comment: '#'}));




function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


stream.on('data', r => {
  for (var k in r)
    if (k!=='code') r[k] = parseFloat(r[k]);
  map.set(r.code, r);
});

stream.on('end', () => {
  var a = `const CORPUS = new Map([\n`;
  for (var [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:').replace(/null/g, 'NaN')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
});
