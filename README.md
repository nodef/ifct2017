[Representations] of columns (as factors and units).

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const representations = require('@ifct2017/representations');
// representations(query)
// → {type, factor, unit} if found, null otherwise


representations('his');
representations('Histidine');
// { type: 'mass', factor: 1000, unit: 'mg' }

representations('representation of vitamin d?');
representations('what is unit of ergocalciferol?');
// { type: 'mass', factor: 1000000000, unit: 'ng' }


// Note:
// type:   Type of physical quantity
// factor: Multiplication factor
// unit:   Unit symbol
```

```javascript
// Additional methods:
representations.load() // → corpus
representations.sql([table], [options]) // → sql statements
representations.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Representations]: https://github.com/ifct2017/representations/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
