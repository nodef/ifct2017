# @ifct2017/groups

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Food groups in [Indian Food Composition Tables 2017].<br>
Check available [food groups].

```javascript
const groups = require('@ifct2017/groups');
// groups.corpus: Map {code => {code, group, entries, tags}}
// groups.load(): true (corpus loaded)
// groups.sql([table], [options]): sql commands
// groups.csv(): path to csv file
// groups(<query>)
// -> [{code, group, entries, tags}] for matched groups


groups.load();
/* load corpus first */

groups('cereals');
groups('Millet');
// [ { code: 'A',
//     group: 'Cereals and Millets',
//     entries: 24,
//     tags: 'vegetarian eggetarian fishetarian veg' } ]

groups('what is vegetable?');
groups('vegetable group code?');
// [ { code: 'D',
//     group: 'Other Vegetables',
//     entries: 78,
//     tags: 'vegetarian eggetarian fishetarian veg' },
//   { code: 'C',
//     group: 'Green Leafy Vegetables',
//     entries: 34,
//     tags: 'vegetarian eggetarian fishetarian veg' } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[food groups]: https://github.com/ifct2017/groups/blob/master/index.csv
