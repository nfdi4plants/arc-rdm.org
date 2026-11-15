import {
  registeredSpecificationPid, specificationPages, specificationRedirects,
  type SpecificationPage,
} from './specifications.ts';

export interface ReferenceProfile {
  slug: string;
  title: string;
  versions: readonly string[];
  latest: string;
  redirectEnabled?: boolean;
}

/** Versions and latest destinations come from the checked-out specification repository. */
export const referenceProfiles: readonly ReferenceProfile[] = specificationRedirects.map((alias) => {
  const slug = alias.path.split('/')[2];
  return {
    slug, title: alias.label,
    versions: specificationPages.filter((page) => page.path.startsWith(alias.path)).map((page) => page.version!),
    latest: alias.target.split('/').at(-2)!, redirectEnabled: true,
  };
});

interface ReferenceBase {
  path: string;
  title: string;
  label: string;
  parent: string;
  pid?: string;
}
export interface ReferencePage extends ReferenceBase {
  kind: 'page';
  specification?: SpecificationPage;
}
export interface ReferenceRedirect extends ReferenceBase {
  kind: 'redirect';
  target: string;
  redirectEnabled?: boolean;
}
export type ReferenceRoute = ReferencePage | ReferenceRedirect;

export function isReferenceRedirectEnabled(entry: ReferenceRoute): boolean {
  return entry.kind === 'redirect' && entry.redirectEnabled === true;
}

const placeholder = (path: string, title: string, label: string, parent = '/'): ReferencePage => ({
  kind: 'page', path, title, label, parent, pid: registeredSpecificationPid(path),
});

export const referenceRoutes: readonly ReferenceRoute[] = [
  placeholder('/definition/', 'ARC Definition', 'ARC Definition'),
  placeholder('/workspace/', 'ARC Workspace', 'Workspace'),
  placeholder('/workspace/definition/', 'ARC Workspace Definition', 'Definition', '/workspace/'),
  placeholder('/workspace/isa-arc/definition/', 'ISA ARC Workspace Definition', 'Definition', '/workspace/isa-arc/'),
  placeholder('/workspace/isa-arc/datamap-xlsx/', 'DataMap-XLSX', 'DataMap-XLSX', '/workspace/isa-arc/'),
  placeholder('/workspace/isa-arc/versions/', 'ISA ARC Workspace Collections', 'Collections', '/workspace/isa-arc/'),
  placeholder('/abstract-model/shared/', 'Shared Model Entities', 'Shared entities', '/abstract-model/'),
  ...specificationPages.map((specification): ReferencePage => ({
    kind: 'page', path: specification.path, title: specification.title, label: specification.label,
    parent: specification.parent, pid: specification.pid, specification,
  })),
  ...specificationRedirects.map((alias): ReferenceRedirect => ({ kind: 'redirect', ...alias, redirectEnabled: true })),
];

/** Only registered routes have a PID. Nested entities and collection indexes do not. */
export function getReferencePid(path: string): string | undefined {
  return referenceRoutes.find((entry) => entry.path === path)?.pid;
}

export const referencePagePaths = referenceRoutes.filter((route) => !isReferenceRedirectEnabled(route)).map((route) => route.path);
export const referenceRedirectPaths = referenceRoutes.filter(isReferenceRedirectEnabled).map((route) => route.path);

export interface ReferenceNavigationLink {
  href: string;
  text: string;
  children?: ReferenceNavigationLink[];
}
function childrenOf(parent: string): ReferenceNavigationLink[] {
  return referenceRoutes.filter((route) => route.parent === parent).map((route) => {
    const children = childrenOf(route.path);
    return { href: route.path, text: route.label, ...(children.length ? { children } : {}) };
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
