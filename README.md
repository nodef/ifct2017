# @ifct2017/compositingcentres

[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)

Regional compositing centres and sample size of each region in [Indian Food Composition Tables 2017].<br>
Check available [compositing centres].

```javascript
const compositingCentres = require('@ifct2017/compositingcentres');
// compositingCentres(<query>)
// -> [{region, centre, samples}] for matched components
// compositingCentres.corpus: Map {region => {region, centre, samples}}
// compositingCentres.sql([table], [options]): sql commands
// compositingCentres.csv(): path to csv file
 
compositingCentres('west');
compositingCentres('Mumbai');
// [ { region: 'West', centre: 'Mumbai', samples: 12 } ]

compositingCentres('what is compositing centre of north east?');
compositingCentres('North East compositing centre');
// [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[compositing centres]: https://github.com/ifct2017/compositingcentres/blob/master/index.csv
