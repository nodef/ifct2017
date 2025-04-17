// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";
import {loadColumns, columns} from "../columns/index.ts";




//#region TYPES
/** Analytical methods for nutrient and bioactive component. */
export interface Method {
  /** Analyte. */
  analyte: string,
  /** Method. */
  method: string,
  /** Reference. */
  reference: string
};
//#endregion




//#region CONSTANTS
const OVERRIDE = new Map([
  ['crypxb',  'Carotenoids'],
  ['cartg',   'Carotenoids'],
  ['carta',   'Carotenoids'],
  ['cartb',   'Carotenoids'],
  ['cholc',   'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['phytac',  'Phyates'],
  ['vitb',    null],
  ['vitd',    'Vitamin D2 & D3'],
  ['vitk',    'Vitamin K1 & K2'],
  ['olsac',   'Oligosaccharides (Raffinose, Stachyose, Verbascose and Ajugose)'],
  ['phystr',  'Stigmasterol, β-Sitosterol, Campesterol, Ergosterol, 5-alpha-Cholestenol'],
  ['mnrleq',  null],
  ['mnrlet',  null],
  ['mnrlpet', null],
  ['mnrlnet', null],
  ['mnrltx',  null],
  ['vit',     null],
]);
//#endregion




//#region GLOBALS
let corpus: Map<string, Method> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
function bestMatchIndex(index: lunr.Index, analyte: string) {
  const txt = analyte.replace(/\W/g, ' ');
  const ms  = index.search(txt); let max = 0;
  for (const m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (const m of ms)
    if (Object.keys(m.matchData.metadata).length===max) return m.ref;
  return -1;
}


/**
 * Load the methods corpus from CSV file.
 * @param file CSV file path
 * @returns methods corpus
 */
async function loadFromCsv(records: Method[], index: lunr.Index) {
  const map = new Map<string, Method>();
  const ccolumns = await loadColumns(); let i = -1;
  for (const c of ccolumns.values()) {
    if (OVERRIDE.has(c.code)) {
      const analyte = OVERRIDE.get(c.code);
      i = analyte!=null? bestMatchIndex(index, analyte) : -1;
    }
    else {
      let tags = `${c.code} ${c.code} ${c.code} ${c.name} ${c.name} ${c.tags}`;
      tags = tags.replace(/\W+/g, ' ').toLowerCase().trim();
      i = bestMatchIndex(index, tags);
      // if (c.code==='as') console.log(c, tags, ms);
    }
    if (i >= 0) map.set(c.code, records[i]);
    // if (index>=0) console.log(c.code, '->', array[index].analyte, tags);
    // if (c.code==='facis') console.log(ms);
  }
  return map;
}


/**
 * Setup the lunr index for the methods corpus.
 * @param records records from CSV file
 * @returns lunr index
 */
function setupIndex(records: Method[]) {
  return lunr(function(this: lunr.Builder) {
    this.ref('index');
    this.field('analyte');
    this.pipeline.remove(lunr.stopWordFilter);
    for (let i=0, I=records.length; i<I; i++)
      this.add({index: i, analyte: records[i].analyte.replace(/\W+/g, ' ')});
  });
}


/**
 * Load the methods corpus from the file.
 * @returns methods corpus
 */
export async function loadMethods(): Promise<Map<string, Method>> {
  if (corpus) return corpus;
  const data = await (await fetch(methodsCsv())).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: '#'}) as unknown as Method[];
  index  = setupIndex(records);
  corpus = await loadFromCsv(records, index);
  return corpus;
}


/**
 * Get the path to the methods CSV file.
 * @returns CSV file URL
 */
export function methodsCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the methods table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function methodsSql(tab: string="methods", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {analyte: "TEXT", method: "TEXT", reference: "TEXT"},
    (await loadMethods()).values() as Iterable<RowData>,
    Object.assign({pk: "analyte", index: true, tsvector: {analyte: "A", method: "B", reference: "C"}}, opt));
}


/**
 * Find matching methods of a column:code/name/tags query.
 * @param txt column:code/name/tags query
 * @returns `{analyte, method, reference}` if found, else null
 * @example
 * ```javascript
 * ifct2017.methods('soluble oxalic acid');
 * ifct2017.methods('Insoluble Oxalic Acid');
 * // → { analyte: 'Oxalic acid (Total), Soluble oxalic acid, Insoluble oxalic acid',
 * // →   method: 'Fast- HPLC',
 * // →   reference: 'Moreau & Savage (2009)' }
 *
 * ifct2017.methods('what is analytical method of saponin?');
 * ifct2017.methods('how is total saponin measured?');
 * // → { analyte: 'Total Saponin',
 * // →   method: 'Colorimetry',
 * // →   reference: 'Dini et al. (2009)' }
 * ```
 */
export function methods(txt: string): Method | null {
  if (index == null) return null;
  const cs = columns(txt);
  return cs.length>0? corpus?.get(cs[0].code) || null : null;
}
//#endregion
