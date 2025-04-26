// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Full form of abbreviation used in the original book. */
export interface Abbreviation {
  /** Abbreviation, e.g., BRM. */
  abbr: string;
  /** Full form of the abbreviation, e.g., "Basal metabolic rate". */
  full: string;
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Abbreviation> | null = null;
let match: RegExp | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Create a regex to match the abbreviations in the corpus.
 * @param lst list of abbreviations to match
 * @returns a regex to match the abbreviations
 */
function createRegex(lst: Iterable<string>): RegExp {
  let a = '\\b(';
  for (const v of lst)
    a += v.length>1? `${v}|` : `${v}\\.|`;
  a = a.substring(0, a.length-1);
  a += `)\\b`;
  return new RegExp(a, 'i');
}


/**
 * Load the abbreviations corpus from CSV file.
 * @param file CSV file path
 * @returns abbreviations corpus
 */
async function loadFromCsv(file: string): Promise<Map<string, Abbreviation>> {
  const map  = new Map<string, Abbreviation>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const abbr = (r.abbr || "").toLowerCase().replace(/\W/g, "");
    map.set(abbr, r as unknown as Abbreviation);
  }
  return map;
}


/**
 * Load the abbreviations corpus from the file.
 * @returns abbreviations corpus {key ⇒ {abbr, full}}
 */
export async function loadAbbreviations(): Promise<Map<string, Abbreviation>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(abbreviationsCsv());
  match  = createRegex(corpus.keys());
  return corpus;
}


/**
 * Get the path to the abbreviations CSV file.
 * @returns CSV file URL
 */
export function abbreviationsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the abbreviations table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function abbreviationsSql(tab: string="abbreviations", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {abbr: "TEXT", full: "TEXT"}, (await loadAbbreviations()).values() as Iterable<RowData>,
    Object.assign({pk: "abbr", index: true, tsvector: {abbr: "A", full: "B"}}, opt));
}


/**
 * Find matching full form of an abbreviation query.
 * @param txt abbreviation query
 * @returns `{abbr, full}` if found, null otherwise
 * @example
 * ```javascript
 * abbreviations('GLV');
 * abbreviations('g l v');
 * // { abbr: 'GLV', full: 'Green Leafy Vegetables' }
 *
 * abbreviations('what is D.R.I.');
 * abbreviations('d. r. i. stands for?');
 * // { abbr: 'DRI', full: 'Dietary reference intake' }
 *
 *
 * // Note:
 * // for single character abbreviations, full stop is mandatory
 * // full stops must immediately follow character, if present
 * ```
 */
export function abbreviations(txt: string): Abbreviation | null {
  const re = /((\w\s+|\w\.\s*|\w\-\s*|\w$)+)|\w+/g;
  if (match == null) return null;
  txt = txt.replace(re, (m) => {
    const v = m.replace(/\W/g, '');
    return v.length === 1? `${m.trim()} ` : `${v} `
  }).toLowerCase();
  const m = txt.match(match) || txt.replace(/\b(\w+)s\b/g, '$1').match(match);
  if (m == null) return null;
  return corpus?.get(m[1].replace('.', '')) || null;
}
//#endregion
