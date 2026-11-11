/** Preserve the established tag URL when source articles vary its capitalization. */
export function canonicalTag(tag: string): string {
  return tag.toLowerCase() === 'fair digital object' ? 'FAIR Digital Object' : tag;
}
