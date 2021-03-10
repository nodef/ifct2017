[Jones factors] for conversion of nitrogen to protein.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const jonesFactors = require('@ifct2017/jonesfactors');
// jonesFactors(query)
// → matches [{food, factor}]


jonesFactors('maida');
jonesFactors('Refined wheat');
// [ { food: 'Refined wheat flour (Maida)', factor: '5.70' } ]

jonesFactors('what is jones factor of barley?');
jonesFactors('jones factor of oats');
// [ { food: 'Barley and its flour;Rye and its flour;Oats',
//     factor: '5.83' } ]
```

```javascript
// Additional methods:
jonesFactors.load() // → corpus
jonesFactors.sql([table], [options]) // → sql statements
jonesFactors.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Jones factors]: https://github.com/ifct2017/jonesfactors/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1OqV-MSaXH1ARXlyuyayyfj9NXoH1DvW5-n1oxOX4n0o/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSfqNhcPoEpx9TbXLhlyLFYpN-JtKM0J6YtZN7He6Ad4fNoVGcNI3ILaW7PJkgsoTg7-XJqr39HRQe1/pubhtml
