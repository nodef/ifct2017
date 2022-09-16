const T = {
  TEXT:       0x00,
  NORMAL:     0x01,
  QUOTED:     0x02,
  NUMBER:     0x10,
  CARDINAL:   0x11,
  ORDINAL:    0x12,
  UNIT:       0x20,
  MASS:       0x21,
  ENTITY:     0x30,
  TABLE:      0x31,
  COLUMN:     0x32,
  ROW:        0x33,
  BRACKET:    0x40,
  OPEN:       0x41,
  CLOSE:      0x42,
  OPERATOR:   0x50,
  UNARY:      0x51,
  BINARY:     0x52,
  TERNARY:    0x53,
  FUNCTION:   0x60,
  KEYWORD:    0x70,
  EXPRESSION: 0x80,
  VALUE:      0x81,
  BOOLEAN:    0x82,
};
const DECIMAL = new Set(['dot', 'point', 'decimal']);
const SPECIAL = new Map([
  ['infinity', Infinity],
  ['infinite', Infinity],
  ['inf', Infinity],
  ['∞',   Infinity],
  ['not-a-number', NaN],
  ['not-number',   NaN],
  ['nan', NaN]
]);
const CARDINAL = new Map([
  ['oh',     0],
  ['nil',    0],
  ['zero',   0],
  ['nought', 0],
  ['naught', 0],
  ['one',    1],
  ['two',    2],
  ['three',  3],
  ['four',   4],
  ['five',   5],
  ['six',    6],
  ['seven',  7],
  ['eight',  8],
  ['nine',   9],
  ['ten',       10],
  ['eleven',    11],
  ['twelve',    12],
  ['thirteen',  13],
  ['fourteen',  14],
  ['fifteen',   15],
  ['sixteen',   16],
  ['seventeen', 17],
  ['eighteen',  18],
  ['nineteen',  19],
  ['twenty',  20],
  ['thirty',  30],
  ['forty',   40],
  ['fifty',   50],
  ['sixty',   60],
  ['seventy', 70],
  ['eighty',  80],
  ['ninety',  90],
  ['hundred',     1e+2],
  ['thousand',    1e+3],
  ['lakh',        1e+5],
  ['million',     1e+6],
  ['crore',       1e+7],
  ['billion',     1e+9],
  ['trillion',    1e+12],
  ['quadrillion', 1e+15],
  ['quintillion', 1e+18],
  ['sextillion',  1e+21],
  ['septillion',  1e+24],
  ['octillion',   1e+27],
  ['nonillion',   1e+30],
  ['decillion',   1e+33]
]);
const ORDINAL = new Map([
  ['zeroth',  0],
  ['first',   1],
  ['second',  2],
  ['third',   3],
  ['fourth',  4],
  ['fifth',   5],
  ['sixth',   6],
  ['seventh', 7],
  ['eighth',  8],
  ['ninth',   9],
  ['tenth',       10],
  ['eleventh',    11],
  ['twelfth',     12],
  ['thirteenth',  13],
  ['fourteenth',  14],
  ['fifteenth',   15],
  ['sixteenth',   16],
  ['seventeenth', 17],
  ['eighteenth',  18],
  ['nineteenth',  19],
  ['twentieth',  20],
  ['thirtieth',  30],
  ['fortieth',   40],
  ['fiftieth',   50],
  ['sixtieth',   60],
  ['seventieth', 70],
  ['eightieth',  80],
  ['ninetieth',  90],
  ['hundredth',     1e+2],
  ['thousandth',    1e+3],
  ['lakhth',        1e+5],
  ['millionth',     1e+6],
  ['croreth',       1e+7],
  ['billionth',     1e+9],
  ['trillionth',    1e+12],
  ['quadrillionth', 1e+15],
  ['quintillionth', 1e+18],
  ['sextillionth',  1e+21],
  ['septillionth',  1e+24],
  ['octillionth',   1e+27],
  ['nonillionth',   1e+30],
  ['decillionth',   1e+33]
]);




function trailingZeros(num) {
  for (var a=0, num=Math.floor(num); num%10===0; a++)
    num = Math.floor(num/10);
  return a;
}

function digitCount(num) {
  return num>0? Math.floor(Math.log10(num)) + 1 : 1;
}

function round(num) {
  var p = 10 ** (15 - digitCount(num));
  return Math.round(num*p)/p;
}

function merge(n1, n2) {
  var a1 = n2!==0? trailingZeros(n1) : 0;
  var d2 = digitCount(n2);
  return a1<d2? n1*(10**d2) + n2 : n1 + n2;
}

function mergeAll(arr) {
  var l = arr.length;
  var a = l>0? arr[l-1] : 0;
  for (var i=l-2; i>=0; i--)
    a = merge(arr[i], a);
  return a;
}

function addExp(arr, exp) {
  var l = arr.length;
  var a = l>0? arr[l-1] : 0;
  for (var i=l-2; i>=0 && arr[i]<=a*exp; i--)
    a = merge(arr[i], a);
  arr[i+1] = round(a*exp);
  arr.length = i+2;
  return arr;
}

function process(s, txt) {
  var l = s.arr.length;
  var has = true, v = NaN;
  if (CARDINAL.has(txt))     v = CARDINAL.get(txt);
  else if (ORDINAL.has(txt)) v = ORDINAL.get(txt);
  else { v = parseFloat(txt); has = false; }
  if (Number.isNaN(v)) { s.end = true; return false; }
  if (!has || l===0 || v<100 || v<s.exp) {
    if (s.exp>0) { s.arr[l] = v; s.exp = has && v>=100? v : 0; }
    else s.arr[l-1] = merge(s.arr[l-1], v);
  }
  else { addExp(s.arr, v); s.exp = v; }
  s.end = s.ord = ORDINAL.has(txt);
  return true;
}

function has(s) {
  return s.end && s.arr.length>0;
}

function get(s) {
  var a = mergeAll(s.arr);
  s.arr.length = 0;
  s.end = false;
  s.ord = false;
  s.exp = 1;
  return a;
}

function decimal(s, dec, pre) {
  var type  = s.ord? T.ORDINAL : T.CARDINAL, v = get(s);
  var value = round(dec? pre + v*10**(-digitCount(v)) : v);
  return {type, value};
}

function number(tkns) {
  var dec = false, pre = NaN, p = false, a = [];
  var s   = {arr: [], end: false, ord: false, exp: 1};
  for(var tkn of tkns) {
    var txt = tkn.type===T.TEXT? tkn.value.toLowerCase().replace(/[\s,]/g, '') : null;
    if (txt!=null && (p = process(s, txt)) && !s.end) continue;
    if (DECIMAL.has(txt)) { pre = get(s); dec = true; p = true; }
    else if (dec || has(s)) { a.push(decimal(s, dec, pre)); dec = false; pre = NaN; }
    if (SPECIAL.has(txt))   { a.push({type: T.CARDINAL, value: SPECIAL.get(txt)}); p = true; }
    if (!p) a.push(tkn);
  }
  return a;
}

function token(type, value) {
  return {type, value};
}

function tokenize(txt) {
  var quo = null, y = '', a = [];
  for (var c of txt) {
    if ((quo!=null && quo!=c) || /\w/.test(c)) { y += c; continue; }
    if (y) { a.push(token(quo!=null? T.QUOTED : T.TEXT, y)); y = ''; }
    if (/[\'\"\`]/.test(c)) quo = quo==null? c:null;
    else if (/\S/g.test(c)) a.push(token(T.TEXT, c));
  }
  if (y) a.push(token(quo!=null? T.QUOTED : T.TEXT, y));
  return a;
}

function nlp(txt) {
  var tkns = tokenize(txt), a = '';
  tkns.push(token(T.TEXT, ''));
  tkns = number(tkns);
  for (var tkn of tkns)
    a += tkn.value+' ';
  return a.trim();
}
module.exports = nlp;
