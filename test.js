const assert    = require('assert');
const hierarchy = require('./');




function testAll() {
  var a = hierarchy('soluble oxalic acid');
  var b = hierarchy('Soluble Oxalic Acid');
  var c = {
    parents: 'oxalt', ancestry: 'oxalt orgac',
    children: ''
  };
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = hierarchy('what is hierarchy of total saturated fat?');
  var b = hierarchy('who are children of total saturated fat?');
  var c = {
    parents: 'fatce', ancestry: 'fatce',
    children: 'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0'
  };
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
