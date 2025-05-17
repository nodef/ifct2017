import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";


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
