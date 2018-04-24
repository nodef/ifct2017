const nutrients = require('@ifct2017/nutrients');
const natural = require('natural');
const csv = require('csv');
const path = require('path');
const fs = require('fs');

function matchOr(arr, vals) {
  for(var val of vals)
    if(arr.includes(val)) return true;
  return false;
};

function matchAnd(arr, vals) {
  for(var val of vals)
    if(!arr.includes(val)) return false;
  return true;
};

const DESC = new Map();
var dir = nutrients();
var nams = fs.readdirSync(dir);
for(var nam of nams) {
  var fil = path.join(dir, nam);
  var txt = fs.readFileSync(fil, 'utf8');
  DESC.set(nam.replace('.txt', ''), txt);
}

var z = 'code,name,tags,desc\n';
var srm = fs.createReadStream('columns.csv').pipe(csv.parse({columns: true, comment: '#'}));
srm.on('data', (r) => {
  var txt = r.code+' '+r.name+' '+r.tags;
  txt = txt.replace(/[.,;\s\(\)\-\:\*]+/g, ' ').trim(); r.desc = r.desc||'';
  var src = txt.split(' ').map((v) => natural.PorterStemmer.stem(v.toLowerCase()));
  for(var [k, v] of DESC) {
    var or = k.includes('+');
    var tgt = k.split(or? '+':'-').map((v) => natural.PorterStemmer.stem(v.toLowerCase()));
    if(or? matchOr(src, tgt):matchAnd(src, tgt)) r.desc = v.replace(/\r?\n/g, '\\n');
  }
  z += `"${r.code}","${r.name}","${r.tags}","${r.desc}"\n`;
});
srm.on('end', () => {
  fs.writeFileSync('index.csv', z);
});
