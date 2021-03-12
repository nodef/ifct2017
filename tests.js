const assert = require('assert');
const groups = require('./');




function testAll() {
  var a = groups('cereals');
  var b = groups('Millet');
  var c = [{
    code: 'A', group: 'Cereals and Millets', entries: 24,
    tags: 'vegetarian eggetarian fishetarian veg'
  }];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = groups('what is vegetable?');
  var b = groups('vegetable group code?');
  var c = [
    {
      code: 'D', group: 'Other Vegetables', entries: 78,
      tags: 'vegetarian eggetarian fishetarian veg'
    },
    {
      code: 'C', group: 'Green Leafy Vegetables', entries: 34,
      tags: 'vegetarian eggetarian fishetarian veg'
    }
  ];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
