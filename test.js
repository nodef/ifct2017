const assert  = require('assert');
const regions = require('./');




function testAll() {
  var a = regions('central');
  var b = regions('Uttaranchal');
  var c = [{
    region: 'Central',
    states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = regions('which region andhra pradesh belongs to?');
  var b = regions('details of south region');
  var c = [{
    region: 'South',
    states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
