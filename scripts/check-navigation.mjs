import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { Script, createContext } from 'node:vm';

const sourcePath = process.argv[2] ?? new URL('../src/components/Navbar.astro', import.meta.url);
const source = readFileSync(sourcePath, 'utf8');
const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Expected one navbar behavior script');
const behavior = new Script(stripTypeScriptTypes(scripts[0][1]), { filename: 'Navbar.astro' });

// Exercise the actual handlers with controlled events and scheduling. This is
// deliberately not a browser or a test of Safari's native link activation.
class NodeStub {
  constructor(tag, parent = null) {
    this.tag = tag;
    this.parent = parent;
    this.children = [];
    this.attributes = new Map();
    this.listeners = new Map();
    this.open = false;
    parent?.children.push(this);
  }
  contains(node) {
    for (let current = node; current; current = current.parent) if (current === this) return true;
    return false;
  }
  closest(tag) {
    for (let current = this; current; current = current.parent) if (current.tag === tag) return current;
    return null;
  }
  querySelector(tag) { return this.children.find((child) => child.tag === tag) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  toggleAttribute(name, present) {
    if (present) this.attributes.set(name, '');
    else this.attributes.delete(name);
  }
  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }
  emit(type, properties = {}, bubbles = true) {
    const event = { type, target: this, defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }, ...properties };
    for (let current = this; current; current = bubbles ? current.parent : null) {
      event.currentTarget = current;
      for (const listener of current.listeners.get(type) ?? []) listener(event);
    }
    return event;
  }
  focus() {
    let document = this;
    while (document.parent) document = document.parent;
    document.activeElement = this;
  }
}

function fixture(mobile = false) {
  const document = new NodeStub('document');
  const body = new NodeStub('body', document);
  const header = new NodeStub('header', body);
  const nav = new NodeStub('nav', header);
  const toggle = new NodeStub('button', header);
  const outside = new NodeStub('button', body);
  const disclosures = Array.from({ length: 3 }, () => new NodeStub('details', nav));
  const summaries = disclosures.map((details) => new NodeStub('summary', details));
  const link = new NodeStub('a', disclosures[0]);
  const label = new NodeStub('span', link);
  const media = new NodeStub('media');
  const timers = [];
  const frames = [];
  const drain = (queue) => { while (queue.length) queue.shift()(); };
  document.activeElement = body;
  toggle.setAttribute('aria-expanded', 'false');
  document.querySelector = (selector) => ({
    '.site-header': header, '#site-navigation': nav, '.mobile-toggle': toggle,
  })[selector] ?? null;
  document.querySelectorAll = (selector) => selector === '.nav-disclosure' ? disclosures : [];
  behavior.runInContext(createContext({
    Node: NodeStub, document,
    window: { matchMedia: () => media, setTimeout: (callback) => timers.push(callback) },
    requestAnimationFrame: (callback) => frames.push(callback),
  }));
  const openDisclosure = (index = 0) => {
    disclosures[index].open = true;
    disclosures[index].emit('toggle', {}, false);
  };
  if (mobile) toggle.emit('click');
  openDisclosure();
  const assertVisible = () => {
    assert.ok(disclosures[0].open, 'A pressed link must remain in an open disclosure through activation');
    if (mobile) assert.notEqual(nav.getAttribute('data-open'), null, 'Mobile navigation must remain visible through activation');
  };
  const assertClosed = () => {
    assert.ok(disclosures.every((details) => !details.open), 'All disclosures should close');
    assert.equal(nav.getAttribute('data-open'), null);
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(toggle.getAttribute('aria-label'), 'Open navigation');
  };
  return { document, body, header, nav, toggle, outside, disclosures, summaries, link, label, media,
    openDisclosure, assertVisible, assertClosed,
    frame: () => drain(frames), flushTimers: () => drain(timers) };
}

let cases = 0;
const check = (name, run) => {
  try { run(); cases += 1; }
  catch (error) { error.message = `${name}: ${error.message}`; throw error; }
};

for (const mobile of [false, true]) {
  const mode = mobile ? 'mobile' : 'desktop';
  check(`${mode}: focus loss before pointer activation`, () => {
    const f = fixture(mobile);
    f.summaries[0].focus();
    f.label.emit('pointerdown');
    f.document.activeElement = f.body;
    f.summaries[0].emit('focusout', { relatedTarget: null });
    f.frame(); // A frame may occur between the press and release.
    f.assertVisible();
    f.label.emit('pointerup');
    const click = f.label.emit('click', { detail: 1 });
    assert.equal(click.defaultPrevented, false, 'Leave the browser default action untouched');
    f.assertVisible(); // The native default action runs before later timer tasks.
    f.flushTimers();
    f.assertClosed();
  });

  for (const [name, properties] of [
    ['plain click', { detail: 1 }], ['Ctrl-click', { ctrlKey: true, detail: 1 }],
    ['Cmd-click', { metaKey: true, detail: 1 }], ['Shift-click', { shiftKey: true, detail: 1 }],
    ['keyboard-generated click', { detail: 0 }],
  ]) check(`${mode}: ${name}`, () => {
    const f = fixture(mobile);
    if (properties.detail === 0) {
      f.link.focus();
      assert.equal(f.link.emit('keydown', { key: 'Enter' }).defaultPrevented, false);
    }
    const click = (properties.detail === 0 ? f.link : f.label).emit('click', properties);
    assert.equal(click.defaultPrevented, false);
    f.assertVisible();
    f.flushTimers();
    f.assertClosed();
  });
}

check('Focus stays within the header', () => {
  const f = fixture(true);
  f.summaries[0].emit('focusout', { relatedTarget: f.link });
  f.frame();
  f.flushTimers();
  f.assertVisible();
});
check('Tabbing to a known outside target closes navigation', () => {
  const f = fixture(true);
  f.summaries[0].emit('focusout', { relatedTarget: f.outside });
  f.frame();
  f.flushTimers();
  f.assertClosed();
});
check('Outside click closes navigation', () => {
  const f = fixture(true);
  f.outside.emit('click');
  f.assertClosed();
});
check('Escape closes the disclosure, then mobile navigation, and restores focus', () => {
  const f = fixture(true);
  f.link.focus();
  f.link.emit('keydown', { key: 'Escape' });
  assert.equal(f.disclosures[0].open, false);
  assert.equal(f.document.activeElement, f.summaries[0]);
  assert.equal(f.toggle.getAttribute('aria-expanded'), 'true');
  f.summaries[0].emit('keydown', { key: 'Escape' });
  f.assertClosed();
  assert.equal(f.document.activeElement, f.toggle);
});
check('Escape outside the header does not change navigation', () => {
  const f = fixture(true);
  f.outside.focus();
  f.outside.emit('keydown', { key: 'Escape' });
  f.assertVisible();
});
check('Only one disclosure remains open', () => {
  const f = fixture();
  f.openDisclosure(1);
  assert.deepEqual(f.disclosures.map((details) => details.open), [false, true, false]);
});
check('Mobile toggle still closes navigation', () => {
  const f = fixture(true);
  assert.equal(f.toggle.getAttribute('aria-label'), 'Close navigation');
  f.toggle.emit('click');
  f.assertClosed();
});
check('Crossing the responsive breakpoint resets navigation', () => {
  const f = fixture(true);
  f.media.emit('change', {}, false);
  f.assertClosed();
});

console.log(`Verified ${cases} navigation handler cases using the actual Navbar.astro script.`);
console.log('This controlled event harness does not replace native Safari interaction testing.');
