// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Code and name of a nutrient. */
export interface Column {
  /** Column Code. */
  code: string,
  /** Column Name. */
  name: string,
  /** Tags. */
  tags: string
}
//#endregion




//#region GLOBALS
let corpus: Map<string, Column> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the columns corpus from CSV file.
 * @param file CSV file path
 * @returns columns corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Column>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.code, r as unknown as Column);
  return map;
}


/**
 * Setup the lunr index for the columns corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Column>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('code');
    this.field('code', {boost: 3});
    this.field('name', {boost: 2});
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for (const {code, name, tags} of corpus.values())
      this.add({code, name: name.replace(/\W/g, ' '), tags});
  });
}


/**
 * Load the columns corpus from the file.
 * @returns columns corpus
 */
export async function loadColumns(): Promise<Map<string, Column>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(columnsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the columns CSV file.
 * @returns CSV file URL
 */
export function columnsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the columns table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function columnsSql(tab: string="columns", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", name: "TEXT", tags: "TEXT"},
    (await loadColumns()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", name: "B", tags: "C"}}, opt));
}


/**
 * Find matching columns of an code/name/tags query.
 * @param txt code/name/tags query
 * @returns matches `[{code, name, tags}]`
 * @example
 * ```javascript
 * ifct2017.columns('vitamin c');
 * ifct2017.columns('c-vitamin');
 * // → [ { code: 'vitc',
 * // →     name: 'Total Ascorbic acid',
 * // →     tags: 'ascorbate water soluble vitamin c vitamin c essential' } ]
 *
 * ifct2017.columns('what is butyric acid?');
 * ifct2017.columns('c4:0 stands for?');
 * // → [ { code: 'f4d0',
 * // →     name: 'Butyric acid (C4:0)',
 * // →     tags: 'c40 c 40 4 0 bta butanoic propanecarboxylic carboxylic saturated fatty fat triglyceride lipid colorless liquid unpleasant vomit body odor' } ]
 * ```
 */
export function columns(txt: string): Column[] {
  if (index == null) return [];
  const a: Column[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Column);
  return a;
}
