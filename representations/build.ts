// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import {type Composition, loadCompositions} from "../compositions/index.ts";


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


async function writeIndex() {
  const map  = await loadCompositions();
  const cols = Object.keys(map.get('A001') as Composition);
  const records: Representation[] = [];
  for (const c of cols) {
    if (c.endsWith('_e')) continue;
    const code   = c;
    const type   = getType(c);
    const factor = getFactor(map, c);
    const unit   = getUnit(c, factor) || '';
    records.push({code, type, factor, unit});
  }
  let content = `code,type,factor,unit\n`;
  for (const r of records)
    content += `${r.code},${r.type},${r.factor},${r.unit}\n`;
  Deno.writeTextFileSync('index.csv', content);
}


// Finally.
async function main() {
  await writeIndex();
}
main();
