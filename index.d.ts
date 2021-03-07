export interface Region {
  /** Region. */
  region: string,
  /** States/UTs. */
  states: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/regions)
 * @returns corpus {region ⇒ {region, states}}
 */
export function load() : Map<string, Region>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/regions)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='regions', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/regions)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching regions of a region/states query.
 * [📦](https://www.npmjs.com/package/@ifct2017/regions)
 * @param txt region/states query
 * @returns matches [{region, states}]
 * @example
 * ```javascript
 * regions('central');
 * regions('Uttaranchal');
 * // [ { region: 'Central',
 * //     states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal' } ]
 *
 * regions('which region andhra pradesh belongs to?');
 * regions('details of south region');
 * // [ { region: 'South',
 * //     states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu' } ]
 * ```
 */
function regions(txt: string): [Region];
export = regions;
