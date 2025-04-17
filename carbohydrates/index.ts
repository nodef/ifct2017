// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Conversion of carbohydrate weight to monosaccharide equivalent. */
export interface Carbohydrate {
  /** S. No. */
  sno: string,
  /** Carbohydrate. */
  carbohydrate: string,
  /** Equivalent after Hydrolysis (g/100g). */
  hydrolysis: number,
  /** Conversion to monosaccharide equivalent. */
  monosaccharide: number,
}
//#endregion




//#region GLOBALS
let corpus: Map<string, Carbohydrate> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the carbohydrates corpus from CSV file.
 * @param file CSV file path
 * @returns carbohydrates corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Carbohydrate>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const hydrolysis     = parseFloat(r.hydrolysis) || NaN;
    const monosaccharide = r.sno==='1'? 1 : parseFloat(r.monosaccharide.substring(2)) || NaN;
    map.set(r.sno, {sno: r.sno, carbohydrate: r.carbohydrate, hydrolysis, monosaccharide});
  }
  return map;
}


/**
 * Setup the lunr index for the carbohydrates corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Carbohydrate>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('sno');
    this.field('sno');
    this.field('carbohydrate');
    for (const r of corpus?.values() || [])
      this.add(r);
  });
}


/**
 * Load the carbohydrates corpus from the file.
 * @returns carbohydrates corpus
 */
export async function loadCarbohydrates(): Promise<Map<string, Carbohydrate>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(carbohydratesCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the carbohydrates CSV file.
 * @returns CSV file URL
 */
export function carbohydratesCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the carbohydrates table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function carbohydratesSql(tab: string="carbohydrates", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {sno: "TEXT", carbohydrate: "TEXT", hydrolysis: "REAL", monosaccharide: "TEXT"},
    (await loadCarbohydrates()).values() as Iterable<RowData>,
    Object.assign({pk: "sno", index: true, tsvector: {sno: "A", carbohydrate: "B"}}, opt));
}


/**
 * Find matching carbohydrates of an sno/carbohydrate query.
 * @param txt sno/carbohydrate query
 * @returns matches `[{sno, carbohydrate, hydrolysis, monosaccharide}]`
 * @example
 * ```javascript
 * ifct2017.carbohydrates('monosaccharide');
 * ifct2017.carbohydrates('Glucose');
 * // → [ { sno: '1',
 * // →     carbohydrate: 'Monosaccharides e.g. glucose',
 * // →     hydrolysis: 100,
 * // →     monosaccharide: 1 } ]
 *
 * ifct2017.carbohydrates('what is carbohydrate conversion factor of disaccharides?');
 * ifct2017.carbohydrates('maltose conversion factor');
 * // → [ { sno: '2',
 * // →     carbohydrate: 'Disaccharides e.g. sucrose, lactose, maltose',
 * // →     hydrolysis: 105,
 * // →     monosaccharide: 1.05 } ]
 * ```
 */
export function carbohydrates(txt: string): Carbohydrate[] {
  if (index == null) return [];
  const a: Carbohydrate[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Carbohydrate);
  return a;
}
//#endregion
