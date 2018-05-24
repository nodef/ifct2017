# @ifct2017/energies

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Metabolizeable energy conversion factors in [Indian Food Composition Tables 2017].<br>
Check available [energy conversion factors].

```javascript
const energies = require('@ifct2017/energies');
// energies(<query>)
// -> [{component, kj, kcal}] for matched components
// energies.corpus: Map {component => {component, kj, kcal}}
// energies.sql([table], [options]): sql commands
// energies.csv(): path to csv file
 
energies('dietary fibre');
energies('Soluble fibre');
// [ { component: 'Fibre', kj: 8, kcal: 2 } ]

energies('what is energy conversion factor of fat?');
energies('conversion factor of fat');
// [ { component: 'Fat', kj: 37, kcal: 9 } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[energy conversion factors]: https://github.com/ifct2017/energies/blob/master/index.csv
