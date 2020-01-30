[Hierarchy] of columns in [Indian Food Composition Tables 2017].

```javascript
const hierarchy = require('@ifct2017/hierarchy');
// hierarchy.corpus: Map {column_code => {parents, ancestry, children}}
// hierarchy.load(): true (corpus loaded)
// hierarchy.sql([table], [options]): sql commands
// hierarchy.csv(): path to csv file
// hierarchy(<query>)
// -> {parents, ancestry, children} if matched, null otherwise


hierarchy.load();
/* load corpus first */

hierarchy('soluble oxalic acid');
hierarchy('Soluble Oxalic Acid');
// { parents: 'oxalt', ancestry: 'oxalt orgac', children: '' }

hierarchy('what is hierarchy of total saturated fat?');
hierarchy('who are children of total saturated fat?');
// { parents: 'fatce',
//   ancestry: 'fatce',
//   children:
//    'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0' }
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Hierarchy]: https://github.com/ifct2017/hierarchy/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/174DDCwdVRZ0RQT8zfGFSciQltA2sIHIIRXkWiejU_JQ/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vR1C-FJ2driNzJ_rRVmftv_wYPo4Rz4SJKGEo-pFNccvbF3nsAFj2zmbiGHDGlX4YnozoqMydg0xBwZ/pubhtml
