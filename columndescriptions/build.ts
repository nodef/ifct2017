import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";



async function writeCorpus(outfile: string, records: Record<string, string>[]) {
  let a = `var CORPUS = new Map([\n`;
  for (const r of records)
    a += `  ["${r.code}", ${JSON.stringify(r)}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  await Deno.writeTextFile(outfile, a);
}


export async function build(corpus='corpus.js') {
  if (!corpus) return;
  const file = path.join(import.meta.dirname || "", "index.csv");
  const data = await Deno.readTextFile(file);
  const records  = csv.parse(data, {skipFirstRow: true, comment: "#"});
  await writeCorpus(corpus, records);
}
