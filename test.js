const assert  = require('assert');
const columns = require('./');




function testAll() {
  var a = columns('vitamin c');
  var b = columns('c-vitamin');
  assert.deepStrictEqual(a[0].code, 'vitc');
  assert.deepStrictEqual(b[0].code, 'vitc');

  var a = columns('what is butyric acid?');
  var b = columns('c4:0 stands for?');
  assert.deepStrictEqual(a[0].code, 'f4d0');
  assert.deepStrictEqual(b[0].code, 'f4d0');

  var a = columns('fats');
  var b = columns('total fat');
  assert.deepStrictEqual(a[0].code, 'fatce');
  assert.deepStrictEqual(b[0].code, 'fatce');

  var a = columns('fibers');
  var b = columns('total fibre');
  assert.deepStrictEqual(a[0].code, 'fibtg');
  assert.deepStrictEqual(b[0].code, 'fibtg');

  var a = columns('vitamin b1');
  var b = columns('vitamin b-1');
  assert.deepStrictEqual(a[0].code, 'thia');
  assert.deepStrictEqual(b[0].code, 'thia');

  var a = columns('vitamin c');
  var b = columns('ascorbic acid');
  assert.deepStrictEqual(a[0].code, 'vitc');
  assert.deepStrictEqual(b[0].code, 'vitc');

  var a = columns('vitamin b');
  var b = columns('total vitamin b');
  assert.deepStrictEqual(a[0].code, 'vitb');
  assert.deepStrictEqual(b[0].code, 'vitb');

  var a = columns('vitamin a');
  var b = columns('total vitamin a');
  assert.deepStrictEqual(a[0].code, 'vita');
  assert.deepStrictEqual(b[0].code, 'vita');

  var a = columns('organic acid');
  var b = columns('total organic acids');
  assert.deepStrictEqual(a[0].code, 'orgac');
  assert.deepStrictEqual(b[0].code, 'orgac');
}
testAll();
