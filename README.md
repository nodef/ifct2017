Categorization of the States/UTs into six different [regions].
> This is part of package [ifct2017].<br>
> Source: [Indian Food Composition Tables 2017].


```javascript
const regions = require('@ifct2017/regions');
// regions.corpus: Map {region => {region, states}}
// regions.load(): true (corpus loaded)
// regions.sql([table], [options]): sql commands
// regions.csv(): path to csv file
// regions(<query>)
// -> [{region, states}] for matched regions


regions.load();
/* load corpus first */

regions('central');
regions('Uttaranchal');
// [ { region: 'Central',
//     states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal' } ]

regions('which region andhra pradesh belongs to?');
regions('details of south region');
// [ { region: 'South',
//     states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu' } ]
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[regions]: https://github.com/ifct2017/regions/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1a01-O3cex87z9My2hF3ByoUMVMLZtMYKuRFGTbmcIzQ/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRXTC_URrQPaVbgG0tyMvJGkuaZgTjaQ9UZivesdtVBgpJXWHQldR9ps8C04HVDcZmEuKjCX2LhjUNA/pubhtml
