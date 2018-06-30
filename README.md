Number of primary [sampling units] in each State/UT in [Indian Food Composition Tables 2017].

```javascript
const samplingUnits = require('@ifct2017/samplingunits');
// samplingUnits.corpus: Map {sno => {sno, state, districts, selected}}
// samplingUnits.load(): true (corpus loaded)
// samplingUnits.sql([table], [options]): sql commands
// samplingUnits.csv(): path to csv file
// samplingUnits(<query>)
// -> [{sno, state, districts, selected}] for matched states


samplingUnits.load();
/* load corpus first */

samplingUnits('andaman');
samplingUnits('Nicobar');
// [ { sno: 'A',
//     state: 'Andaman & Nicobar',
//     districts: 3,
//     selected: 1 } ]

samplingUnits('sampling units in orissa?');
samplingUnits('orissa\'s sampling units');
// [ { sno: '20', state: 'Orissa', districts: 30, selected: 4 } ]
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[sampling units]: https://github.com/ifct2017/samplingunits/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
[Document]: https://docs.google.com/spreadsheets/d/1Wm6eqy0TRwUItBHrU-OU4jVBRuYm162y2viZlP8JyuM/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vTL7Qe0f_MEe_6JtxiiROTb-mVewlGjrYlj2u3jPaRkz7mOgUjwOpsrTIPYUSAaKXD781_dCewAIiE9/pubhtml
