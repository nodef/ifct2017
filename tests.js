const assert = require('assert');
const representations = require('./');




function testAll() {
  var a = representations('his');
  var b = representations('Histidine');
  var c = {type: 'mass', factor: 1e+3, unit: 'mg'};
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = representations('representation of vitamin d?');
  var b = representations('what is unit of cholecalciferol?');
  var c = {type: 'mass', factor: 1e+9, unit: 'ng'};
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
