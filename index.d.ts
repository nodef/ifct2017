export interface Intake {
  /** Column Code. */
  code: string,
  /** WHO Recommended Dietary Allowance. */
  whorda: number,
  /** US Estimated Average Requirement. */
  usear: number,
  /** US Recommended Dietary Allowance (Male). */
  usrdam: number,
  /** US Recommended Dietary Allowance (Female). */
  usrdaf: number,
  /** EU Population Reference Intake (Male). */
  euprim: number,
  /** EU Population Reference Intake (Female). */
  euprif: number,
  /** Tolerable intake Upper Level (US). */
  ulus: number,
  /** Tolerable intake Upper Level (EU). */
  uleu: number,
  /** Tolerable intake Upper Level (Japan). */
  uljapan: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/intakes)
 * @returns corpus {code ⇒ {code, whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}}
 */
export function load(): Map<string, Intake>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/intakes)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='intakes', opt: object={}): string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/intakes)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching intakes of an column:code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/intakes)
 * @param txt column:code/name/tags query
 * @returns matches [{code, whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}]
 * @example
 * ```javascript
 * intakes('his');
 * intakes('Histidine');
 * // { whorda: -0.01,
 * //   usear: NaN,
 * //   usrdam: -0.014,
 * //   usrdaf: NaN,
 * //   euprim: NaN,
 * //   euprif: NaN,
 * //   ulus: NaN,
 * //   uleu: NaN,
 * //   uljapan: NaN }
 *
 * intakes('intake of total fibre?');
 * intakes('what is rda of total fiber?');
 * // { whorda: NaN,
 * //   usear: NaN,
 * //   usrdam: 38,
 * //   usrdaf: 25,
 * //   euprim: NaN,
 * //   euprif: NaN,
 * //   ulus: NaN,
 * //   uleu: NaN,
 * //   uljapan: NaN }
 *
 *
 * // Note:
 * // +ve value indicates amount in grams.
 * // -ve value indicates amount in grams per kg of body weight.
 * // NaN indicates no recommentation given.
 * ```
 */
function intakes(txt: string): [Intake];
export = intakes;
