import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { parse } from 'yaml';
import { knowledgeGroups, knowledgePages } from '../src/data/knowledge.ts';
import { referenceRoutes } from '../src/data/reference.ts';
import { checkNavigationBranches } from './lib/check-navigation-branches.mjs';

const site = 'https://arc-rdm.org';
const dist = resolve('dist');
assert.ok(existsSync(dist), 'Build the site before checking knowledge pages');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attribute = (attributes, name) => decode(attributes.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1] ?? '');
const anchors = (html) => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
  href: attribute(match[1], 'href'), rel: attribute(match[1], 'rel'), current: attribute(match[1], 'aria-current'),
  text: decode(match[2].replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim(), html: match[0],
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
const toolDirectory = resolve('src/pages/details/tools-and-services');
const tools = readdirSync(toolDirectory).filter((name) => name.endsWith('.md')).map((name) => {
  const source = readFileSync(resolve(toolDirectory, name), 'utf8');
  const frontmatter = parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
  assert.ok(frontmatter?.title, `Tool page needs a navigation title: ${name}`);
  return { href: `/details/tools-and-services/${name.slice(0, -3)}/`, text: frontmatter.title };
});
const sidebarPages = [{ href: '/details/', text: 'Overview' }, ...knowledgePages, ...tools];
const sidebarTitles = new Map(sidebarPages.map((page) => [page.href, page.text]));
const sidebarPaths = sidebarPages.map((page) => page.href).sort();
const referencePaths = new Set(referenceRoutes.map((entry) => entry.path));
assert.equal(new Set(knowledgeGroups.map((group) => group.id)).size, knowledgeGroups.length, 'Knowledge section IDs must be unique');
assert.equal(new Set(paths).size, paths.length, 'Knowledge article paths must be unique');
assert.equal(new Set(sidebarPaths).size, sidebarPaths.length, 'Knowledge and tool navigation paths must be unique');
assert.deepEqual(knowledgeGroups.flatMap((group) => flatten(group.pages).map((page) => page.href)), paths, 'The topic index and article reading order must agree');
for (const group of knowledgeGroups) assert.ok(group.pages.length && group.description, `Empty knowledge section: ${group.id}`);

let sidebarOrder;
function checkKnowledgeNavigation(main, path) {
  const leftSidebars = [...main.matchAll(/<([a-z][\w-]*)\b([^>]*\bdata-content-sidebar=["']left["'][^>]*)>([\s\S]*?)<\/\1>/g)];
  assert.equal(leftSidebars.length, 1, `Expected one left knowledge sidebar: ${path}`);
  const navigation = [...leftSidebars[0][3].matchAll(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/g)]
    .filter((match) => attribute(match[1], 'aria-label') === 'Learn ARC');
  assert.equal(navigation.length, 1, `Expected one Learn ARC navigation: ${path}`);
  const nav = navigation[0][0];
  assert.match(navigation[0][1], /\bdata-pagefind-ignore\b/, `Knowledge sidebar must be excluded from search: ${path}`);
  const links = anchors(nav);
  const destinations = links.map((link) => link.href);
  assert.deepEqual([...destinations].sort(), sidebarPaths, `Sidebar must expose every topic and tool exactly once: ${path}`);
  assert.equal(destinations[0], '/details/', `Overview must lead the shared sidebar: ${path}`);
  sidebarOrder ??= destinations;
  assert.deepEqual(destinations, sidebarOrder, `Sidebar order differs from the knowledge overview: ${path}`);
  for (const link of links) assert.equal(link.text, sidebarTitles.get(link.href), `Incorrect sidebar label for ${link.href}: ${path}`);
  assert.deepEqual(links.filter((link) => link.current === 'page').map((link) => link.href), sidebarTitles.has(path) ? [path] : [],
    `Sidebar must select only the current page, with no selection on tag listings: ${path}`);

  const groupLabels = [...nav.matchAll(/<span\b([^>]*)>([\s\S]*?)<\/span>/g)]
    .filter((match) => attribute(match[1], 'class').split(/\s+/).includes('group-label'))
    .map((match) => decode(match[2]).trim());
  assert.deepEqual(groupLabels, knowledgeGroups.map((group) => group.title), `Sidebar must retain all topic groups: ${path}`);
  let depth = 0;
  let topLevelBranches = 0;
  for (const [, closing, attributes] of nav.matchAll(/<(\/?)details\b([^>]*)>/g)) {
    if (closing) depth -= 1;
    else {
      if (depth === 0) {
        assert.ok(attribute(attributes, 'class').split(/\s+/).includes('navigation-branch'), `Topic group must be collapsible: ${path}`);
        topLevelBranches += 1;
      }
      depth += 1;
    }
  }
  assert.equal(topLevelBranches, knowledgeGroups.length, `Expected one disclosure per topic group: ${path}`);
  checkNavigationBranches(nav, path);
}

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
assert.equal([...indexMain.matchAll(/<h1\b/g)].length, 1, 'Knowledge overview must have one article heading');
assert.match(indexMain, /<article\b/, 'Knowledge overview must use the shared article layout');
checkKnowledgeNavigation(indexMain, '/details/');
for (const group of knowledgeGroups) assert.ok(indexMain.includes(`id="${group.id}"`), `Missing knowledge section anchor: ${group.id}`);
for (const path of paths) assert.ok(indexLinks.includes(path), `Knowledge index does not link to ${path}`);

let tagChecks = 0;
const checkedTagPages = new Set();
for (const [position, page] of knowledgePages.entries()) {
  assert.match(page.href, /^\/details\/[a-z0-9/-]+\/$/, `Expected a canonical knowledge path: ${page.href}`);
  assert.ok(!referencePaths.has(page.href), `Knowledge article reuses a PID route: ${page.href}`);
  const html = readPage(page.href);
  const main = mainContent(html);
  assert.ok(main, `Missing article main content: ${page.href}`);
  assert.equal([...main.matchAll(/<h1\b/g)].length, 1, `Expected one article heading: ${page.href}`);
  assert.match(main, /<article\b/, `Knowledge page must use the shared article layout: ${page.href}`);
  checkKnowledgeNavigation(main, page.href);
  assert.ok(html.includes('data-pagefind-body') && indexedPaths.has(page.href), `Knowledge article is not searchable: ${page.href}`);
  assert.doesNotMatch(indexedFragments.get(page.href).content, /\b(?:All topics|On this page|Learn ARC)\b/, `Navigation text leaked into the search fragment: ${page.href}`);
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
  for (const label of ['Knowledge breadcrumb', 'Learn ARC', 'Article navigation']) {
    assert.equal(navigation.filter((nav) => nav.includes(`aria-label="${label}"`)).length, 1, `Expected one ${label} navigation: ${page.href}`);
  }
  assert.ok(navigation.filter((nav) => nav.includes('aria-label="On this page"')).length <= 1, `Duplicated table of contents: ${page.href}`);
  for (const nav of navigation) assert.ok(ignoredRegions.some((region) => region.includes(nav)), `Article navigation must be excluded from search: ${page.href}`);

  const tags = main.match(/<ul\b[^>]*class="[^"]*\barticle-tags\b[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? '';
  for (const tag of anchors(tags)) {
    const tagPath = normalize(tag.href);
    const tagMain = mainContent(readPage(tagPath));
    if (!checkedTagPages.has(tagPath)) {
      checkKnowledgeNavigation(tagMain, tagPath);
      checkedTagPages.add(tagPath);
    }
    // The shared sidebar links every article; membership must come from the tag listing itself.
    const tagArticle = tagMain.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
    assert.ok(tagArticle, `Tag listing must use the shared article layout: ${tagPath}`);
    const taggedArticlePaths = anchors(tagArticle).map((link) => normalize(link.href));
    assert.ok(taggedArticlePaths.includes(page.href), `Tag listing ${tagPath} omits ${page.href}`);
    tagChecks += 1;
  }
}

for (const tool of tools) {
  const main = mainContent(readPage(tool.href));
  assert.match(main, /<article\b/, `Tool detail must use the shared article layout: ${tool.href}`);
  checkKnowledgeNavigation(main, tool.href);
  assert.ok(indexedPaths.has(tool.href), `Tool detail is not searchable: ${tool.href}`);
  assert.doesNotMatch(indexedFragments.get(tool.href).content, /\b(?:All topics|On this page|Learn ARC)\b/, `Tool sidebar leaked into the search fragment: ${tool.href}`);
  assert.ok(anchors(main).every((link) => !link.rel.split(/\s+/).some((rel) => rel === 'prev' || rel === 'next')),
    `Tool detail must stay outside the article reading sequence: ${tool.href}`);
}

const home = readPage('/');
const illustrationLinks = (headingId) => {
  const section = home.match(new RegExp(`<section\\b[^>]*\\baria-labelledby=["']${headingId}["'][^>]*>([\\s\\S]*?)<\\/section>`));
  assert.ok(section, `Missing homepage illustration: ${headingId}`);
  return anchors(section[1]).map((link) => link.href);
};
const workspaceLinks = illustrationLinks('arc-workspace-heading');
const publicationLinks = illustrationLinks('arc-publication-heading');
assert.deepEqual(workspaceLinks, ['/details/arc-workspace/', ...profiles.slice(0, 3).map((profile) => `/details/arc-data-model/${profile}/`)],
  'Homepage workspace must link to explanations, not empty specification routes');
assert.deepEqual(publicationLinks, ['/details/arc-ro-crate/', '/details/exchange-and-publication/',
  '/details/arc-ro-crate/#connected-research-context',
  ...profiles.slice(0, 3).map((profile) => `/details/arc-ro-crate/#${profile}`)],
  'Homepage publication layers must link to persistent identification, domain-specific profiles, and core profile explanations');
const actions = home.match(/<div\b[^>]*class="[^"]*\bhero-actions\b[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
const actionLinks = anchors(actions);
assert.equal(actionLinks.length, 2, 'Expected two introductory links');
const landingLinks = [...actionLinks, ...[...workspaceLinks, ...publicationLinks].map((href) => ({ href }))];
for (const link of landingLinks) {
  const target = new URL(link.href, site);
  assert.ok(target.pathname === '/details/' || paths.includes(target.pathname), `Landing-page explanation link must reach knowledge: ${link.href}`);
  if (target.hash) assert.ok(readPage(target.pathname).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Missing landing-page explanation anchor: ${link.href}`);
}

console.log(`Verified ${knowledgePages.length} searchable knowledge articles in ${knowledgeGroups.length} sections, the topic index, reading order, and ${tagChecks} tag memberships.`);
console.log(`Verified the same complete Learn ARC sidebar on the overview, ${knowledgePages.length} articles, ${tools.length} tool details, and ${checkedTagPages.size} tag listings, with only the selected branches expanded.`);
console.log(`Verified ten migrated explanations, ${landingLinks.length} landing-page destinations, and all ${referencePaths.size} reference routes excluded from Pagefind.`);
