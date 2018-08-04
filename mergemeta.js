const csv = require('csv');
const fs = require('fs');
const os = require('os');

var meta = new Map();
var index = new Map();


function readMeta() {
  return new Promise((fres) => {
    var stream = fs.createReadStream('meta.csv').pipe(csv.parse({columns: true, comment: '#'}));
    stream.on('data', r => meta.set(r.code, r));
    stream.on('end', () => fres(meta));
  });
};

function readIndex() {
  return new Promise((fres) => {
    var stream = fs.createReadStream('index.csv').pipe(csv.parse({columns: true, comment: '#'}));
    stream.on('data', r => {
      var {code, name, tops, tags} = r;
      var {type, factor, unit} = meta.get(code)||0;
      index.set(code, {code, name, factor, tops, tags});
    });
    stream.on('end', () => fres(index));
  });
};

async function writeOut() {
  await readMeta();
  await readIndex();
  var z = `code,name,factor,tops,tags${os.EOL}`;
  for(var r of index.values()) {
    var {code, name, factor, tops, tags} = r;
    name = name.includes(',')? `"${name}"`:name;
    z += `${code},${name},${factor},${tops},${tags}${os.EOL}`;
  }
  fs.writeFileSync('out.csv', z);
};
writeOut();
