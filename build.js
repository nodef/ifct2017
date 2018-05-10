const csv = require('csv');
const fs = require('fs');
const os = require('os');

var map = new Map();
var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
stream.on('data', (r) => {
  r.districts = parseInt(r.districts, 10);
  r.selected = parseInt(r.selected, 10);
  map.set(r.sno, r);
});
stream.on('end', () => {
  var z = `var CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
});
