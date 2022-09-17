const assert = require('assert');
const samplingUnits = require('./');




function testAll() {
  var a = samplingUnits('andaman');
  var b = samplingUnits('Nicobar');
  var c = [{sno: 'A', state: 'Andaman & Nicobar', districts: 3, selected: 1}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = samplingUnits('sampling units in orissa?');
  var b = samplingUnits('orissa\'s sampling units');
  var c = [{sno: '20', state: 'Orissa', districts: 30, selected: 4}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
