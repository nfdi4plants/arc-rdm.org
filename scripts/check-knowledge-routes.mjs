import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { knowledgeGroups, knowledgePages } from '../src/data/knowledge.ts';
import { referenceRoutes } from '../src/data/reference.ts';

const site = 'https://arc-rdm.org';
const dist = resolve('dist');
assert.ok(existsSync(dist), 'Build the site before checking knowledge pages');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attribute = (attributes, name) => decode(attributes.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1] ?? '');
const anchors = (html) => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
  href: attribute(match[1], 'href'), rel: attribute(match[1], 'rel'), html: match[0],
}));
const normalize = (href) => new URL(href, site).pathname.replace(/\/?$/, '/');
const mainContent = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
const readPage = (path) => {
  const file = resolve(dist, `.${decodeURIComponent(path)}`, 'index.html');
  assert.ok(existsSync(file), `Missing knowledge page: ${path}`);
  return readFileSync(file, 'utf8');
};
const flatten = (links) => links.flatMap((link) => [link, ...flatten(link.children ?? [])]);
const paths = knowledgePages.map((page) => page.href);
const referencePaths = new Set(referenceRoutes.map((entry) => entry.path));
assert.equal(new Set(knowledgeGroups.map((group) => group.id)).size, knowledgeGroups.length, 'Knowledge section IDs must be unique');
assert.equal(new Set(paths).size, paths.length, 'Knowledge article paths must be unique');
assert.deepEqual(knowledgeGroups.flatMap((group) => flatten(group.pages).map((page) => page.href)), paths, 'The topic index and article reading order must agree');
for (const group of knowledgeGroups) assert.ok(group.pages.length && group.description, `Empty knowledge section: ${group.id}`);

const profiles = ['administrative-core', 'provenance-core', 'semantic-core', 'isa', 'wr', 'datamap'];
const migratedPaths = ['/details/arc-workspace/', '/details/arc-workspace/isa-arc/', '/details/arc-data-model/',
  ...profiles.map((profile) => `/details/arc-data-model/${profile}/`), '/details/arc-ro-crate/'];
for (const path of migratedPaths) assert.ok(paths.includes(path), `Explanation is missing from knowledge browsing: ${path}`);

const fragmentDirectory = resolve(dist, 'pagefind/fragment');
const fragments = readdirSync(fragmentDirectory).filter((name) => name.endsWith('.pf_fragment')).map((name) => {
  const data = gunzipSync(readFileSync(resolve(fragmentDirectory, name))).toString('utf8');
  return JSON.parse(data.slice(data.indexOf('{')));
});
const indexedFragments = new Map(fragments.map((fragment) => [new URL(fragment.url, site).pathname, fragment]));
const indexedPaths = new Set(indexedFragments.keys());
for (const path of referencePaths) assert.ok(!indexedPaths.has(path), `Specification placeholder or alias leaked into search: ${path}`);

const index = readPage('/details/');
const indexMain = mainContent(index);
const indexLinks = anchors(indexMain).map((link) => normalize(link.href));
assert.ok(indexedPaths.has('/details/'), 'Knowledge index must be searchable');
for (const group of knowledgeGroups) assert.ok(indexMain.includes(`id="${group.id}"`), `Missing knowledge section anchor: ${group.id}`);
for (const path of paths) assert.ok(indexLinks.includes(path), `Knowledge index does not link to ${path}`);

let tagChecks = 0;
for (const [position, page] of knowledgePages.entries()) {
  assert.match(page.href, /^\/details\/[a-z0-9/-]+\/$/, `Expected a canonical knowledge path: ${page.href}`);
  assert.ok(!referencePaths.has(page.href), `Knowledge article reuses a PID route: ${page.href}`);
  const html = readPage(page.href);
  const main = mainContent(html);
  assert.ok(main, `Missing article main content: ${page.href}`);
  assert.equal([...main.matchAll(/<h1\b/g)].length, 1, `Expected one article heading: ${page.href}`);
  assert.match(main, /<article\b/, `Knowledge page must use the shared article layout: ${page.href}`);
  assert.ok(html.includes('data-pagefind-body') && indexedPaths.has(page.href), `Knowledge article is not searchable: ${page.href}`);
  assert.doesNotMatch(indexedFragments.get(page.href).content, /\b(?:All topics|On this page)\b/, `Navigation text leaked into the search fragment: ${page.href}`);
  const canonical = [...html.matchAll(/<link\b([^>]*)>/g)].find((match) => attribute(match[1], 'rel') === 'canonical');
  assert.equal(attribute(canonical?.[1] ?? '', 'href'), `${site}${page.href}`, `Incorrect canonical: ${page.href}`);
  const links = anchors(main);
  assert.ok(links.some((link) => normalize(link.href) === '/details/'), `Direct article visitors need a link to all knowledge topics: ${page.href}`);
  const previous = links.filter((link) => link.rel.split(/\s+/).includes('prev'));
  const next = links.filter((link) => link.rel.split(/\s+/).includes('next'));
  assert.deepEqual(previous.map((link) => link.href), position > 0 ? [paths[position - 1]] : [], `Incorrect previous article: ${page.href}`);
  assert.deepEqual(next.map((link) => link.href), position < paths.length - 1 ? [paths[position + 1]] : [], `Incorrect next article: ${page.href}`);

  // Navigation may be ignored directly or through an enclosing aside/details.
  const ignoredRegions = [...main.matchAll(/<(nav|aside|details)\b[^>]*\bdata-pagefind-ignore(?:=["'][^"']*["'])?[^>]*>[\s\S]*?<\/\1>/g)].map((match) => match[0]);
  const navigation = [...main.matchAll(/<nav\b[^>]*>[\s\S]*?<\/nav>/g)].map((match) => match[0]);
  for (const label of ['Knowledge breadcrumb', 'In this section', 'Article navigation']) {
    assert.ok(navigation.some((nav) => nav.includes(`aria-label="${label}"`)), `Missing ${label} navigation: ${page.href}`);
  }
  for (const nav of navigation) assert.ok(ignoredRegions.some((region) => region.includes(nav)), `Article navigation must be excluded from search: ${page.href}`);

  const tags = main.match(/<ul\b[^>]*class="[^"]*\barticle-tags\b[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? '';
  for (const tag of anchors(tags)) {
    const tagPath = normalize(tag.href);
    const taggedArticlePaths = anchors(mainContent(readPage(tagPath))).map((link) => normalize(link.href));
    assert.ok(taggedArticlePaths.includes(page.href), `Tag listing ${tagPath} omits ${page.href}`);
    tagChecks += 1;
  }
}

const home = readPage('/');
const folders = [...home.matchAll(/<section\b[^>]*class="[^"]*\bresearch-folder\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)];
const folderLinks = folders.flatMap((folder) => anchors(folder[1]).map((link) => link.href));
const expectedFolderLinks = ['/details/arc-workspace/', ...profiles.slice(0, 3).map((profile) => `/details/arc-data-model/${profile}/`),
  '/details/arc-ro-crate/', ...profiles.slice(0, 3).map((profile) => `/details/arc-ro-crate/#${profile}`)];
assert.deepEqual(folderLinks, expectedFolderLinks, 'Homepage folders must link to explanations, not empty specification routes');
const actions = home.match(/<div\b[^>]*class="[^"]*\bhero-actions\b[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
const actionLinks = anchors(actions);
assert.equal(actionLinks.length, 2, 'Expected two introductory links');
for (const link of [...actionLinks, ...folderLinks.map((href) => ({ href }))]) {
  const target = new URL(link.href, site);
  assert.ok(target.pathname === '/details/' || paths.includes(target.pathname), `Landing-page explanation link must reach knowledge: ${link.href}`);
  if (target.hash) assert.ok(readPage(target.pathname).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Missing landing-page explanation anchor: ${link.href}`);
}

console.log(`Verified ${knowledgePages.length} searchable knowledge articles in ${knowledgeGroups.length} sections, the topic index, reading order, and ${tagChecks} tag memberships.`);
console.log(`Verified ten migrated explanations, ten landing-page destinations, and all ${referencePaths.size} reference routes excluded from Pagefind.`);
