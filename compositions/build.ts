// Copyright (C) 2025 Subhajit Sahu
// SPDX-License-Identifier: AGPL-3.0-or-later
// See LICENSE for full terms
import * as path from "jsr:@std/path@1.0.8";
import * as csv  from "jsr:@std/csv@1.0.5";
import {loadColumns, columns} from "../columns/index.ts";
import {type Description, loadDescriptions} from "../descriptions/index.ts";
import {type Group, loadGroups} from "../groups/index.ts";




const BASE  = ['code', 'name', 'scie', 'lang', 'grup', 'regn', 'tags'];




function round(val: number) {
  return Math.round(val * 1e+12) / 1e+12;
}


// function significantDigits(n: number) {
//   return n.toExponential().replace(/e[\+\-0-9]*$/, '').replace( /^0\.?0*|\./, '').length;
// }


type ReduceFn<V=string> = (acc: Map<string, V>, r: Record<string, string>) => void;


async function readCsv<V=string>(pth: string, fn: ReduceFn<V>, acc: Map<string, V>) {
  const data = await Deno.readTextFile(pth);
  const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
  for (const record of records)
    fn(acc, record);
  return acc;
}


interface Dat {
  code: string[];
  name: string[];
  scie: string[];
  lang: string[];
  grup: string[];
  regn: number[];
  tags: string[];
  [key: string]: unknown[];
};




async function generateIndexCsv() {
  let dat: Dat = {
    code: [],
    name: [],
    scie: [],
    lang: [],
    grup: [],
    regn: [],
    tags: [],
  };
  let di  = 0;
  const map = new Map();
  let factors = new Map<string, string>();
  let renames = new Map<string, string>();
  let sums    = new Map<string, string>();
  let orders  = new Map<string, string[]>();
  let descCorpus: Map<string, Description>;
  let grupCorpus: Map<string, Group>;
  await loadGroups();


  function valParse(val: string, code: string, dat: Dat, i: number) {
    const f  = factors.get(code) as string;
    const fn = parseFloat(f.replace(/\*.*/, ''));
    const fi = f.indexOf('*');
    const fk = fi>=0? f.substring(fi+1) : null;
    const a  = (parseFloat(val) || 0) * fn * (fk? parseFloat(dat[fk][i] as string) || 0 : 1);
    //  a  = parseFloat(a.toExponential((significantDigits(parseFloat(val))||1)-1));
    return round(a);
  }


  function nameSci(str: string) {
    const bgn = str.lastIndexOf('(');
    if (bgn<0) return '';
    let end = str.lastIndexOf(')');
    end = end<0? str.length : end;
    const sci = str.substring(bgn+1, end).trim();
    const spc = sci.search(/\s/g);
    return spc>=0 && sci!=='small intestine'? sci : '';
  }

  function nameBas(str: string) {
    const sci = nameSci(str);
    if (!sci) return str.trim();
    return str.replace(new RegExp(`\\(\\s*${sci}\\s*\\)`), '').trim();
  }

  function readAssetRow(row: Record<string, string>) {
    const cod = row.code.trim();
    const old = map.has(cod);
    const nam = nameBas(row.name);
    const sci = nameSci(row.name);
    const i   = old? map.get(cod) : map.set(cod, di) && di++;
    dat.code[i] = cod;
    dat.name[i] = old && dat.name[i].length > nam.length? dat.name[i] : nam;
    dat.scie[i] = old && dat.scie[i].length > sci.length? dat.scie[i] : sci;
    dat.lang[i] = (descCorpus.get(cod) || {desc: ''}).desc;
    dat.grup[i] = (grupCorpus.get(cod[0]) as Group).group;
    dat.regn[i] = parseInt(row.regn.trim(), 10);
    dat.tags[i] = (grupCorpus.get(cod[0]) as Group).tags.trim();
    for (const k in row) {
      if (BASE.includes(k)) continue;
      const val = row[k].trim().split('±');
      const kt  = renames.get(k) || k;
      if (!dat[kt]) { dat[kt] = []; dat[kt+'_e'] = []; }
      dat[kt][i]      = valParse(val[0]||'0', k, dat, i);
      dat[kt+'_e'][i] = valParse(val[1]||'0', k, dat, i);
    }
  }

  async function readAsset(pth: string) {
    const data = await Deno.readTextFile(pth);
    const records = csv.parse(data, {skipFirstRow: true, comment: "#"});
    for (const record of records)
      readAssetRow(record);
  }

  function nullToZero(d: Dat) {
    for (const k of Object.keys(d)) {
      for (let i=0; i<di; i++)
        d[k][i] = d[k][i]!=null? d[k][i] : 0;
    }
  }

  function sumColumns(d: Dat, i: number, ks: string[]) {
    let a = 0;
    for (const k of ks)
      a += d[k][i] as number;
    return a;
  }

  function sumAll(d: Dat) {
    for (const [k, exp] of sums) {
      d[k] = d[k] || [];
      const sumk = exp.replace(/\s/g, '').split('+');
      for (let i=0; i<di; i++)
        d[k][i] = d[k][i] || round(sumColumns(d, i, sumk));
    }
  }

  function orderAll(d: Dat) {
    const a: Record<string, unknown[]> = {};
    for (const k in d) {
      if (k in a) continue;
      for (const ak of orders.get(k) || []) {
        a[ak]   = d[ak];
        const ake = ak + '_e';
        if (ake in d) a[ake] = d[ake];
      }
      a[k] = d[k];
    }
    return a;
  }


  async function main() {
    await loadColumns();
    grupCorpus = await loadGroups();
    descCorpus = await loadDescriptions();
    factors = await readCsv('configs/factors.csv', (acc, r) => acc.set(r.code, r.factor),     new Map<string, string>());
    renames = await readCsv('configs/renames.csv', (acc, r) => acc.set(r.code, r.actual),     new Map<string, string>());
    sums    = await readCsv('configs/sums.csv',    (acc, r) => acc.set(r.code, r.expression), new Map<string, string>());
    orders  = await readCsv('configs/orders.csv',  (acc, r) => {
      const arr = acc.get(r.before) || [];
      acc.set(r.before, arr);
      arr.push(r.code);
    }, new Map<string, string[]>());
    for (const file of Deno.readDirSync('assets'))
      await readAsset(path.join('assets', file.name));
    nullToZero(dat);
    sumAll(dat);
    dat = orderAll(dat) as Dat;
    const ks = Object.keys(dat);
    let a  = ks.map(k => `"${columns(k.replace(/_e$/, ''))[0].name}; ${k}"`).join() + '\n';
    for (let i=0; i<di; i++) {
      for (const k of ks) {
        const v = dat[k][i];
        a += JSON.stringify(v==null? 0:v) + ',';
      }
      a = a.substring(0, a.length-1) + '\n';
    }
    Deno.writeTextFileSync('index.csv', a);
  }
  await main();
}




// Finally.
async function main() {
  await generateIndexCsv();
}
main();
