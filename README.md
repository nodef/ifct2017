[Representations] of columns (as factors and units).
> This is part of package [ifct2017].<br>
> Source: [Indian Food Composition Tables 2017].

```javascript
const representations = require('@ifct2017/representations');
// representations.corpus: Map {column_code => {type, factor, unit}}
// representations.load(): true (corpus loaded)
// representations.sql([table], [options]): sql commands
// representations.csv(): path to csv file
// representations(<query>)
// -> {type, factor, unit} if found, null otherwise


representations.load();
/* load corpus first */

representations('his');
representations('Histidine');
// { type: 'mass', factor: 1, unit: 'g' }

representations('representation of vitamin d?');
representations('what is unit of cholecalciferol?');
// { type: 'mass', factor: 1000000, unit: 'ug' }


// ->
// type:   Type of physical quantity
// factor: Multiplication factor for representation
// unit:   Unit for representation
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Representations]: https://github.com/ifct2017/representations/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
