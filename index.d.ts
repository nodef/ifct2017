export interface Energy {
  /** Component. */
  component: string,
  /** kJ/g. */
  kj: string,
  /** kcal/g. */
  kcal: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/energies)
 * @returns corpus {component ⇒ {component, kj, kcal}}
 */
export function load() : Map<string, Energy>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/energies)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export function sql(tab: string='energies', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/energies)
 * @returns .../index.csv
 */
export function csv() : string;


/**
 * Finds matching energies of a component query.
 * [📦](https://www.npmjs.com/package/@ifct2017/energies)
 * @param txt component query
 * @returns matches [{component, kj, kcal}]
 * @example
 * ```javascript
 * energies('dietary fibre');
 * energies('Soluble fibre');
 * // [ { component: 'Fibre', kj: 8, kcal: 2 } ]
 *
 * energies('what is energy conversion factor of fat?');
 * energies('conversion factor of fat');
 * // [ { component: 'Fat', kj: 37, kcal: 9 } ]
 * ```
 */
function energies(txt: string): [Energy];
export = energies;
