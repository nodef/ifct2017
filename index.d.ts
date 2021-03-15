export interface Hierarchy {
  /** List of Parent columns. */
  parents: string,
  /** List of Ancestor columns. */
  ancestry: string,
  /** List of Child columns. */
  children: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/hierarchy)
 * @returns corpus {code ⇒ {parents, ancestry, children}}
 */
export function load(): Map<string, Hierarchy>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/hierarchy)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='hierarchy', opt: object={}): string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/hierarchy)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching hierarchy of a column:code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/hierarchy)
 * @param txt column:code/name/tags query
 * @returns found ⇒ {parents, ancestry, children}, else null
 * @example
 * ```javascript
 * hierarchy('soluble oxalic acid');
 * hierarchy('Soluble Oxalic Acid');
 * // { parents: 'oxalt', ancestry: 'oxalt orgac', children: '' }
 *
 * hierarchy('what is hierarchy of total saturated fat?');
 * hierarchy('who are children of total saturated fat?');
 * // { parents: 'fatce',
 * //   ancestry: 'fatce',
 * //   children:
 * //    'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0' }
 * ```
 */
function hierarchy(txt: string): Hierarchy | null;
export = hierarchy;
