// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import {assertEquals} from "jsr:@std/assert";
import * as ifct2017 from "./index.ts";




//#region TEST ABBREVIATIONS
Deno.test("Abbreviations 1", async () => {
  await ifct2017.loadAbbreviations();
  const a = ifct2017.abbreviations('GLV');
  const b = ifct2017.abbreviations('g l v');
  const c = {abbr: 'GLV', full: 'Green Leafy Vegetables'};
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Abbreviations 2", async () => {
  await ifct2017.loadAbbreviations();
  const a = ifct2017.abbreviations('what is D.R.I.');
  const b = ifct2017.abbreviations('d. r. i. stands for?');
  const c = {abbr: 'DRI', full: 'Dietary reference intake'};
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST ABOUT
Deno.test("About 1", async () => {
  await ifct2017.loadAbout();
  const a = ifct2017.about('who is you publisher');
  const b = ifct2017.about('which organization issued you');
  assertEquals(a, b);
});


Deno.test("About 2", async () => {
  await ifct2017.loadAbout();
  const a = ifct2017.about('can i know the food groups');
  const b = ifct2017.about('i want to know what types of food are there');
  assertEquals(a, b);
});


Deno.test("About 3", async () => {
  await ifct2017.loadAbout();
  const a = ifct2017.about('what happened in 1951');
  const b = ifct2017.about('what was the situation in 1951');
  assertEquals(a, b);
});
//#endregion




//#region TEST CARBOHYDRATES
Deno.test("Carbohydrates 1", async () => {
  await ifct2017.loadCarbohydrates();
  const a = ifct2017.carbohydrates('monosaccharide');
  const b = ifct2017.carbohydrates('Glucose');
  const c = [{
    sno: '1',
    carbohydrate: 'Monosaccharides e.g. glucose',
    hydrolysis: 100,
    monosaccharide: 1,
  }];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Carbohydrates 2", async () => {
  await ifct2017.loadCarbohydrates();
  const a = ifct2017.carbohydrates('what is carbohydrate conversion factor of disaccharides?');
  const b = ifct2017.carbohydrates('maltose conversion factor');
  const c = [{
    sno: '2',
    carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
    hydrolysis: 105,
    monosaccharide: 1.05,
  }];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST CODES
Deno.test("Codes 1", async () => {
  await ifct2017.loadCodes();
  const a = ifct2017.codes('mango green');
  const b = ifct2017.codes('Raw mango');
  const c = [{name: 'Mango, green, raw (Common)', code: 'D057'}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Codes 2", async () => {
  await ifct2017.loadCodes();
  const a = ifct2017.codes('what is food code of atta?');
  const b = ifct2017.codes('atta code');
  const c = [
    {name: 'Atta (H., P.)', code: 'A019'},
    {name: 'Gahama atta (O.)', code: 'A019'},
    {name: 'Wheat flour, atta (Common)', code: 'A019'}
  ];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST COLUMNS
Deno.test("Columns 1", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('vitamin c');
  const b = ifct2017.columns('c-vitamin');
  assertEquals(a[0].code, 'vitc');
  assertEquals(b[0].code, 'vitc');
});


Deno.test("Columns 2", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('what is butyric acid?');
  const b = ifct2017.columns('c4:0 stands for?');
  assertEquals(a[0].code, 'f4d0');
  assertEquals(b[0].code, 'f4d0');
});


Deno.test("Columns 3", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('fats');
  const b = ifct2017.columns('total fat');
  assertEquals(a[0].code, 'fatce');
  assertEquals(b[0].code, 'fatce');
});


Deno.test("Columns 4", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('fibers');
  const b = ifct2017.columns('total fibre');
  assertEquals(a[0].code, 'fibtg');
  assertEquals(b[0].code, 'fibtg');
});


Deno.test("Columns 5", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('vitamin b1');
  const b = ifct2017.columns('vitamin b-1');
  assertEquals(a[0].code, 'thia');
  assertEquals(b[0].code, 'thia');
});


Deno.test("Columns 6", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('vitamin c');
  const b = ifct2017.columns('ascorbic acid');
  assertEquals(a[0].code, 'vitc');
  assertEquals(b[0].code, 'vitc');
});


Deno.test("Columns 7", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('vitamin b');
  const b = ifct2017.columns('total vitamin b');
  assertEquals(a[0].code, 'vitb');
  assertEquals(b[0].code, 'vitb');
});


Deno.test("Columns 8", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('vitamin a');
  const b = ifct2017.columns('total vitamin a');
  assertEquals(a[0].code, 'vita');
  assertEquals(b[0].code, 'vita');
});


Deno.test("Columns 9", async () => {
  await ifct2017.loadColumns();
  const a = ifct2017.columns('organic acid');
  const b = ifct2017.columns('total organic acids');
  assertEquals(a[0].code, 'orgac');
  assertEquals(b[0].code, 'orgac');
});
//#endregion




//#region TEST COMPOSITING CENTRES
Deno.test("Compositing centres 1", async () => {
  await ifct2017.loadCompositingCentres();
  const a = ifct2017.compositingCentres('west');
  const b = ifct2017.compositingCentres('Mumbai');
  const c = [{region: 'West', centre: 'Mumbai', samples: 12}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Compositing centres 2", async () => {
  await ifct2017.loadCompositingCentres();
  const a = ifct2017.compositingCentres('what is compositing centre of north east?');
  const b = ifct2017.compositingCentres('North East compositing centre');
  const c = [{region: 'North East', centre: 'Guwahati', samples: 11}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST COMPOSITIONS
Deno.test("Compositions 1", async () => {
  await ifct2017.loadCompositions();
  const a = ifct2017.compositions('pineapple');
  const b = ifct2017.compositions('ananas comosus');
  assertEquals(a[0].code, 'E053');
  assertEquals(b[0].code, 'E053');
});


Deno.test("Compositions 2", async () => {
  await ifct2017.loadCompositions();
  const a = ifct2017.compositions('tell me about cow milk.');
  const b = ifct2017.compositions('gai ka doodh details.');
  assertEquals(a[0].code, 'L002');
  assertEquals(b[0].code, 'L002');
});
//#endregion




//#region COMPOSITION STATS
Deno.test("Composition stats 1", async () => {
  await ifct2017.loadCompositionStats();
  const a = ifct2017.compositionStats('min')[0];
  assertEquals(a.code, 'XMIN');
  assertEquals(a.name, 'Minimum composition of all foods');
  const b = ifct2017.compositionStats('max')[0];
  assertEquals(b.code, 'XMAX');
  assertEquals(b.name, 'Maximum composition of all foods');
});
//#endregion




//#region CONTENTS
Deno.test("Contents 1", async () => {
  await ifct2017.loadContents();
  const a = ifct2017.contents('table 2');
  const b = ifct2017.contents('Water soluble vitamins');
  const c = [{sno: '6.2.', title: 'Table 2: Water Soluble Vitamins', pagenos: '31'}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Contents 2", async () => {
  await ifct2017.loadContents();
  const a = ifct2017.contents('what is page number of table 3?');
  const b = ifct2017.contents('fat soluble vitamin page number');
  const c = [{sno: '6.3.', title: 'Table 3: Fat Soluble Vitamins', pagenos: '61'}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST DESCRIPTIONS
Deno.test("Descriptions 1", async () => {
  await ifct2017.loadDescriptions();
  const a = ifct2017.descriptions('pineapple');
  const b = ifct2017.descriptions('ananas comosus');
  const c = [{code: 'E053', name: 'Pineapple', scie: 'Ananas comosus', grup: 'Fruits', desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.'}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Descriptions 2", async () => {
  await ifct2017.loadDescriptions();
  const a = ifct2017.descriptions('tell me about cow milk.');
  const b = ifct2017.descriptions('gai ka doodh details.');
  const c = [{code: 'L002', name: 'Milk, Cow', scie: '', grup: 'Milk and Milk Products', desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.'}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST ENERGIES
Deno.test("Energies 1", async () => {
  await ifct2017.loadEnergies();
  const a = ifct2017.energies('dietary fibre');
  const b = ifct2017.energies('Soluble fibre');
  const c = [{component: 'Fibre', kj: 8, kcal: 2}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Energies 2", async () => {
  await ifct2017.loadEnergies();
  const a = ifct2017.energies('what is energy conversion factor of fat?');
  const b = ifct2017.energies('conversion factor of fat');
  const c = [{component: 'Fat', kj: 37, kcal: 9}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST FREQUENCY DISTRIBUTION
Deno.test("Frequency distribution 1", async () => {
  await ifct2017.loadFrequencyDistribution();
  const a = ifct2017.frequencyDistribution(2);
  const b = ifct2017.frequencyDistribution(5);
  const c = {districts: '1-5', states: 9, selected: 1, sampled: 9};
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Frequency distribution 2", async () => {
  await ifct2017.loadFrequencyDistribution();
  const a = ifct2017.frequencyDistribution(32);
  const b = ifct2017.frequencyDistribution(37);
  const c = {districts: '31-40', states: 4, selected: 5, sampled: 20};
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST GROUPS
Deno.test("Groups 1", async () => {
  await ifct2017.loadGroups();
  const a = ifct2017.groups('cereals');
  const b = ifct2017.groups('Millet');
  const c = [{
    code: 'A', group: 'Cereals and Millets', entries: 24,
    tags: 'vegetarian eggetarian fishetarian veg'
  }];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Groups 2", async () => {
  await ifct2017.loadGroups();
  const a = ifct2017.groups('what is vegetable?');
  const b = ifct2017.groups('vegetable group code?');
  const c = [
    {
      code: 'D', group: 'Other Vegetables', entries: 78,
      tags: 'vegetarian eggetarian fishetarian veg'
    },
    {
      code: 'C', group: 'Green Leafy Vegetables', entries: 34,
      tags: 'vegetarian eggetarian fishetarian veg'
    }
  ];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST HIERARCHY
Deno.test("Hierarchy 1", async () => {
  await ifct2017.loadHierarchy();
  const a = ifct2017.hierarchy('soluble oxalic acid');
  const b = ifct2017.hierarchy('Soluble Oxalic Acid');
  const c = {
    code: 'oxals',
    parents: 'oxalt',
    ancestry: 'oxalt orgac',
    children: '',
  };
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Hierarchy 2", async () => {
  await ifct2017.loadHierarchy();
  const a = ifct2017.hierarchy('what is hierarchy of total saturated fat?');
  const b = ifct2017.hierarchy('who are children of total saturated fat?');
  const c = {
    code: 'fasat',
    parents: 'fatce',
    ancestry: 'fatce',
    children: 'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0',
  };
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST INTAKES
Deno.test("Intakes 1", async () => {
  await ifct2017.loadIntakes();
  const a = ifct2017.intakes('his');
  const b = ifct2017.intakes('Histidine');
  const c = {
    code: 'his', whorda: -0.01, usear: NaN, usrdam: -0.014, usrdaf: NaN,
    euprim: NaN, euprif: NaN, ulus: NaN, uleu: NaN, uljapan: NaN
  };
  assertEquals(a[0], c);
  assertEquals(b[0], c);
});


Deno.test("Intakes 2", async () => {
  await ifct2017.loadIntakes();
  const a = ifct2017.intakes('intake of total fibre?');
  const b = ifct2017.intakes('what is rda of total fiber?');
  const c = {
    code: 'fibtg', whorda: NaN, usear: NaN, usrdam: 38, usrdaf: 25,
    euprim: NaN, euprif: NaN, ulus: NaN, uleu: NaN, uljapan: NaN
  };
  assertEquals(a[0], c);
  assertEquals(b[0], c);
});
//#endregion




//#region TEST JONES FACTORS
Deno.test("Jones factors 1", async () => {
  await ifct2017.loadJonesFactors();
  const a = ifct2017.jonesFactors('maida');
  const b = ifct2017.jonesFactors('Refined wheat');
  const c = [{food: 'Refined wheat flour (Maida)', factor: 5.7}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Jones factors 2", async () => {
  await ifct2017.loadJonesFactors();
  const a = ifct2017.jonesFactors('what is jones factor of barley?');
  const b = ifct2017.jonesFactors('jones factor of oats');
  const c = [{food: 'Barley and its flour;Rye and its flour;Oats', factor: 5.83}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST LANGUAGES
Deno.test("Languages 1", async () => {
  await ifct2017.loadLanguages();
  const a = ifct2017.languages('mal.');
  const b = ifct2017.languages('Mal');
  const c = {abbr: 'Mal.', lang: 'Malayalam'};
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Languages 2", async () => {
  await ifct2017.loadLanguages();
  const a = ifct2017.languages('what is s.?');
  const b = ifct2017.languages('S. stands for?');
  const c = {abbr: 'S.', lang: 'Sanskrit'};
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion



//#region TEST METHODS
Deno.test("Methods 1", async () => {
  await ifct2017.loadMethods();
  const a = ifct2017.methods('soluble oxalic acid');
  const b = ifct2017.methods('Insoluble Oxalic Acid');
  const c = {
    analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
    method: 'Fast- HPLC', reference: 'Moreau & Savage (2009)'
  };
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Methods 2", async () => {
  await ifct2017.loadMethods();
  const a = ifct2017.methods('what is analytical method of saponin?');
  const b = ifct2017.methods('how is total saponin measured?');
  const c = {
    analyte: 'Total Saponin',
    method: 'Colorimetry', reference: 'Dini et al. (2009)'
  };
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST GROUPS
Deno.test("Groups 1", async () => {
  await ifct2017.loadGroups();
  const a = ifct2017.groups('cereals');
  const b = ifct2017.groups('Millet');
  const c = [{
    code: 'A', group: 'Cereals and Millets', entries: 24,
    tags: 'vegetarian eggetarian fishetarian veg'
  }];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Groups 2", async () => {
  await ifct2017.loadGroups();
  const a = ifct2017.groups('what is vegetable?');
  const b = ifct2017.groups('vegetable group code?');
  const c = [
    {
      code: 'D', group: 'Other Vegetables', entries: 78,
      tags: 'vegetarian eggetarian fishetarian veg'
    },
    {
      code: 'C', group: 'Green Leafy Vegetables', entries: 34,
      tags: 'vegetarian eggetarian fishetarian veg'
    }
  ];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST REGIONS
Deno.test("Regions 1", async () => {
  await ifct2017.loadRegions();
  const a = ifct2017.regions('central');
  const b = ifct2017.regions('Uttaranchal');
  const c = [{
    region: 'Central',
    states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal'}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Regions 2", async () => {
  await ifct2017.loadRegions();
  const a = ifct2017.regions('which region andhra pradesh belongs to?');
  const b = ifct2017.regions('details of south region');
  const c = [{
    region: 'South',
    states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu'}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST REPRESENTATIONS
Deno.test("Representations 1", async () => {
  await ifct2017.loadRepresentations();
  const a = ifct2017.representations('his');
  const b = ifct2017.representations('Histidine');
  const c = {code: 'his', type: 'mass', factor: 1e+3, unit: 'mg'};
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Representations 2", async () => {
  await ifct2017.loadRepresentations();
  const a = ifct2017.representations('representation of vitamin d?');
  const b = ifct2017.representations('what is unit of ergocalciferol?');
  const c = {code: 'vitd',   type: 'mass', factor: 1e+6, unit: 'ug'};
  const d = {code: 'ergcal', type: 'mass', factor: 1e+6, unit: 'ug'};
  assertEquals(a, c);
  assertEquals(b, d);
});
//#endregion




//#region TEST SAMPLING UNITS
Deno.test("Sampling units 1", async () => {
  await ifct2017.loadSamplingUnits();
  const a = ifct2017.samplingUnits('andaman');
  const b = ifct2017.samplingUnits('Nicobar');
  const c = [{sno: 'A', state: 'Andaman & Nicobar', districts: 3, selected: 1}];
  assertEquals(a, c);
  assertEquals(b, c);
});


Deno.test("Sampling units 2", async () => {
  await ifct2017.loadSamplingUnits();
  const a = ifct2017.samplingUnits('sampling units in orissa?');
  const b = ifct2017.samplingUnits('orissa\'s sampling units');
  const c = [{sno: '20', state: 'Orissa', districts: 30, selected: 4}];
  assertEquals(a, c);
  assertEquals(b, c);
});
//#endregion




//#region TEST YIELD FACTORS
Deno.test("Yield factors 1", async () => {
  await ifct2017.loadYieldFactors();
  const a = ifct2017.yieldFactors('mango');
  const b = ifct2017.yieldFactors('Mangifera indica');
  const c = [{
    code: 'D057',
    name: 'Mango, green, raw',
    scie: 'Mangifera indica',
    lang: 'A. Keasa aam; B. Aam (kancha); G. Ambo; H. Katcha Aam; Kan. Mavinakayi; Kash. Kach Aamb; Kh. Soh pieng im; Mal. Manga; M. Heinou Ashangba; Mar. Amba; O. Ambu (kacha); P. Kaccha aam; Tam. Mangai; Tel. Mamidikaya; U. Kaccha aam.',
    grup: 'Other Vegetables',
    regn: 6,
    tags: 'vegetarian eggetarian fishetarian veg',
    yield: 0.6833333333,
    preparation: 'Washing, Peeling, Seed removal',
  }];
  assertEquals(a[0], c[0]);
  assertEquals(b[0], c[0]);
});


Deno.test("Yield factors 2", async () => {
  await ifct2017.loadYieldFactors();
  const a = ifct2017.yieldFactors('yield factor of cow milk?');
  const b = ifct2017.yieldFactors('gai ka doodh');
  const c = [{
    code: 'L002',
    name: 'Milk, whole, Cow',
    scie: '',
    lang: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.',
    grup: 'Milk and Milk Products',
    regn: 6,
    tags: 'vegetarian eggetarian fishetarian veg',
    yield: 1,
    preparation: 'None',
  }];
  assertEquals(a[0], c[0]);
  assertEquals(b[0], c[0]);
});
//#endregion




//#region TEST COLUMN DESCRIPTIONS
Deno.test("Column descriptions 1", async () => {
  await ifct2017.loadColumnDescriptions();
  const a = ifct2017.columnDescriptions('vitamin c');
  const b = ifct2017.columnDescriptions('c-vitamin');
  assertEquals(a[0].code, 'vitc');
  assertEquals(b[0].code, 'vitc');
});


Deno.test("Column descriptions 2", async () => {
  await ifct2017.loadColumnDescriptions();
  const a = ifct2017.columnDescriptions('what is butyric acid?');
  const b = ifct2017.columnDescriptions('c4:0 stands for?');
  assertEquals(a[0].code, 'f4d0');
  assertEquals(b[0].code, 'f4d0');
});
//#endregion
