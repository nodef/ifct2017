On the history of malnutrition, current status, and data details.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const about = require('@ifct2017/about');
// about(query)
// → text if matched, null otherwise


about('who is you publisher');
about('which organization issued you');
// Indian Food Composition Tables 2017 was published by:
// T. Longvah, R. Ananthan, K. Bhaskarachary and K. Venkaiah
// National Institute of Nutrition
// Indian Council of Medical Research
// Department of Health Research
// Ministry of Health and Family Welfare, Government of India
// Jamai Osmania (PO), Hyderabad – 500 007
// Telangana, India
// Phone: +91 40 27197334, Fax: +91 40 27000339, Email: nin@ap.nic.in

about('can i know the food groups');
about('i want to know what types of food are there');
// There are 20 food groups:
// - A: Cereals and Millets. 24 foods.
// - B: Grain Legumes. 25 foods.
// - C: Green Leafy Vegetables. 34 foods.
// - D: Other Vegetables. 78 foods.
// - E: Fruits. 68 foods.
// - F: Roots and Tubers. 19 foods.
// - G: Condiments and Spices. 33 foods.
// - H: Nuts and Oil Seeds. 21 foods.
// - I: Sugars. 2 foods.
// - J: Mushrooms. 4 foods.
// - K: Miscellaneous Foods. 2 foods.
// - L: Milk and Milk Products. 4 foods.
// - M: Egg and Egg Products. 15 foods.
// - N: Poultry. 19 foods.
// - O: Animal Meat. 63 foods.
// - P: Marine Fish. 92 foods.
// - Q; Marine Shellfish. 8 foods.
// - R: Marine Mollusks. 7 foods.
// - S: Fresh Water Fish and Shellfish. 10 foods.
// - T: Edible Oils and Fats. 9 foods.

about('what happened in 1951');
about('what was the situation in nineteen fifty');
// Between 1938 and 1951, there was a notable transition in the Indian nutrition
// scenario. Among tropical regions, India contributed substantially in the field
// of nutrition (Nicholls, 1945). The incidence of pellagra was noticed and the
// role of niacin in its cure was successfully demonstrated in India (Raman, 1940;
// Aykroyd & Swaminathan, 1940). The agricultural practices in India also underwent
// modifications with concomitant increase in the crop yields. However, the basic
// diet of individuals remained inadequate, devoid of animal fats and proteins,
// due to poor economic conditions (Day, 1944). The translation of nutrition research
// into sustained public health was hindered by obstacles of weak economy, ignorance
// and poverty (Aykroyd, 1941). Other deficiency diseases such as maternal anaemia,
// infant beriberi and osteomalacia continued to be rampant. Sustained nutritional
// issues prompted the revision of Indian FCT resulting in the publication of fourth
// edition of the Health Bulletin No. 23 by Aykroyd, Patwardhan, and Ranganathan (1951).


// Note:
// Can convert textual number to number.
// 1950-1959 is considered for 1951 event.
```

```javascript
// Additional methods:
about.load() // → corpus
```

> Supported [topics] include: 1937, 1951, 1963, 1971, 1989, 2017, challenge,
> column, credit, data, father, form, funder, group, interest, learn, limitation,
> publisher, source, supporter, use, user, what, when, why.

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[topics]: https://github.com/ifct2017/about/tree/master/assets
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
