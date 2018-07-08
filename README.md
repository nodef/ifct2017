[Recommended daily intakes] of nutrients in [Indian Food Composition Tables 2017].

```javascript
const intakes = require('@ifct2017/intakes');
// intakes.corpus: Map {code => description}
// intakes.load(): true (corpus loaded)
// intakes.sql([table], [options]): sql commands
// intakes.csv(): path to csv file
// intakes(<query>)
// -> {code, who, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan} if found, null otherwise


intakes.load();
/* load corpus first */

intakes('his');
intakes('Histidine');
// { code: 'his',
//   who: -0.01,
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
// { code: 'fibtg',
//   who: null,
//   usear: null,
//   usrdam: 38,
//   usrdaf: 25,
//   euprim: null,
//   euprif: null,
//   ulus: null,
//   uleu: null,
//   uljapan: null }


// ->
// code:   Column code
// who:    WHO recommended dietary allowance
// usear:  US Estimated Average Requirement
// usrdam: US Recommended Dietary Allowance (Male)
// usrdaf: US Recommended Dietary Allowance (Female)
// euprim: EU Population Reference Intake (Male)
// euprif: EU Population Reference Intake (Female)
// ulus: Tolerable intake Upper Level (US)
// uleu: Tolerable intake Upper Level (EU)
// uljapan: Tolerable intake Upper Level (Japan)
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Recommended daily intakes]: https://github.com/ifct2017/intakes/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
