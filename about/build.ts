// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.9";


async function readTextFiles(dir: string) {
  const a = new Map<string, string>();
  for (const f of Deno.readDirSync(dir)) {
    if (!f.isFile || !f.name.endsWith('.txt')) continue;
    const name    = f.name.replace('.txt', '');
    const content = await Deno.readTextFile(path.join(dir, f.name));
    a.set(name, content);
  }
  return a;
}


async function writeIndex(file: string, data: Map<string, string>) {
  let a = '';
  for (const [k, v] of data)
    a += `[[${k}]]\n${v}\n\n`;
  await Deno.writeTextFile(file, a.trim() + '\n');
  console.log(`Wrote ${data.size} entries to ${file}`);
}


export async function build() {
  const data = await readTextFiles(path.join(import.meta.dirname || '', 'assets'));
  await writeIndex(path.join(import.meta.dirname || '', 'index.txt'), data);
}
