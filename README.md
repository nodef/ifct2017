[Conversion of carbohydrate weights] to monosaccharide equivalents.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const carbohydrates = require('@ifct2017/carbohydrates');
// carbohydrates(query)
// → matches [{sno, carbohydrate, hydrolysis, monosaccharide}]


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

```javascript
// Additional methods:
carbohydrates.load() // → corpus
carbohydrates.sql([table], [options]) // → sql statements
carbohydrates.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Conversion of carbohydrate weights]: https://github.com/ifct2017/carbohydrates/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1YoEVoQFR0co_bTHL3Xok1dQfuqxXZa7yQrlUKbYVve4/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4Ogyx4J5JWX3HQnHhoGt9HsmqNIZ5MFvDvHa2gkYSZg6vxtWeqPrzkyvh1_bmaXDgrsElNgAu1YKk/pubhtml
