// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";




//#region CONSTANTS
const REGEX: {[topic: string]: RegExp} = {
  '1937': /193\d|194\d/i,
  '1951': /195\d/i,
  '1963': /196\d/i,
  '1971': /197\d/i,
  '1989': /198\d|199\d/i,
  '2017': /200\d|201\d/i,
  father:     /(father)/i,
  challenge:  /challeng|difficult|inconsistent|fragment|exhaust/i,
  interest:   /interest|bioactive|first/i,
  limitation: /limitation|exact/i,
  learn:  /learn|underst|more/i,
  funder: /fund|financ|money|contribut|donat|pay|paid/i,
  when:   /when|date|day|month|year|last/i,
  why:    /why|cause|reason/i,
  publisher: /publish|issu|creat|wr(i|o)t|ma(k|de)|develop|produc|print|announc|report|declar|distribut|spread|disseminat|circulat/i,
  credit:    /credit|acknowledg/i,
  supporter: /support|back|help/i,
  source:    /source|from|origin|take|derive|borrow|obtain/i,
  data:   /data|info/i,
  form:   /form|shape|appear|configur|structure|dispos/i,
  group:  /type|group|category|class|sort|kind|variety|collection|cluster/i,
  column: /column|component|part|piece|bit|constituent|element|ingredient|unit|module|item|section|portion/i,
  what:   /what|about/i,
};
const USER = /user|utilizer|applier/i;
const USE  = /use|using|utiliz|employ|appl/i;
const WHO  = /who|person|people|member/i;
//#endregion




//#region GLOBALS
let corpus: Map<string, string> | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Read the index file and return the about details.
 * @returns about corpus
 */
async function readIndex() {
  const map  = new Map<string, string>();
  const file = import.meta.resolve('./index.txt');
  const data = await (await fetch(file)).text(); let m = null;
  const re = /\[\[(\w+)\]\]\n([\w\W]*?)\n\n\n/g;
  while ((m = re.exec(data)) != null) {
    const k = m[1], v = m[2].trim();
    map.set(k, v);
  }
  return map;
}


/**
 * Load the about corpus from file.
 * @returns about corpus
 */
export async function loadAbout(): Promise<Map<string, string>> {
  if (corpus) return corpus;
  corpus = await readIndex();
  return corpus;
}


/**
 * Find matching description of an about query.
 * @param txt about query
 * @returns if found, returns the description, else null
 * @example
 * ```javascript
 * about('who is you publisher');
 * about('which organization issued you');
 * // → Indian Food Composition Tables 2017 was published by:
 * // → T. Longvah, R. Ananthan, K. Bhaskarachary and K. Venkaiah
 * // → National Institute of Nutrition
 * // → Indian Council of Medical Research
 * // → Department of Health Research
 * // → Ministry of Health and Family Welfare, Government of India
 * // → Jamai Osmania (PO), Hyderabad – 500 007
 * // → Telangana, India
 * // → Phone: +91 40 27197334, Fax: +91 40 27000339, Email: nin@ap.nic.in
 *
 * about('can i know the food groups');
 * about('i want to know what types of food are there');
 * // → There are 20 food groups:
 * // → - A: Cereals and Millets. 24 foods.
 * // → - B: Grain Legumes. 25 foods.
 * // → - C: Green Leafy Vegetables. 34 foods.
 * // → - D: Other Vegetables. 78 foods.
 * // → - E: Fruits. 68 foods.
 * // → - F: Roots and Tubers. 19 foods.
 * // → - G: Condiments and Spices. 33 foods.
 * // → - H: Nuts and Oil Seeds. 21 foods.
 * // → - I: Sugars. 2 foods.
 * // → - J: Mushrooms. 4 foods.
 * // → - K: Miscellaneous Foods. 2 foods.
 * // → - L: Milk and Milk Products. 4 foods.
 * // → - M: Egg and Egg Products. 15 foods.
 * // → - N: Poultry. 19 foods.
 * // → - O: Animal Meat. 63 foods.
 * // → - P: Marine Fish. 92 foods.
 * // → - Q; Marine Shellfish. 8 foods.
 * // → - R: Marine Mollusks. 7 foods.
 * // → - S: Fresh Water Fish and Shellfish. 10 foods.
 * // → - T: Edible Oils and Fats. 9 foods.
 * ```
 */
export function about(txt: string): string | null {
  const re = REGEX;
  if (USER.test(txt) || (USE.test(txt) && WHO.test(txt))) return corpus?.get('user') as string;
  if (USE.test(txt)) return corpus?.get('use') as string;
  for (const k in re)
    if (re[k].test(txt)) return corpus?.get(k) as string;
  return null;
}
//#endregion
