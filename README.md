# @ifct2017/methods

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Analytical methods of nutrient and bioactive components in [Indian Food Composition Tables 2017].<br>
Check specified [methods].

```javascript
const methods = require('@ifct2017/methods');
// methods(<query>)
// -> {analyte, method, reference} if matched, null otherwise
// methods.corpus: Map {column_code => {analyte, method, reference}}
// methods.sql([table], [options]): sql commands
// methods.csv(): path to csv file

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


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[methods]: https://github.com/ifct2017/columns/blob/master/index.csv
