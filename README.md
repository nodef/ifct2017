Metabolizable [energy conversion factors].<br>
📦 [Node.js](https://www.npmjs.com/package/@ifct2017/energies),
📜 [Files](https://unpkg.com/@ifct2017/energies/).

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const energies = require('@ifct2017/energies');
// energies(query)
// → matches [{component, kj, kcal}]


energies('dietary fibre');
energies('Soluble fibre');
// [ { component: 'Fibre', kj: 8, kcal: 2 } ]

energies('what is energy conversion factor of fat?');
energies('conversion factor of fat');
// [ { component: 'Fat', kj: 37, kcal: 9 } ]
```

```javascript
// Additional methods:
energies.load() // → corpus
energies.sql([table], [options]) // → sql statements
energies.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)<br>
[![ORG](https://img.shields.io/badge/org-ifct2017-green?logo=Org)](https://ifct2017.github.io)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[energy conversion factors]: https://github.com/ifct2017/energies/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1Go_O1rv7gwDw9GFx5S9-eBOOEueyrSnqf2KmQmB5ZEw/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vRbNMeTawz-rXs53C9NTcMkJVnLCzJ79kxbOahFhq49Q7qDFMApQ5fcFvUoTGs6nDyHshtwcIzXMLiM/pubhtml
