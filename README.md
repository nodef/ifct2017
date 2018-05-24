# @ifct2017/contents

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Contents of [Indian Food Composition Tables 2017].<br>
Check available [contents].

```javascript
const contents = require('@ifct2017/contents');
// contents(<query>)
// -> [{sno, title, pagenos}] for matched contents
// contents.corpus: Map {sno => {sno, title, pagenos}}
// contents.csv(): path to csv file
 
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


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[contents]: https://github.com/ifct2017/contents/blob/master/index.csv
