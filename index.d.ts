export interface Column {
  /** Column Code. */
  code: string,
  /** Column Name. */
  name: string,
  /** Tags. */
  tags: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/columns)
 * @returns corpus {code ⇒ {code, name, tags}}
 */
export function load() : Map<string, Column>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/columns)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='columns', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/columns)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching columns of an code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/columns)
 * @param txt code/name/tags query
 * @returns matches [{code, name, tags}]
 * @example
 * ```javascript
 * columns('vitamin c');
 * columns('c-vitamin');
 * // [ { code: 'vitc',
 * //     name: 'Total Ascorbic acid',
 * //     tags: 'ascorbate water soluble vitamin c vitamin c essential' } ]
 *
 * columns('what is butyric acid?');
 * columns('c4:0 stands for?');
 * // [ { code: 'f4d0',
 * //     name: 'Butyric acid (C4:0)',
 * //     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
 * ```
 */
function columns(txt: string): [Column];
export = columns;
