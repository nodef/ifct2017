// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Full form of language abbreviation. */
export interface Language {
  /** Language. */
  lang: string,
  /** Abbreviation used. */
  abbr: string
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Language> | null = null;
let match: RegExp | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Create a regex to match the abbreviations in the corpus.
 * @param lst list of abbreviations to match
 * @returns a regex to match the abbreviations
 */
function createRegex(lst: Iterable<string>): RegExp {
  let a = '(^|\\W+)(';
  for (const v of lst)
    a += v.length>1? `${v}|`:`${v}\\.|`;
  a = a.substring(0, a.length-1);
  a += `)(\\W+|$)`;
  return new RegExp(a, 'i');
}


/**
 * Load the languages corpus from CSV file.
 * @param file CSV file path
 * @returns languages corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Language>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const key = r.abbr.replace(/\W/g, '').toLowerCase();
    map.set(key, r as unknown as Language);
  }
  return map;
}


/**
 * Load the languages corpus from the file.
 * @returns languages corpus
 */
export async function loadLanguages(): Promise<Map<string, Language>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(languagesCsv());
  match  = createRegex(corpus.keys());
  return corpus;
}


/**
 * Get the path to the languages CSV file.
 * @returns CSV file URL
 */
export function languagesCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the languages table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function languagesSql(tab: string="languages", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {abbr: "TEXT", lang: "TEXT"},
    (await loadLanguages()).values() as Iterable<RowData>,
    Object.assign({pk: "abbr", index: true, tsvector: {abbr: "A", lang: "B"}}, opt));
}


/**
 * Find matching languages of an abbr/lang query.
 * @param txt abbr/lang query
 * @returns `{abbr, lang}` if found, else null
 * @example
 * ```javascript
 * ifct2017.languages('mal.');
 * ifct2017.languages('Mal');
 * // → { abbr: 'Mal.', lang: 'Malayalam' }
 *
 * ifct2017.languages('what is s.?');
 * ifct2017.languages('S. stands for?');
 * // → { abbr: 'S.', lang: 'Sanskrit' }
 *
 *
 * // Note:
 * // Full stops must immediately follow character, if present.
 * // For single character abbreviations, full stop is mandatory.
 * ```
 */
export function languages(txt: string): Language | null {
  if (match==null) return null;
  const re = /((\w\s+|\w\.\s*|\w\-\s*|\w$)+)|\w+/g;
  txt = txt.replace(re, m => {
    const v = m.replace(/\W/g, '');
    return v.length===1? m.trim()+' ' : v+' ';
  }).toLowerCase();
  const m = txt.match(match);
  if (m==null) return null;
  return corpus?.get(m[2].replace('.', '')) || null;
}
//#endregion
