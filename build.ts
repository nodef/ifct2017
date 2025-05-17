import * as about   from "./about/build.ts";
import * as columns from "./columns/build.ts";
import * as columndescriptions from "./columndescriptions/build.ts";
import * as representations  from "./representations/build.ts";
import * as hierarchy        from "./hierarchy/build.ts";
import * as intakes          from "./intakes/build.ts";
import * as methods          from "./methods/build.ts";
import * as compositions     from "./compositions/build.ts";
import * as compositionstats from "./compositionstats/build.ts";


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
  await (new Deno.Command('browserify', {
    args: ['corpus.js', '-s', 'ifct2017', '-o', 'corpus.umd.js'],
    stdin: 'inherit', stdout: 'inherit', stderr: 'inherit'
  })).spawn().status;
  await (new Deno.Command('uglifyjs', {
    args: ['corpus.umd.js', '-c', '-m', '-o', 'corpus.min.js'],
    stdin: 'inherit', stdout: 'inherit', stderr: 'inherit'
  })).spawn().status;
  await Deno.remove('corpus.js');
  await Deno.remove('corpus.umd.js');
}


// Set up the package for npm.
async function setupNpmPackage() {
  console.log('Setting up npm package...');
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


// Publish the package to npm.
async function publishNpmPackage() {
  console.log('Publishing npm package...');
  await (new Deno.Command('npm', {
    args: ['publish', '--access', 'public'], cwd: '.build',
    stdin: 'inherit', stdout: 'inherit', stderr: 'inherit'
  })).spawn().status;
}


// Main function, of course.
async function main(corpus=false) {
  await about.build();
  await columns.build(corpus? './columns/corpus.js' : '');
  await columndescriptions.build(corpus? './columndescriptions/corpus.js' : '');
  await representations.build(corpus? './representations/corpus.js' : '');
  await hierarchy.build(corpus? './hierarchy/corpus.js' : '');
  await intakes.build(corpus? './intakes/corpus.js' : '');
  await methods.build(corpus? './methods/corpus.js' : '');
  await compositions.build();
  await compositionstats.build();
  if (!corpus) return;
  await writeCorpus();
  await setupNpmPackage();
  await publishNpmPackage();
}
main(Deno.args[0] === 'corpus');
