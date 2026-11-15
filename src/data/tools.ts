import { parse } from 'yaml';

export interface ToolMetadata {
  title: string;
  slug: string;
  category: string;
  position?: number;
}

interface ToolEntry {
  source: string;
  href: string;
  metadata: ToolMetadata;
}

// Read metadata without importing page components back into their own navigation.
const sources = import.meta.glob<string>('../pages/details/tools-and-services/*.md', {
  eager: true, query: '?raw', import: 'default',
});
const groups = new Map<string, ToolEntry[]>();
for (const [source, content] of Object.entries(sources)) {
  const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) throw new Error(`Missing tool metadata: ${source}`);
  const metadata = parse(frontmatter[1]) as ToolMetadata;
  const tools = groups.get(metadata.category) ?? [];
  tools.push({ source, href: source.replace('../pages', '').replace(/\.md$/, '/'), metadata });
  groups.set(metadata.category, tools);
}

const categories = ['Applications', 'Services', 'CLI Tools', 'Libraries'];
const categoryOrder = (category: string) => categories.includes(category) ? categories.indexOf(category) : categories.length;
export const toolGroups = Array.from(groups, ([category, tools]) => ({
  category,
  tools: tools.sort((a, b) => (a.metadata.position ?? Infinity) - (b.metadata.position ?? Infinity)),
})).sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));
