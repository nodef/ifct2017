[Analytical methods] of nutrient and bioactive components in [Indian Food Composition Tables 2017].<br>

```javascript
const methods = require('@ifct2017/methods');
// methods.corpus: Map {column_code => {analyte, method, reference}}
// methods.load(): true (corpus loaded)
// methods.sql([table], [options]): sql commands
// methods.csv(): path to csv file
// methods(<query>)
// -> {analyte, method, reference} if matched, null otherwise


methods.load();
/* load corpus first */

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


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Analytical methods]: https://github.com/ifct2017/columns/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
[Document]: https://docs.google.com/spreadsheets/d/11nJ7RfjgcTUz1bPmI7EWWOZSAxvwvXseG4AFqtLU3-o/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vShqmhmDcwBNV1Qz-uAed412gfPQBHbO0--NkS7EwuEWjNI3trjMy0Widnqx8eM05B9a-PQLssOzLcj/pubhtml
