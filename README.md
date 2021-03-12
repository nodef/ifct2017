Uniquely identifiable [codes] for each food.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const codes = require('@ifct2017/codes');
// codes(query)
// → matches [{name, code}]


await codes.load();
/// Load corpus first

codes('mango green');
codes('Raw mango');
// [ { name: 'Mango, green, raw (Common)', code: 'D057' } ]

codes('what is food code of atta?');
codes('atta code');
// [ { name: 'Atta (H., P.)', code: 'A019' },
//   { name: 'Gahama atta (O.)', code: 'A019' },
//   { name: 'Wheat flour, atta (Common)', code: 'A019' } ]
```

```javascript
// Additional methods:
codes.load() // → corpus (promise)
codes.sql([table], [options]) // → sql statements (promise)
codes.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[codes]: https://github.com/ifct2017/codes/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1Q-M1C3DAEhoA6y7X89M3Fl_zml__v0Mr-fJAYBJkLJc/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSZD-_xy9EvbEM2axafTL251gWsCPUYRZA8wAUvscy0MZmHS9bCOpbvqJQsbf5TujlOA8FmL91bOzF8/pubhtml
