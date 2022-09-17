const assert = require('assert');
const codes  = require('./');




async function testAll() {
  await codes.load();

  var a = codes('mango green');
  var b = codes('Raw mango');
  var c = [{name: 'Mango, green, raw (Common)', code: 'D057'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = codes('what is food code of atta?');
  var b = codes('atta code');
  var c = [
    {name: 'Atta (H., P.)', code: 'A019'},
    {name: 'Gahama atta (O.)', code: 'A019'},
    {name: 'Wheat flour, atta (Common)', code: 'A019'}
  ];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
