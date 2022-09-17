const assert = require('assert');
const jonesFactors = require('./');




function testAll() {
  var a = jonesFactors('maida');
  var b = jonesFactors('Refined wheat');
  var c = [{food: 'Refined wheat flour (Maida)', factor: 5.7}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = jonesFactors('what is jones factor of barley?');
  var b = jonesFactors('jones factor of oats');
  var c = [{food: 'Barley and its flour;Rye and its flour;Oats', factor: 5.83}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
