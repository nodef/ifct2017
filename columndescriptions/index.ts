// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Code, name, short, and long description of a column. */
export interface ColumnDescription {
  /** Column Code. */
  code: string,
  /** Column Name. */
  name: string,
  /** Short description. */
  shortdesc: string,
  /** Long description. */
  longdesc: string,
}
//#endregion




//#region GLOBALS
let corpus: Map<string, ColumnDescription> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the column descriptions corpus from CSV file.
 * @param file CSV file path
 * @returns column descriptions corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, ColumnDescription>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.code, r as unknown as ColumnDescription);
  return map;
}


/**
 * Setup the lunr index for the column descriptions corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, ColumnDescription>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('code');
    this.field('code', {boost: 3});
    this.field('name', {boost: 2});
    this.field('shortdesc');
    this.field('longdesc');
    this.pipeline.remove(lunr.stopWordFilter);
    for (const {code, name, shortdesc, longdesc} of corpus.values())
      this.add({code, name: name.replace(/\W/g, ' '), shortdesc, longdesc});
  });
}


/**
 * Load the column descriptions corpus from the file.
 * @returns column descriptions corpus
 */
export async function loadColumnDescriptions(): Promise<Map<string, ColumnDescription>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(columnDescriptionsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the column descriptions CSV file.
 * @returns CSV file URL
 */
export function columnDescriptionsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the columns table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function columnDescriptionsSql(tab: string="columns", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", name: "TEXT", shortdesc: "TEXT", longdesc: "TEXT"},
    (await loadColumnDescriptions()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", name: "B", shortdesc: "C", longdesc: "D"}}, opt));
}


/**
 * Find matching columns of an code/name/shortdesc/longdesc query.
 * @param txt code/name/shortdesc/longdesc query
 * @returns matches `[{code, name, shortdesc, longdesc}]`
 * @example
 * ```javascript
 * ifct2017.columnDescriptions('vitamin c');
 * ifct2017.columnDescriptions('c-vitamin');
 * // → [ { code: 'vitc',
 * // →     name: 'Ascorbic acids (C)',
 * // →     shortdesc: 'Collagen production, antioxidant. Deficiency: scurvy (bleeding gums).',
 * // →     longdesc: 'An essential vitamin and antioxidant that protects cells, maintains healthy skin, blood vessels, bones, and cartilage, and aids in wound healing. It also improves iron absorption. Lack of Vitamin C can lead to scurvy.' },
 * // → ... ]
 *
 * ifct2017.columnDescriptions('what is butyric acid?');
 * ifct2017.columnDescriptions('c4:0 stands for?');
 * // → [ { code: 'f4d0',
 * // →     name: 'Butyric acid (C4:0)',
 * // →     shortdesc: 'Short-chain fatty acid; colon health/energy for gut cells.',
 * // →     longdesc: 'A short-chain saturated fatty acid with a 4-carbon backbone. It's produced in the colon when dietary fibers are fermented by gut bacteria. Butyrate serves as a primary energy source for colonocytes (cells lining the colon) and has anti-inflammatory properties, playing a role in gut health.' },
 * // → ... ]
 * ```
 */
export function columnDescriptions(txt: string): ColumnDescription[] {
  if (index == null) return [];
  const a: ColumnDescription[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as ColumnDescription);
  return a;
}
//#endregion
