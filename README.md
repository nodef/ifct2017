<!-- Copyright (C) 2025 Subhajit Sahu -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- See LICENSE for full terms -->

This package provides detailed nutritional values for 528 key foods in India, based on direct measurements across six regions. Data was obtained from the book [Indian Food Composition Tables 2017], published by the [National Institute of Nutrition, Hyderabad].

▌
📦 [JSR](https://jsr.io/@nodef/ifct2017),
📰 [Docs](https://jsr.io/@nodef/ifct2017/doc),
🌐 [Website](https://ifct2017.github.io).

<br>

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";


await ifct2017.loadCompositions();
await ifct2017.loadColumns();
await ifct2017.loadIntakes();
// Load corpus first

ifct2017.compositions('pineapple');
ifct2017.compositions('ananas comosus');
// → [ { code: 'E053',
// →     name: 'Pineapple',
// →     scie: 'Ananas comosus',
// →     lang: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.',
// →     ... } ]

ifct2017.columns('vitamin c');
ifct2017.columns('c-vitamin');
// → [ { code: 'vitc',
// →     name: 'Total Ascorbic acid',
// →     tags: 'ascorbate water soluble vitamin c vitamin c essential' } ]

ifct2017.pictures.unpkg('A001');
// → https://unpkg.com/@ifct2017/pictures/assets/A001.jpeg

ifct2017.intakes('his');
ifct2017.intakes('Histidine');
// → [ { code: 'his',
// →     whorda: -0.01,
// →     usear: NaN,
// →     usrdam: -0.014,
// →     usrdaf: NaN,
// →     euprim: NaN,
// →     euprif: NaN,
// →     ulus: NaN,
// →     uleu: NaN,
// →     uljapan: NaN } ]
// Negative value indicates amount per kg of body weight.
```

<br>
<br>


### Reference

| Method                  | Action
|-------------------------|-------
| [compositions]          | Detailed nutrient composition of 528 key foods in India.
| [columns]               | Codes and names of nutrients, and its components.
| [pictures]              | Single representative photo of each foods (JPEG, 307x173).
| [yieldFactors]          | Yield factors for conversion of raw to edible portion.
| [intakes]               | Recommended daily intakes of nutrients.
| [hierarchy]             | Tree-like hierarchy of nutrients, and its components.
| [representations]       | Representations of columns (as factors and units).
| [codes]                 | Uniquely identifiable codes for each food.
| [groups]                | Categorization of food by their common names.
| [descriptions]          | Names of each food in local languages, including scientific name.
| [abbreviations]         | Full forms of abbreviations used in the original book.
| [languages]             | Full form of language abbreviations.
| [methods]               | Analytical methods of nutrient and bioactive components.
| [energies]              | Metabolizable energy conversion factors.
| [nutrients]             | Detailed description of various nutrients, and its components.
| [jonesFactors]          | Jones factors for conversion of nitrogen to protein.
| [carbohydrates]         | Conversion of carbohydrate weights to monosaccharide equivalents.
| [regions]               | Categorization of the States/UTs into six different regions.
| [samplingUnits]         | Number of primary sampling units in each State/UT.
| [compositingCentres]    | Regional compositing centres and sample size of each region.
| [frequencyDistribution] | Frequency distribution of States/UTs for fixing the number of districts to be sampled.
| [about]                 | On the history of malnutrition, current status, and data details.
| [contents]              | Contents in the original book.

> NOTE: `.pictures(code) -> null` as it is not included locally.<br>
> Use `.pictures.unpkg(code)`, or `.pictures.jsDelivr(code)` instead.

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[abbreviations]: https://jsr.io/@nodef/ifct2017/doc/~/abbreviations
[about]: https://jsr.io/@nodef/ifct2017/doc/~/about
[carbohydrates]: https://jsr.io/@nodef/ifct2017/doc/~/carbohydrates
[codes]: https://jsr.io/@nodef/ifct2017/doc/~/codes
[columns]: https://jsr.io/@nodef/ifct2017/doc/~/columns
[compositingCentres]: https://jsr.io/@nodef/ifct2017/doc/~/compositingcentres
[compositions]: https://jsr.io/@nodef/ifct2017/doc/~/compositions
[contents]: https://jsr.io/@nodef/ifct2017/doc/~/contents
[descriptions]: https://jsr.io/@nodef/ifct2017/doc/~/descriptions
[energies]: https://jsr.io/@nodef/ifct2017/doc/~/energies
[frequencyDistribution]: https://jsr.io/@nodef/ifct2017/doc/~/frequencydistribution
[groups]: https://jsr.io/@nodef/ifct2017/doc/~/groups
[hierarchy]: https://jsr.io/@nodef/ifct2017/doc/~/hierarchy
[intakes]: https://jsr.io/@nodef/ifct2017/doc/~/intakes
[jonesFactors]: https://jsr.io/@nodef/ifct2017/doc/~/jonesfactors
[languages]: https://jsr.io/@nodef/ifct2017/doc/~/languages
[methods]: https://jsr.io/@nodef/ifct2017/doc/~/methods
[nutrients]: https://jsr.io/@nodef/ifct2017/doc/~/nutrients
[pictures]: https://jsr.io/@nodef/ifct2017/doc/~/pictures
[regions]: https://jsr.io/@nodef/ifct2017/doc/~/regions
[representations]: https://jsr.io/@nodef/ifct2017/doc/~/representations
[samplingUnits]: https://jsr.io/@nodef/ifct2017/doc/~/samplingunits
[yieldFactors]: https://jsr.io/@nodef/ifct2017/doc/~/yieldfactors

<br>
<br>


## Abbreviations

Full forms of *abbreviations* used in the original book.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadAbbreviations() → corpus
// ifct2017.abbreviationsSql([table], [options]) → SQL statements
// ifct2017.abbreviationsCsv() → Path of CSV file
// ifct2017.abbreviations(query)
// → {abbr, full} if found, null otherwise.


await ifct2017.loadAbbreviations();
// Load corpus first

ifct2017.abbreviations('GLV');
ifct2017.abbreviations('g l v');
// → { abbr: 'GLV', full: 'Green Leafy Vegetables' }

ifct2017.abbreviations('what is D.R.I.');
ifct2017.abbreviations('d. r. i. stands for?');
// → { abbr: 'DRI', full: 'Dietary reference intake' }


// Note:
// Full stops must immediately follow character, if present.
// For single character abbreviations, full stop is mandatory.
```

[abbreviations-csv]: https://github.com/ifct2017/abbreviations/blob/master/index.csv
[abbreviations-doc]: https://docs.google.com/spreadsheets/d/1ZTzOOj827HhsUWhdISh1lOJsOh-dvh3ORbAPs9XHI1Q/edit?usp=sharing
[abbreviations-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSPLlUvSc4OuO8cHl7kBntXJvolVWxklwZrbyNX0YfOaMMQpAi6iwf47If6wE1UyCTiBHUcx-UwLdb9/pubhtml

<br>
<br>


## About

On the history of malnutrition, current status, and data details.

> Supported *topics* include: 1937, 1951, 1963, 1971, 1989, 2017, challenge,
> column, credit, data, father, form, funder, group, interest, learn, limitation,
> publisher, source, supporter, use, user, what, when, why.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadAbout() → corpus
// ifct2017.about(query)
// → text if matched, null otherwise


await ifct2017.loadAbout();
// Load corpus first

ifct2017.about('who is you publisher');
ifct2017.about('which organization issued you');
// → Indian Food Composition Tables 2017 was published by:
// → T. Longvah, R. Ananthan, K. Bhaskarachary and K. Venkaiah
// → National Institute of Nutrition
// → Indian Council of Medical Research
// → Department of Health Research
// → Ministry of Health and Family Welfare, Government of India
// → Jamai Osmania (PO), Hyderabad – 500 007
// → Telangana, India
// → Phone: +91 40 27197334, Fax: +91 40 27000339, Email: nin@ap.nic.in

ifct2017.about('can i know the food groups');
ifct2017.about('i want to know what types of food are there');
// → There are 20 food groups:
// → - A: Cereals and Millets. 24 foods.
// → - B: Grain Legumes. 25 foods.
// → - C: Green Leafy Vegetables. 34 foods.
// → - D: Other Vegetables. 78 foods.
// → - E: Fruits. 68 foods.
// → - F: Roots and Tubers. 19 foods.
// → - G: Condiments and Spices. 33 foods.
// → - H: Nuts and Oil Seeds. 21 foods.
// → - I: Sugars. 2 foods.
// → - J: Mushrooms. 4 foods.
// → - K: Miscellaneous Foods. 2 foods.
// → - L: Milk and Milk Products. 4 foods.
// → - M: Egg and Egg Products. 15 foods.
// → - N: Poultry. 19 foods.
// → - O: Animal Meat. 63 foods.
// → - P: Marine Fish. 92 foods.
// → - Q; Marine Shellfish. 8 foods.
// → - R: Marine Mollusks. 7 foods.
// → - S: Fresh Water Fish and Shellfish. 10 foods.
// → - T: Edible Oils and Fats. 9 foods.

ifct2017.about('what happened in 1951');
ifct2017.about('what was the situation in nineteen fifty');
// → Between 1938 and 1951, there was a notable transition in the Indian nutrition
// → scenario. Among tropical regions, India contributed substantially in the field
// → of nutrition (Nicholls, 1945). The incidence of pellagra was noticed and the
// → role of niacin in its cure was successfully demonstrated in India (Raman, 1940;
// → Aykroyd & Swaminathan, 1940). The agricultural practices in India also underwent
// → modifications with concomitant increase in the crop yields. However, the basic
// → diet of individuals remained inadequate, devoid of animal fats and proteins,
// → due to poor economic conditions (Day, 1944). The translation of nutrition research
// → into sustained public health was hindered by obstacles of weak economy, ignorance
// → and poverty (Aykroyd, 1941). Other deficiency diseases such as maternal anaemia,
// → infant beriberi and osteomalacia continued to be rampant. Sustained nutritional
// → issues prompted the revision of Indian FCT resulting in the publication of fourth
// → edition of the Health Bulletin No. 23 by Aykroyd, Patwardhan, and Ranganathan (1951).


// Note:
// Can convert textual number to number.
// 1950-1959 is considered for 1951 event.
```

<br>
<br>


## Carbohydrates

Conversion of carbohydrate weights to monosaccharide equivalents.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadCarbohydrates() → corpus
// ifct2017.carbohydratesSql([table], [options]) → SQL statements
// ifct2017.carbohydratesCsv() → path of CSV file
// ifct2017.carbohydrates(query)
// → matches [{sno, carbohydrate, hydrolysis, monosaccharide}]


await ifct2017.loadCarbohydrates();
// Load corpus first

ifct2017.carbohydrates('monosaccharide');
ifct2017.carbohydrates('Glucose');
// → [ { sno: '1',
// →     carbohydrate: 'Monosaccharides e.g. glucose',
// →     hydrolysis: 100,
// →     monosaccharide: 1 } ]

ifct2017.carbohydrates('what is carbohydrate conversion factor of disaccharides?');
ifct2017.carbohydrates('maltose conversion factor');
// → [ { sno: '2',
// →     carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
// →     hydrolysis: 105,
// →     monosaccharide: 1.05 } ]
```

[carbohydrates-doc]: https://docs.google.com/spreadsheets/d/1YoEVoQFR0co_bTHL3Xok1dQfuqxXZa7yQrlUKbYVve4/edit?usp=sharing
[carbohydrates-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4Ogyx4J5JWX3HQnHhoGt9HsmqNIZ5MFvDvHa2gkYSZg6vxtWeqPrzkyvh1_bmaXDgrsElNgAu1YKk/pubhtml

<br>
<br>


## Codes

Uniquely identifiable *codes* for each food.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadCodes() → corpus
// ifct2017.codesSql([table], [options]) → SQL statements
// ifct2017.codesCsv() → path of CSV file
// ifct2017.codes(query)
// → matches [{name, code}]


await ifct2017.loadCodes();
// Load corpus first

ifct2017.codes('mango green');
ifct2017.codes('Raw mango');
// → [ { name: 'Mango, green, raw (Common)', code: 'D057' } ]

ifct2017.codes('what is food code of atta?');
ifct2017.codes('atta code');
// → [ { name: 'Atta (H., P.)', code: 'A019' },
// →   { name: 'Gahama atta (O.)', code: 'A019' },
// →   { name: 'Wheat flour, atta (Common)', code: 'A019' } ]
```

[codes-doc]: https://docs.google.com/spreadsheets/d/1Q-M1C3DAEhoA6y7X89M3Fl_zml__v0Mr-fJAYBJkLJc/edit?usp=sharing
[codes-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSZD-_xy9EvbEM2axafTL251gWsCPUYRZA8wAUvscy0MZmHS9bCOpbvqJQsbf5TujlOA8FmL91bOzF8/pubhtml

<br>
<br>


## Columns

*Codes and names* of nutrients, and its components.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadColumns() → corpus
// ifct2017.columnsSql([table], [options]) → SQL statements
// ifct2017.columnsCsv() → path of CSV file
// ifct2017.columns(query)
// → matches [{code, name, tags}]


ifct2017.columns('vitamin c');
ifct2017.columns('c-vitamin');
// → [ { code: 'vitc',
// →     name: 'Ascorbic acids (C)',
// →     tags: 'total ascorbate water soluble vitamin c vitamin c essential' } ]

ifct2017.columns('what is butyric acid?');
ifct2017.columns('c4:0 stands for?');
// → [ { code: 'f4d0',
// →     name: 'Butyric acid (C4:0)',
// →     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
```

<br>
<br>


## Compositing centres

Regional *compositing centres* and sample size of each region.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadCompositingCentres() → corpus
// ifct2017.compositingCentresSql([table], [options]) → SQL statements
// ifct2017.compositingCentresCsv() → path of CSV file
// ifct2017.compositingCentres(query)
// → matches [{region, centre, samples}]


await ifct2017.loadCompositingCentres();
// Load corpus first

ifct2017.compositingCentres('west');
ifct2017.compositingCentres('Mumbai');
// → [ { region: 'West', centre: 'Mumbai', samples: 12 } ]

ifct2017.compositingCentres('what is compositing centre of north east?');
ifct2017.compositingCentres('North East compositing centre');
// → [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
```

[compositingcentres-doc]: https://docs.google.com/spreadsheets/d/1r9J5mC-Dus9YA1AMSE_8-cEsXJ-8eKm6tKZMz0m5xPw/edit?usp=sharing
[compositingcentres-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQQj5wg7oGpgHZSlmrysbeS7MB92bgyPPVYrM7e2JpP2dC2Csts9pVc_Dcf0iVcCbtXSaWKbvQr0Yib/pubhtml

<br>
<br>


## Compositions

Detailed *nutrient composition* of 528 key foods in India.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadCompositions() → corpus
// ifct2017.compositionsSql([table], [options]) → SQL statements
// ifct2017.compositionsCsv() → path of CSV file
// ifct2017.compositions(query)
// → matches [{code, name, scie, lang, grup, regn, tags, ...}]


await ifct2017.loadCompositions();
// Load corpus first

ifct2017.compositions('pineapple');
ifct2017.compositions('ananas comosus');
// → [ { code: 'E053',
// →     name: 'Pineapple',
// →     scie: 'Ananas comosus',
// →     lang: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.',
// →     ... } ]

ifct2017.compositions('tell me about cow milk.');
ifct2017.compositions('gai ka doodh details.');
// → [ { code: 'L002',
// →     name: 'Milk, Cow',
// →     scie: '',
// →     lang: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.',
// →     ... } ]
```

[compositions-doc]: https://docs.google.com/spreadsheets/d/19C2EB4PIMgyusqKOnBq4-aBQxLjCai1Zg45YcBNTzFo/edit?usp=sharing
[compositions-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRAWAh3wLrPjDfeZ2pmApbwnvJ11CxdWaPiJ4BPClyN9X1wbbCjvfyqYpBy-LoIBltsH7MKjtNATtAh/pubhtml
[compositions-tabdoc]: https://docs.google.com/spreadsheets/d/1ejgqo6uwlKRF3QLUPJJzrTkd47GtVXgHHsgG-T27uGc/edit?usp=sharing
[compositions-tabweb]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTNaOhfRaF_DxH5yh4QtW2D3iJSM4MRIKB-P_cFRlHGhEzWo5NP5ADmAzrpXH2fsjmzJEOMbmaBFMgq/pubhtml

<br>
<br>


## Contents

*Contents* in the original book.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadContents() → corpus
// ifct2017.contentsSql([table], [options]) → SQL statements
// ifct2017.contentsCsv() → path of CSV file
// ifct2017.contents(query)
// → matches [{sno, title, pagenos}]


await ifct2017.loadContents();
// Load corpus first

ifct2017.contents('table 2');
ifct2017.contents('Water soluble vitamins');
// → [ { sno: '6.2.',
// →     title: 'Table 2:  Water Soluble Vitamins',
// →     pagenos: '31' } ]

ifct2017.contents('what is page number of table 3?');
ifct2017.contents('fat soluble vitamin page number');
// → [ { sno: '6.3.',
// →     title: 'Table 3:  Fat Soluble Vitamins',
// →     pagenos: '61' } ]
```

<br>
<br>


## Descriptions

*Names* of each food in local languages, including scientific name.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadDescriptions() → corpus
// ifct2017.descriptionsSql([table], [options]) → SQL statements
// ifct2017.descriptionsCsv() → path of CSV file
// ifct2017.descriptions(query)
// → matches [{code, name, scie, desc}]


await ifct2017.loadDescriptions();
// Load corpus first

ifct2017.descriptions('pineapple');
ifct2017.descriptions('ananas comosus');
// → [ { code: 'E053',
// →     name: 'Pineapple',
// →     scie: 'Ananas comosus',
// →     grup: 'Fruits',
// →     desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.' } ]

ifct2017.descriptions('tell me about cow milk.');
ifct2017.descriptions('gai ka doodh details.');
// → [ { code: 'L002',
// →     name: 'Milk, Cow',
// →     scie: '',
// →     grup: 'Milk and Milk Products',
// →     desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.' } ]
```

[descriptions-doc]: https://docs.google.com/spreadsheets/d/1dRKW2HJyWxDJliONe_URNxM0gPBmgZKqoF5lBotxOT8/edit?usp=sharing
[descriptions-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSueRUdwru4BNvmLCK16cM8DYO3mum4c-g_8MILZvg6TsT3vaZChWOwN5cUS58GtrXMKqZHeHy0ajeG/pubhtml

<br>
<br>


## Energies

Metabolizable *energy conversion factors*.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadEnergies() → corpus
// ifct2017.energiesSql([table], [options]) → SQL statements
// ifct2017.energiesCsv() → path of CSV file
// ifct2017.energies(query)
// → matches [{component, kj, kcal}]


await ifct2017.loadEnergies();
// Load corpus first

ifct2017.energies('dietary fibre');
ifct2017.energies('Soluble fibre');
// → [ { component: 'Fibre', kj: 8, kcal: 2 } ]

ifct2017.energies('what is energy conversion factor of fat?');
ifct2017.energies('conversion factor of fat');
// → [ { component: 'Fat', kj: 37, kcal: 9 } ]
```

[energies-doc]: https://docs.google.com/spreadsheets/d/1Go_O1rv7gwDw9GFx5S9-eBOOEueyrSnqf2KmQmB5ZEw/edit?usp=sharing
[energies-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRbNMeTawz-rXs53C9NTcMkJVnLCzJ79kxbOahFhq49Q7qDFMApQ5fcFvUoTGs6nDyHshtwcIzXMLiM/pubhtml

<br>
<br>


## Frequency distribution

*Frequency distribution* of States/UTs for fixing the number of districts to be sampled.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadFrequencyDistribution() → corpus
// ifct2017.frequencyDistributionSql([table], [options]) → SQL statements
// ifct2017.frequencyDistributionCsv() → path of CSV file
// ifct2017.frequencyDistribution(districts)
// → {districts, states, selected, sampled} if found, null otherwise


await ifct2017.loadFrequencyDistribution();
// Load corpus first

ifct2017.frequencyDistribution(2);
ifct2017.frequencyDistribution(5);
// → { districts: '1-5', states: 9, selected: 1, sampled: 9 }

ifct2017.frequencyDistribution(32);
ifct2017.frequencyDistribution(37);
// → { districts: '31-40', states: 4, selected: 5, sampled: 20 }
```

<br>
<br>


## Groups

*Categorization* of food by their common names.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadGroups() → corpus
// ifct2017.groupsSql([table], [options]) → SQL statements
// ifct2017.groupsCsv() → path of CSV file
// ifct2017.groups(query)
// → matches [{code, group, entries, tags}]


await ifct2017.loadGroups();
// Load corpus first

ifct2017.groups('cereals');
ifct2017.groups('Millet');
// → [ { code: 'A',
// →     group: 'Cereals and Millets',
// →     entries: 24,
// →     tags: 'vegetarian eggetarian fishetarian veg' } ]

ifct2017.groups('what is vegetable?');
ifct2017.groups('vegetable group code?');
// → [ { code: 'D',
// →     group: 'Other Vegetables',
// →     entries: 78,
// →     tags: 'vegetarian eggetarian fishetarian veg' },
// →   { code: 'C',
// →     group: 'Green Leafy Vegetables',
// →     entries: 34,
// →     tags: 'vegetarian eggetarian fishetarian veg' } ]
```

[groups-doc]: https://docs.google.com/spreadsheets/d/1PMR0TZLLYsS70lcC0Bap4oNrI1azgmuGx9ekfHJB_0Q/edit?usp=sharing
[groups-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSsXdKiSvWypa6aJlCfl_eKIzAOfESO_wHITJtPik3K1goIy81hciSjmTCqFjmFv1cqrLdnYhg1Q3O1/pubhtml

<br>
<br>


## Hierarchy

Tree-like *hierarchy* of nutrients, and its components.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadHierarchy() → corpus
// ifct2017.hierarchySql([table], [options]) → SQL statements
// ifct2017.hierarchyCsv() → path of CSV file
// ifct2017.hierarchy(query)
// → {parents, ancestry, children} if found, null otherwise


await ifct2017.loadHierarchy();
// Load corpus first

ifct2017.hierarchy('soluble oxalic acid');
ifct2017.hierarchy('Soluble Oxalic Acid');
// → { parents: 'oxalt', ancestry: 'oxalt orgac', children: '' }

ifct2017.hierarchy('what is ifct2017.hierarchy of total saturated fat?');
ifct2017.hierarchy('who are children of total saturated fat?');
// → { parents: 'fatce',
// →   ancestry: 'fatce',
// →   children:
// →    'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0' }
```

[hierarchy-doc]: https://docs.google.com/spreadsheets/d/174DDCwdVRZ0RQT8zfGFSciQltA2sIHIIRXkWiejU_JQ/edit?usp=sharing
[hierarchy-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vR1C-FJ2driNzJ_rRVmftv_wYPo4Rz4SJKGEo-pFNccvbF3nsAFj2zmbiGHDGlX4YnozoqMydg0xBwZ/pubhtml

<br>
<br>


## Intakes

*Recommended daily intakes* of nutrients.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadIntakes() → corpus
// ifct2017.intakesSql([table], [options]) → SQL statements
// ifct2017.intakesCsv() → path of CSV file
// ifct2017.intakes(query)
// → matches [{code, whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}]


await ifct2017.loadIntakes();
// Load corpus first

ifct2017.intakes('his');
ifct2017.intakes('Histidine');
// → [{ code: 'his',
// →    whorda: -0.01,
// →    usear: NaN,
// →    usrdam: -0.014,
// →    usrdaf: NaN,
// →    euprim: NaN,
// →    euprif: NaN,
// →    ulus: NaN,
// →    uleu: NaN,
// →    uljapan: NaN }]

ifct2017.intakes('intake of total fibre?');
ifct2017.intakes('what is rda of total fiber?');
// → [{ code: 'fibtg',
// →    whorda: NaN,
// →    usear: NaN,
// →    usrdam: 38,
// →    usrdaf: 25,
// →    euprim: NaN,
// →    euprif: NaN,
// →    ulus: NaN,
// →    uleu: NaN,
// →    uljapan: NaN }]


// Note:
// +ve value indicates amount in grams.
// -ve value indicates amount in grams per kg of body weight.
// NaN indicates no recommentation given.

// Note:
// whorda: WHO Recommended Dietary Allowance
// usear:  US Estimated Average Requirement
// usrdam: US Recommended Dietary Allowance (Male)
// usrdaf: US Recommended Dietary Allowance (Female)
// euprim: EU Population Reference Intake (Male)
// euprif: EU Population Reference Intake (Female)
// ulus: Tolerable intake Upper Level (US)
// uleu: Tolerable intake Upper Level (EU)
// uljapan: Tolerable intake Upper Level (Japan)
```

[intakes-doc]: https://docs.google.com/spreadsheets/d/14rD34GjeJ6jx9-RXLa7zu4m_896CojCP4qSTPKeWLEU/edit?usp=sharing
[intakes-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShOB5MaBlnccsBXPGT1KbG3442fF7ZPChdJCm7Ez3C9ejVF6503gMY28dOOdBJRDpCLL9o0BfJO8Nj/pubhtml

<br>
<br>


## Jones factors

*Jones factors* for conversion of nitrogen to protein.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadJonesFactors() → corpus
// ifct2017.jonesFactorsSql([table], [options]) → SQL statements
// ifct2017.jonesFactorsCsv() → path of CSV file
// ifct2017.jonesFactors(query)
// → matches [{food, factor}]


await ifct2017.loadJonesFactors();
// Load corpus first

ifct2017.jonesFactors('maida');
ifct2017.jonesFactors('Refined wheat');
// → [ { food: 'Refined wheat flour (Maida)', factor: '5.70' } ]

ifct2017.jonesFactors('what is jones factor of barley?');
ifct2017.jonesFactors('jones factor of oats');
// → [ { food: 'Barley and its flour;Rye and its flour;Oats',
// →     factor: '5.83' } ]
```

[jonesfactors-doc]: https://docs.google.com/spreadsheets/d/1OqV-MSaXH1ARXlyuyayyfj9NXoH1DvW5-n1oxOX4n0o/edit?usp=sharing
[jonesfactors-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSfqNhcPoEpx9TbXLhlyLFYpN-JtKM0J6YtZN7He6Ad4fNoVGcNI3ILaW7PJkgsoTg7-XJqr39HRQe1/pubhtml

<br>
<br>


## Languages

Full form of *language abbreviations*.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadLanguages() → corpus
// ifct2017.languagesSql([table], [options]) → SQL statements
// ifct2017.languagesCsv() → path of CSV file
// ifct2017.languages(query)
// → {abbr, lang} if found, null otherwise.


await ifct2017.loadLanguages();
// Load corpus first

ifct2017.languages('mal.');
ifct2017.languages('Mal');
// → { abbr: 'Mal.', lang: 'Malayalam' }

ifct2017.languages('what is s.?');
ifct2017.languages('S. stands for?');
// → { abbr: 'S.', lang: 'Sanskrit' }


// Note:
// Full stops must immediately follow character, if present.
// For single character abbreviations, full stop is mandatory.
```

[languages-doc]: https://docs.google.com/spreadsheets/d/1NrdVtCYtmxooVtdGj9UQOPR7l4HIJc9qeI7BNoytGhI/edit?usp=sharing
[languages-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDSLb2ABbFM8v7QVXqVR0QV7ha58ZJS3Kw6RmtgcwaN6GjNv_hfEZ3K-NqACpT9sIyv7oFysY6z_p/pubhtml

<br>
<br>


## Methods

*Analytical methods* of nutrient and bioactive components.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadMethods() → corpus
// ifct2017.methodsSql([table], [options]) → SQL statements
// ifct2017.methodsCsv() → path of CSV file
// ifct2017.methods(query)
// → {analyte, method, reference} if found, null otherwise


await ifct2017.loadMethods();
// Load corpus first

ifct2017.methods('soluble oxalic acid');
ifct2017.methods('Insoluble Oxalic Acid');
// → { analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
// →   method: 'Fast- HPLC',
// →   reference: 'Moreau & Savage (2009)' }

ifct2017.methods('what is analytical method of saponin?');
ifct2017.methods('how is total saponin measured?');
// → { analyte: 'Total Saponin',
// →   method: 'Colorimetry',
// →   reference: 'Dini et al. (2009)' }
```

[methods-doc]: https://docs.google.com/spreadsheets/d/11nJ7RfjgcTUz1bPmI7EWWOZSAxvwvXseG4AFqtLU3-o/edit?usp=sharing
[methods-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShqmhmDcwBNV1Qz-uAed412gfPQBHbO0--NkS7EwuEWjNI3trjMy0Widnqx8eM05B9a-PQLssOzLcj/pubhtml

<br>
<br>


<!-- ## Nutrients

Detailed description of various *nutrients*, and its components.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadNutrients() // → corpus
// ifct2017.nutrients(query)
// → nutrient description if found, null otherwise


await ifct2017.loadNutrients();
// Load corpus first

ifct2017.nutrients('his');
ifct2017.nutrients('Histidine');
// → Amino acid profile of each food is determined by three different analyses.
// → Tryptophan is determined by alkaline hydrolysis, methionine and cystine by
// → performic oxidation and the rest of the amino acids by acid hydrolysis. The
// → amino acid profile of each food is expressed as g/100 g protein.

ifct2017.nutrients('what is soluble oxalate?');
ifct2017.nutrients('are organic acids useful?');
// → Organic acids is naturally present in a wide variety of foods especially fruits,
// → berries and vegetables. Organic acids cis-aconitic acid, citric acid, fumaric
// → acid, mallic acid, quinic acid, succinic acid and tartaric acid were determined
// → in single liquid chromatographic run. Soluble, insoluble and total oxalates were
// → determined separately by HPLC method. The organic acids are energy contributing
// → components, although it varies between the different organic acids. According to
// → the Codex Alimentarius Commission’s Guidelines for Nutrition Labeling, the energy
// → conversion factor for organic acids is 13 kJ/g. However, organic acids have not
// → been included in the total energy of foods given in the IFCT.
```

<br>
<br> -->


## Pictures

Single representative *photo* of each foods (JPEG, 307x173).

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.picturesUnpkg(code) → UNPKG URL | null
// ifct2017.picturesJsDelivr(code) → jsDelivr URL | null
// ifct2017.pictures(code)
// → path is present, null otherwise


ifct2017.pictures('A001');
// C:\Documents\pictures\A001.jpeg

ifct2017.picturesUnpkg('A001');
// https://unpkg.com/@ifct2017/pictures/assets/A001.jpeg

ifct2017.picturesJsDelivr('A001');
// https://cdn.jsdelivr.net/npm/@ifct2017/pictures/assets/A001.jpeg
```

[pictures-doc]: https://docs.google.com/document/d/1UVWVh-wPOR80M2sTy5naIJvR5DUNtf7lbOaPgCNQ9t4/edit?usp=sharing
[pictures-web]: https://docs.google.com/document/d/e/2PACX-1vSyo24GtsTF0wuhKUndF6w5KZa1gZU7kDyDun-6-QZvsO-Hy7Zn2chxxyYa3gSp5kzy-4AQrfHqF0N0/pub

<br>
<br>


## Regions

Categorization of the States/UTs into six different regions.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadRegions() → corpus
// ifct2017.regionsSql([table], [options]) → SQL statements
// ifct2017.regionsCsv() → path of CSV file
// ifct2017.regions(query)
// → matches [{region, states}]


await ifct2017.loadRegions();
// Load corpus first

ifct2017.regions('central');
ifct2017.regions('Uttaranchal');
// → [ { region: 'Central',
// →     states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal' } ]

ifct2017.regions('which region andhra pradesh belongs to?');
ifct2017.regions('details of south region');
// → [ { region: 'South',
// →     states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu' } ]
```

[regions-doc]: https://docs.google.com/spreadsheets/d/1a01-O3cex87z9My2hF3ByoUMVMLZtMYKuRFGTbmcIzQ/edit?usp=sharing
[regions-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRXTC_URrQPaVbgG0tyMvJGkuaZgTjaQ9UZivesdtVBgpJXWHQldR9ps8C04HVDcZmEuKjCX2LhjUNA/pubhtml

<br>
<br>


## Representations

*Representations* of columns (as factors and units).

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadRepresentations() → corpus
// ifct2017.representationsSql([table], [options]) → sql statements
// ifct2017.representationsCsv() → path of csv file
// ifct2017.representations(query)
// → {type, factor, unit} if found, null otherwise


await ifct2017.loadRepresentations();
// Load corpus first

ifct2017.representations('his');
ifct2017.representations('Histidine');
// → { type: 'mass', factor: 1000, unit: 'mg' }

ifct2017.representations('representation of vitamin d?');
ifct2017.representations('what is unit of ergocalciferol?');
// → { type: 'mass', factor: 1000000000, unit: 'ng' }


// Note:
// type:   Type of physical quantity
// factor: Multiplication factor
// unit:   Unit symbol
```

<br>
<br>


## Sampling units

Number of primary *sampling units* in each State/UT.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadSamplingUnits() → corpus
// ifct2017.samplingUnitsSql([table], [options]) → SQL staments
// ifct2017.samplingUnitsCsv() → path of CSV file
// ifct2017.samplingUnits(query)
// → matches [{sno, state, districts, selected}]


await ifct2017.loadSamplingUnits();
// Load corpus first

ifct2017.samplingUnits('andaman');
ifct2017.samplingUnits('Nicobar');
// → [ { sno: 'A',
// →     state: 'Andaman & Nicobar',
// →     districts: 3,
// →     selected: 1 } ]

ifct2017.samplingUnits('sampling units in orissa?');
ifct2017.samplingUnits('orissa\'s sampling units');
// → [ { sno: '20', state: 'Orissa', districts: 30, selected: 4 } ]
```

[samplingunits-doc]: https://docs.google.com/spreadsheets/d/1Wm6eqy0TRwUItBHrU-OU4jVBRuYm162y2viZlP8JyuM/edit?usp=sharing
[samplingunits-web]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTL7Qe0f_MEe_6JtxiiROTb-mVewlGjrYlj2u3jPaRkz7mOgUjwOpsrTIPYUSAaKXD781_dCewAIiE9/pubhtml

<br>
<br>


## Yield Factors

*Yield factors* for conversion of raw food to edible portion.

<br>

```javascript
import * as ifct2017 from "jsr:@nodef/ifct2017";
// ifct2017.loadYieldFactors() → corpus
// ifct2017.yieldFactorsSql([table], [options]) → SQL staments
// ifct2017.yieldFactorsCsv() → path of CSV file
// ifct2017.yieldFactors(query)
// → matches [{code, name, scie, yield, preparation}]


await ifct2017.loadYieldFactors();
// Load corpus first



ifct2017.yieldFactors('mango');
ifct2017.yieldFactors('Mangifera indica');
// → [ { code: 'D057',
// →     name: 'Mango, green, raw',
// →     scie: 'Mangifera indica',
// →     lang: 'A. Keasa aam; B. Aam (kancha); G. Ambo; H. Katcha Aam; Kan. Mavinakayi; Kash. Kach Aamb; Kh. Soh pieng im; Mal. Manga; M. Heinou Ashangba; Mar. Amba; O. Ambu (kacha); P. Kaccha aam; Tam. Mangai; Tel. Mamidikaya; U. Kaccha aam.',
// →     grup: 'Other Vegetables',
// →     regn: 6,
// →     tags: 'vegetarian eggetarian fishetarian veg',
// →     yield: 0.6833333333,
// →     preparation: 'Washing, Peeling, Seed removal' } ]

ifct2017.yieldFactors('yield factor of cow milk?');
ifct2017.yieldFactors('gai ka doodh');
// → [ { code: 'L002',
// →     name: 'Milk, Cow',
// →     scie: '',
// →     lang: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.',
// →     grup: 'Milk and Milk Products',
// →     regn: 6,
// →     tags: 'vegetarian eggetarian fishetarian veg',
// →     yield: 1,
// →     preparation: 'None' } ]
```

<br>
<br>


## License

As of 18 April 2025, this project is licensed under AGPL-3.0. Previous versions remain under MIT.

<br>
<br>


[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/ifct2017)
