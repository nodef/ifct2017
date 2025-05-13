// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import type {Composition} from "../compositions/index.ts";



//#region TYPES
/** Type of the composition stats. */
export type CompositionStatType = "min" | "max" | "avg";
//#endregion




//#region CONSTANTS
const TEXTCOLS = new Set(['code', 'name', 'scie', 'lang', 'grup', 'tags']);
//#endregion




//#region GLOBALS
let corpus: Map<string, Composition> | null = null;
//#endregion




//#region FUNCTIONS
// Parse a row from the CSV file.
function parseRow(row: Record<string, string>) {
  const a: Record<string, string | number> = {};
  for (const k in row) {
    // Name of column is after the last semicolon.
    const l = k.substring(k.lastIndexOf(';')+1).trim();
    a[l] = TEXTCOLS.has(l)? row[k] : parseFloat(row[k]);
  }
  return a;
}


/**
 * Load the compositions corpus from CSV file.
 * @param file CSV file path
 * @returns compositions corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Composition>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.code, parseRow(r) as unknown as Composition);
  return map;
}


/**
 * Load the compositions corpus from the file.
 * @returns compositions corpus
 */
export async function loadCompositionStats(): Promise<Map<string, Composition>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(compositionStatsCsv());
  return corpus;
}


/**
 * Get the path to the compositions stats CSV file.
 * @returns CSV file URL
 */
export function compositionStatsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Find the minimum, maximum, or average composition of all the foods.
 * @param type type of the composition stats (min/max/avg)
 * @returns composition stat (minimum, maximum, or average)
 * @example
 * ```javascript
 * ifct2017.compositionsStats('max');
 * // → { code: 'XMAX',
 * // →   name: 'Maximum composition of all foods',
 * // →   scie: '',
 * // →   lang: '',
 * // →   grup: '',
 * // →   regn: 0,
 * // →   tags: '',
 * // →   enerc: 2809,
 * // →   enerc_e: 86,
 * // →   water: 95.77,
 * // →   water_e: 2.78,
 * // →   ... } ]
 * ```
 */
export function compositionStats(type: CompositionStatType): Composition[] {
  if (corpus == null) return [];
  switch (type) {
    case 'min': return [corpus.get('XMIN') as Composition];
    case 'max': return [corpus.get('XMAX') as Composition];
    case 'avg': return [corpus.get('XAVG') as Composition];
    default: return [];
  }
}
//#endregion
