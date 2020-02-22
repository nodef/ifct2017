[Recommended daily intakes] of nutrients.
> This is part of package [ifct2017].<br>
> Source: [Indian Food Composition Tables 2017].

```javascript
const intakes = require('@ifct2017/intakes');
// intakes.corpus: Map {column_code => {whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}}
// intakes.load(): true (corpus loaded)
// intakes.sql([table], [options]): sql commands
// intakes.csv(): path to csv file
// intakes(<query>)
// -> {whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan} if found, null otherwise


intakes.load();
/* load corpus first */

intakes('his');
intakes('Histidine');
// { whorda: -0.01,
//   usear: null,
//   usrdam: -0.014,
//   usrdaf: null,
//   euprim: null,
//   euprif: null,
//   ulus: null,
//   uleu: null,
//   uljapan: null }
/* negative value indicates amount per kg of body weight */

intakes('intake of total fibre?');
intakes('what is rda of total fiber?');
// { whorda: null,
//   usear: null,
//   usrdam: 38,
//   usrdaf: 25,
//   euprim: null,
//   euprif: null,
//   ulus: null,
//   uleu: null,
//   uljapan: null }


// ->
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


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Recommended daily intakes]: https://github.com/ifct2017/intakes/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/14rD34GjeJ6jx9-RXLa7zu4m_896CojCP4qSTPKeWLEU/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShOB5MaBlnccsBXPGT1KbG3442fF7ZPChdJCm7Ez3C9ejVF6503gMY28dOOdBJRDpCLL9o0BfJO8Nj/pubhtml
