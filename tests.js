const assert = require('assert');
const columns = require('./');




function testAll() {
  var a = columns('vitamin c');
  var b = columns('c-vitamin');
  var c = [{
    code: 'vitc', name: 'Total Ascorbic acid',
    tags: 'ascorbate water soluble vitamin c vitamin c essential'
  }];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = columns('what is butyric acid?');
  var b = columns('c4:0 stands for?');
  var c = [{
    code: 'f4d0', name: 'Butyric acid (C4:0)',
    tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor'
  }];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
