const assert = require('assert');
const carbohydrates = require('./');




function testAll() {
  var a = carbohydrates('monosaccharide');
  var b = carbohydrates('Glucose');
  var c = [{
    sno: '1',
    carbohydrate: 'Monosaccharides e.g. glucose',
    hydrolysis: 100,
    monosaccharide: 1
  }];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = carbohydrates('what is carbohydrate conversion factor of disaccharides?');
  var b = carbohydrates('maltose conversion factor');
  var c = [{
    sno: '2',
    carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
    hydrolysis: 105,
    monosaccharide: 1.05
  }];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
