import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { referenceRoutes, isReferenceRedirectEnabled } from '../src/data/reference.ts';
import { specificationSources } from '../src/data/specifications.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distArgument = process.argv.indexOf('--dist');
const outputDirectory = distArgument >= 0 ? process.argv[distArgument + 1] : 'dist';
assert.ok(outputDirectory, 'The --dist argument needs an output directory');
const dist = resolve(projectRoot, outputDirectory);
const baselineArgument = process.argv.indexOf('--baseline');
const baselineDirectory = baselineArgument >= 0 ? process.argv[baselineArgument + 1] : undefined;
assert.ok(baselineArgument < 0 || baselineDirectory, 'Usage: node scripts/check-existing-routes.mjs [--baseline path/to/dist]');
assert.ok(existsSync(dist), 'Build the site before checking existing routes');

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
    ? htmlFiles(join(directory, entry.name))
    : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []);
}

function headings(html) {
  return [...html.matchAll(/<h[1-6]\b[^>]*\bid=["']([^"']+)["']/g)].map((match) => match[1]);
}

const fixture = JSON.parse(readFileSync(resolve(projectRoot, 'scripts/fixtures/legacy-routes.json'), 'utf8'));
const baseline = baselineDirectory
  ? htmlFiles(resolve(baselineDirectory)).map((file) => ({
      file: relative(resolve(baselineDirectory), file).replaceAll('\\', '/'),
      headings: headings(readFileSync(file, 'utf8')),
    }))
  : fixture.pages;

const failures = [];
let headingCount = 0;
for (const page of baseline) {
  const file = resolve(dist, page.file);
  if (!existsSync(file)) {
    failures.push(`Missing existing route: ${page.file}`);
    continue;
  }
  // A renamed heading can retain its old fragment through an explicit alias anchor.
  const currentAnchors = new Set([...readFileSync(file, 'utf8').matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
  for (const id of page.headings) {
    headingCount += 1;
    if (!currentAnchors.has(id)) failures.push(`Missing existing heading anchor: ${page.file}#${id}`);
  }
}

const site = 'https://arc-rdm.org';
const documents = new Map();
const aliases = new Map(referenceRoutes.filter((entry) => isReferenceRedirectEnabled(entry) && entry.target.startsWith('/'))
  .map((entry) => [entry.path, entry.target]));
// These five sections are absent from this exact upstream draft. Preserve its links
// without inventing normative destinations. Any source revision requires a fresh review.
const upstreamFragmentBaseline = {
  sourceId: 'ro-crate',
  commit: '337a3b1356b326a96ee1586861e2fdf0858c5788',
  sourcePath: 'docs/profiles/0.1/provenance-core/index.md',
  targetPath: '/ro-crate/provenance-core/0.1/',
  fragments: new Set([
    'propertyvalue---parameter', 'propertyvalue---component',
    'propertyvalue---characteristic', 'propertyvalue---factor',
    'representing-multi-file-objects',
  ]),
};
const upstreamWarnings = new Set();
function knownUpstreamFragment(path, targetPath, fragment) {
  const source = referenceRoutes.find((entry) => entry.path === path)?.specification;
  return source?.sourceId === upstreamFragmentBaseline.sourceId
    && source.sourcePath === upstreamFragmentBaseline.sourcePath
    && specificationSources[source.sourceId].commit === upstreamFragmentBaseline.commit
    && targetPath === upstreamFragmentBaseline.targetPath
    && upstreamFragmentBaseline.fragments.has(fragment);
}
function pagePath(file) {
  const path = `/${relative(dist, file).replaceAll('\\', '/')}`;
  return path.endsWith('/index.html') ? path.slice(0, -'index.html'.length) : path;
}

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  documents.set(pagePath(file), {
    file,
    html,
    ids: new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1])),
  });
  for (const [, attribute, value] of html.matchAll(/\b(href|src)=["']([^"']*)["']/g)) {
    if (/\{\{|\}\}|%7b%7b|%7d%7d/i.test(value)) failures.push(`Unresolved URL substitution in ${pagePath(file)}: ${attribute}=${value}`);
  }
}

let checkedLinks = 0;
for (const [path, document] of documents) {
  for (const [, attribute] of document.html.matchAll(/<a\b[^>]*\bhref=["']([^"']*)["']/g)) {
    const href = attribute.replaceAll('&amp;', '&');
    if (href === '#') {
      failures.push(`Dead placeholder link on ${path}`);
      continue;
    }
    let target;
    try { target = new URL(href, `${site}${path}`); } catch { failures.push(`Invalid link on ${path}: ${href}`); continue; }
    if (target.origin !== site) continue;
    const pathname = decodeURIComponent(target.pathname);
    let targetDocument = documents.get(pathname) ?? documents.get(`${pathname.replace(/\/$/, '')}/`);
    checkedLinks += 1;
    if (!targetDocument) {
      const asset = resolve(dist, `.${pathname}`);
      if (!existsSync(asset) || !statSync(asset).isFile()) failures.push(`Broken internal link on ${path}: ${href}`);
      continue;
    }
    const fragment = decodeURIComponent(target.hash.slice(1));
    // Redirect pages have no specification body. Check fragments at the final destination.
    let aliasPath = `${pathname.replace(/\/$/, '')}/`;
    const visitedAliases = new Set();
    while (fragment && aliases.has(aliasPath)) {
      if (visitedAliases.has(aliasPath)) {
        failures.push(`Reference alias cycle on ${path}: ${href}`);
        break;
      }
      visitedAliases.add(aliasPath);
      aliasPath = aliases.get(aliasPath);
      targetDocument = documents.get(aliasPath);
    }
    if (!targetDocument) {
      failures.push(`Broken alias target on ${path}: ${href}`);
      continue;
    }
    if (fragment && !targetDocument.ids.has(fragment)) {
      if (knownUpstreamFragment(path, aliasPath, fragment)) upstreamWarnings.add(`${path}#${fragment}`);
      else failures.push(`Broken internal anchor on ${path}: ${href}`);
    }
  }
}

for (const warning of upstreamWarnings) {
  console.warn(`Known upstream missing section (${upstreamFragmentBaseline.sourceId}@${upstreamFragmentBaseline.commit.slice(0, 7)}): ${warning}`);
}
assert.equal(failures.length, 0, `Site regression checks failed:\n${[...new Set(failures)].join('\n')}`);
console.log(`Preserved ${baseline.length} existing HTML routes and ${headingCount} heading anchors; verified ${checkedLinks} internal links across ${documents.size} pages.`);
