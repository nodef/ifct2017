export interface FrequencyDistribution {
  /** No. of Districts. */
  districts: string,
  /** No. of States/UTs. */
  states: number,
  /** No. of districts to be selected from each State/UT. */
  selected: number,
  /** Total No. of districts to be sampled. */
  sampled: number
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/frequencydistribution)
 * @returns corpus {districts (start) ⇒ {districts, states, selected, sampled}}
 */
export function load() : Map<string, FrequencyDistribution>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/frequencydistribution)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='frequencydistribution', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/frequencydistribution)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching frequency distribution for a given no. of districts.
 * [📦](https://www.npmjs.com/package/@ifct2017/frequencydistribution)
 * @param dis no. of districts
 * @returns found ⇒ {districts, states, selected, sampled}, else ⇒ null
 * @example
 * ```javascript
 * frequencyDistribution(2);
 * frequencyDistribution(5);
 * // { districts: '1-5', states: 9, selected: 1, sampled: 9 }
 *
 * frequencyDistribution(32);
 * frequencyDistribution(37);
 * // { districts: '31-40', states: 4, selected: 5, sampled: 20 }
 * ```
 */
function frequencyDistribution(dis: number): FrequencyDistribution | null;
export = frequencyDistribution;
