const assert = require('assert');
const intakes = require('./');




function testAll() {
  var a = intakes('his');
  var b = intakes('Histidine');
  var c = {
    code: 'his', whorda: -0.01, usear: NaN, usrdam: -0.014, usrdaf: NaN,
    euprim: NaN, euprif: NaN, ulus: NaN, uleu: NaN, uljapan: NaN
  };
  assert.deepStrictEqual(a[0], c);
  assert.deepStrictEqual(b[0], c);

  var a = intakes('intake of total fibre?');
  var b = intakes('what is rda of total fiber?');
  var c = {
    code: 'fibtg', whorda: NaN, usear: NaN, usrdam: 38, usrdaf: 25,
    euprim: NaN, euprif: NaN, ulus: NaN, uleu: NaN, uljapan: NaN
  };
  assert.deepStrictEqual(a[0], c);
  assert.deepStrictEqual(b[0], c);
}
testAll();
