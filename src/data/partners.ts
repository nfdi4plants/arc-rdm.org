import { getCollection } from 'astro:content';

export async function getPartners() {
  const entries = (await getCollection('partners')).sort((a, b) => a.data.name.localeCompare(b.data.name, 'en'));
  const anchors = new Set(['partners']);
  return entries.map((entry) => {
    const anchor = entry.data.anchor ?? entry.id;
    if (anchors.has(anchor)) throw new Error(`Duplicate partner anchor "${anchor}" in ${entry.filePath}`);
    anchors.add(anchor);
    return { ...entry, anchor, href: `/details/partners/#${anchor}` };
  });
}

export type Partner = Awaited<ReturnType<typeof getPartners>>[number];
