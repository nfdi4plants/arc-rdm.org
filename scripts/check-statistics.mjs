import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { Script, createContext } from 'node:vm';
import { ARCHIVE_RECORDS_API, fetchPublishedArcStats, readPublishedArcCount } from '../src/lib/archive-stats.ts';
import { readDataHubMetrics } from '../src/lib/datahub-stats.ts';

let cases = 0;
const check = async (name, run) => {
  try { await run(); cases += 1; }
  catch (error) { error.message = `${name}: ${error.message}`; throw error; }
};

await check('Use the search total, not the returned page length', () => {
  assert.equal(readPublishedArcCount({ hits: { total: 74, hits: [{ id: 'one-record' }] } }), 74);
});
await check('An empty community has a valid zero count', () => {
  assert.equal(readPublishedArcCount({ hits: { total: 0, hits: [] } }), 0);
});
for (const [name, payload] of [
  ['missing response', undefined], ['null response', null], ['missing hits', {}],
  ['null hits', { hits: null }], ['missing total', { hits: {} }],
  ...[-1, 1.5, '74', NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, null].map((total) => [
    `invalid total ${String(total)}`, { hits: { total } },
  ]),
]) await check(name, () => assert.equal(readPublishedArcCount(payload), null));

for (const count of [74, 0]) await check(`Fetch a valid total of ${count}`, async () => {
  const result = await fetchPublishedArcStats(async (url, options) => {
    assert.equal(url, ARCHIVE_RECORDS_API);
    const query = new URL(url).searchParams;
    assert.equal(query.get('size'), '1');
    assert.equal(query.get('allversions'), 'false');
    assert.equal(options.credentials, 'omit');
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ hits: { total: count, hits: [] } });
  });
  assert.equal(result.count, count);
  assert.ok(Number.isFinite(Date.parse(result.retrievedAt)));
});

for (const [name, fetcher] of [
  ['HTTP failure', async () => new Response('', { status: 503 })],
  ['invalid JSON', async () => new Response('not JSON')],
  ['invalid total', async () => Response.json({ hits: {} })],
  ['aborted request', async () => { throw new DOMException('Request aborted', 'AbortError'); }],
]) await check(`${name} is unavailable, not zero`, async () => {
  const warn = console.warn;
  const warnings = [];
  console.warn = (...args) => warnings.push(args);
  try {
    assert.deepEqual(await fetchPublishedArcStats(fetcher), { count: null, retrievedAt: null });
    assert.equal(warnings.length, 1);
  } finally { console.warn = warn; }
});

const source = readFileSync(new URL('../src/components/Home/DataHubStats.astro', import.meta.url), 'utf8');
const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Expected one statistics behavior script');
const behavior = new Script(stripTypeScriptTypes(scripts[0][1].replace(/^\s*import[^\n]+\n/gm, '')), {
  filename: 'DataHubStats.astro',
});

// Run the component's real behavior with a controlled fetch and reduced motion.
// This verifies source independence without requiring network access or a browser.
function fixture(publishedCount) {
  const names = ['arcs', 'terabytes', 'contributions', 'groups', 'users', 'publishedArcs'];
  const fields = Object.fromEntries(names.map((name) => {
    const initial = name === 'publishedArcs' && publishedCount !== null ? String(publishedCount) : 'Unavailable';
    const writes = [];
    const text = () => ({
      value: initial,
      get textContent() { return this.value; },
      set textContent(value) { this.value = value; writes.push(value); },
    });
    const display = text();
    const accessible = text();
    const classes = new Set(initial === 'Unavailable' ? ['metric-pending'] : []);
    return [name, {
      dataset: { metric: name }, display, accessible, writes, classes,
      querySelector: (selector) => ({ '[data-metric-display]': display, '[data-metric-accessible]': accessible })[selector],
      classList: {
        add: (value) => classes.add(value),
        toggle: (value, enabled) => enabled ? classes.add(value) : classes.delete(value),
      },
    }];
  }));
  const attributes = new Map();
  const list = { setAttribute: (name, value) => attributes.set(name, value) };
  const dataset = { source: 'https://example.org/datahub-stats.json' };
  if (publishedCount !== null) dataset.publishedArcs = String(publishedCount);
  const stats = {
    dataset,
    querySelector: (selector) => selector === '.stats-values' ? list : null,
    querySelectorAll: (selector) => selector === '[data-metric]' ? Object.values(fields) : [],
  };
  let resolveFetch;
  let rejectFetch;
  const pending = new Promise((resolve, reject) => { resolveFetch = resolve; rejectFetch = reject; });
  behavior.runInContext(createContext({
    document: { querySelector: () => stats },
    window: { matchMedia: () => ({ matches: true }), setTimeout: () => 1, clearTimeout: () => {} },
    AbortController, Intl, readDataHubMetrics,
    fetch: (url) => { assert.equal(url, dataset.source); return pending; },
  }));
  return { fields, attributes, resolveFetch, rejectFetch };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
for (const outcome of ['success', 'HTTP failure', 'network failure']) {
  await check(`DataHUB ${outcome} preserves the published count`, async () => {
    const f = fixture(74);
    assert.equal(f.fields.publishedArcs.display.textContent, '74');
    assert.equal(f.attributes.get('aria-busy'), 'true');
    const publishedWrites = [...f.fields.publishedArcs.writes];
    if (outcome === 'success') f.resolveFetch(Response.json({ total: {
      internal: 10, private: 20, public: 30, size: 2e12, commits: 4000, groups: 15, active_users: 40,
    } }));
    else if (outcome === 'HTTP failure') f.resolveFetch(new Response('', { status: 503 }));
    else f.rejectFetch(new Error('Offline'));
    await settle();
    assert.deepEqual(f.fields.publishedArcs.writes, publishedWrites, 'Do not reset or reanimate the published count');
    assert.equal(f.fields.publishedArcs.accessible.textContent, '74');
    assert.equal(f.fields.publishedArcs.classes.has('metric-pending'), false);
    assert.equal(f.attributes.get('aria-busy'), 'false');
    const expected = outcome === 'success'
      ? { arcs: '60', terabytes: '2 TB', contributions: '4,000', groups: '15', users: '40' }
      : Object.fromEntries(['arcs', 'terabytes', 'contributions', 'groups', 'users'].map((name) => [name, 'Unavailable']));
    for (const [name, value] of Object.entries(expected)) {
      assert.equal(f.fields[name].display.textContent, value);
      assert.equal(f.fields[name].accessible.textContent, value);
    }
  });
}

for (const count of [null, 0]) await check(`DataHUB success preserves ${count === null ? 'an unavailable' : 'a zero'} published count`, async () => {
  const f = fixture(count);
  const expected = count === null ? 'Unavailable' : '0';
  assert.equal(f.fields.publishedArcs.display.textContent, expected);
  const publishedWrites = [...f.fields.publishedArcs.writes];
  f.resolveFetch(Response.json({ total: {
    internal: 10, private: 20, public: 30, size: 2e12, commits: 4000, groups: 15, active_users: 40,
  } }));
  await settle();
  assert.deepEqual(f.fields.publishedArcs.writes, publishedWrites);
  assert.equal(f.fields.publishedArcs.display.textContent, expected);
  assert.equal(f.fields.publishedArcs.accessible.textContent, expected);
  assert.equal(f.fields.publishedArcs.classes.has('metric-pending'), count === null);
  assert.equal(f.fields.arcs.display.textContent, '60');
  assert.equal(f.attributes.get('aria-busy'), 'false');
});

console.log(`Verified ${cases} statistics cases: published totals, API failures, and independent homepage counters.`);
