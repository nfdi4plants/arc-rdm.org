// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {remarkReplaceLinks} from './src/plugins/remark-replace-links.ts';
import {remarkReplaceTooltips} from './src/plugins/remark-dictionary-tooltips.ts';
import {remarkAsides} from './src/plugins/remark-asides.ts';
import remarkDirective from 'remark-directive';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import pagefind from "astro-pagefind";

import sitemap from '@astrojs/sitemap';
import { referenceRedirectPaths } from './src/data/reference.ts';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon(), pagefind(), sitemap({
    filter: (page) => !referenceRedirectPaths.includes(new URL(page).pathname),
  })],
  vite: { plugins: [tailwind()] },
  output: 'static',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
  site: 'https://arc-rdm.org',
  markdown: {
    processor: unified({
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
    }),
  },
});
