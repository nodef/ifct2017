# @ifct2017/samplingunits

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Number of primary sampling units (districts) in each State/UT in [Indian Food Composition Tables 2017].<br>
Check data for [sampling units].

```javascript
const samplingUnits = require('@ifct2017/samplingunits');
// samplingUnits(<query>)
// -> [{sno, state, districts, selected}] for matched states
// samplingUnits.corpus: Map {sno => {sno, state, districts, selected}}
// samplingUnits.csv(): path to csv file
 
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


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[sampling units]: https://github.com/ifct2017/samplingunits/blob/master/index.csv
