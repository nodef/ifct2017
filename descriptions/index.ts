// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Name of food in local languages, including scientific name. */
export interface Description {
  /** Food Code. */
  code: string,
  /** Food Name. */
  name: string,
  /** Scientific Name. */
  scie: string,
  /** Food Group. */
  grup: string,
  /** Description (local names). */
  desc: string
};
//#endregion




//#region GLOBALS
let corpus: Map<string, Description> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the descriptions corpus from CSV file.
 * @param file CSV file path
 * @returns descriptions corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, Description>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records)
    map.set(r.code, r as unknown as Description);
  return map;
}


/**
 * Setup the lunr index for the descriptions corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, Description>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('code');
    this.field('code');
    this.field('name');
    this.field('scie');
    this.field('grup');
    this.field('desc');
    for (const r of corpus.values()) {
      let {code, name, scie, grup, desc} = r;
      name = name.replace(/^(\w+),/g, '$1 $1 $1 $1,');
      desc = desc.replace(/\[.*?\]/g, '').replace(/\w+\.\s([\w\',\/\(\)\- ]+)[;\.]?/g, '$1');
      desc = desc.replace(/[,\/\(\)\- ]+/g, ' ').trim();
      this.add({code, name, scie, grup, desc});
    }
  });
}


/**
 * Load the descriptions corpus from the file.
 * @returns descriptions corpus
 */
export async function loadDescriptions(): Promise<Map<string, Description>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(descriptionsCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the descriptions CSV file.
 * @returns CSV file URL
 */
export function descriptionsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the descriptions table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function descriptionsSql(tab: string="descriptions", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {code: "TEXT", name: "TEXT", scie: "TEXT", grup: "TEXT", desc: "TEXT"},
    (await loadDescriptions()).values() as Iterable<RowData>,
    Object.assign({pk: "code", index: true, tsvector: {code: "A", name: "B", scie: "B", grup: "C", desc: "B"}}, opt));
}


/**
 * Find matching descriptions of an code/name/scie/desc query.
 * @param txt code/name/scie/desc query
 * @returns matches `[{code, name, scie, grup, desc}]`
 * @example
 * ```javascript
 * ifct2017.descriptions('pineapple');
 * ifct2017.descriptions('ananas comosus');
 * // → [ { code: 'E053',
 * // →     name: 'Pineapple',
 * // →     scie: 'Ananas comosus',
 * // →     grup: 'Fruits',
 * // →     desc: 'A. Ahnaros; B. Anarasa; G. Anenas; H. Ananas; Kan. Ananas; Kash. Punchitipul; Kh. Soh trun; Kon. Anas; Mal. Kayirha chakka; M. Kihom Ananas; O. Sapuri; P. Ananas; Tam. Annasi pazham; Tel. Anasa pandu; U. Ananas.' } ]
 *
 * ifct2017.descriptions('tell me about cow milk.');
 * ifct2017.descriptions('gai ka doodh details.');
 * // → [ { code: 'L002',
 * // →     name: 'Milk, Cow',
 * // →     scie: '',
 * // →     grup: 'Milk and Milk Products',
 * // →     desc: 'A. Garoor gakhir; B. Doodh (garu); G. Gai nu dhudh; H. Gai ka doodh; Kan. Hasuvina halu; Kash. Doodh; Kh. Dud masi; M. San Sanghom; Mar. Doodh (gay); O. Gai dudha; P. Gaan da doodh; S. Gow kshiram; Tam. Pasumpaal; Tel. Aavu paalu.' } ]
 * ```
 */
export function descriptions(txt: string): Description[] {
  if (index == null) return [];
  const a: Description[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as Description);
  return a;
}
//#endregion
