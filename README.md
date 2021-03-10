Number of primary [sampling units] in each State/UT.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const samplingUnits = require('@ifct2017/samplingunits');
// samplingUnits(query)
// → matches [{sno, state, districts, selected}]


samplingUnits('andaman');
samplingUnits('Nicobar');
// [ { sno: 'A',
//     state: 'Andaman & Nicobar',
//     districts: 3,
//     selected: 1 } ]

samplingUnits('sampling units in orissa?');
samplingUnits('orissa\'s sampling units');
// [ { sno: '20', state: 'Orissa', districts: 30, selected: 4 } ]
```

```javascript
// Additional methods:
samplingUnits.load() // → corpus
samplingUnits.sql([table], [options]) // → sql staments
samplingUnits.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[sampling units]: https://github.com/ifct2017/samplingunits/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1Wm6eqy0TRwUItBHrU-OU4jVBRuYm162y2viZlP8JyuM/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTL7Qe0f_MEe_6JtxiiROTb-mVewlGjrYlj2u3jPaRkz7mOgUjwOpsrTIPYUSAaKXD781_dCewAIiE9/pubhtml
