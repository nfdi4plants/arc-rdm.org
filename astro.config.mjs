// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {remarkReplaceLinks} from './src/plugins/remark-replace-links.ts';
import {remarkReplaceTooltips} from './src/plugins/remark-dictionary-tooltips.ts';
import {remarkAsides} from './src/plugins/remark-asides.ts';
import remarkDirective from 'remark-directive';
import mdx from '@astrojs/mdx';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), pagefind()],
  site: 'https://nfdi4plants.github.io',
  base: 'arc-website',
  trailingSlash: "always", // will kill pagefind integration without
  markdown: {
    remarkPlugins: [remarkDirective, remarkReplaceLinks(), remarkReplaceTooltips(), remarkAsides()],
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