/** Educational articles and reading order; specification/PID routes live in reference.ts. */
export interface KnowledgeLink {
  href: string;
  text: string;
  children?: KnowledgeLink[];
}

export interface KnowledgeGroup {
  id: string;
  title: string;
  description: string;
  pages: KnowledgeLink[];
}

export const knowledgeGroups: KnowledgeGroup[] = [
  {
    id: 'start-here', title: 'Start here',
    description: 'Understand why research context matters and how the ARC RDM system connects its principles, model, and two spaces.',
    pages: [
      { href: '/details/data-management-principle/', text: 'ARC and research data management' },
      { href: '/details/arc-representation/', text: 'The ARC RDM system' },
    ],
  },
  {
    id: 'principles', title: 'Annotation principles',
    description: 'Explore the three independently applicable purposes that guide ARC research-object annotation.',
    pages: [
      { href: '/details/identity-by-governance/', text: 'Identity by Governance' },
      { href: '/details/identity-by-assignment/', text: 'Identity by Assignment' },
      { href: '/details/identity-by-provenance/', text: 'Identity by Provenance' },
    ],
  },
  {
    id: 'data-and-metadata', title: 'Shared abstract model',
    description: 'See how common structures, composable cores, and extensions support both workspace and publication.',
    pages: [
      { href: '/details/arc-data-model/', text: 'ARC Abstract Model', children: [
        { href: '/details/arc-data-model/administrative-core/', text: 'Administrative Core' },
        { href: '/details/arc-data-model/semantic-core/', text: 'Semantic Core' },
        { href: '/details/arc-data-model/provenance-core/', text: 'Provenance Core' },
        { href: '/details/arc-data-model/isa/', text: 'ISA extension' },
        { href: '/details/arc-data-model/wr/', text: 'Workflow Run (WR)' },
        { href: '/details/arc-data-model/datamap/', text: 'Datamap' },
      ] },
    ],
  },
  {
    id: 'workspaces', title: 'Workspace',
    description: 'Maintain evolving research context through working conventions, vocabulary, and identifiable revisions.',
    pages: [
      { href: '/details/arc-workspace/', text: 'ARC Workspace' },
      { href: '/details/shared-vocabulary/', text: 'Shared vocabulary' },
      { href: '/details/versioning/', text: 'Versioning' },
    ],
  },
  {
    id: 'publication', title: 'Publication space',
    description: 'Understand the RO-Crate representation, assess selected requirements, and release outputs for reuse.',
    pages: [
      { href: '/details/arc-ro-crate/', text: 'ARC RO-Crate' },
      { href: '/details/validation/', text: 'Validation' },
      { href: '/details/exchange-and-publication/', text: 'Publication and exchange' },
      { href: '/details/arc-fdo/', text: 'FAIR Digital Objects' },
      { href: '/details/fairness-and-rdm/', text: 'RDM and FAIRness' },
    ],
  },
  {
    id: 'domain-arcs', title: 'Domain ARCs',
    description: 'Follow ISA ARC as a reference implementation spanning standards, workspaces, tools, and publication profiles.',
    pages: [
      { href: '/details/isa-arc/', text: 'ISA ARC', children: [
        { href: '/details/arc-workspace/isa-arc/', text: 'ISA ARC Workspace' },
        { href: '/details/organization-principle/', text: 'Organizing a workspace' },
        { href: '/details/documentation-principle/', text: 'Documenting research context' },
      ] },
    ],
  },
  {
    id: 'tools-and-community', title: 'Tools and community',
    description: 'Find applications, developer libraries, shared infrastructure, and learning resources.',
    pages: [
      { href: '/details/tools-and-services/', text: 'Tools and services' },
      { href: '/details/developer-toolstack/', text: 'Developer toolstack' },
      { href: '/details/arc-data-hub/', text: 'ARC Data Hub' },
      { href: '/details/resources/', text: 'Learning resources' },
      { href: '/details/partners/', text: 'Partners' },
    ],
  },
];

const flatten = (links: KnowledgeLink[]): KnowledgeLink[] => links.flatMap((link) => [link, ...flatten(link.children ?? [])]);
export const knowledgePages = knowledgeGroups.flatMap((group) => flatten(group.pages));

function findTrail(links: KnowledgeLink[], path: string): KnowledgeLink[] | undefined {
  for (const link of links) {
    if (link.href === path) return [link];
    const childTrail = findTrail(link.children ?? [], path);
    if (childTrail) return [link, ...childTrail];
  }
}

export function getKnowledgeContext(path: string) {
  const current = `${path.replace(/\/$/, '')}/`;
  const index = knowledgePages.findIndex((page) => page.href === current);
  // Tool detail pages inherit their catalog's browsing context without joining the reading sequence.
  const page = knowledgePages[index];
  const inherited = !page ? knowledgePages.filter((entry) => current.startsWith(entry.href) && entry.href !== current)
    .sort((a, b) => b.href.length - a.href.length)[0] : undefined;
  const group = knowledgeGroups.find((entry) => flatten(entry.pages).some((link) => link.href === (page?.href ?? inherited?.href)));
  // Editorial parents follow the reading hierarchy even when an established URL lives elsewhere.
  const trail = group ? findTrail(group.pages, page?.href ?? inherited?.href ?? '') : undefined;
  const parent = page ? trail?.at(-2) : inherited;
  return { group, page, parent, previous: index > 0 ? knowledgePages[index - 1] : undefined,
    next: index >= 0 ? knowledgePages[index + 1] : undefined };
}
