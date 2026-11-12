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
    description: 'Get to know ARC and the connection between research work and publication.',
    pages: [
      { href: '/details/data-management-principle/', text: 'ARC and research data management' },
      { href: '/details/arc-representation/', text: 'Workspaces and publication representations' },
    ],
  },
  {
    id: 'workspaces', title: 'Work in a workspace',
    description: 'Choose an environment for your domain and record context as research develops.',
    pages: [
      { href: '/details/arc-workspace/', text: 'ARC Workspace', children: [
        { href: '/details/arc-workspace/isa-arc/', text: 'ISA ARC Workspace' },
      ] },
      { href: '/details/organization-principle/', text: 'Organization and structure' },
      { href: '/details/documentation-principle/', text: 'Documentation and annotation' },
      { href: '/details/shared-vocabulary/', text: 'Shared vocabulary' },
      { href: '/details/versioning/', text: 'Versioning' },
    ],
  },
  {
    id: 'data-and-metadata', title: 'Understand data and metadata',
    description: 'Explore the three kinds of research context and the extensions that add specialized detail.',
    pages: [
      { href: '/details/arc-data-model/', text: 'ARC Abstract Model', children: [
        { href: '/details/arc-data-model/administrative-core/', text: 'Administrative Core' },
        { href: '/details/arc-data-model/provenance-core/', text: 'Provenance Core' },
        { href: '/details/arc-data-model/semantic-core/', text: 'Semantic Core' },
        { href: '/details/arc-data-model/isa/', text: 'ISA extension' },
        { href: '/details/arc-data-model/wr/', text: 'Workflow Run (WR)' },
        { href: '/details/arc-data-model/datamap/', text: 'Datamap' },
      ] },
    ],
  },
  {
    id: 'publication', title: 'Publish and reuse',
    description: 'Connect workspace information to a shared publication representation and prepare it for reuse.',
    pages: [
      { href: '/details/arc-ro-crate/', text: 'ARC RO-Crate' },
      { href: '/details/exchange-and-publication/', text: 'Publication and exchange' },
      { href: '/details/validation/', text: 'Validation' },
      { href: '/details/arc-fdo/', text: 'FAIR Digital Objects' },
      { href: '/details/fairness-and-rdm/', text: 'RDM and FAIRness' },
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

export function getKnowledgeContext(path: string) {
  const current = `${path.replace(/\/$/, '')}/`;
  const index = knowledgePages.findIndex((page) => page.href === current);
  // Tool detail pages inherit their catalog's browsing context without joining the reading sequence.
  const page = knowledgePages[index];
  const parent = knowledgePages.filter((entry) => current.startsWith(entry.href) && entry.href !== current)
    .sort((a, b) => b.href.length - a.href.length)[0];
  const group = knowledgeGroups.find((entry) => flatten(entry.pages).some((link) => link.href === (page?.href ?? parent?.href)));
  return { group, page, parent, previous: index > 0 ? knowledgePages[index - 1] : undefined,
    next: index >= 0 ? knowledgePages[index + 1] : undefined };
}
