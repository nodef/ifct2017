[Conversion of carbohydrate weights] to monosaccharide equivalents in [Indian Food Composition Tables 2017].

```javascript
const carbohydrates = require('@ifct2017/carbohydrates');
// carbohydrates.corpus: Map {sno => {sno, carbohydrate, hydrolysis, monosaccharide}}
// carbohydrates.load(): true (corpus loaded)
// carbohydrates.sql([table], [options]): sql commands
// carbohydrates.csv(): path to csv file
// carbohydrates(<query>)
// -> [{sno, carbohydrate, hydrolysis, monosaccharide}] for matches


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


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Conversion of carbohydrate weights]: https://github.com/ifct2017/carbohydrates/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
[Document]: https://docs.google.com/spreadsheets/d/1YoEVoQFR0co_bTHL3Xok1dQfuqxXZa7yQrlUKbYVve4/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4Ogyx4J5JWX3HQnHhoGt9HsmqNIZ5MFvDvHa2gkYSZg6vxtWeqPrzkyvh1_bmaXDgrsElNgAu1YKk/pubhtml
