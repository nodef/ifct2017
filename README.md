[Contents] in the original book.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const contents = require('@ifct2017/contents');
// contents(query)
// → matches [{sno, title, pagenos}]


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

```javascript
// Additional methods:
contents.load() // → corpus
contents.sql([table], [options]) // → sql statements
contents.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Contents]: https://github.com/ifct2017/contents/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
