[Jones factors] for conversion of nitrogen to protein in [Indian Food Composition Tables 2017].

```javascript
const jonesFactors = require('@ifct2017/jonesfactors');
// jonesFactors.corpus: Map {food => {food, factor}}
// jonesFactors.load(): true (corpus loaded)
// jonesFactors.sql([table], [options]): sql commands
// jonesFactors.csv(): path to csv file
// jonesFactors(<query>)
// -> [{food, factor}] for matched foods


jonesFactors.load();
/* load corpus first */

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


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Jones factors]: https://github.com/ifct2017/jonesfactors/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
[Document]: https://docs.google.com/spreadsheets/d/1OqV-MSaXH1ARXlyuyayyfj9NXoH1DvW5-n1oxOX4n0o/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSfqNhcPoEpx9TbXLhlyLFYpN-JtKM0J6YtZN7He6Ad4fNoVGcNI3ILaW7PJkgsoTg7-XJqr39HRQe1/pubhtml
