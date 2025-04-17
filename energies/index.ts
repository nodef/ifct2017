// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Metabolizable energy conversion factor. */
export interface Energy {
  /** Component. */
  component: string,
  /** kJ/g. */
  kj: number,
  /** kcal/g. */
  kcal: number
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Energy> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the energies corpus from CSV file.
 * @param file CSV file path
 * @returns energies corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Energy>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const kj   = parseFloat(r.kj);
    const kcal = parseFloat(r.kcal);
    map.set(r.component, {component: r.component, kj, kcal});
  }
  return map;
}


/**
 * Setup the lunr index for the energies corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Energy>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('component');
    this.field('component');
    for (const r of corpus.values())
      this.add(r);
  });
}


/**
 * Load the energies corpus from the file.
 * @returns energies corpus
 */
export async function loadEnergies(): Promise<Map<string, Energy>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(energiesCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the energies CSV file.
 * @returns CSV file URL
 */
export function energiesCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the energies table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function energiesSql(tab: string="energies", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {component: "TEXT", kj: "REAL", kcal: "REAL"},
    (await loadEnergies()).values() as Iterable<RowData>,
    Object.assign({pk: "component", index: true, tsvector: {component: "A"}}, opt));
}


/**
 * Finds matching energies of a component query.
 * @param txt component query
 * @returns matches `[{component, kj, kcal}]`
 * ```javascript
 * ifct2017.energies('dietary fibre');
 * ifct2017.energies('Soluble fibre');
 * // → [ { component: 'Fibre', kj: 8, kcal: 2 } ]
 *
 * ifct2017.energies('what is energy conversion factor of fat?');
 * ifct2017.energies('conversion factor of fat');
 * // → [ { component: 'Fat', kj: 37, kcal: 9 } ]
 * ```
 */
export function energies(txt: string): Energy[] {
  if (index == null) return [];
  const a: Energy[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Energy);
  return a;
}
//#endregion
