# @ifct2017/jonesfactors

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](http://ninindia.org/ifct_2017.htm)

Jones factors for conversion of nitrogen to protein in [Indian Food Composition Tables 2017].<br>
Check available [jones factors].

```javascript
const jonesFactors = require('@ifct2017/jonesfactors');
// jonesFactors(<query>)
// -> [{food, factor}] for matched foods
// jonesFactors.corpus: Map {food => {food, factor}}
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
