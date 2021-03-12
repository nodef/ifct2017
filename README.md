[Codes and names] of nutrients, and its components.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const columns = require('@ifct2017/columns');
// columns(query)
// → matches [{code, name, tags}]


columns('vitamin c');
columns('c-vitamin');
// [ { code: 'vitc',
//     name: 'Ascorbic acids (C)',
//     tags: 'total ascorbate water soluble vitamin c vitamin c essential' } ]

columns('what is butyric acid?');
columns('c4:0 stands for?');
// [ { code: 'f4d0',
//     name: 'Butyric acid (C4:0)',
//     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
```

```javascript
// Additional methods:
columns.load() // → corpus
columns.sql([table], [options]) // → sql statements
columns.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Codes and names]: https://github.com/ifct2017/columns/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
