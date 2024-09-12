import yaml from 'yaml';
import type { Root } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import {findAndReplace, type FindAndReplaceList} from 'mdast-util-find-and-replace';
import {u} from 'unist-builder';
import { URLS } from '../statics';

interface Frontmatter {
  description: string;
  url: string;
}

const postImportResult = import.meta.glob('/src/pages/dictionary/*.md', { eager: true, query: '?raw', import: 'default' });
const entries = Object.values(postImportResult) as string[];

function getFrontmatter(txt: string) {
  const match = txt.match(/---\s*([\s\S]*?)\s*---/);
  // frontmatter = frontmatter.join('\n');
  // const yamlFrontmatter = yaml.parse(frontmatter);
  if (match) {
    // Extract the YAML part
    const yamlFrontMatter = match[1].trim();
    const frontMatterObject = yaml.parse(yamlFrontMatter); 
    return frontMatterObject;
  } else {
    return;
  }
}

const Tooltips = new Map<string, Frontmatter>();

entries.map((entry: string) => { 
  const frontmatter = getFrontmatter(entry);
  // keywords can be string[] or string or null
  if (!frontmatter || !frontmatter.keywords) {
    return;
  }
  if (typeof frontmatter.keywords === 'string') {
    const fMatterValue = {description: frontmatter.description, url: frontmatter.url};
    Tooltips.set(frontmatter.keywords, fMatterValue);
    return
  } else if (Array.isArray(frontmatter.keywords)) {
    frontmatter.keywords.map((keyword: string) => {
      const fMatterValue = {description: frontmatter.description, url: frontmatter.url};
      Tooltips.set(keyword, fMatterValue);
    });
  }
});

function createTooltip(key: string): string {
  const tt: Frontmatter | undefined = Tooltips.get(key);
  if (tt) {
    return `<span class="tooltip" data-tip="${tt.description}">
    <a href="${URLS.Internal_Home + "/dictionary/" + tt.url}" class="underline decoration-dotted">${key}</a>
  </span>`;
  } else {
    return key;
  }
}

// https://dev.to/ritek/the-power-of-remark-6h
export function remarkReplaceTooltips(): Plugin<[], Root> {
  const transformer: Transformer<Root> = (tree, file) => {

    const replacements: FindAndReplaceList = Array.from(Tooltips.keys()).map(key => [
      new RegExp(`\\b${key}\\b`, 'gi'), // Create a case-insensitive regex to match the keyword
      (match: string) => {
        // Use the key to create the tooltip HTML
        return u('html', createTooltip(key));
      }
    ]);


    findAndReplace(tree, replacements)
	};

	return function attacher() {
		return transformer;
	};
}