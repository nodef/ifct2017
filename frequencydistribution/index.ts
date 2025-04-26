// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Frequency of States/UTs for fixing the number of districts to be sampled. */
export interface Frequency {
  /** No. of Districts. */
  districts: string,
  /** No. of States/UTs. */
  states: number,
  /** No. of districts to be selected from each State/UT. */
  selected: number,
  /** Total No. of districts to be sampled. */
  sampled: number
};
//#endregion




//#region GLOBALS
let corpus: Map<number, Frequency> | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the frequency distribution corpus from CSV file.
 * @param file CSV file path
 * @returns frequency distribution corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<number, Frequency>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const states   = parseFloat(r.states);
    const selected = parseFloat(r.selected);
    const sampled  = parseFloat(r.sampled);
    const key = parseFloat(r.districts.split('-')[0].replace(/\D/g, ''));
    map.set(key===70? 71 : key, {districts: r.districts, states, selected, sampled});
  }
  return map;
}


/**
 * Load the frequency distribution corpus from the file.
 * @returns frequency distribution corpus
 */
export async function loadFrequencyDistribution(): Promise<Map<number, Frequency>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(frequencyDistributionCsv());
  return corpus;
}


/**
 * Get the path to the frequency distribution CSV file.
 * @returns CSV file URL
 */
export function frequencyDistributionCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the frequency distribution table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function frequencyDistributionSql(tab: string="frequencydistribution", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {districts: "TEXT", states: "INT", selected: "INT", sampled: "INT"},
    (await loadFrequencyDistribution()).values() as Iterable<RowData>,
    Object.assign({pk: "districts", index: true, tsvector: {districts: "A"}}, opt));
}


/**
 * Find matching frequency distribution for a given no. of districts.
 * @param dis no. of districts
 * @returns `{districts, states, selected, sampled}` if found, else null
 * @example
 * ```javascript
 * ifct2017.frequencyDistribution(2);
 * ifct2017.frequencyDistribution(5);
 * // → { districts: '1-5', states: 9, selected: 1, sampled: 9 }
 *
 * ifct2017.frequencyDistribution(32);
 * ifct2017.frequencyDistribution(37);
 * // → { districts: '31-40', states: 4, selected: 5, sampled: 20 }
 * ```
 */
export function frequencyDistribution(dis: number): Frequency | null {
  if (corpus == null) return null;
  if (dis <= 5)  return corpus.get(1)  || null;
  if (dis <= 10) return corpus.get(6)  || null;
  if (dis > 70)  return corpus.get(71) || null;
  return corpus.get(Math.floor((dis-1)/10)*10 + 1) || null;
}
//#endregion
