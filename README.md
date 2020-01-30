[Contents] of [Indian Food Composition Tables 2017].

```javascript
const contents = require('@ifct2017/contents');
// contents.corpus: Map {sno => {sno, title, pagenos}}
// contents.load(): true (corpus loaded)
// contents.sql([table], [options]): sql commands
// contents.csv(): path to csv file
// contents(<query>)
// -> [{sno, title, pagenos}] for matched contents


contents.load();
/* load corpus first */

contents('table 2');
contents('Water soluble vitamins');
// [ { sno: '6.2.',
//     title: 'Table 2:  Water Soluble Vitamins',
//     pagenos: '31' } ]

contents('what is page number of table 3?');
contents('fat soluble vitamin page number');
// [ { sno: '6.3.',
//     title: 'Table 3:  Fat Soluble Vitamins',
//     pagenos: '61' } ]
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Contents]: https://github.com/ifct2017/contents/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
