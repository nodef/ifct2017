// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Jones factor for conversion of nitrogen to protein. */
export interface JonesFactor {
  /** Food. */
  food: string,
  /** Conversion Factor. */
  factor: number
};
//#endregion




//#region GLOBALS
let corpus: Map<string, JonesFactor> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the jones factors corpus from CSV file.
 * @param file CSV file path
 * @returns jones factors corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, JonesFactor>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const factor = parseFloat(r.factor);
    map.set(r.food, {food: r.food, factor});
  }
  return map;
}


/**
 * Setup the lunr index for the jones factors corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, JonesFactor>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('key');
    this.field('food');
    for (const r of corpus.values())
      this.add({key: r.food, food: r.food.replace(/[\W\s]+/g, ' ')});
  });
}


/**
 * Load the jones factors corpus from the file.
 * @returns jones factors corpus
 */
export async function loadJonesFactors(): Promise<Map<string, JonesFactor>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(jonesFactorsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the jones factors CSV file.
 * @returns CSV file URL
 */
export function jonesFactorsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the jones factors table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function jonesFactorsSql(tab: string="jonesfactors", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {food: "TEXT", factor: "REAL"},
    (await loadJonesFactors()).values() as Iterable<RowData>,
    Object.assign({pk: "food", index: true, tsvector: {food: "A"}}, opt));
}


/**
 * Find matching jones factors of a food query.
 * @param txt food query
 * @returns matches `[{food, factor}]`
 * @example
 * ```javascript
 * ifct2017.jonesFactors('maida');
 * ifct2017.jonesFactors('Refined wheat');
 * // → [ { food: 'Refined wheat flour (Maida)', factor: '5.70' } ]
 *
 * ifct2017.jonesFactors('what is jones factor of barley?');
 * ifct2017.jonesFactors('jones factor of oats');
 * // → [ { food: 'Barley and its flour;Rye and its flour;Oats',
 * // →     factor: '5.83' } ]
 * ```
 */
export function jonesFactors(txt: string): JonesFactor[] {
  if (index == null) return [];
  const a: JonesFactor[] = [];
  txt = txt.replace(/\W/g, ' ').replace(/factor/gi, '');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as JonesFactor);
  return a.length>0? a : [corpus?.get('Food where specific factor is not listed') as JonesFactor];
}
//#endregion
