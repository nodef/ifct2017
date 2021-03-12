export interface Group {
  /** Code. */
  code: string,
  /** Food groups. */
  group: string,
  /** No. of food entries. */
  entries: string,
  /** Tags. */
  tags: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/groups)
 * @returns corpus {code ⇒ {code, group, entries, tags}}
 */
export function load() : Map<string, Group>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/groups)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='groups', opt: object={}) : string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/groups)
 * @returns .../index.csv
 */
 export function csv() : string;


/**
 * Finds matching groups of an code/group/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/groups)
 * @param txt code/group/tags query
 * @returns matches [{code, group, entries, tags}]
 * @example
 * ```javascript
 * groups('cereals');
 * groups('Millet');
 * // [ { code: 'A',
 * //     group: 'Cereals and Millets',
 * //     entries: 24,
 * //     tags: 'vegetarian eggetarian fishetarian veg' } ]
 *
 * groups('what is vegetable?');
 * groups('vegetable group code?');
 * // [ { code: 'D',
 * //     group: 'Other Vegetables',
 * //     entries: 78,
 * //     tags: 'vegetarian eggetarian fishetarian veg' },
 * //   { code: 'C',
 * //     group: 'Green Leafy Vegetables',
 * //     entries: 34,
 * //     tags: 'vegetarian eggetarian fishetarian veg' } ]
 * ```
 */
function groups(txt: string): [Group];
export = groups;
