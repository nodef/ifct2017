export interface Description {
  /** Food Code. */
  code: string,
  /** Food Name. */
  name: string,
  /** Scientific Name. */
  scie: string,
  /** Description (local names). */
  desc: string
}


/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/descriptions)
 * @returns corpus {code ⇒ {code, name, scie, desc}}
 */
export function load(): Map<string, Description>;


/**
 * Generates PostgreSQL statements for creating table w/ data.
 * [📦](https://www.npmjs.com/package/@ifct2017/descriptions)
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
 export function sql(tab: string='descriptions', opt: object={}): string;


/**
 * Gives path of CSV data file.
 * [📦](https://www.npmjs.com/package/@ifct2017/descriptions)
 * @returns .../index.csv
 */
 export function csv(): string;


/**
 * Finds matching descriptions of an code/name/scie/desc query.
 * [📦](https://www.npmjs.com/package/@ifct2017/descriptions)
 * @param txt code/name/scie/desc query
 * @returns matches [{code, name, scie, desc}]
 * @example
 * ```javascript
 * descriptions('pineapple');
 * descriptions('ananas comosus');
 * // [ { code: 'E053',
 * //     name: 'Pineapple',
 * //     scie: 'Ananas comosus',
 * //     desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.' } ]
 *
 * descriptions('tell me about cow milk.');
 * descriptions('gai ka doodh details.');
 * // [ { code: 'L002',
 * //     name: 'Milk, Cow',
 * //     scie: '',
 * //     desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.' } ]
 * ```
 */
function descriptions(txt: string): [Description];
export = descriptions;
