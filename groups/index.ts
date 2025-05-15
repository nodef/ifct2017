// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Categorization of food by its common names. */
export interface Group {
  /** Code. */
  code: string,
  /** Food groups. */
  group: string,
  /** No. of food entries. */
  entries: number,
  /** Tags. */
  tags: string
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Group> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the groups corpus from CSV file.
 * @param file CSV file path
 * @returns groups corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Group>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const entries = parseInt(r.entries, 10);
    map.set(r.code, {code: r.code, group: r.group, entries, tags: r.tags});
  }
  return map;
}


/**
 * Setup the lunr index for the groups corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Group>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('code');
    this.field('code');
    this.field('group');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for (const r of corpus.values())
      this.add(r);
  });
}


/**
 * Load the groups corpus from the file.
 * @returns groups corpus
 */
export async function loadGroups(): Promise<Map<string, Group>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(groupsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the groups CSV file.
 * @returns CSV file URL
 */
export function groupsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the groups table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function groupsSql(tab: string="groups", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", group: "TEXT", entries: "INT", tags: "TEXT"},
    (await loadGroups()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", group: "B", tags: "C"}}, opt));
}


/**
 * Find matching groups of an code/group/tags query.
 * @param txt code/group/tags query
 * @returns matches `[{code, group, entries, tags}]`
 * @example
 * ```javascript
 * ifct2017.groups('cereals');
 * ifct2017.groups('Millet');
 * // → [ { code: 'A',
 * // →     group: 'Cereals and Millets',
 * // →     entries: 24,
 * // →     tags: 'vegetarian eggetarian fishetarian veg' } ]
 *
 * ifct2017.groups('what is vegetable?');
 * ifct2017.groups('vegetable group code?');
 * // → [ { code: 'D',
 * // →     group: 'Other Vegetables',
 * // →     entries: 78,
 * // →     tags: 'vegetarian eggetarian fishetarian veg' },
 * // →   { code: 'C',
 * // →     group: 'Green Leafy Vegetables',
 * // →     entries: 34,
 * // →     tags: 'vegetarian eggetarian fishetarian veg' } ]
 * ```
 */
export function groups(txt: string): Group[] {
  if (index == null) return [];
  const a: Group[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Group);
  return a;
}
//#endregion
