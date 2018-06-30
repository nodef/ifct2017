[Food codes] from food name in [Indian Food Composition Tables 2017].<br>

```javascript
const codes = require('@ifct2017/codes');
// codes.corpus: Map {name => {name, code}}
// codes.load(): Promise (corpus loaded)
// codes.sql([table], [options]): Promise (sql commands)
// codes.csv(): path to csv file
// codes(<query>)
// -> [{name, code}] for matched food names


await codes.load();
/* load corpus first */

codes('mango green');
codes('Raw mango');
// [ { name: 'Mango, green, raw (Common)', code: 'D057' } ]

codes('what is food code of atta?');
codes('atta code');
// [ { name: 'Atta (H., P.)', code: 'A019' },
//   { name: 'Gahama atta (O.)', code: 'A019' },
//   { name: 'Wheat flour, atta (Common)', code: 'A019' } ]
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Food codes]: https://github.com/ifct2017/codes/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
[Document]: https://docs.google.com/spreadsheets/d/1Q-M1C3DAEhoA6y7X89M3Fl_zml__v0Mr-fJAYBJkLJc/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSZD-_xy9EvbEM2axafTL251gWsCPUYRZA8wAUvscy0MZmHS9bCOpbvqJQsbf5TujlOA8FmL91bOzF8/pubhtml
