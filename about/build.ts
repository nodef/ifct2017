// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
function readTextFiles(dir: string) {
  const a = new Map<string, string>();
  for (const f of Deno.readDirSync(dir)) {
    if (!f.isFile || !f.name.endsWith('.txt')) continue;
    const name    = f.name.replace('.txt', '');
    const content = Deno.readTextFileSync(`assets/${f.name}`);
    a.set(name, content);
  }
  return a;
}


function writeIndex(file: string, data: Map<string, string>) {
  let a = '';
  for (const [k, v] of data)
    a += `[[${k}]]\n${v}\n\n\n`;
  Deno.writeTextFileSync(file, a);
  console.log(`Wrote ${data.size} entries to ${file}`);
}


function main() {
  const data = readTextFiles('assets');
  writeIndex('index.txt', data);
}
main();
