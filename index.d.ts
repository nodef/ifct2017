export interface SamplingUnit {
  /** Sl. No. */
  sno: string,
  /** State name. */
  state: string,
  /** Total No. of Districts. */
  districts: number,
  /** Districts Selected. */
  selected: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/samplingunits)
 * @returns corpus {sno => {sno, state, districts, selected}}
 */
export function load() : Map<string, SamplingUnit>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/samplingunits)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='samplingunits', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/samplingunits)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching sampling units of an sno/state query.
 * [📦](https://www.npmjs.com/package/@ifct2017/samplingunits)
 * @param txt sno/state query
 * @returns matches [{sno, state, districts, selected}]
 * @example
 * ```javascript
 * samplingUnits('andaman');
 * samplingUnits('Nicobar');
 * // [ { sno: 'A',
 * //     state: 'Andaman & Nicobar',
 * //     districts: 3,
 * //     selected: 1 } ]
 *
 * samplingUnits('sampling units in orissa?');
 * samplingUnits('orissa\'s sampling units');
 * // [ { sno: '20', state: 'Orissa', districts: 30, selected: 4 } ]
 * ```
 */
function samplingUnits(txt: string): [SamplingUnit];
export = samplingUnits;
