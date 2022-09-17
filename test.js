const assert = require('assert');
const descriptions = require('./');




async function testAll() {
  await descriptions.load();

  var a = descriptions('pineapple');
  var b = descriptions('ananas comosus');
  var c = [{code: 'E053', name: 'Pineapple', scie: 'Ananas comosus', desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = descriptions('tell me about cow milk.');
  var b = descriptions('gai ka doodh details.');
  var c = [{code: 'L002', name: 'Milk, Cow', scie: '', desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.'}];
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
