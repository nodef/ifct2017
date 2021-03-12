export interface Code {
  /** Food Name. */
  name: string,
  /** Food Code. */
  code: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/codes)
 * @returns corpus {name ⇒ {name, code}}
 */
export function load(): Promise<Map<string, Code>>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/codes)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='codes', opt: object={}): Promise<string>;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/codes)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching codes of an name/code query.
 * [📦](https://www.npmjs.com/package/@ifct2017/codes)
 * @param txt name/code query
 * @returns matches [{name, code}]
 * @example
 * ```javascript
 * codes('mango green');
 * codes('Raw mango');
 * // [ { name: 'Mango, green, raw (Common)', code: 'D057' } ]
 *
 * codes('what is food code of atta?');
 * codes('atta code');
 * // [ { name: 'Atta (H., P.)', code: 'A019' },
 * //   { name: 'Gahama atta (O.)', code: 'A019' },
 * //   { name: 'Wheat flour, atta (Common)', code: 'A019' } ]
 * ```
 */
function codes(txt: string): [Code];
export = codes;
