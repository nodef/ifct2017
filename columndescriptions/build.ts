import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";




async function main() {
  const file = path.join(import.meta.dirname || "", "index.csv");
  const data = await Deno.readTextFile(file);
  const records  = csv.parse(data, {skipFirstRow: true, comment: "#"});
  const jsonfile = path.join(import.meta.dirname || "", "index.json");
  await Deno.writeTextFile(jsonfile, JSON.stringify(records, null, 2));
}
main();
