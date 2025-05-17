// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";


async function writeCorpus(outfile: string) {
  const map = new Map();
  const data    = await Deno.readTextFile(path.join(import.meta.dirname || '', 'index.csv'));
  const records = csv.parse(data, {skipFirstRow: true, comment: '#'}) as Record<string, string | number>[];
  for (const r of records) {
    for (const k in r)
      if (k!=='code') r[k] = parseFloat(r[k] as string);
    map.set(r.code, r);
  }
  let a = `const CORPUS = new Map([\n`;
  for (const [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:').replace(/null/g, 'NaN')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  await Deno.writeTextFile(outfile, a);
}


export async function build(corpus='corpus.js') {
  if (corpus) await writeCorpus(corpus);
}
