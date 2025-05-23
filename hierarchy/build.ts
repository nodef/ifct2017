// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";


async function readAsset() {
  const data    = await Deno.readTextFile(path.join(import.meta.dirname || "", 'asset.csv'));
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  const asset   = new Map<string, Record<string, unknown>>();
  for (const r of records) {
    const {code, parents} = r;
    const parset = parents? new Set<string>(parents.split(' ')) : new Set<string>();
    asset.set(code, {parents: parset});
  }
  return asset;
}


function getAncestry(asset: Map<string, Record<string, unknown>>, code: string, a=new Set<string>()) {
  const par = asset.get(code)?.parents as Set<string>;
  if (par.size===0) return a;
  for (const p of par)
    getAncestry(asset, p, a.add(p));
  return a;
}

function getChildren(asset: Map<string, Record<string, unknown>>, code: string) {
  const a = new Set<string>();
  for (const [k, v] of asset)
    if ((v.parents as Set<string>).has(code)) a.add(k);
  return a;
}


function updateAsset(asset: Map<string, Record<string, unknown>>) {
  const a = new Map();
  for (const [code, r] of asset) {
    let {parents} = r;
    parents  = Array.from(parents as Set<string>).join(' ');
    const ancestry = Array.from(getAncestry(asset, code)).join(' ');
    const children = Array.from(getChildren(asset, code)).join(' ');
    a.set(code, {parents, ancestry, children});
  }
  return a;
}


function writeIndex(asset: Map<string, Record<string, unknown>>) {
  let a = `code,parents,ancestry,children\n`;
  for (const [code, r] of asset)
    a += `${code},${r.parents},${r.ancestry},${r.children}\n`;
  Deno.writeTextFileSync(path.join(import.meta.dirname || "", 'index.csv'), a);
}


function writeCorpus(outfile: string, asset: Map<string, Record<string, unknown>>) {
  let a = `var CORPUS = new Map([\n`;
  for (const [code, r] of asset)
    a += `  ["${code}", ${JSON.stringify(r).replace(/\"(\w+)\":/g, '$1:')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  Deno.writeTextFileSync(outfile, a);
}


export async function build(corpus='corpus.js') {
  let asset = await readAsset();
  asset = updateAsset(asset);
  writeIndex(asset);
  if (corpus) writeCorpus(corpus, asset);
}
