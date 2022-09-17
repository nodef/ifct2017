const assert = require('assert');
const frequencyDistribution = require('./');




function testAll() {
  var a = frequencyDistribution(2);
  var b = frequencyDistribution(5);
  var c = {districts: '1-5', states: 9, selected: 1, sampled: 9};
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = frequencyDistribution(32);
  var b = frequencyDistribution(37);
  var c = {districts: '31-40', states: 4, selected: 5, sampled: 20};
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
