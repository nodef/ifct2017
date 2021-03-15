export interface Representation {
  /** Type of physical quantity. */
  type: string,
  /** Multiplication factor. */
  factor: number,
  /** Unit symbol. */
  unit: string;
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/representations)
 * @returns corpus {code ⇒ {type, factor, unit}}
 */
export function load(): Map<string, Representation>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/representations)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='representations', opt: object={}): string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/representations)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching representations of a column:code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/representations)
 * @param txt column:code/name/tags query
 * @returns found ⇒ {type, factor, unit}, else null
 * @example
 * ```javascript
 * representations('his');
 * representations('Histidine');
 * // { type: 'mass', factor: 1000, unit: 'mg' }
 *
 * representations('representation of vitamin d?');
 * representations('what is unit of ergocalciferol?');
 * // { type: 'mass', factor: 1000000000, unit: 'ng' }
 * ```
 */
function representations(txt: string): Representation | null;
export = representations;
