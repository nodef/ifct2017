// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Primary sampling unit of each State/UT. */
export interface SamplingUnit {
  /** Sl. No. */
  sno: string,
  /** State name. */
  state: string,
  /** Total No. of Districts. */
  districts: number,
  /** Districts Selected. */
  selected: number
};
//#endregion




//#region GLOBALS
let corpus: Map<string, SamplingUnit> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the sampling units corpus from CSV file.
 * @param file CSV file path
 * @returns sampling units corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, SamplingUnit>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const districts = parseInt(r.districts, 10);
    const selected  = parseInt(r.selected, 10);
    map.set(r.sno, {sno: r.sno, state: r.state, districts, selected});
  }
  return map;
}


/**
 * Setup the lunr index for the sampling units corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, SamplingUnit>) {
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
 * Load the sampling units corpus from the file.
 * @returns sampling units corpus
 */
export async function loadSamplingUnits(): Promise<Map<string, SamplingUnit>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(samplingUnitsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the sampling units CSV file.
 * @returns CSV file URL
 */
export function samplingUnitsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the sampling units table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function samplingUnitsSql(tab: string="samplingunits", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {sno: "TEXT", state: "TEXT", districts: "INT", selected: "INT"},
    (await loadSamplingUnits()).values() as Iterable<RowData>,
    Object.assign({pk: "sno", index: true, tsvector: {sno: "A", state: "B"}}, opt));
}


/**
 * Find matching sampling units of an sno/state query.
 * @param txt sno/state query
 * @returns matches `[{sno, state, districts, selected}]`
 * @example
 * ```javascript
 * ifct2017.samplingUnits('andaman');
 * ifct2017.samplingUnits('Nicobar');
 * // → [ { sno: 'A',
 * // →     state: 'Andaman & Nicobar',
 * // →     districts: 3,
 * // →     selected: 1 } ]
 *
 * ifct2017.samplingUnits('sampling units in orissa?');
 * ifct2017.samplingUnits('orissa\'s sampling units');
 * // → [ { sno: '20', state: 'Orissa', districts: 30, selected: 4 } ]
 * ```
 */
export function samplingUnits(txt: string): SamplingUnit[] {
  if (index == null) return [];
  const a: SamplingUnit[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as SamplingUnit);
  return a;
}
//#endregion
