export interface CompositingCentre {
  /** Region. */
  region: string,
  /** Regional Compositing centre. */
  centre: string,
  /** Sample size. */
  samples: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/compositingcentres)
 * @returns corpus {region ⇒ {region, centre, samples}}
 */
export function load() : Map<string, CompositingCentre>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/compositingcentres)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='compositingcentres', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/compositingcentres)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching compositing centres of a region/centre query.
 * [📦](https://www.npmjs.com/package/@ifct2017/compositingcentres)
 * @param txt region/centre query
 * @returns matched compositing centres ⇒ [{region, centre, samples}]
 * @examples
 * ```javascript
 * compositingCentres('west');
 * compositingCentres('Mumbai');
 * // [ { region: 'West', centre: 'Mumbai', samples: 12 } ]
 *
 * compositingCentres('what is compositing centre of north east?');
 * compositingCentres('North East compositing centre');
 * // [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
 * ```
 */
function compositingCentres(txt: string): [CompositingCentre];
export = compositingCentres;
