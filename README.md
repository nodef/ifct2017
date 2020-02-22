[Frequency distribution] of States/UTs for fixing the number of districts to be sampled.
> This is part of package [ifct2017].<br>
> Source: [Indian Food Composition Tables 2017].

```javascript
const frequencyDistribution = require('@ifct2017/frequencydistribution');
// frequencyDistribution.corpus: Map {districts (start) => {districts, states, selected, sampled}}
// frequencyDistribution.load(): true (corpus loaded)
// frequencyDistribution.sql([table], [options]): sql commands
// frequencyDistribution.csv(): path to csv file
// frequencyDistribution(<districts>)
// -> {districts, states, selected, sampled}


frequencyDistribution.load();
/* load corpus first */

frequencyDistribution(2);
frequencyDistribution(5);
// { districts: '1-5', states: 9, selected: 1, sampled: 9 }

frequencyDistribution(32);
frequencyDistribution(37);
// { districts: '31-40', states: 4, selected: 5, sampled: 20 }
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Frequency distribution]: https://github.com/ifct2017/frequencydistribution/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
