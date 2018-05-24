# @ifct2017/regions

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Categorization of the States/UTs into six different regions in [Indian Food Composition Tables 2017].<br>
Check available [regions].

```javascript
const regions = require('@ifct2017/regions');
// regions(<query>)
// -> [{region, states}] for matched regions
// regions.corpus: Map {region => {region, states}}
// regions.csv(): path to csv file
 
regions('central');
regions('Uttaranchal');
// [ { region: 'Central',
//     states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal' } ]

regions('which region andhra pradesh belongs to?');
regions('details of south region');
// [ { region: 'South',
//     states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu' } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[regions]: https://github.com/ifct2017/regions/blob/master/index.csv
