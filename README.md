Metabolizable [energy conversion factors] in [Indian Food Composition Tables 2017].

```javascript
const energies = require('@ifct2017/energies');
// energies.corpus: Map {component => {component, kj, kcal}}
// energies.load(): true (corpus loaded)
// energies.sql([table], [options]): sql commands
// energies.csv(): path to csv file
// energies(<query>)
// -> [{component, kj, kcal}] for matched components


energies.load();
/* load corpus first */

energies('dietary fibre');
energies('Soluble fibre');
// [ { component: 'Fibre', kj: 8, kcal: 2 } ]

energies('what is energy conversion factor of fat?');
energies('conversion factor of fat');
// [ { component: 'Fat', kj: 37, kcal: 9 } ]
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[energy conversion factors]: https://github.com/ifct2017/energies/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1Go_O1rv7gwDw9GFx5S9-eBOOEueyrSnqf2KmQmB5ZEw/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRbNMeTawz-rXs53C9NTcMkJVnLCzJ79kxbOahFhq49Q7qDFMApQ5fcFvUoTGs6nDyHshtwcIzXMLiM/pubhtml
