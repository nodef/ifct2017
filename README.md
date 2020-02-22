[Codes and names] of nutrients, and its components.
> This is part of package [ifct2017].<br>
> Source: [Indian Food Composition Tables 2017].

```javascript
const columns = require('@ifct2017/columns');
// columns.corpus: Map {code => {code, name, tags}}
// columns.load(): true (corpus loaded)
// columns.sql([table], [options]): sql commands
// columns.csv(): path to csv file
// columns(<query>)
// -> [{code, name, tags}] for matched columns


columns.load();
/* load corpus first */

columns('vitamin c');
columns('c-vitamin');
// [ { code: 'vitc',
//     name: 'Total Ascorbic acid',
//     tags: 'ascorbate water soluble vitamin c vitamin c essential' } ]

columns('what is butyric acid?');
columns('c4:0 stands for?');
// [ { code: 'f4d0',
//     name: 'Butyric acid (C4:0)',
//     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Codes and names]: https://github.com/ifct2017/columns/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
