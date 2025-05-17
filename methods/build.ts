// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";
import lunr from "npm:lunr@2.3.9";  // @deno-types="npm:@types/lunr@2.3.7"
import * as columns from "../columns/index.ts";


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


function bestMatch(idx: lunr.Index, txt: string) {
  const a  = []; txt = txt.replace(/\W/g, ' ');
  const ms = idx.search(txt); let max = 0;
  for (const m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (const m of ms)
    if (Object.keys(m.matchData.metadata).length===max) a.push(m);
  return a;
}


function createIndex(arr: Record<string, string | number>[]) {
  return lunr(function(this: lunr.Builder) {
    this.ref('index');
    this.field('analyte');
    this.pipeline.remove(lunr.stopWordFilter);
    for (let i=0, I=arr.length; i<I; i++)
      this.add({index: i, analyte: (arr[i].analyte as string).replace(/\W+/g, ' ')});
  });
}


async function createMap(idx: lunr.Index, mapping: Map<string, number>) {
  const a = new Map();
  let index = -1;
  for (const c of (await columns.loadColumns()).values()) {
    if (OVERRIDE.has(c.code)) {
      const analyte = OVERRIDE.get(c.code);
      index = analyte!=null? mapping.get(analyte) as number : -1;
    }
    else {
      let tags  = `${c.code} ${c.code} ${c.code} ${c.name} ${c.name} ${c.tags}`;
      tags = tags.replace(/\W+/g, ' ').toLowerCase().trim();
      const ms  = idx.search(tags);
      // if (c.code==='as') console.log(c, tags, ms);
      index = ms.length>0? ms[0].ref : -1;
    }
    a.set(c.code, index);
    // if (index>=0) console.log(c.code, '->', array[index].analyte, tags);
    // if (c.code==='facis') console.log(ms);
  }
  return a;
}


async function writeCorpus(outfile: string) {
  await columns.loadColumns();
  const array: Record<string, string | number>[]  = [], mapping = new Map();
  const data    = await Deno.readTextFile(path.join(import.meta.dirname || '', 'index.csv'));
  const records = csv.parse(data, {skipFirstRow: true, comment: '#'}) as Record<string, string | number>[];
  for (const r of records) {
    mapping.set(r.analyte, array.length);
    array.push(r);
  }
  let a = '';
  const index = createIndex(array);
  const map   = await createMap(index, mapping);
  for (let i=0, I=array.length; i<I; i++)
    a += `const I${i} = ${JSON.stringify(array[i]).replace(/\"(\w+)\":/g, '$1:')};\n`;
  a += `const CORPUS = new Map([\n`;
  for (const [k, v] of map)
    a += `  ["${k}", ${v>=0? 'I'+v:'null'}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  await Deno.writeTextFile(outfile, a);
}


export async function build(corpus='corpus.js') {
  if (corpus) await writeCorpus(corpus);
}
