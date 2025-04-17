// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import {type RowData, type SetupTableOptions, setupTable} from "jsr:@nodef/extra-sql@0.1.2";




//#region TYPES
/** Regional compositing centre and sample size of each region. */
export interface CompositingCentre {
  /** Region. */
  region: string,
  /** Regional Compositing centre. */
  centre: string,
  /** Sample size. */
  samples: number
};
//#endregion




//#region GLOBALS
let corpus: Map<string, CompositingCentre> | null = null;
let index: lunr.Index | null = null;
//#endregion




//#region FUNCTIONS
/**
 * Load the compositing centres corpus from CSV file.
 * @param file CSV file path
 * @returns compositing centres corpus
 */
async function loadFromCsv(file: string) {
  const map  = new Map<string, CompositingCentre>();
  const data = await (await fetch(file)).text();
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const r of records) {
    const samples = parseFloat(r.samples);
    map.set(r.region, {region: r.region, centre: r.centre, samples});
  }
  return map;
}


/**
 * Setup the lunr index for the compositing centres corpus.
 * @returns lunr index
 */
function setupIndex(corpus: Map<string, CompositingCentre>) {
  return lunr(function(this: lunr.Builder) {
    this.ref('region');
    this.field('region');
    this.field('centre');
    for (const r of corpus.values())
      this.add(r);
  });
}


/**
 * Load the compositing centres corpus from the file.
 * @returns compositing centres corpus
 */
export async function loadCompositingCentres(): Promise<Map<string, CompositingCentre>> {
  if (corpus) return corpus;
  corpus = await loadFromCsv(compositingCentresCsv());
  index  = setupIndex(corpus);
  return corpus;
}


/**
 * Get the path to the compositing centres CSV file.
 * @returns CSV file URL
 */
export function compositingCentresCsv(): string {
  return import.meta.resolve('./index.csv');
}


/**
 * Obtain SQL command to create and populate the compositing centres table.
 * @param tab table name
 * @param opt options for the table
 * @returns CREATE TABLE, INSERT, CREATE VIEW, CREATE INDEX statements
 */
export async function compositingCentresSql(tab: string="compositingcentres", opt: SetupTableOptions={}): Promise<string> {
  return setupTable(tab, {region: "TEXT", centre: "TEXT", samples: "INT"},
    (await loadCompositingCentres()).values() as Iterable<RowData>,
    Object.assign({pk: "region", index: true, tsvector: {region: "A", centre: "B"}}, opt));
}


/**
 * Find matching compositing centres of a region/centre query.
 * @param txt region/centre query
 * @returns matches `[{region, centre, samples}]`
 * @examples
 * ```javascript
 * ifct2017.compositingCentres('west');
 * ifct2017.compositingCentres('Mumbai');
 * // → [ { region: 'West', centre: 'Mumbai', samples: 12 } ]
 *
 * ifct2017.compositingCentres('what is compositing centre of north east?');
 * ifct2017.compositingCentres('North East compositing centre');
 * // → [ { region: 'North East', centre: 'Guwahati', samples: 11 } ]
 * ```
 */
export function compositingCentres(txt: string): CompositingCentre[] {
  if (index == null) return [];
  const a: CompositingCentre[] = []; txt = txt.replace(/\W/g, ' ');
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length === max) a.push(corpus?.get(mat.ref) || {} as CompositingCentre);
  return a;
}
//#endregion
