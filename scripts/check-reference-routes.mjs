import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { runInNewContext } from 'node:vm';
import {
  referenceRoutes,
  referenceProfiles,
  referencePagePaths,
  referenceRedirectPaths,
  getReferenceBreadcrumbs,
  getReferencePid,
  isReferenceRedirectEnabled,
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
assert.ok(referencePagePaths.length >= 19, 'Expected at least 19 reference pages');
const redirectDefinitions = referenceRoutes.filter((entry) => entry.kind === 'redirect');
assert.equal(redirectDefinitions.length, 9, 'Preserve six latest-version aliases and three specification redirect definitions');
assert.deepEqual(referenceRedirectPaths, referenceRoutes.filter(isReferenceRedirectEnabled).map((entry) => entry.path), 'Only enabled redirects belong in the active redirect list');
assert.deepEqual(referencePagePaths, referenceRoutes.filter((entry) => !isReferenceRedirectEnabled(entry)).map((entry) => entry.path), 'Disabled redirects must render as reference pages');
for (const entry of referenceRoutes) {
  assert.equal(isReferenceRedirectEnabled({ ...entry, redirectEnabled: undefined }), false, `Redirects must be disabled by default: ${entry.path}`);
  assert.equal(isReferenceRedirectEnabled({ ...entry, redirectEnabled: false }), false, `Explicitly disabled route became a redirect: ${entry.path}`);
  assert.equal(isReferenceRedirectEnabled({ ...entry, redirectEnabled: true }), entry.kind === 'redirect', `Only registered redirect entries may be enabled: ${entry.path}`);
}
// These trailing-slash distinctions are registered in perma-id/w3id.org's ids/arc rules.
const directoryPidPaths = new Set(['/workspace/', '/abstract-model/', '/ro-crate/']);
for (const path of expectedPaths) {
  const pidPath = directoryPidPaths.has(path) ? path : path.slice(0, -1);
  assert.equal(getReferencePid(path), `https://w3id.org/arc${pidPath}`, `Incorrect registered PID: ${path}`);
}
assert.ok(referenceRoutes.every((entry) => !Object.hasOwn(entry, 'content')), 'Educational content must not be attached to specification/PID routes');
// Preserve the alias destinations that existed before the knowledge reorganization.
for (const profile of profiles) {
  const alias = referenceRoutes.find((entry) => entry.path === `/ro-crate/${profile}/`);
  assert.equal(alias?.kind, 'redirect', `Missing latest-version alias for ${profile}`);
  assert.equal(alias.target, `/ro-crate/${profile}/1.0/`, `Changed latest-version destination for ${profile}`);
}

const specificationFiles = new Map([
  ['/workspace/isa-arc/', 'ISA-ARC-Workspace.md'],
  ['/workspace/isa-arc/isa-xlsx/', 'ISA-XLSX.md'],
  ['/workspace/isa-arc/wr-xlsx/', 'WR-XLSX.md'],
]);
const specificationCommits = new Set();
for (const [path, file] of specificationFiles) {
  const entry = referenceRoutes.find((route) => route.path === path);
  assert.equal(entry?.kind, 'redirect', `Missing specification redirect: ${path}`);
  const target = new URL(entry.target);
  assert.equal(target.origin, 'https://github.com', `Incorrect specification host: ${path}`);
  const match = target.pathname.match(/^\/nfdi4plants\/ISA-ARC-Workspace\/blob\/([0-9a-f]{40})\/([^/]+)$/);
  assert.ok(match, `Specification target must pin a complete commit SHA: ${path}`);
  assert.equal(match[2], file, `Incorrect specification document: ${path}`);
  specificationCommits.add(match[1]);
}
assert.equal(specificationCommits.size, 1, 'The specifications must use the same reviewed snapshot');

// Keep the real external redirect behavior covered while all current routes are disabled.
const routeTemplate = readFileSync(resolve('src/pages/[...reference].astro'), 'utf8');
const retainedRedirectScript = Array.from(routeTemplate.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))
  .map((match) => match[1]).find((script) => script.includes('window.location.replace'));
assert.ok(retainedRedirectScript, 'Preserve the external redirect implementation for gradual activation');
for (const entry of redirectDefinitions.filter((entry) => entry.target.startsWith('https://'))) {
  for (const hash of ['', '#top-level-metadata-sheets']) {
    let destination;
    runInNewContext(retainedRedirectScript, {
      target: entry.target,
      URL,
      window: { location: { hash, replace: (value) => { destination = value; } } },
    });
    assert.equal(destination, `${entry.target}${hash}`, `Incorrect retained fragment redirect: ${entry.path}${hash}`);
  }
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
  assert.doesNotMatch(main, /<(?:article|h[2-6])\b/, `Reference must remain a title/PID placeholder or redirect: ${entry.path}`);
  const redirects = entry.kind === 'redirect' && isReferenceRedirectEnabled(entry);
  const target = redirects ? entry.target : entry.path;
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
  }
  if (redirects) {
    if (!entry.target.startsWith('/')) {
      const redirectScript = Array.from(html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))
        .map((match) => match[1]).find((script) => script.includes('window.location.replace'));
      assert.ok(redirectScript, `Missing fragment-preserving redirect: ${entry.path}`);
      for (const hash of ['', '#top-level-metadata-sheets']) {
        let destination;
        runInNewContext(redirectScript, {
          URL,
          window: { location: { hash, replace: (value) => { destination = value; } } },
        });
        assert.equal(destination, `${entry.target}${hash}`, `Incorrect fragment redirect: ${entry.path}${hash}`);
      }
    }
    assert.ok(html.includes(`content="0;url=${htmlEscape(entry.target)}"`), `Missing immediate redirect: ${entry.path}`);
    assert.ok(html.includes(`href="${htmlEscape(entry.target)}"`), `Missing fallback link: ${entry.path}`);
  } else {
    assert.doesNotMatch(html, /<meta\b[^>]*http-equiv=["']refresh["']/i, `Disabled route must not refresh automatically: ${entry.path}`);
    const inlineScripts = Array.from(html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)).map((match) => match[1]).join('\n');
    assert.doesNotMatch(inlineScripts, /(?:window\.)?location\.(?:replace|assign)\s*\(|(?:window\.)?location(?:\.href)?\s*=/, `Disabled route must not navigate automatically: ${entry.path}`);
    const pid = htmlEscape(getReferencePid(entry.path));
    const pidLink = Array.from(main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g))
      .find((match) => match[1] === pid && match[2].trim() === pid);
    assert.ok(pidLink, `Missing visible PID link: ${entry.path}`);
    assert.match(html, /class="reference-sidebar"/, `Missing reference sidebar: ${entry.path}`);
    assert.match(html, /aria-label="Reference"/, `Missing reference navigation: ${entry.path}`);
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
console.log(`Verified ${referenceRoutes.length} reference routes (${referencePagePaths.length} pages, ${referenceRedirectPaths.length} enabled redirects; ${redirectDefinitions.length} retained redirect definitions).`);
console.log(`Verified all ${referenceRoutes.length} placeholders/aliases excluded from ${indexedPaths.length} Pagefind pages.`);
