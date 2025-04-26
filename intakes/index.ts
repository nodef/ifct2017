// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";
import {loadColumns, columns} from "../columns/index.ts";




//#region TYPES
/** Recommended daily intakes of nutrient. */
export interface Intake {
  /** Column Code. */
  code: string,
  /** WHO Recommended Dietary Allowance. */
  whorda: number,
  /** US Estimated Average Requirement. */
  usear: number,
  /** US Recommended Dietary Allowance (Male). */
  usrdam: number,
  /** US Recommended Dietary Allowance (Female). */
  usrdaf: number,
  /** EU Population Reference Intake (Male). */
  euprim: number,
  /** EU Population Reference Intake (Female). */
  euprif: number,
  /** Tolerable intake Upper Level (US). */
  ulus: number,
  /** Tolerable intake Upper Level (EU). */
  uleu: number,
  /** Tolerable intake Upper Level (Japan). */
  uljapan: number
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Intake> | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the intakes corpus from CSV file.
 * @param file CSV file path
 * @returns intakes corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Intake>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const s: Record<string, string | number> = {};
    for (const k in r)
      s[k] = k==="code"? r[k] : parseFloat(r[k]);
    map.set(r.code, s as unknown as Intake);
  }
  return map;
}


/**
 * Load the intakes corpus from the file.
 * @returns intakes corpus
 */
export async function loadIntakes(): Promise<Map<string, Intake>> {
  if (corpus) return corpus;
  const p = loadColumns();
  corpus = await loadFromCsv(intakesCsv()); await p;
  return corpus;
}


/**
 * Get the path to the intakes CSV file.
 * @returns CSV file URL
 */
export function intakesCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the intakes table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function intakesSql(tab: string="intakes", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", whorda: "REAL", usear: "REAL", usrdam: "REAL",
    usrdaf: "REAL", euprim: "REAL", euprif: "REAL", ulus: "REAL", uleu: "REAL", uljapan: "REAL"},
    (await loadIntakes()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A"}}, opt));
}


/**
 * Find matching intakes of an column:code/name/tags query.
 * @param txt column:code/name/tags query
 * @returns matches `[{code, whorda, usear, usrdam, usrdaf, euprim, euprif, ulus, uleu, uljapan}]`
 * @example
 * ```javascript
 * ifct2017.intakes('his');
 * ifct2017.intakes('Histidine');
 * // → [{ code: 'his',
 * // →    whorda: -0.01,
 * // →    usear: NaN,
 * // →    usrdam: -0.014,
 * // →    usrdaf: NaN,
 * // →    euprim: NaN,
 * // →    euprif: NaN,
 * // →    ulus: NaN,
 * // →    uleu: NaN,
 * // →    uljapan: NaN }]
 *
 * ifct2017.intakes('intake of total fibre?');
 * ifct2017.intakes('what is rda of total fiber?');
 * // → [{ code: 'fibtg',
 * // →    whorda: NaN,
 * // →    usear: NaN,
 * // →    usrdam: 38,
 * // →    usrdaf: 25,
 * // →    euprim: NaN,
 * // →    euprif: NaN,
 * // →    ulus: NaN,
 * // →    uleu: NaN,
 * // →    uljapan: NaN }]
 *
 *
 * // Note:
 * // +ve value indicates amount in grams.
 * // -ve value indicates amount in grams per kg of body weight.
 * // NaN indicates no recommentation given.
 * ```
 */
export function intakes(txt: string): Intake[] {
  if (corpus == null) return [];
  return columns(txt).map(r => corpus?.get(r.code) as Intake);
}
//#endregion
