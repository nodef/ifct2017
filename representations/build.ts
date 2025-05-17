// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import {type Composition, loadCompositions} from "../compositions/index.ts";
import * as path from "jsr:@std/path@1.0.9";


interface Representation {
  code: string;
  type: string;
  factor: number;
  unit: string;
}


const IGNORE = new Set(['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags']);
const UNIT   = new Map([
  [1, 'g'],
  [1e+3, 'mg'],
  [1e+6, 'ug'],
  [1e+9, 'ng'],
]);





function deepEqual(a: unknown, b: unknown) {
  if (a===b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a === 'object') {
    if (a === null || b === null) return false;
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      for (let i=0, I=a.length; i<I; i++)
        if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    const ka = Object.keys(a as object);
    const kb = Object.keys(b as object);
    if (ka.length !== kb.length) return false;
    for (const k of ka)
      if (!deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])) return false;
    return true;
  }
  return false;
}


function arrayIndexOf(arr: unknown[], val: unknown) {
  for (let i=0, I=arr.length; i<I; i++)
    if (deepEqual(arr[i], val)) return i;
  return -1;
}

function imapSet(map: Map<string, number>, arr: unknown[], key: string, val: unknown) {
  let i = arrayIndexOf(arr, val);
  if (i<0) arr[i = arr.length] = val;
  map.set(key, i);
}


function getType(k: string) {
  if (k==='regn')    return 'integer';
  if (k==='enerc')   return 'energy';
  if (IGNORE.has(k)) return 'string';
  return 'mass';
}


function getFactor(map: Map<string, Composition>, k: string) {
  if (k==='regn')    return 1;
  if (IGNORE.has(k)) return 0;
  if (k==='enerc')   return 1;
  let n = 0, s = 0;
  for (const r of map.values()) {
    const rk = (r as unknown  as Record<string, number>)[k];
    if (rk > 0) { s += rk; n++; }
  }
  if (!n) return 0;
  const l3 = Math.log(s/n) / Math.log(1000);
  const e  = -3 * Math.round(l3 - 0.55);
  return Math.pow(10, Math.max(e, 0));
}


function getUnit(k: string, f: number) {
  if (IGNORE.has(k)) return null;
  if (k==='enerc')   return 'kJ';
  return UNIT.get(f) as string;
}


function writeIndex(records: Representation[]) {
  let a = `code,type,factor,unit\n`;
  for (const r of records)
    a += `${r.code},${r.type},${r.factor},${r.unit}\n`;
  Deno.writeTextFileSync(path.join(import.meta.dirname || "", 'index.csv'), a);
}


function writeCorpus(outfile: string, map: Map<string, number>, values: Record<string, string | number>[]) {
  let a = '';
  for (let i=0, I=values.length; i<I; i++)
    a += `const I${i} = ${JSON.stringify(values[i]).replace(/\"(\w+)\":/g, '$1:')};\n`;
  a += `const CORPUS = new Map([\n`;
  for (const [code, i] of map)
    a += `  ["${code}", I${i}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  Deno.writeTextFileSync(outfile, a);
}


export async function build(corpus='corpus.js') {
  const map  = await loadCompositions();
  const cols = Object.keys(map.get('A001') as Composition);
  const records: Representation[] = [];
  const values: Record<string, string | number>[] = [];
  const representations = new Map<string, number>();
  for (const c of cols) {
    if (c.endsWith('_e')) continue;
    const code   = c;
    const type   = getType(c);
    const factor = getFactor(map, c);
    const unit   = getUnit(c, factor) || '';
    records.push({code, type, factor, unit});
    imapSet(representations, values, code, {type, factor, unit});
  }
  writeIndex(records);
  if (corpus) writeCorpus(corpus, representations, values);
}
