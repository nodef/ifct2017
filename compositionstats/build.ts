import * as path from "jsr:@std/path@1.0.9";
import * as csv  from "jsr:@std/csv@1.0.6";


const BASE  = ['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags'];


/** Round a number to up to 12 significant digits. */
function round(val: number) {
  return Math.round(val * 1e+12) / 1e+12;
}


/** Add the composition of one row to a sum row. */
function addCompositionRow(sum: Record<string, string | number>, row: Record<string, string | number>) {
  for (const k in row) {
    if (typeof row[k] !== "number") continue;
    (sum[k] as number) += row[k];
  }
}


/** Update the minimum composition after comparing with one row. */
function minCompositionRow(min: Record<string, string | number>, row: Record<string, string | number>) {
  for (const k in row) {
    if (typeof row[k] !== "number") continue;
    if ((min[k] as number) > row[k]) min[k] = row[k];
  }
}


/** Update the maximum composition after comparing with one row. */
function maxCompositionRow(max: Record<string, string | number>, row: Record<string, string | number>) {
  for (const k in row) {
    if (typeof row[k] !== "number") continue;
    if ((max[k] as number) < row[k]) max[k] = row[k];
  }
}

/** Multiply a factor to the composition of one row. */
function multiplyCompositionRow(row: Record<string, string | number>, n: number) {
  for (const k in row) {
    if (typeof row[k] !== "number") continue;
    row[k] = row[k] * n;
  }
}


/** Format a specific composition row. */
function formatCompositionRow(row: Record<string, string | number>, code: string, name: string) {
  row.code = code;
  row.name = name;
  row.scie = "";
  row.lang = "";
  row.grup = "";
  row.regn = 0;
  row.tags = "";
}


/** Get the minimum, maximum and average composition of all foods. */
async function minMaxAvgComposition() {
  // Load the compositions of all foods.
  const data = await Deno.readTextFile(path.join(import.meta.dirname || "", "index.csv"));
  const records: Record<string, string | number>[] = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const row of records) {
    for (const k in row) {
      if (BASE.includes(k) && k!=="regn") continue;
      row[k] = parseFloat(row[k] as string);
    }
  }
  // Find the mean composition of all foods.
  const avg = Object.assign({}, records[0]);
  const min = Object.assign({}, records[0]);
  const max = Object.assign({}, records[0]);
  for (const row of records.slice(1)) {
    addCompositionRow(avg, row);
    minCompositionRow(min, row);
    maxCompositionRow(max, row);
  }
  multiplyCompositionRow(avg, 1 / records.length);
  // Format the mean composition, and return it.
  formatCompositionRow(min, "XMIN", "Minimum composition of all foods");
  formatCompositionRow(max, "XMAX", "Maximum composition of all foods");
  formatCompositionRow(avg, "XAVG", "Average composition of all foods");
  return [min, max, avg];
}


/** Generate the stats CSV file. */
async function main() {
  const [min, max, avg] = await minMaxAvgComposition();
  const keys = Object.keys(min);
  const data = keys.join(",") + "\n" + [min, max, avg].map(row => {
    return keys.map(k => typeof row[k] === "number"? `${round(row[k] as number)}` : `"${row[k]}"`);
  }).join("\n") + "\n";
  await Deno.writeTextFile(path.join(import.meta.dirname || "", "stats.csv"), data);
}
main();
