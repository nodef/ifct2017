# @ifct2017/codes

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Food codes from food name in [Indian Food Composition Tables 2017].<br>
Check available [food codes].
> Large corpus is not loaded synchronously.<br>
> Load it asynchronously with **.load()**.

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


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[food codes]: https://github.com/ifct2017/codes/blob/master/index.csv
