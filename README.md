[Columns] in [Indian Food Composition Tables 2017].

```javascript
const columns = require('@ifct2017/columns');
// columns.corpus: Map {code => {code, name, tops, tags}}
// columns.load(): true (corpus loaded)
// columns.sql([table], [options]): sql commands
// columns.csv(): path to csv file
// columns(<query>)
// -> [{code, name, tops, tags}] for matched columns


columns.load();
/* load corpus first */

columns('vitamin c');
columns('c-vitamin');
// [ { code: 'vitc',
//     name: 'Total Ascorbic acid',
//     tops: 'vit',
//     tags: 'ascorbate water soluble vitamin c vitamin c essential' } ]

columns('what is butyric acid?');
columns('c4:0 stands for?');
// [ { code: 'f4d0',
//     name: 'Butyric acid (C4:0)',
//     tops: 'fasat',
//     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Columns]: https://github.com/ifct2017/columns/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
