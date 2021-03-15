export interface Method {
  /** Analyte. */
  analyte: string,
  /** Method. */
  method: string,
  /** Reference. */
  reference: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/methods)
 * @returns corpus {code ⇒ {analyte, method, reference}}
 */
export function load(): Map<string, Method>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/methods)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='methods', opt: object={}): string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/methods)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching methods of a column:code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/methods)
 * @param txt column:code/name/tags query
 * @returns found ⇒ {analyte, method, reference}, else null
 * @example
 * ```javascript
 * methods('soluble oxalic acid');
 * methods('Insoluble Oxalic Acid');
 * // { analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
 * //   method: 'Fast- HPLC',
 * //   reference: 'Moreau & Savage (2009)' }
 *
 * methods('what is analytical method of saponin?');
 * methods('how is total saponin measured?');
 * // { analyte: 'Total Saponin',
 * //   method: 'Colorimetry',
 * //   reference: 'Dini et al. (2009)' }
 * ```
 */
function methods(txt: string): Method | null;
export = methods;
