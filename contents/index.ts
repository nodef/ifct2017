// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Content in the original book. */
export interface Content {
  /** S. No. */
  sno: string,
  /** Title. */
  title: string,
  /** Page Nos. */
  pagenos: string
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Content> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the contents corpus from CSV file.
 * @param file CSV file path
 * @returns contents corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Content>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.sno, r as unknown as Content);
  return map;
}


/**
 * Setup the lunr index for the contents corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Content>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('sno');
    this.field('sno');
    this.field('title');
    this.field('pagenos');
    for (const r of corpus.values())
      this.add(r);
  });
}


/**
 * Load the contents corpus from the file.
 * @returns contents corpus
 */
export async function loadContents(): Promise<Map<string, Content>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(contentsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the contents CSV file.
 * @returns CSV file URL
 */
export function contentsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the contents table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function contentsSql(tab: string="contents", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {sno: "TEXT", title: "TEXT", pagenos: "TEXT"},
    (await loadContents()).values() as Iterable<RowData>,
    Object.assign({pk: "sno", index: true, tsvector: {sno: "A", title: "B", pagenos: "C"}}, opt));
}


/**
 * Find matching contents of an sno/title/pagenos query.
 * @param txt sno/title/pagenos query
 * @returns matches `[{sno, title, pagenos}]`
 * @example
 * ```javascript
 * ifct2017.contents('table 2');
 * ifct2017.contents('Water soluble vitamins');
 * // → [ { sno: '6.2.',
 * // →     title: 'Table 2:  Water Soluble Vitamins',
 * // →     pagenos: '31' } ]
 *
 * ifct2017.contents('what is page number of table 3?');
 * ifct2017.contents('fat soluble vitamin page number');
 * // → [ { sno: '6.3.',
 * // →     title: 'Table 3:  Fat Soluble Vitamins',
 * // →     pagenos: '61' } ]
 * ```
 */
export function contents(txt: string): Content[] {
  if (index == null) return [];
  const a: Content[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Content);
  return a;
}
//#endregion
