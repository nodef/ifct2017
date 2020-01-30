[Food descriptions] in [Indian Food Composition Tables 2017].

```javascript
const descriptions = require('@ifct2017/descriptions');
// descriptions.corpus: Map {code => {code, name, scie, desc}}
// descriptions.load(): Promise (corpus loaded)
// descriptions.sql([table], [options]): Promise (sql commands)
// descriptions.csv(): path to csv file
// descriptions(<query>)
// -> [{code, name, scie, desc}] for matched foods


await descriptions.load();
/* load corpus first */

descriptions('pineapple');
descriptions('ananas comosus');
// [ { code: 'E053',
//     name: 'Pineapple',
//     scie: 'Ananas comosus',
//     desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.' } ]

descriptions('tell me about cow milk.');
descriptions('gai ka doodh details.');
// [ { code: 'L002',
//     name: 'Milk, Cow',
//     scie: '',
//     desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.' } ]
```


[![ifct2017](http://ifct2017.com/ifct_2017.jpg)](https://www.npmjs.com/package/ifct2017)
> You can ask about composition of 528 key foods in India here: [ifct2017.github.io].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].<br>
> Take a peek at the raw data here: [Document], [Webpage].

[Indian Food Composition Tables 2017]: http://ifct2017.com/
[Food descriptions]: https://github.com/ifct2017/descriptions/blob/master/index.csv
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
[Document]: https://docs.google.com/spreadsheets/d/1dRKW2HJyWxDJliONe_URNxM0gPBmgZKqoF5lBotxOT8/edit?usp=sharing
[Webpage]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSueRUdwru4BNvmLCK16cM8DYO3mum4c-g_8MILZvg6TsT3vaZChWOwN5cUS58GtrXMKqZHeHy0ajeG/pubhtml
