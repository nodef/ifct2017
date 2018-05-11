const CORPUS = new Map([
  ["1", {sno:"1",carbohydrate:"Monosaccharides e.g. glucose",hydrolysis:100,monosaccharide:null}],
  ["2", {sno:"2",carbohydrate:"Disaccharides e.g. sucrose, lactose, maltose",hydrolysis:105,monosaccharide:1.05}],
  ["3", {sno:"3",carbohydrate:"Oligosaccharides",hydrolysis:null,monosaccharide:null}],
  ["3a", {sno:"3a",carbohydrate:"Raffinose (trisaccharide)",hydrolysis:107,monosaccharide:1.07}],
  ["3b", {sno:"3b",carbohydrate:"Stachyose (tetrasaccharide)",hydrolysis:108,monosaccharide:1.08}],
  ["3c", {sno:"3c",carbohydrate:"Verbascose (pentasaccharide)",hydrolysis:109,monosaccharide:1.09}],
  ["4", {sno:"4",carbohydrate:"Polysaccharides e.g. starch",hydrolysis:110,monosaccharide:1.1}],
]);
module.exports = CORPUS;
