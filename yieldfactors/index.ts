// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Name of food in local languages, including scientific name. */
export interface YieldFactor {
  /** Food Code. */
  code: string,
  /** Food Name. */
  name: string,
  /** Scientific Name. */
  scie: string,
  /** Local Name. */
  lang: string,
  /** Food Group. */
  grup: string,
  /** No. of Regions. */
  regn: number,
  /** Tags. */
  tags: string,
  /** Overall yield factor, considering removal of inedible parts, washng, and cutting. */
  yield: number,
  /** Preparation considerations, including stem removal, washing, deseeding, etc. */
  preparation: string,
};
//#endregion




//#region GLOBALS
let corpus: Map<string, YieldFactor> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the yield factors corpus from CSV file.
 * @param file CSV file path
 * @returns yield factors corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, YieldFactor>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const {code, name, scie, lang, grup, tags, preparation} = r as unknown as YieldFactor;
    const regn   = parseInt(r.regn, 10);
    const yieldf = parseFloat(r.yield);
    map.set(r.code, {code, name, scie, lang, grup, regn, tags, yield: yieldf, preparation});
  }
  return map;
}


/**
 * Setup the lunr index for the yield factors corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, YieldFactor>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('code');
    this.field('code');
    this.field('name');
    this.field('scie');
    this.field('lang');
    this.field('grup');
    this.field('tags');
    this.field('preparation');
    for (const r of corpus.values()) {
      let {code, name, scie, lang, grup, tags, preparation} = r;
      name = name.replace(/^(\w+),/g, '$1 $1 $1 $1,');
      lang = lang.replace(/\[.*?\]/g, '');
      lang = lang.replace(/\w+\.\s([\w\',\/\(\)\- ]+)[;\.]?/g, '$1');
      lang = lang.replace(/[,\/\(\)\- ]+/g, ' ');
      this.add({code, name, scie, lang, grup, tags, preparation});
    }
  });
}


/**
 * Load the yield factors corpus from the file.
 * @returns yield factors corpus
 */
export async function loadYieldFactors(): Promise<Map<string, YieldFactor>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(yieldFactorsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the yield factors CSV file.
 * @returns CSV file URL
 */
export function yieldFactorsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the yield factors table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function yieldFactorsSql(tab: string="yieldfactors", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", name: "TEXT", scie: "TEXT", lang: "TEXT", grup: "TEXT", regn: "INT", tags: "TEXT", yield: "REAL", preparation: "TEXT"},
    (await loadYieldFactors()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", name: "B", scie: "B", lang: "B", grup: "C", tags: "C", preparation: "C"}}, opt));
}


/**
 * Find matching yield factors of an code/name/scie/preparation query.
 * @param txt code/name/scie/preparation query
 * @returns matches `[{code, name, scie, yield, preparation}]`
 * @example
 * ```javascript
 * ifct2017.yieldFactors('mango');
 * ifct2017.yieldFactors('Mangifera indica');
 * // → [ { code: 'D057',
 * // →     name: 'Mango, green, raw',
 * // →     scie: 'Mangifera indica',
 * // →     lang: 'A. Keasa aam; B. Aam (kancha); G. Ambo; H. Katcha Aam; Kan. Mavinakayi; Kash. Kach Aamb; Kh. Soh pieng im; Mal. Manga; M. Heinou Ashangba; Mar. Amba; O. Ambu (kacha); P. Kaccha aam; Tam. Mangai; Tel. Mamidikaya; U. Kaccha aam.',
 * // →     grup: 'Other Vegetables',
 * // →     regn: 6,
 * // →     tags: 'vegetarian eggetarian fishetarian veg',
 * // →     yield: 0.6833333333,
 * // →     preparation: 'Washing, Peeling, Seed removal' } ]
 *
 * ifct2017.yieldFactors('yield factor of cow milk?');
 * ifct2017.yieldFactors('cow milk');
 * // → [ { code: 'L002',
 * // →     name: 'Milk, Cow',
 * // →     scie: '',
 * // →     lang: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.',
 * // →     grup: 'Milk and Milk Products',
 * // →     regn: 6,
 * // →     tags: 'vegetarian eggetarian fishetarian veg',
 * // →     yield: 1,
 * // →     preparation: 'None' } ]
 * ```
 */
export function yieldFactors(txt: string): YieldFactor[] {
  if (index == null) return [];
  const a: YieldFactor[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as YieldFactor);
  return a;
}
//#endregion
