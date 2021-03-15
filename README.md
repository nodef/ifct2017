Tree-like [hierarchy] of nutrients, and its components.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const hierarchy = require('@ifct2017/hierarchy');
// hierarchy(query)
// → {parents, ancestry, children} if found, null otherwise


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

```javascript
hierarchy.load() // → corpus
hierarchy.sql([table], [options]) // → sql statements
hierarchy.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[hierarchy]: https://github.com/ifct2017/hierarchy/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/174DDCwdVRZ0RQT8zfGFSciQltA2sIHIIRXkWiejU_JQ/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vR1C-FJ2driNzJ_rRVmftv_wYPo4Rz4SJKGEo-pFNccvbF3nsAFj2zmbiGHDGlX4YnozoqMydg0xBwZ/pubhtml
