[Recommended daily intakes] of nutrients in [Indian Food Composition Tables 2017].

```javascript
const intakes = require('@ifct2017/intakes');
// intakes.corpus: Map {code => description}
// intakes.load(): true (corpus loaded)
// intakes(<query>)
// -> "description" if found, null otherwise


intakes.load();
/* load corpus first */

intakes('his');
intakes('Histidine');
// Amino acid profile of each food is determined by three different analyses.
// Tryptophan is determined by alkaline hydrolysis, methionine and cystine by
// performic oxidation and the rest of the amino acids by acid hydrolysis. The
// amino acid profile of each food is expressed as g/100 g protein.

intakes('what is soluble oxalate?');
intakes('are organic acids useful?');
// Organic acids is naturally present in a wide variety of foods especially fruits,
// berries and vegetables. Organic acids cis-aconitic acid, citric acid, fumaric
// acid, mallic acid, quinic acid, succinic acid and tartaric acid were determined
// in single liquid chromatographic run. Soluble, insoluble and total oxalates were
// determined separately by HPLC method. The organic acids are energy contributing
// components, although it varies between the different organic acids. According to
// the Codex Alimentarius Commission’s Guidelines for Nutrition Labeling, the energy
// conversion factor for organic acids is 13 kJ/g. However, organic acids have not
// been included in the total energy of foods given in the IFCT.
```


[![ifct2017](http://ninindia.org/images/ifct_2017.png)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Recommended daily intakes]: https://github.com/ifct2017/intakes/tree/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: http://www.ninindia.org
