export interface JonesFactor {
  /** Food. */
  food: string,
  /** Conversion Factor. */
  factor: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/jonesfactors)
 * @returns corpus {food ⇒ {food, factor}}
 */
export function load() : Map<string, JonesFactor>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/jonesfactors)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='jonesfactors', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/jonesfactors)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching jones factors of a food query.
 * [📦](https://www.npmjs.com/package/@ifct2017/jonesfactors)
 * @param txt food query
 * @returns matches [{food, factor}]
 * @example
 * ```javascript
 * jonesFactors('maida');
 * jonesFactors('Refined wheat');
 * // [ { food: 'Refined wheat flour (Maida)', factor: '5.70' } ]
 *
 * jonesFactors('what is jones factor of barley?');
 * jonesFactors('jones factor of oats');
 * // [ { food: 'Barley and its flour;Rye and its flour;Oats',
 * //     factor: '5.83' },
 * //   { food: 'Food where specific factor is not listed',
 * //     factor: '6.25' } ]
 * ```
 */
function jonesFactors(txt: string): [JonesFactor];
export = jonesFactors;
