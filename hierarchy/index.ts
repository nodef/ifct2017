// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";
import {loadColumns, columns} from "../columns/index.ts";




//#region TYPES
/** Tree-like hierarchy of a nutrient. */
export interface Hierarchy {
  /** Column code. */
  code: string,
  /** List of Parent columns, space separated. */
  parents: string,
  /** List of Ancestor columns, space separated. */
  ancestry: string,
  /** List of Child columns, space separated. */
  children: string,
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Hierarchy> | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the hierarchy corpus from CSV file.
 * @param file CSV file path
 * @returns hierarchy corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Hierarchy>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.code, r as unknown as Hierarchy);
  return map;
}


/**
 * Setup the lunr index for the hierarchy corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Hierarchy>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('sno');
    this.field('sno');
    this.field('state');
    // this.pipeline.remove(lunr.stopWordFilter);
    for (const r of corpus.values())
      this.add(r);
  });
}


/**
 * Load the hierarchy corpus from the file.
 * @returns hierarchy corpus
 */
export async function loadHierarchy(): Promise<Map<string, Hierarchy>> {
  if (corpus) return corpus;
  const p = loadColumns();
  corpus = await loadFromCsv(hierarchyCsv()); await p;
  return corpus;
}


/**
 * Get the path to the hierarchy CSV file.
 * @returns CSV file URL
 */
export function hierarchyCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the hierarchy table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function hierarchySql(tab: string="hierarchy", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", parents: "TEXT", ancestry: "TEST", children: "TEXT"},
    (await loadHierarchy()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", parents: "B", ancestry: "C", children: "B"}}, opt));
}


/**
 * Find matching hierarchy of a column:code/name/tags query.
 * @param txt column:code/name/tags query
 * @returns `{code, parents, ancestry, children}` if found, else null
 * @example
 * ```javascript
 * ifct2017.hierarchy('soluble oxalic acid');
 * ifct2017.hierarchy('Soluble Oxalic Acid');
 * // → { parents: 'oxalt', ancestry: 'oxalt orgac', children: '' }
 *
 * ifct2017.hierarchy('what is hierarchy of total saturated fat?');
 * ifct2017.hierarchy('who are children of total saturated fat?');
 * // → { parents: 'fatce',
 * // →   ancestry: 'fatce',
 * // →   children:
 * // →    'f4d0 f6d0 f8d0 f10d0 f11d0 f12d0 f14d0 f15d0 f16d0 f18d0 f20d0 f22d0 f24d0' }
 * ```
 */
export function hierarchy(txt: string): Hierarchy | null {
  if (corpus == null) return null;
  const cs = columns(txt);
  if (!cs.length) return null;
  return corpus.get(cs[0].code) || null;
}
//#endregion
