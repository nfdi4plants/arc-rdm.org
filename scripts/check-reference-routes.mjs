import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { runInNewContext } from 'node:vm';
import {
  referenceRoutes, referenceProfiles, referencePagePaths, referenceRedirectPaths,
  getReferenceBreadcrumbs, getReferencePid, isReferenceRedirectEnabled,
} from '../src/data/reference.ts';
import { getSpecificationSourceUrl } from '../src/data/specifications.ts';
import { checkNavigationBranches } from './lib/check-navigation-branches.mjs';

const site = 'https://arc-rdm.org';
const dist = resolve('dist');
assert.ok(existsSync(dist), 'Build the site before checking reference routes');
const htmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const readPage = (path) => {
  const file = resolve(dist, '.' + path, 'index.html');
  assert.ok(existsSync(file), 'Missing generated page: ' + path);
  return readFileSync(file, 'utf8');
};
const requiredPaths = [
  '/definition/', '/workspace/', '/workspace/definition/', '/workspace/isa-arc/',
  '/workspace/isa-arc/definition/', '/workspace/isa-arc/isa-xlsx/',
  '/workspace/isa-arc/wr-xlsx/', '/workspace/isa-arc/datamap-xlsx/',
  '/abstract-model/', '/ro-crate/',
];
const profileSlugs = ['administrative-core', 'provenance-core', 'semantic-core', 'isa', 'wr', 'datamap'];
for (const slug of profileSlugs) requiredPaths.push('/abstract-model/' + slug + '/', '/ro-crate/' + slug + '/');
assert.equal(new Set(referenceRoutes.map((entry) => entry.path)).size, referenceRoutes.length, 'Reference paths must be unique');
for (const path of requiredPaths) assert.ok(referenceRoutes.some((entry) => entry.path === path), 'Missing existing route ' + path);
assert.deepEqual(referenceRedirectPaths, referenceRoutes.filter(isReferenceRedirectEnabled).map((entry) => entry.path));
assert.deepEqual(referencePagePaths, referenceRoutes.filter((entry) => !isReferenceRedirectEnabled(entry)).map((entry) => entry.path));

// PIDs are an explicit public interface. New documentation URLs do not acquire a PID automatically.
const directoryPids = new Set(['/workspace/', '/abstract-model/', '/ro-crate/']);
for (const path of requiredPaths) {
  assert.equal(getReferencePid(path), 'https://w3id.org/arc' + (directoryPids.has(path) ? path : path.slice(0, -1)), 'Incorrect registered PID: ' + path);
}
assert.equal(getReferencePid('/abstract-model/shared/data/'), undefined, 'Do not invent entity PIDs');
assert.equal(getReferencePid('/not-a-reference/'), undefined, 'Do not invent unknown PIDs');

for (const profile of referenceProfiles) {
  assert.ok(profile.versions.length > 0 && profile.versions.includes(profile.latest), 'Invalid latest version: ' + profile.slug);
  assert.equal(new Set(profile.versions).size, profile.versions.length, 'Duplicate versions: ' + profile.slug);
  const alias = referenceRoutes.find((entry) => entry.path === '/ro-crate/' + profile.slug + '/');
  assert.ok(alias && isReferenceRedirectEnabled(alias), 'Missing active profile alias: ' + profile.slug);
  assert.equal(alias.target, '/ro-crate/' + profile.slug + '/' + profile.latest + '/', 'Alias differs from source latest: ' + profile.slug);
  for (const version of profile.versions) {
    const path = '/ro-crate/' + profile.slug + '/' + version + '/';
    assert.ok(referenceRoutes.find((entry) => entry.path === path)?.specification, 'Missing actual specification: ' + path);
    assert.equal(getReferencePid(path), 'https://w3id.org/arc/ro-crate/' + profile.slug + '/' + version);
  }
}

let renderedSpecifications = 0;
for (const entry of referenceRoutes) {
  assert.match(entry.path, /^\/[a-z0-9./-]+\/$/, 'Expected a lowercase trailing-slash route: ' + entry.path);
  const html = readPage(entry.path);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, 'Missing main content: ' + entry.path);
  assert.equal([...main.matchAll(/<h1\b/g)].length, 1, 'Expected one H1: ' + entry.path);
  assert.ok(!html.includes('data-pagefind-body'), 'Reference must be excluded from search: ' + entry.path);
  assert.match(html, /data-pagefind-ignore(?:="all")?/, 'Missing search exclusion: ' + entry.path);
  const redirects = isReferenceRedirectEnabled(entry);
  const canonical = new URL(redirects ? entry.target : entry.path, site).href;
  assert.ok(html.includes('rel="canonical" href="' + htmlEscape(canonical) + '"'), 'Incorrect canonical: ' + entry.path);
  if (redirects) {
    assert.ok(entry.target.startsWith('/') ? referencePagePaths.includes(entry.target) : entry.target.startsWith('https://'), 'Invalid redirect target: ' + entry.path);
    const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
      .map((match) => match[1]).find((body) => body.includes('window.location.replace'));
    assert.ok(script, 'Missing fragment-preserving redirect: ' + entry.path);
    for (const hash of ['', '#workflow-protocol', '#top-level-metadata-sheets']) {
      let destination;
      const location = { href: site + entry.path + hash, origin: site, hash, search: '', replace: (value) => { destination = value; } };
      runInNewContext(script, { URL, window: { location }, location });
      assert.equal(new URL(destination, location.href).href, new URL(entry.target, site).href + hash, 'Lost redirect fragment: ' + entry.path + hash);
    }
    assert.ok(html.includes('content="0;url=' + htmlEscape(entry.target) + '"'), 'Missing no-JavaScript redirect: ' + entry.path);
    assert.ok(html.includes('href="' + htmlEscape(entry.target) + '"'), 'Missing redirect fallback link: ' + entry.path);
    continue;
  }

  assert.doesNotMatch(html, /<meta\b[^>]*http-equiv=["']refresh["']/i, 'Content page unexpectedly redirects: ' + entry.path);
  assert.match(main, /data-content-sidebar="left"/, 'Missing left reference sidebar: ' + entry.path);
  assert.match(main, /<nav\b[^>]*aria-label="Reference"/, 'Missing reference navigation: ' + entry.path);
  assert.match(main, /class="navigation-branch"/, 'Missing collapsible reference branches: ' + entry.path);
  checkNavigationBranches(main, entry.path);
  assert.equal([...main.matchAll(/<nav\b[^>]*aria-label="Reference"/g)].length, 1, 'Duplicated reference navigation: ' + entry.path);
  assert.ok([...main.matchAll(/<nav\b[^>]*aria-label="On this page"/g)].length <= 1, 'Duplicated table of contents: ' + entry.path);
  assert.match(html, /aria-label="Breadcrumb"/, 'Missing breadcrumbs: ' + entry.path);
  assert.equal(getReferenceBreadcrumbs(entry.path).at(-1)?.href, entry.path, 'Breadcrumb must end at the current route');
  const pid = getReferencePid(entry.path);
  if (pid) assert.ok(main.includes('href="' + htmlEscape(pid) + '"'), 'Missing PID link: ' + entry.path);
  else assert.doesNotMatch(main, /class="reference-pid"/, 'Unregistered route has a generated PID: ' + entry.path);

  if (entry.specification) {
    renderedSpecifications += 1;
    assert.match(main, /<article\b/, 'Missing specification body: ' + entry.path);
    assert.ok(main.includes('href="' + htmlEscape(getSpecificationSourceUrl(entry.specification)) + '"'), 'Missing pinned source link: ' + entry.path);
  } else {
    assert.doesNotMatch(main, /<article\b/, 'A placeholder must not pretend to contain a specification: ' + entry.path);
  }
}
assert.ok(renderedSpecifications > 0, 'Expected imported specification pages');
for (const path of ['/ro-crate/isa/999.999/', '/ro-crate/unknown/', '/workspace/unknown/']) {
  assert.ok(!existsSync(resolve(dist, '.' + path, 'index.html')), 'Unexpected catch-all output: ' + path);
}
for (const profile of referenceProfiles.filter((entry) => !entry.versions.includes('1.0'))) {
  assert.ok(!existsSync(resolve(dist, 'ro-crate/' + profile.slug + '/1.0/index.html')), 'Invented 1.0 placeholder remains: ' + profile.slug);
}

const sitemap = readdirSync(dist).filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .map((name) => readFileSync(resolve(dist, name), 'utf8')).join('\n');
assert.ok(sitemap, 'Expected a generated sitemap');
for (const path of referencePagePaths) assert.ok(sitemap.includes('<loc>' + site + path + '</loc>'), 'Missing sitemap page: ' + path);
for (const path of referenceRedirectPaths) assert.ok(!sitemap.includes('<loc>' + site + path + '</loc>'), 'Redirect should not appear in sitemap: ' + path);
const fragmentDirectory = resolve(dist, 'pagefind/fragment');
const indexedPaths = readdirSync(fragmentDirectory).filter((name) => name.endsWith('.pf_fragment')).map((name) => {
  const content = gunzipSync(readFileSync(resolve(fragmentDirectory, name))).toString('utf8');
  return new URL(JSON.parse(content.slice(content.indexOf('{'))).url, site).pathname;
});
for (const entry of referenceRoutes) assert.ok(!indexedPaths.includes(entry.path), 'Reference appeared in Pagefind: ' + entry.path);
assert.ok(indexedPaths.includes('/details/data-management-principle/'), 'Existing article must remain searchable');
assert.ok(indexedPaths.includes('/dictionary/isa/'), 'Existing dictionary entry must remain searchable');
console.log('Verified ' + referenceRoutes.length + ' reference routes, including ' + renderedSpecifications + ' specifications and ' + referenceRedirectPaths.length + ' aliases; preserved sitemap and search separation.');
