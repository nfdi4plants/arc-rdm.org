// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {remarkReplaceLinks} from './src/plugins/remark-replace-links.ts';
import {remarkReplaceTooltips} from './src/plugins/remark-dictionary-tooltips.ts';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://freymaurer.github.io',
  base: 'astro-poc',
  markdown: {
    remarkPlugins: [remarkReplaceLinks(), remarkReplaceTooltips()],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'text',
            value: '#',
          },
          headingProperties: {
            className: ['anchor'],
          },
          properties: {
            className: ['anchor-link'],
          },
        },
      ]
    ]
  },
});