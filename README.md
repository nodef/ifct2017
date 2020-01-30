Regional [compositing centres] and sample size of each region in [Indian Food Composition Tables 2017].

```javascript
const compositingCentres = require('@ifct2017/compositingcentres');
// compositingCentres.corpus: Map {region => {region, centre, samples}}
// compositingCentres.load(): true (corpus loaded)
// compositingCentres.sql([table], [options]): sql commands
// compositingCentres.csv(): path to csv file
// compositingCentres(<query>)
// -> [{region, centre, samples}] for matched components


compositingCentres.load();
/* load corpus first */

compositingCentres('west');
compositingCentres('Mumbai');
// [ { region: 'West', centre: 'Mumbai', samples: 12 } ]

compositingCentres('what is compositing centre of north east?');
compositingCentres('North East compositing centre');
// [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[compositing centres]: https://github.com/ifct2017/compositingcentres/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1r9J5mC-Dus9YA1AMSE_8-cEsXJ-8eKm6tKZMz0m5xPw/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQQj5wg7oGpgHZSlmrysbeS7MB92bgyPPVYrM7e2JpP2dC2Csts9pVc_Dcf0iVcCbtXSaWKbvQr0Yib/pubhtml
