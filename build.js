const csv = require('csv');
const fs = require('fs');
const os = require('os');

var map = new Map();
var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
stream.on('data', (r) => {
  var {code, name, factor, tops, tags} = r;
  factor = parseInt(factor);
  map.set(code, {code, name, factor, tops, tags});
});
stream.on('end', () => {
  var z = `(function(root) {${os.EOL}`;
  z += `var CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `if(typeof module!=='undefined' && module.exports) return module.exports = CORPUS;${os.EOL}`;
  z += `if(typeof root.ifct2017==='undefined') root.ifct2017 = {};${os.EOL}`;
  z += `if(typeof root.ifct2017.columns==='undefined') root.ifct2017.columns = {};${os.EOL}`;
  z += `root.ifct2017.columns.corpus = CORPUS;${os.EOL}`;
  z += `})(this);${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
});
