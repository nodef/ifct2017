export interface Content {
  /** S. No. */
  sno: string,
  /** Title. */
  title: string,
  /** Page Nos. */
  pagenos: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/contents)
 * @returns corpus {sno ⇒ {sno, title, pagenos}}
 */
export function load() : Map<string, Content>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/contents)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='contents', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/contents)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching contents of an sno/title/pagenos query.
 * [📦](https://www.npmjs.com/package/@ifct2017/contents)
 * @param txt content query
 * @returns matched contents ⇒ [{sno, title, pagenos}]
 * @example
 * ```javascript
 * contents('table 2');
 * contents('Water soluble vitamins');
 * // [ { sno: '6.2.',
 * //     title: 'Table 2:  Water Soluble Vitamins',
 * //     pagenos: '31' } ]
 *
 * contents('what is page number of table 3?');
 * contents('fat soluble vitamin page number');
 * // [ { sno: '6.3.',
 * //     title: 'Table 3:  Fat Soluble Vitamins',
 * //     pagenos: '61' } ]
 * ```
 */
function contents(txt: string): [Content];
export = contents;
