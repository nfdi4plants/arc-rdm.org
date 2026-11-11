import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import {
  referenceRoutes,
  referenceProfiles,
  referencePagePaths,
  referenceRedirectPaths,
  getReferenceBreadcrumbs,
} from '../src/data/reference.ts';

const expectedPaths = [
  '/definition/', '/workspace/', '/workspace/definition/', '/workspace/isa-arc/',
  '/workspace/isa-arc/definition/', '/workspace/isa-arc/isa-xlsx/',
  '/workspace/isa-arc/wr-xlsx/', '/workspace/isa-arc/datamap-xlsx/',
  '/abstract-model/', '/ro-crate/',
];
const profiles = ['administrative-core', 'provenance-core', 'semantic-core', 'isa', 'wr', 'datamap'];
for (const profile of profiles) {
  expectedPaths.push(`/abstract-model/${profile}/`, `/ro-crate/${profile}/`, `/ro-crate/${profile}/1.0/`);
}

assert.equal(new Set(referenceRoutes.map((entry) => entry.path)).size, referenceRoutes.length, 'Reference paths must be unique');
for (const path of expectedPaths) assert.ok(referenceRoutes.some((entry) => entry.path === path), `Missing required route ${path}`);
assert.ok(referencePagePaths.length >= 22, 'Expected at least 22 reference pages');
assert.equal(referenceRedirectPaths.length, 6, 'Expected six latest-version aliases');
assert.ok(referenceRoutes.every((entry) => !Object.hasOwn(entry, 'content')), 'Educational content must not be attached to specification/PID routes');
// Preserve the alias destinations that existed before the knowledge reorganization.
for (const profile of profiles) {
  const alias = referenceRoutes.find((entry) => entry.path === `/ro-crate/${profile}/`);
  assert.equal(alias?.kind, 'redirect', `Missing latest-version alias for ${profile}`);
  assert.equal(alias.target, `/ro-crate/${profile}/1.0/`, `Changed latest-version destination for ${profile}`);
}

for (const profile of referenceProfiles) {
  assert.ok(profile.versions.includes(profile.latest), `Latest ${profile.slug} version is not registered`);
  assert.equal(new Set(profile.versions).size, profile.versions.length, `Duplicate versions for ${profile.slug}`);
  for (const version of profile.versions) assert.match(version, /^\d+\.\d+$/, 'Versions must use MAJOR.MINOR');
}

const htmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const dist = resolve('dist');
assert.ok(existsSync(dist), 'Build the site before running the reference route check');
for (const entry of referenceRoutes) {
  assert.match(entry.path, /^\/[a-z0-9./-]+\/$/, `Expected a lowercase trailing-slash path: ${entry.path}`);
  const path = resolve(dist, `.${entry.path}`, 'index.html');
  assert.ok(existsSync(path), `Missing generated page: ${entry.path}`);
  const html = readFileSync(path, 'utf8');
  assert.ok(html.includes(htmlEscape(entry.title)), `Missing title: ${entry.path}`);
  assert.equal(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].trim(), htmlEscape(entry.title), `Incorrect H1: ${entry.path}`);
  assert.ok(!html.includes('data-pagefind-body'), `Reference route must be excluded from search: ${entry.path}`);
  assert.match(html, /data-pagefind-ignore(?:="all")?/, `Missing search exclusion: ${entry.path}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, `Missing reference page main content: ${entry.path}`);
  assert.doesNotMatch(main, /<(?:article|h[2-6])\b/, `Reference must remain a heading-only placeholder or redirect: ${entry.path}`);
  const target = entry.kind === 'redirect' ? entry.target : entry.path;
  const canonical = new URL(target, 'https://arc-rdm.org').href;
  assert.ok(html.includes(`rel="canonical" href="${htmlEscape(canonical)}"`), `Missing canonical: ${entry.path}`);
  if (entry.kind === 'redirect') {
    if (entry.target.startsWith('/')) {
      assert.ok(referencePagePaths.includes(entry.target), `Internal redirect target is not a registered page: ${entry.path}`);
    } else {
      const externalTarget = new URL(entry.target);
      assert.equal(externalTarget.protocol, 'https:', `External specification redirect must use HTTPS: ${entry.path}`);
      assert.ok(!externalTarget.username && !externalTarget.password, `Redirect URL must not contain credentials: ${entry.path}`);
    }
    assert.ok(html.includes(`content="0;url=${htmlEscape(entry.target)}"`), `Missing immediate redirect: ${entry.path}`);
    assert.ok(html.includes(`href="${htmlEscape(entry.target)}"`), `Missing fallback link: ${entry.path}`);
  } else {
    assert.match(html, /aria-label="Breadcrumb"/, `Missing breadcrumbs: ${entry.path}`);
    assert.equal(getReferenceBreadcrumbs(entry.path).at(-1)?.href, entry.path, 'Breadcrumb must end at the current route');
  }
}
for (const path of ['/ro-crate/isa/999.999/', '/ro-crate/unknown/', '/workspace/unknown/']) {
  assert.ok(!existsSync(resolve(dist, `.${path}`, 'index.html')), `Unexpected catch-all output: ${path}`);
}
const sitemap = readdirSync(dist)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .map((name) => readFileSync(resolve(dist, name), 'utf8'))
  .join('\n');
assert.ok(sitemap, 'Expected a generated sitemap');
for (const path of referencePagePaths) {
  assert.ok(sitemap.includes(`<loc>https://arc-rdm.org${path}</loc>`), `Missing reference page in sitemap: ${path}`);
}
for (const path of referenceRedirectPaths) {
  assert.ok(!sitemap.includes(`<loc>https://arc-rdm.org${path}</loc>`), `Redirect should not appear in sitemap: ${path}`);
}
const fragmentDirectory = resolve(dist, 'pagefind/fragment');
const fragmentFiles = readdirSync(fragmentDirectory).filter((name) => name.endsWith('.pf_fragment'));
assert.ok(fragmentFiles.length > 0, 'Expected generated Pagefind search fragments');
const indexedPaths = fragmentFiles.map((name) => {
  const content = gunzipSync(readFileSync(resolve(fragmentDirectory, name))).toString('utf8');
  const fragment = JSON.parse(content.slice(content.indexOf('{')));
  return new URL(fragment.url, 'https://arc-rdm.org').pathname;
});
for (const entry of referenceRoutes) {
  assert.ok(!indexedPaths.includes(entry.path), `Reference route must not appear in Pagefind: ${entry.path}`);
}
assert.ok(indexedPaths.includes('/details/data-management-principle/'), 'Existing article must remain searchable');
assert.ok(indexedPaths.includes('/dictionary/isa/'), 'Existing dictionary entry must remain searchable');
console.log(`Verified ${referenceRoutes.length} reference routes (${referencePagePaths.length} pages, ${referenceRedirectPaths.length} latest-version redirects).`);
console.log(`Verified all ${referenceRoutes.length} placeholders/aliases excluded from ${indexedPaths.length} Pagefind pages.`);
