const assert = require('assert');
const contents = require('./')




function testAll() {
  var a = contents('table 2');
  var b = contents('Water soluble vitamins');
  var c = [{sno: '6.2.', title: 'Table 2:  Water Soluble Vitamins', pagenos: '31'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = contents('what is page number of table 3?');
  var b = contents('fat soluble vitamin page number');
  var c = [{sno: '6.3.', title: 'Table 3:  Fat Soluble Vitamins', pagenos: '61'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
