[Recommended daily intakes] of nutrients.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const intakes = require('@ifct2017/intakes');
// intakes(query)
// → matches [{code, whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}]


intakes('his');
intakes('Histidine');
// [{ code: 'his',
//    whorda: -0.01,
//    usear: NaN,
//    usrdam: -0.014,
//    usrdaf: NaN,
//    euprim: NaN,
//    euprif: NaN,
//    ulus: NaN,
//    uleu: NaN,
//    uljapan: NaN }]

intakes('intake of total fibre?');
intakes('what is rda of total fiber?');
// [{ code: 'fibtg',
//    whorda: NaN,
//    usear: NaN,
//    usrdam: 38,
//    usrdaf: 25,
//    euprim: NaN,
//    euprif: NaN,
//    ulus: NaN,
//    uleu: NaN,
//    uljapan: NaN }]


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

```javascript
// Additional methods:
intakes.load() // → corpus
intakes.sql([table], [options]) // → sql statements
intakes.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Recommended daily intakes]: https://github.com/ifct2017/intakes/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/14rD34GjeJ6jx9-RXLa7zu4m_896CojCP4qSTPKeWLEU/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShOB5MaBlnccsBXPGT1KbG3442fF7ZPChdJCm7Ez3C9ejVF6503gMY28dOOdBJRDpCLL9o0BfJO8Nj/pubhtml
