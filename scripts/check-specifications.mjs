import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import {
  specificationSources, specificationPages, specificationAssets,
  readSpecification, readSpecificationAsset, getSpecificationSourceUrl, resolveSpecificationLink,
} from '../src/data/specifications.ts';
import { referenceRoutes, referenceProfiles, isReferenceRedirectEnabled } from '../src/data/reference.ts';

const dist = resolve('dist');
const site = 'https://arc-rdm.org';
assert.ok(existsSync(dist), 'Build the website before checking specification integration');
const git = (source, ...args) => execFileSync('git', ['-C', source.root, ...args], { encoding: 'utf8' }).trim();
const allowedSource = (sourceId, path) => ({
  'abstract-model': /^(?:docs\/spec\/|schemas\/yml\/arc-workspace-(?:project|profile)\.schema\.yml$)/,
  workspace: /^docs\/specifications\//,
  'ro-crate': /^docs\/(?:index\.md$|profiles\/|examples\/|img\/)/,
}[sourceId]?.test(path) ?? false);
const main = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
const article = (html) => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const htmlPages = new Map(specificationPages.map((page) => {
  const output = resolve(dist, '.' + page.path, 'index.html');
  assert.ok(existsSync(output), 'Missing specification output: ' + page.path);
  return [page.path, readFileSync(output, 'utf8')];
}));
const aliases = new Map(referenceRoutes.filter((entry) => isReferenceRedirectEnabled(entry) && entry.target.startsWith('/'))
  .map((entry) => [entry.path, entry.target]));
const sourcePairs = new Set(specificationPages.map((page) => page.sourceId + ':' + page.sourcePath));
const assetPaths = new Set(specificationAssets.map((asset) => asset.path));
assert.equal(assetPaths.size, specificationAssets.length, 'Published asset paths must be unique');
assert.equal(htmlPages.size, specificationPages.length, 'Specification routes must be unique');

// Check the complete selected documentation boundary, not merely a few hardcoded pages.
for (const [sourceId, source] of Object.entries(specificationSources)) {
  assert.match(source.commit, /^[0-9a-f]{40}$/, 'Source must identify an immutable commit: ' + sourceId);
  assert.equal(git(source, 'rev-parse', 'HEAD'), source.commit, 'Source provenance must match checked-out submodule: ' + sourceId);
  const files = git(source, 'ls-tree', '-r', source.commit).split('\n').map((line) => {
    const match = line.match(/^(\d+) blob [0-9a-f]+\t(.+)$/);
    return match ? { mode: match[1], path: match[2] } : undefined;
  }).filter(Boolean);
  const markdown = files.filter((file) => file.mode === '100644' && file.path.endsWith('.md') && (
    sourceId === 'abstract-model' ? file.path.startsWith('docs/spec/') :
      sourceId === 'workspace' ? /^docs\/specifications\/[^/]+\//.test(file.path) :
        file.path === 'docs/index.md' || /^docs\/profiles\/\d+\.\d+\//.test(file.path)
  ));
  assert.ok(markdown.length > 0, 'No specification Markdown found: ' + sourceId);
  for (const file of markdown) {
    assert.ok(sourcePairs.has(sourceId + ':' + file.path), 'Selected source document omitted from site: ' + sourceId + ':' + file.path);
  }
}

let diagrams = 0;
let imageCount = 0;
for (const page of specificationPages) {
  assert.ok(allowedSource(page.sourceId, page.sourcePath), 'Unexpected source document: ' + page.sourcePath);
  const source = readSpecification(page);
  assert.ok(source.includes('\n'), 'Symlink target text was published as Markdown: ' + page.sourcePath);
  const html = htmlPages.get(page.path);
  const body = article(html);
  assert.ok(body.length > 0, 'Empty specification body: ' + page.path);
  assert.match(getSpecificationSourceUrl(page), /^https:\/\/github\.com\/nfdi4plants\/[^/]+\/blob\/[0-9a-f]{40}\//, 'Source link must pin a commit');
  assert.doesNotMatch(body, /class="tooltip"/, 'Educational dictionary substitutions must not alter specifications');
  for (const match of source.matchAll(/<(?:a|span|h[1-6])\b[^>]*\bid=["']([^"']+)["']/g)) {
    assert.ok(main(html).includes('id="' + match[1] + '"'), 'Lost explicit source anchor: ' + page.path + '#' + match[1]);
  }
  const sourceDiagramCount = [...source.matchAll(/^(?:\x60{3,}|~{3,})mermaid\s*$/gm)].length;
  const renderedDiagramCount = [...body.matchAll(/\bdata-mermaid(?:[=>\s])/g)].length;
  assert.equal(renderedDiagramCount, sourceDiagramCount, 'Lost Mermaid diagram: ' + page.path);
  if (sourceDiagramCount) assert.match(body, /Diagram source/, 'Diagrams need a readable source fallback');
  diagrams += renderedDiagramCount;

  for (const match of body.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/g)) {
    const url = new URL(decode(match[1]), site + page.path);
    if (url.origin !== site) continue;
    const imagePath = resolve(dist, '.' + decodeURIComponent(url.pathname));
    assert.ok(existsSync(imagePath) && statSync(imagePath).isFile(), 'Missing specification image: ' + page.path + ' → ' + url.pathname);
    imageCount += 1;
  }
}

for (const asset of specificationAssets) {
  assert.ok(allowedSource(asset.sourceId, asset.sourcePath), 'Unexpected asset source: ' + asset.sourcePath);
  const path = resolve(dist, '.' + asset.path);
  assert.ok(existsSync(path), 'Missing specification download: ' + asset.path);
  assert.deepEqual(readFileSync(path), readSpecificationAsset(asset), 'Published asset differs from source bytes: ' + asset.path);
  if (/\.json(?:ld)?$/.test(asset.path)) assert.doesNotThrow(() => JSON.parse(readFileSync(path, 'utf8')), 'Invalid JSON download: ' + asset.path);
}

// Both accepted metadata extensions and raw Markdown must be available to machine clients.
for (const profile of referenceProfiles) {
  for (const suffix of ['', ...profile.versions.map((version) => version + '/')]) {
    const path = '/ro-crate/' + profile.slug + '/' + suffix;
    for (const name of ['index.md', 'ro-crate-metadata.json', 'ro-crate-metadata.jsonld']) {
      assert.ok(assetPaths.has(path + name), 'Missing profile representation: ' + path + name);
    }
    assert.deepEqual(readFileSync(resolve(dist, '.' + path, 'ro-crate-metadata.json')),
      readFileSync(resolve(dist, '.' + path, 'ro-crate-metadata.jsonld')), 'Metadata aliases must have identical bytes: ' + path);
  }
}

// These fragment identifiers are already referenced by source tables of contents and metadata.
const fragmentCases = [
  ['/workspace/isa-arc/', 'arc-structure-and-content'],
  ['/workspace/isa-arc/isa-xlsx/', 'top-level-metadata-sheets'],
  ['/ro-crate/wr/', 'workflow-protocol'],
  ['/ro-crate/wr/', 'arc-workflow'],
  ['/ro-crate/wr/', 'workflow-invocation'],
  ['/ro-crate/wr/', 'arc-run'],
];
for (const [path, id] of fragmentCases) {
  const target = aliases.get(path) ?? path;
  const html = htmlPages.get(target);
  assert.ok(html?.includes('id="' + id + '"'), 'Lost public specification fragment: ' + path + '#' + id);
}

for (const page of specificationPages.filter((entry) => entry.sourceId === 'workspace')) {
  const collectionPrefix = page.path.match(/^(\/workspace\/isa-arc\/versions\/[^/]+\/)/)?.[1];
  if (!collectionPrefix) continue;
  for (const filename of ['ISA-ARC-Workspace.md', 'ISA-XLSX.md', 'WR-XLSX.md']) {
    const target = resolveSpecificationLink(page, './' + filename);
    assert.ok(target.startsWith(collectionPrefix), 'Historical collection link escaped its edition: ' + page.path + ' → ' + target);
    assert.ok(htmlPages.has(target), 'Historical collection link has no page: ' + target);
  }
}

function outputFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
    ? outputFiles(join(directory, entry.name)) : [join(directory, entry.name)]);
}
for (const file of outputFiles(dist)) {
  const path = relative(dist, file).replaceAll('\\', '/');
  assert.doesNotMatch(path, /(?:^|\/)(?:\.git|node_modules|_site|specifications)(?:\/|$)|\.(?:fs|fsx|fsproj|sln|dll|nupkg)$/i, 'Implementation material leaked into published output: ' + path);
}
console.log('Verified ' + specificationPages.length + ' specification pages, ' + specificationAssets.length + ' byte-preserved downloads, ' + diagrams + ' diagram sources and ' + imageCount + ' local images.');
