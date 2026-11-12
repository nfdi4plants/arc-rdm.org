/**
 * Public reference URLs. Add releases here without changing existing version paths.
 * `latest` is deliberate: adding a version does not automatically publish it as latest.
 */
export interface ReferenceProfile {
  slug: string;
  title: string;
  versions: readonly string[];
  latest: string;
}

export const referenceProfiles: readonly ReferenceProfile[] = [
  { slug: 'administrative-core', title: 'Administrative Core', versions: ['1.0'], latest: '1.0' },
  { slug: 'provenance-core', title: 'Provenance Core', versions: ['1.0'], latest: '1.0' },
  { slug: 'semantic-core', title: 'Semantic Core', versions: ['1.0'], latest: '1.0' },
  { slug: 'isa', title: 'ISA', versions: ['1.0'], latest: '1.0' },
  { slug: 'wr', title: 'Workflow Run (WR)', versions: ['1.0'], latest: '1.0' },
  { slug: 'datamap', title: 'Datamap', versions: ['1.0'], latest: '1.0' },
];

interface ReferenceBase {
  path: string;
  title: string;
  label: string;
  parent: string;
}

export interface ReferencePage extends ReferenceBase {
  kind: 'page';
}

export interface ReferenceRedirect extends ReferenceBase {
  kind: 'redirect';
  target: string;
}

export type ReferenceRoute = ReferencePage | ReferenceRedirect;

const page = (path: string, title: string, label: string, parent = '/'): ReferencePage => ({
  kind: 'page', path, title, label, parent,
});

// Keep the reviewed specification snapshot fixed until a new publication is selected.
const workspaceSpecificationSource = 'https://github.com/nfdi4plants/ISA-ARC-Workspace/blob/02318e9a6e46489b9178c11476a20bcd9fa7bd8f';

export const referenceRoutes: readonly ReferenceRoute[] = [
  page('/definition/', 'ARC Definition', 'ARC Definition'),
  page('/workspace/', 'ARC Workspace', 'Workspace'),
  page('/workspace/definition/', 'ARC Workspace Definition', 'Definition', '/workspace/'),
  {
    kind: 'redirect', path: '/workspace/isa-arc/', title: 'ISA-ARC Workspace', label: 'ISA-ARC',
    parent: '/workspace/', target: `${workspaceSpecificationSource}/ISA-ARC-Workspace.md`,
  },
  page('/workspace/isa-arc/definition/', 'ISA-ARC Workspace Definition', 'Definition', '/workspace/isa-arc/'),
  {
    kind: 'redirect', path: '/workspace/isa-arc/isa-xlsx/', title: 'ISA-XLSX', label: 'ISA-XLSX',
    parent: '/workspace/isa-arc/', target: `${workspaceSpecificationSource}/ISA-XLSX.md`,
  },
  {
    kind: 'redirect', path: '/workspace/isa-arc/wr-xlsx/', title: 'WR-XLSX', label: 'WR-XLSX',
    parent: '/workspace/isa-arc/', target: `${workspaceSpecificationSource}/WR-XLSX.md`,
  },
  page('/workspace/isa-arc/datamap-xlsx/', 'DataMap-XLSX', 'DataMap-XLSX', '/workspace/isa-arc/'),
  page('/abstract-model/', 'ARC Abstract Model', 'Abstract Model'),
  ...referenceProfiles.map((profile) => page(
    `/abstract-model/${profile.slug}/`,
    `Abstract Model: ${profile.title}`,
    profile.title,
    '/abstract-model/',
  )),
  page('/ro-crate/', 'ARC RO-Crate', 'RO-Crate'),
  ...referenceProfiles.flatMap((profile): ReferenceRoute[] => {
    const path = `/ro-crate/${profile.slug}/`;
    return [
      {
        kind: 'redirect', path, title: `RO-Crate: ${profile.title}`, label: profile.title,
        parent: '/ro-crate/', target: `${path}${profile.latest}/`,
      },
      ...profile.versions.map((version) => page(
        `${path}${version}/`,
        `RO-Crate: ${profile.title} — ${version}`,
        version,
        path,
      )),
    ];
  }),
];

export const referencePagePaths = referenceRoutes.filter((route) => route.kind === 'page').map((route) => route.path);
export const referenceRedirectPaths = referenceRoutes.filter((route) => route.kind === 'redirect').map((route) => route.path);

export interface ReferenceNavigationLink {
  href: string;
  text: string;
  children?: ReferenceNavigationLink[];
}

function childrenOf(parent: string): ReferenceNavigationLink[] {
  return referenceRoutes.filter((route) => route.parent === parent).map((route) => {
    const children = childrenOf(route.path);
    return {
      href: route.path,
      text: route.label,
      ...(children.length > 0 ? { children } : {}),
    };
  });
}

export const referenceNavigation = childrenOf('/');

export function getReferenceBreadcrumbs(path: string): ReferenceNavigationLink[] {
  const breadcrumbs: ReferenceNavigationLink[] = [];
  let current = referenceRoutes.find((route) => route.path === path);
  while (current) {
    breadcrumbs.unshift({ href: current.path, text: current.label });
    current = referenceRoutes.find((route) => route.path === current?.parent);
  }
  return [{ href: '/', text: 'ARC' }, ...breadcrumbs];
}
