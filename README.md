[Frequency distribution] of States/UTs for fixing the number of districts to be sampled.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const frequencyDistribution = require('@ifct2017/frequencydistribution');
// frequencyDistribution(districts)
// → {districts, states, selected, sampled} if found, null otherwise


frequencyDistribution(2);
frequencyDistribution(5);
// { districts: '1-5', states: 9, selected: 1, sampled: 9 }

frequencyDistribution(32);
frequencyDistribution(37);
// { districts: '31-40', states: 4, selected: 5, sampled: 20 }
```

```javascript
// Additional methods:
frequencyDistribution.load() // → corpus
frequencyDistribution.sql([table], [options]) // → sql statements
frequencyDistribution.csv() // → path of csv file
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Frequency distribution]: https://github.com/ifct2017/frequencydistribution/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
