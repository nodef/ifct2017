[Analytical methods] of nutrient and bioactive components.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const methods = require('@ifct2017/methods');
// methods(query)
// → {analyte, method, reference} if found, null otherwise


methods('soluble oxalic acid');
methods('Insoluble Oxalic Acid');
// { analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
//   method: 'Fast- HPLC',
//   reference: 'Moreau & Savage (2009)' }

methods('what is analytical method of saponin?');
methods('how is total saponin measured?');
// { analyte: 'Total Saponin',
//   method: 'Colorimetry',
//   reference: 'Dini et al. (2009)' }
```

```javascript
// Additional methods:
methods.load() // → corpus
methods.sql([table], [options]) // → sql statements
methods.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Analytical methods]: https://github.com/ifct2017/columns/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/11nJ7RfjgcTUz1bPmI7EWWOZSAxvwvXseG4AFqtLU3-o/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShqmhmDcwBNV1Qz-uAed412gfPQBHbO0--NkS7EwuEWjNI3trjMy0Widnqx8eM05B9a-PQLssOzLcj/pubhtml
