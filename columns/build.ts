import * as path from "@std/path";
import * as csv  from "@std/csv";


async function writeCorpus(outfile: string) {
  const infile  = path.join(import.meta.dirname || "", "index.csv");
  const data    = await Deno.readTextFile(infile);
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  const map     = new Map();
  for (const r of records)
    map.set(r.code, r);
  let a = `var CORPUS = new Map([\n`;
  for (const [k, v] of map)
    a += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  await Deno.writeTextFile(outfile, a);
}


export async function build(corpus='corpus.js') {
  if (corpus) await writeCorpus(corpus);
}
