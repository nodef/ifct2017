[Categorization] of food by their common names.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const groups = require('@ifct2017/groups');
// groups(query)
// → matches [{code, group, entries, tags}]


groups('cereals');
groups('Millet');
// [ { code: 'A',
//     group: 'Cereals and Millets',
//     entries: 24,
//     tags: 'vegetarian eggetarian fishetarian veg' } ]

groups('what is vegetable?');
groups('vegetable group code?');
// [ { code: 'D',
//     group: 'Other Vegetables',
//     entries: 78,
//     tags: 'vegetarian eggetarian fishetarian veg' },
//   { code: 'C',
//     group: 'Green Leafy Vegetables',
//     entries: 34,
//     tags: 'vegetarian eggetarian fishetarian veg' } ]
```

```javascript
// Additional methods:
groups.load() // → corpus
groups.sql([table], [options]) // → sql statements
groups.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Categorization]: https://github.com/ifct2017/groups/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1PMR0TZLLYsS70lcC0Bap4oNrI1azgmuGx9ekfHJB_0Q/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSsXdKiSvWypa6aJlCfl_eKIzAOfESO_wHITJtPik3K1goIy81hciSjmTCqFjmFv1cqrLdnYhg1Q3O1/pubhtml
