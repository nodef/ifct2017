# @ifct2017/compositions

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](http://ninindia.org/ifct_2017.htm)

Food compositions in [Indian Food Composition Tables 2017].<br>
Check available [food compositions].
> Large corpus is not loaded synchronously.<br>
> Load it asynchronously with **.load()**.

```javascript
const compositions = require('@ifct2017/compositions');
// compositions.corpus: Map {code => {code, name, scie, lang, grup, regn, ...}}
// compositions.load(): Promise (corpus loaded)
// compositions.sql([table], [options]): Promise (sql commands)
// compositions.csv(): path to csv file
// compositions(<query>)
// -> [{code, name, scie, lang, grup, regn, ...}] for matched foods

await compositions.load();
/* load corpus first */

compositions('pineapple');
compositions('ananas comosus');
// [ { code: 'E053',
//     name: 'Pineapple',
//     scie: 'Ananas comosus',
//     desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.' } ]

compositions('tell me about cow milk.');
compositions('gai ka doodh details.');
// [ { code: 'L002',
//     name: 'Milk, Cow',
//     scie: '',
//     desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.' } ]
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[food compositions]: https://github.com/ifct2017/compositions/blob/master/index.csv
