const assert = require('assert');
const about  = require('./');




function testAll() {
  var a = about('who is you publisher');
  var b = about('which organization issued you');
  assert.deepStrictEqual(a, b);

  var a = about('can i know the food groups');
  var b = about('i want to know what types of food are there');
  assert.deepStrictEqual(a, b);

  var a = about('what happened in 1951');
  var b = about('what was the situation in nineteen fifty');
  assert.deepStrictEqual(a, b);
}
testAll();
