Regional [compositing centres] and sample size of each region.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const compositingCentres = require('@ifct2017/compositingcentres');
// compositingCentres(query)
// → matches [{region, centre, samples}]


compositingCentres('west');
compositingCentres('Mumbai');
// [ { region: 'West', centre: 'Mumbai', samples: 12 } ]

compositingCentres('what is compositing centre of north east?');
compositingCentres('North East compositing centre');
// [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
```

```javascript
// Additional methods:
compositingCentres.load() // → corpus
compositingCentres.sql([table], [options]) // → sql statements
compositingCentres.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[compositing centres]: https://github.com/ifct2017/compositingcentres/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1r9J5mC-Dus9YA1AMSE_8-cEsXJ-8eKm6tKZMz0m5xPw/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vQQj5wg7oGpgHZSlmrysbeS7MB92bgyPPVYrM7e2JpP2dC2Csts9pVc_Dcf0iVcCbtXSaWKbvQr0Yib/pubhtml
