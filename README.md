# @ifct2017/jonesfactors

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Jones factors for conversion of nitrogen to protein in [Indian Food Composition Tables 2017].<br>
Check available [jones factors].

```javascript
const jonesFactors = require('@ifct2017/jonesfactors');
// jonesFactors(<query>)
// -> [{food, factor}] for matched foods
// jonesFactors.corpus: Map {food => {food, factor}}
// jonesFactors.sql([table], [options]): sql commands
// jonesFactors.csv(): path to csv file
 
jonesFactors('maida');
jonesFactors('Refined wheat');
// [ { food: 'Refined wheat flour (Maida)', factor: '5.70' } ]

jonesFactors('what is jones factor of barley?');
jonesFactors('jones factor of oats');
// [ { food: 'Barley and its flour;Rye and its flour;Oats',
//     factor: '5.83' },
//   { food: 'Food where specific factor is not listed',
//     factor: '6.25' } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[jones factors]: https://github.com/ifct2017/jonesfactors/blob/master/index.csv
