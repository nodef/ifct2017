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

intakes('what is soluble oxalate?');
intakes('are organic acids useful?');
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Recommended daily intakes]: https://github.com/ifct2017/intakes/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
