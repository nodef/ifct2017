// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";
import {loadColumns, columns} from "../columns/index.ts";




//#region TYPES
/** Representation of a column (as factor and unit). */
export interface Representation {
  /** Column Code. */
  code: string,
  /** Type of physical quantity. */
  type: string,
  /** Multiplication factor. */
  factor: number,
  /** Unit symbol. */
  unit: string;
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Representation> | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the representations corpus from CSV file.
 * @param file CSV file path
 * @returns representations corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Representation>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const factor = parseFloat(r.factor) || 1;
    map.set(r.code, {code: r.code, type: r.type, factor, unit: r.unit});
  }
  return map;
}


/**
 * Load the representations corpus from the file.
 * @returns representations corpus
 */
export async function loadRepresentations(): Promise<Map<string, Representation>> {
  if (corpus) return corpus;
  const p = loadColumns();
  corpus = await loadFromCsv(representationsCsv()); await p;
  return corpus;
}


/**
 * Get the path to the representations CSV file.
 * @returns CSV file URL
 */
export function representationsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the representations table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function representationsSql(tab: string="representations", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", type: "TEXT", factor: "REAL", unit: "TEXT"},
    (await loadRepresentations()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", type: "B", unit: "C"}}, opt));
}


/**
 * Find matching representations of a column:code/name/tags query.
 * @param txt column:code/name/tags query
 * @returns `{code, type, factor, unit}` if found, else null
 * @example
 * ```javascript
 * ifct2017.representations('his');
 * ifct2017.representations('Histidine');
 * // → { type: 'mass', factor: 1000, unit: 'mg' }
 *
 * ifct2017.representations('representation of vitamin d?');
 * ifct2017.representations('what is unit of ergocalciferol?');
 * // → { type: 'mass', factor: 1000000000, unit: 'ng' }
 * ```
 */
export function representations(txt: string): Representation | null {
  if (corpus == null) return null;
  const ms = columns(txt);
  if (ms.length===0) return null;
  return corpus.get(ms[0].code)||null;
}
//#endregion
