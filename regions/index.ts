// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Categorization of the States/UTs into six different regions. */
export interface Region {
  /** Region. */
  region: string,
  /** States/UTs. */
  states: string
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Region> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the regions corpus from CSV file.
 * @param file CSV file path
 * @returns regions corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Region>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.region, r as unknown as Region);
  return map;
}


/**
 * Setup the lunr index for the regions corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Region>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('region');
    this.field('region');
    this.field('states');
    for (const r of corpus.values())
      this.add({region: r.region, states: r.states.replace(/\W/g, ' ')});
  });
}


/**
 * Load the regions corpus from the file.
 * @returns regions corpus
 */
export async function loadRegions(): Promise<Map<string, Region>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(regionsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the regions CSV file.
 * @returns CSV file URL
 */
export function regionsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the regions table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function regionsSql(tab: string="regions", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {region: "TEXT", states: "TEXT"},
    (await loadRegions()).values() as Iterable<RowData>,
    Object.assign({pk: "region", index: true, tsvector: {region: "A", states: "B"}}, opt));
}


/**
 * Find matching regions of a region/states query.
 * @param txt region/states query
 * @returns matches `[{region, states}]`
 * @example
 * ```javascript
 * ifct2017.regions('central');
 * ifct2017.regions('Uttaranchal');
 * // → [ { region: 'Central',
 * // →     states: 'Chhattisgarh;Madhya Pradesh;Uttar Pradesh;Uttaranchal' } ]
 *
 * ifct2017.regions('which region andhra pradesh belongs to?');
 * ifct2017.regions('details of south region');
 * // → [ { region: 'South',
 * // →     states: 'Andaman & Nicobar Islands;Andhra Pradesh;Karnataka;Kerala;Lakshadweep;Pondicherry;Telangana;Tamil Nadu' } ]
 * ```
 */
export function regions(txt: string): Region[] {
  if (index == null) return [];
  const a: Region[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Region);
  return a;
}
//#endregion
