const assert = require('assert');
const compositingCentres = require('./');




function testAll() {
  var a = compositingCentres('west');
  var b = compositingCentres('Mumbai');
  var c = [{region: 'West', centre: 'Mumbai', samples: 12}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = compositingCentres('what is compositing centre of north east?');
  var b = compositingCentres('North East compositing centre');
  var c = [{region: 'North East', centre: 'Guwahati', samples: 11}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
