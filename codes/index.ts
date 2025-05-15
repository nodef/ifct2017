// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Uniquely identifiable code for each food. */
export interface Code {
  /** Food Name. */
  name: string,
  /** Food Code. */
  code: string
}
//#endregion




//#region GLOBALS
let corpus: Map<string, Code> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the codes corpus from CSV file.
 * @param file CSV file path
 * @returns codes corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Code>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.name, r as unknown as Code);
  return map;
}


/**
 * Setup the lunr index for the codes corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Code>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('key');
    this.field('name');
    this.field('code');
    this.pipeline.remove(lunr.stopWordFilter);
    for (const r of corpus?.values() || [])
      this.add({key: r.name, name: r.name.replace(/\W+/g, ' '), code: r.code});
  });
}


/**
 * Load the codes corpus from the file.
 * @returns codes corpus
 */
export async function loadCodes(): Promise<Map<string, Code>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(codesCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the codes CSV file.
 * @returns CSV file URL
 */
export function codesCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the codes table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function codesSql(tab: string="codes", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {name: "TEXT", code: "TEXT"},
    (await loadCodes()).values() as Iterable<RowData>,
    Object.assign({pk: "name", index: true, tsvector: {name: "A", code: "B"}}, opt));
}


/**
 * Find matching codes of an name/code query.
 * @param txt name/code query
 * @returns matches `[{name, code}]`
 * @example
 * ```javascript
 * codes('mango green');
 * codes('Raw mango');
 * // → [ { name: 'Mango, green, raw (Common)', code: 'D057' } ]
 *
 * codes('what is food code of atta?');
 * codes('atta code');
 * // → [ { name: 'Atta (H., P.)', code: 'A019' },
 * // →   { name: 'Gahama atta (O.)', code: 'A019' },
 * // →   { name: 'Wheat flour, atta (Common)', code: 'A019' } ]
 * ```
 */
export function codes(txt: string): Code[] {
  if (index == null) return [];
  const a: Code[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Code);
  return a;
}
//#endregion
