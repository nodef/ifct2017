# @ifct2017/frequencydistribution

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](http://ninindia.org/ifct_2017.htm)

Frequency distribution of States/UTs for fixing the number of districts to be sampled in [Indian Food Composition Tables 2017].<br>
Check entries of [frequency distribution].

```javascript
const frequencyDistribution = require('@ifct2017/frequencydistribution');
// frequencyDistribution(<districts>)
// -> {districts, states, selected, sampled}
// frequencyDistribution.corpus: Map {districts (start) => {districts, states, selected, sampled}}
// frequencyDistribution.csv(): path to csv file
 
frequencyDistribution(2);
frequencyDistribution(5);
// { districts: '1-5', states: 9, selected: 1, sampled: 9 }

frequencyDistribution(32);
frequencyDistribution(37);
// { districts: '31-40', states: 4, selected: 5, sampled: 20 }
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[frequency distribution]: https://github.com/ifct2017/frequencydistribution/blob/master/index.csv
