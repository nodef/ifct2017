const assert = require('assert');
const energies = require('./');




function testAll() {
  var a = energies('dietary fibre');
  var b = energies('Soluble fibre');
  var c = [{component: 'Fibre', kj: 8, kcal: 2}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = energies('what is energy conversion factor of fat?');
  var b = energies('conversion factor of fat');
  var c = [{component: 'Fat', kj: 37, kcal: 9}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
