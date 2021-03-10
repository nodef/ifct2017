export interface Carbohydrate {
  /** S. No. */
  sno: string,
  /** Carbohydrate. */
  carbohydrate: string,
  /** Equivalent after Hydrolysis (g/100g). */
  hydrolysis: number,
  /** Conversion to monosaccharide equivalent. */
  monosaccharide: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/carbohydrates)
 * @returns corpus {sno ⇒ {sno, carbohydrate, hydrolysis, monosaccharide}}
 */
export function load() : Map<string, Carbohydrate>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/carbohydrates)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='carbohydrates', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/carbohydrates)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching carbohydrates of an sno/carbohydrate query.
 * [📦](https://www.npmjs.com/package/@ifct2017/carbohydrates)
 * @param txt sno/carbohydrate query
 * @returns matches [{sno, carbohydrate, hydrolysis, monosaccharide}]
 * @example
 * ```javascript
 * carbohydrates('monosaccharide');
 * carbohydrates('Glucose');
 * // [ { sno: '1',
 * //     carbohydrate: 'Monosaccharides e.g. glucose',
 * //     hydrolysis: 100,
 * //     monosaccharide: 1 } ]
 *
 * carbohydrates('what is carbohydrate conversion factor of disaccharides?');
 * carbohydrates('maltose conversion factor');
 * // [ { sno: '2',
 * //     carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
 * //     hydrolysis: 105,
 * //     monosaccharide: 1.05 } ]
 * ```
 */
function carbohydrates(txt: string): [Carbohydrate];
export = carbohydrates;
