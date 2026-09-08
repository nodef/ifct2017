import {parseArgs}  from "@std/cli/parse-args";
import * as about   from "./about/build.ts";
import * as columns from "./columns/build.ts";
import * as columndescriptions from "./columndescriptions/build.ts";
import * as representations  from "./representations/build.ts";
import * as hierarchy        from "./hierarchy/build.ts";
import * as intakes          from "./intakes/build.ts";
import * as methods          from "./methods/build.ts";
import * as compositions     from "./compositions/build.ts";
import * as compositionstats from "./compositionstats/build.ts";


// Run a command in a subprocess, with inherited stdio.
async function run(command: string, args: string[], cwd?: string) {
  const cmd = new Deno.Command(command, {
    args: args,
    cwd:  cwd,
    stdin:  'inherit',
    stdout: 'inherit',
    stderr: 'inherit'
  });
  return await cmd.spawn().status;
}


// Publish core package to npm.
async function publishCoreToNpm() {
  console.log('Publishing the core package to npm...');
  await run('deno', ['pack', '--output', 'ifct2017.tgz', '--allow-dirty']);
  Deno.mkdirSync('.temp-pack', {recursive: true});
  await run('tar', ['-xzf', 'ifct2017.tgz', '-C', '.temp-pack']);
  Deno.removeSync('ifct2017.tgz');
  const meta = JSON.parse(await Deno.readTextFile('.temp-pack/package/package.json'));
  meta.name = 'ifct2017';
  await Deno.writeTextFile('.temp-pack/package/package.json', JSON.stringify(meta, null, 2));
  await run('npm', ['publish', '--access', 'public'], '.temp-pack/package');
  await Deno.remove('.temp-pack', {recursive: true});
}

// Create the corpus.min.js file.
async function writeCorpus() {
  console.log('Writing corpus.min.js...');
  await Deno.writeTextFile('corpus.js',
    `exports.columns   = require('./columns/corpus.js');\n` +
    `exports.representations = require('./representations/corpus.js');\n` +
    `exports.hierarchy = require('./hierarchy/corpus.js');\n` +
    `exports.intakes = require('./intakes/corpus.js');\n` +
    `exports.methods = require('./methods/corpus.js');\n`
  );
  await run('browserify', ['corpus.js', '-s', 'ifct2017', '-o', 'corpus.umd.js']);
  await run('uglifyjs', ['corpus.umd.js', '-c', '-m', '-o', 'corpus.min.js']);
  await Deno.remove('corpus.js');
  await Deno.remove('corpus.umd.js');
}


// Set up the corpus package for npm.
async function setupCorpusPackage() {
  console.log('Setting up the corpus package...');
  try { await Deno.remove('.build', {recursive: true}); }
  catch { /* ignore */ }
  const name    = '@ifct2017/corpus';
  const version = JSON.parse(await Deno.readTextFile('deno.json')).version;
  const description = 'IFCT 2017 Corpus';
  const main     = 'index.js';
  const keywords = ['ifct', '2017', 'corpus'];
  const author   = 'wolfram77@gmail.com';
  const license  = 'AGPL-3.0';
  await Deno.mkdir('.build', {recursive: true});
  const meta = {name, version, description, main, keywords, author, license};
  await Deno.writeTextFile('.build/package.json', JSON.stringify(meta, null, 2));
  await Deno.copyFile('README.md', '.build/README.md');
  await Deno.copyFile('LICENSE', '.build/LICENSE');
  await Deno.rename('corpus.min.js', '.build/index.js');
}


// Publish the corpus package to npm.
async function publishCorpusToNpm() {
  console.log('Publishing the corpus package to npm...');
  await run('npm', ['publish', '--access', 'public'], '.build');
}


// Build all the modules, optionally with corpus.
async function build(corpus=false) {
  await about.build();
  await columns.build(corpus? './columns/corpus.js' : '');
  await columndescriptions.build(corpus? './columndescriptions/corpus.js' : '');
  await representations.build(corpus? './representations/corpus.js' : '');
  await hierarchy.build(corpus? './hierarchy/corpus.js' : '');
  await intakes.build(corpus? './intakes/corpus.js' : '');
  await methods.build(corpus? './methods/corpus.js' : '');
  await compositions.build();
  await compositionstats.build();
}


// Main function, of course.
async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ['corpus', 'publish-core', 'publish-corpus'],
    default: {corpus: false, 'publish-core': false, 'publish-corpus': false}
  });
  build(args.corpus || args['publish-corpus']);
  if (args['publish-core']) {
    await publishCoreToNpm();
  }
  if (args['publish-corpus']) {
    await writeCorpus();
    await setupCorpusPackage();
    await publishCorpusToNpm();
  }
}
main();
