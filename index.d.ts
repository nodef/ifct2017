/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/about)
 * @returns corpus {topic ⇒ text}
 */
export function load() : Map<string, string>;


/**
 * Finds matching description of an about query.
 * [📦](https://www.npmjs.com/package/@ifct2017/about)
 * @param txt about query
 * @returns found ⇒ text, else ⇒ null
 * @example
 * ```javascript
 * about('who is you publisher');
 * about('which organization issued you');
 * // Indian Food Composition Tables 2017 was published by:
 * // T. Longvah, R. Ananthan, K. Bhaskarachary and K. Venkaiah
 * // National Institute of Nutrition
 * // Indian Council of Medical Research
 * // Department of Health Research
 * // Ministry of Health and Family Welfare, Government of India
 * // Jamai Osmania (PO), Hyderabad – 500 007
 * // Telangana, India
 * // Phone: +91 40 27197334, Fax: +91 40 27000339, Email: nin@ap.nic.in
 *
 * about('can i know the food groups');
 * about('i want to know what types of food are there');
 * // There are 20 food groups:
 * // - A: Cereals and Millets. 24 foods.
 * // - B: Grain Legumes. 25 foods.
 * // - C: Green Leafy Vegetables. 34 foods.
 * // - D: Other Vegetables. 78 foods.
 * // - E: Fruits. 68 foods.
 * // - F: Roots and Tubers. 19 foods.
 * // - G: Condiments and Spices. 33 foods.
 * // - H: Nuts and Oil Seeds. 21 foods.
 * // - I: Sugars. 2 foods.
 * // - J: Mushrooms. 4 foods.
 * // - K: Miscellaneous Foods. 2 foods.
 * // - L: Milk and Milk Products. 4 foods.
 * // - M: Egg and Egg Products. 15 foods.
 * // - N: Poultry. 19 foods.
 * // - O: Animal Meat. 63 foods.
 * // - P: Marine Fish. 92 foods.
 * // - Q; Marine Shellfish. 8 foods.
 * // - R: Marine Mollusks. 7 foods.
 * // - S: Fresh Water Fish and Shellfish. 10 foods.
 * // - T: Edible Oils and Fats. 9 foods.
 * ```
 */
function about(txt: string): string | null;
export = about;
