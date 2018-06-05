# @ifct2017/carbohydrates

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Conversion of carbohydrate weights to monosaccharide equivalents in [Indian Food Composition Tables 2017].<br>
Check available [carbohydrate conversion factors].

```javascript
const carbohydrates = require('@ifct2017/carbohydrates');
// carbohydrates(<query>)
// -> [{sno, carbohydrate, hydrolysis, monosaccharide}] for matches
// carbohydrates.corpus: Map {sno => {sno, carbohydrate, hydrolysis, monosaccharide}}
// carbohydrates.load(): true (corpus loaded)
// carbohydrates.sql([table], [options]): sql commands
// carbohydrates.csv(): path to csv file


carbohydrates.load();
/* load corpus first */

carbohydrates('monosaccharide');
carbohydrates('Glucose');
// [ { sno: '1',
//     carbohydrate: 'Monosaccharides e.g. glucose',
//     hydrolysis: 100,
//     monosaccharide: 1 } ]

carbohydrates('what is carbohydrate conversion factor of disaccharides?');
carbohydrates('maltose conversion factor');
// [ { sno: '2',
//     carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
//     hydrolysis: 105,
//     monosaccharide: 1.05 } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[carbohydrate conversion factors]: https://github.com/ifct2017/carbohydrates/blob/master/index.csv
