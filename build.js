const csvParse = require('csv-parse');
const fs = require('fs');
const os = require('os');

var map = new Map();
var stream = fs.createReadStream('index.csv').pipe(csvParse({columns: true, comment: '#'}));




function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}

stream.on('data', r => {
  map.set(r.region, r);
});

stream.on('end', () => {
  var a = `const CORPUS = new Map([\n`;
  for (var [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
});
