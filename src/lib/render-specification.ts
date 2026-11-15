import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Element, Root, RootContent } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import {
  readSpecification,
  resolveSpecificationLink,
  type SpecificationPage,
} from '../data/specifications.ts';

export interface SpecificationHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface RenderedSpecification {
  html: string;
  titleId?: string;
  headings: SpecificationHeading[];
  hasDiagrams: boolean;
}

function textContent(node: RootContent): string {
  if (node.type === 'text') return node.value;
  if ('children' in node) return node.children.map(textContent).join('');
  return '';
}

const element = (tagName: string, properties: Element['properties'], children: Element['children']): Element => ({
  type: 'element', tagName, properties, children,
});

// These 0.1 documents still link to older names for headings that remain present.
// Keep the source text intact and expose only aliases with an unambiguous target.
const roCrateHeadingAliases: Record<string, Record<string, string[]>> = {
  'docs/profiles/0.1/provenance-core/index.md': {
    labprocess: ['process'],
    labprotocol: ['protocol'],
    'example-metadata-file-ro-crate-metadatajson': ['example-ro-crate-metadatajson'],
  },
  'docs/profiles/0.1/datamap/index.md': {
    'example-metadata-file-ro-crate-metadatajson': ['example-ro-crate-metadatajson'],
    'fragment-descriptor': ['fragment-description'],
  },
};

/** Render upstream prose without the educational site's automatic dictionary substitutions. */
export async function renderSpecification(page: SpecificationPage): Promise<RenderedSpecification> {
  const result: RenderedSpecification = { html: '', headings: [], hasDiagrams: false };
  const presentation: Plugin<[], Root> = () => (tree) => {
    let titleRemoved = false;
    const existingIds = new Set<string>();
    visit(tree, 'element', (node) => {
      if (typeof node.properties.id === 'string') existingIds.add(node.properties.id);
    });
    const headingAliases = page.sourceId === 'ro-crate' ? roCrateHeadingAliases[page.sourcePath] : undefined;
    visit(tree, 'element', (node, index, parent) => {
      for (const property of ['href', 'src'] as const) {
        if (typeof node.properties[property] === 'string') {
          node.properties[property] = resolveSpecificationLink(page, node.properties[property]);
        }
      }

      if (node.tagName === 'h1' && !titleRemoved) {
        titleRemoved = true;
        result.titleId = String(node.properties.id ?? '');
        if (parent && index !== undefined) {
          parent.children.splice(index, 1);
          return index;
        }
      }
      if (node.tagName === 'h1') node.tagName = 'h2';
      if (/^h[2-6]$/.test(node.tagName)) {
        for (const alias of headingAliases?.[String(node.properties.id)] ?? []) {
          if (existingIds.has(alias)) continue;
          node.children.unshift(element('span', { id: alias, className: ['specification-anchor'], ariaHidden: 'true' }, []));
          existingIds.add(alias);
        }
        result.headings.push({
          depth: Number(node.tagName.slice(1)),
          slug: String(node.properties.id),
          text: textContent(node),
        });
      }

      // Keep wide normative tables readable without widening the whole page.
      if (node.tagName === 'table' && parent && index !== undefined) {
        parent.children[index] = element('div', { className: ['specification-table'], tabIndex: 0 }, [node]);
      }

      if (node.tagName !== 'pre') return;
      const code = node.children.find((child): child is Element => child.type === 'element' && child.tagName === 'code');
      if (!code || !Array.isArray(code.properties.className) || !code.properties.className.includes('language-mermaid')) return;
      result.hasDiagrams = true;
      if (parent && index !== undefined) {
        parent.children[index] = element('figure', { className: ['specification-diagram'], 'data-mermaid': true }, [
          element('div', { 'data-mermaid-output': true, role: 'img', ariaLabel: 'Specification diagram' }, []),
          element('p', { 'data-mermaid-error': true, role: 'status', hidden: true }, [
            { type: 'text', value: 'The diagram could not be displayed. Its source is available below.' },
          ]),
          element('details', { open: true }, [
            element('summary', {}, [{ type: 'text', value: 'Diagram source' }]),
            node,
          ]),
        ]);
      }
    });
  };

  const processor = await createMarkdownProcessor({
    gfm: true,
    smartypants: false,
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    // Parse raw HTML before rewriting attributes; generate IDs before moving the title.
    rehypePlugins: [rehypeRaw, rehypeSlug, presentation, [rehypeAutolinkHeadings, {
      behavior: 'prepend',
      content: { type: 'text', value: '#' },
      properties: { className: ['anchor-link'], ariaHidden: true, tabIndex: -1 },
    }]],
  });
  const markdown = readSpecification(page).replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  result.html = (await processor.render(markdown)).code;
  return result;
}
