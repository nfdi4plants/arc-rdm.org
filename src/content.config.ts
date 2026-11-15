import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const websiteUrl = z.url({ protocol: /^https?$/ });

const partners = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/partners' }),
  schema: z.object({
    name: z.string().trim().min(1),
    website: websiteUrl,
    logo: z.union([z.string().regex(/^\/(?!\/)\S+$/, 'Use a public path starting with / or a full HTTP(S) URL'), websiteUrl]),
    contributions: z.array(z.string().trim().min(1)).default([]),
    // Preserve published anchors even if an entry's name or filename changes.
    anchor: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  }).strict(),
});

export const collections = { partners };
