import { readdirSync, readFileSync } from 'node:fs';
import yaml from 'yaml';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { findAndReplace, type FindAndReplaceList } from 'mdast-util-find-and-replace';
import { u } from 'unist-builder';
import { URLS } from '../statics';

interface DictionaryEntry {
  description: string;
  url: string;
  keywords?: string | string[];
}

// This plugin is imported by Astro's configuration, before Vite transforms globs.
const dictionaryDirectory = new URL('../pages/dictionary/', import.meta.url);
const tooltips = new Map<string, DictionaryEntry>();
for (const filename of readdirSync(dictionaryDirectory).filter((name) => name.endsWith('.md')).sort()) {
  const source = readFileSync(new URL(filename, dictionaryDirectory), 'utf8');
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) continue;
  const entry = yaml.parse(frontmatter[1]) as DictionaryEntry;
  if (!entry.description || !entry.keywords) continue;
  // File-based routes are case-sensitive on the deployed host. Frontmatter may
  // use a display abbreviation (for example RDM) rather than the actual slug.
  entry.url = filename.slice(0, -'.md'.length);
  for (const keyword of Array.isArray(entry.keywords) ? entry.keywords : [entry.keywords]) {
    tooltips.set(keyword, entry);
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function remarkReplaceTooltips(): Plugin<[], Root> {
  const replacements: FindAndReplaceList = Array.from(tooltips, ([keyword, entry]) => [
    new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'),
    (match: string) => u('html', `<span class="tooltip" data-tip="${escapeHtml(entry.description)}"><a href="${escapeHtml(URLS.INTERNAL_HOME + 'dictionary/' + entry.url)}" class="underline decoration-dotted font-normal text-base-content">${escapeHtml(match)}</a></span>`),
  ]);
  return function attacher() {
    return (tree) => {
      findAndReplace(tree, replacements, { ignore: ['heading', 'code', 'inlineCode', 'link', 'image', 'html'] });
    };
  };
}
