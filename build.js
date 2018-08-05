const parse = require('csv-parse');
const fs = require('fs');
const os = require('os');

var map = new Map();
var stream = fs.createReadStream('index.csv').pipe(parse({columns: true, comment: '#'}));
stream.on('data', (r) => {
  for(var k in r)
    if(k!=='code') r[k] = parseFloat(r[k]);
  map.set(r.code, r);
  r.code = undefined;
});
stream.on('end', () => {
  var z = `const CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
});
