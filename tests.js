const assert  = require('assert');
const methods = require('./');




function testAll() {
  var a = methods('soluble oxalic acid');
  var b = methods('Insoluble Oxalic Acid');
  var c = {
    analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
    method: 'Fast- HPLC', reference: 'Moreau & Savage (2009)'
  };
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = methods('what is analytical method of saponin?');
  var b = methods('how is total saponin measured?');
  var c = {
    analyte: 'Total Saponin',
    method: 'Colorimetry', reference: 'Dini et al. (2009)'
  };
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
