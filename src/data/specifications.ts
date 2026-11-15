import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { posix, resolve } from 'node:path';

export type SpecificationSourceId = 'abstract-model' | 'workspace' | 'ro-crate';
export interface SpecificationPage {
  path: string;
  title: string;
  label: string;
  parent: string;
  sourceId: SpecificationSourceId;
  sourcePath: string;
  version?: string;
  pid?: string;
}
export interface SpecificationAsset {
  path: string;
  sourceId: SpecificationSourceId;
  sourcePath: string;
}
export interface SpecificationRedirect {
  path: string;
  title: string;
  label: string;
  parent: string;
  target: string;
  pid?: string;
}

// Astro bundles this module into dist/.prerender; npm and the checks run from the site root.
const siteRoot = process.cwd();
function source(id: SpecificationSourceId, repository: string) {
  const root = resolve(siteRoot, 'specifications', id);
  if (!existsSync(resolve(root, '.git'))) {
    throw new Error(`Missing specification submodule ${id}. Run npm commands from the arc-rdm.org root and run git submodule update --init --recursive before building.`);
  }
  const commit = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  return { root, repository, commit };
}

export const specificationSources = {
  'abstract-model': source('abstract-model', 'nfdi4plants/ARC-Abstract-Model'),
  workspace: source('workspace', 'nfdi4plants/ISA-ARC-Workspace'),
  'ro-crate': source('ro-crate', 'nfdi4plants/arc-ro-crate-profile'),
};

// Git entries work on Windows checkouts where symbolic links are ordinary text files.
const trees = Object.fromEntries(Object.entries(specificationSources).map(([id, item]) => {
  const output = execFileSync('git', ['-C', item.root, 'ls-tree', '-rz', item.commit], { encoding: 'utf8' });
  const entries = new Map(output.split('\0').filter(Boolean).map((line) => {
    const tab = line.indexOf('\t');
    return [line.slice(tab + 1), line.slice(0, tab).split(' ')[0]];
  }));
  return [id, entries];
})) as Record<SpecificationSourceId, Map<string, string>>;
const blobs = new Map<string, Buffer>();
function blob(sourceId: SpecificationSourceId, sourcePath: string): Buffer {
  const key = `${sourceId}:${sourcePath}`;
  let value = blobs.get(key);
  if (!value) {
    const item = specificationSources[sourceId];
    value = execFileSync('git', ['-C', item.root, 'show', `${item.commit}:${sourcePath}`], { maxBuffer: 20 * 1024 * 1024 });
    blobs.set(key, value);
  }
  return value;
}

function resolveSourcePath(sourceId: SpecificationSourceId, input: string): string {
  let path = posix.normalize(input).replace(/\/$/, '');
  const seen = new Set<string>();
  while (true) {
    if (path === '..' || path.startsWith('../') || path.startsWith('/')) throw new Error(`Invalid specification path: ${input}`);
    if (seen.has(path)) throw new Error(`Cyclic specification alias: ${sourceId}/${input}`);
    seen.add(path);
    const parts = path.split('/');
    const prefix = parts.map((_, index) => parts.slice(0, index + 1).join('/'))
      .find((candidate) => trees[sourceId].get(candidate) === '120000');
    if (!prefix) return path;
    const target = blob(sourceId, prefix).toString('utf8').trim();
    path = posix.normalize(posix.join(posix.dirname(prefix), target, path.slice(prefix.length)));
  }
}

const files = (sourceId: SpecificationSourceId, prefix: string) => [...trees[sourceId]]
  .filter(([, mode]) => mode === '100644' || mode === '100755')
  .map(([path]) => path).filter((path) => path.startsWith(prefix)).sort();
const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('_', '-').toLowerCase();
const profileLabels: Record<string, string> = {
  'administrative-core': 'Administrative Core', 'provenance-core': 'Provenance Core',
  'semantic-core': 'Semantic Core', isa: 'ISA', wr: 'Workflow Run (WR)', datamap: 'Datamap',
};
const pidPaths = new Set([
  '/definition/', '/workspace/', '/workspace/definition/', '/workspace/isa-arc/',
  '/workspace/isa-arc/definition/', '/workspace/isa-arc/isa-xlsx/', '/workspace/isa-arc/wr-xlsx/',
  '/workspace/isa-arc/datamap-xlsx/', '/abstract-model/', '/ro-crate/',
  ...Object.keys(profileLabels).flatMap((slug) => [`/abstract-model/${slug}/`, `/ro-crate/${slug}/`]),
]);
export function registeredSpecificationPid(path: string): string | undefined {
  const versionedProfile = path.match(/^\/ro-crate\/([^/]+)\/\d+\.\d+\/$/);
  if (!pidPaths.has(path) && !(versionedProfile && Object.hasOwn(profileLabels, versionedProfile[1]))) return undefined;
  const directories = ['/workspace/', '/abstract-model/', '/ro-crate/'];
  return `https://w3id.org/arc${directories.includes(path) ? path : path.replace(/\/$/, '')}`;
}

export const specificationPages: SpecificationPage[] = [];
export const specificationAssets: SpecificationAsset[] = [];
export const specificationRedirects: SpecificationRedirect[] = [];

function addPage(sourceId: SpecificationSourceId, sourcePath: string, path: string, label: string, parent: string, version?: string) {
  sourcePath = resolveSourcePath(sourceId, sourcePath);
  if (!trees[sourceId].has(sourcePath)) throw new Error(`Missing specification: ${sourceId}/${sourcePath}`);
  const markdown = blob(sourceId, sourcePath).toString('utf8');
  const title = markdown.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1].replace(/[`*_]/g, '') ?? label;
  specificationPages.push({ path, title, label, parent, sourceId, sourcePath, version, pid: registeredSpecificationPid(path) });
}
function addAsset(sourceId: SpecificationSourceId, sourcePath: string, path: string) {
  sourcePath = resolveSourcePath(sourceId, sourcePath);
  if (!trees[sourceId].has(sourcePath)) throw new Error(`Missing specification asset: ${sourceId}/${sourcePath}`);
  specificationAssets.push({ path, sourceId, sourcePath });
}

// Abstract Model: map repository vocabulary to the existing PID hierarchy.
for (const sourcePath of files('abstract-model', 'docs/spec/').filter((path) => path.endsWith('.md'))) {
  const relative = sourcePath.slice('docs/spec/'.length);
  let slug = relative.replace(/\.md$/, '').split('/').map(kebab).join('/');
  slug = slug.replace(/^decorations\/workflow-run\//, 'wr/').replace(/^decorations\/(isa|datamap)\//, '$1/');
  slug = slug.replace(/(?:^|\/)(?:index|overview)$/, '');
  const path = relative === 'project_file.md' ? '/workspace/project-file/' : `/abstract-model/${slug ? `${slug}/` : ''}`;
  const parent = path === '/abstract-model/' ? '/' : path === '/workspace/project-file/' ? '/workspace/'
    : `${path.slice(0, -1).slice(0, path.slice(0, -1).lastIndexOf('/'))}/`;
  const label = path === '/abstract-model/' ? 'Abstract Model' : relative === 'project_file.md' ? 'Project file'
    : profileLabels[slug] ?? (/(?:overview|index)\.md$/.test(relative) ? slug.split('/').at(-1)! : posix.basename(relative, '.md'));
  addPage('abstract-model', sourcePath, path, label, parent);
}
for (const sourcePath of [
  'docs/spec/isa_xlsx_workspace_profile.yml', 'docs/spec/isa_yml_workspace_profile.yml',
  'schemas/yml/arc-workspace-project.schema.yml', 'schemas/yml/arc-workspace-profile.schema.yml',
]) addAsset('abstract-model', sourcePath, `/workspace/project-file/${posix.basename(sourcePath)}`);

// Workspace collection versions and latest pointers come directly from the repository.
const workspaceDocuments = [
  { file: 'ISA-ARC-Workspace.md', slug: 'workspace', stable: '/workspace/isa-arc/', label: 'ISA ARC Workspace' },
  { file: 'ISA-XLSX.md', slug: 'isa-xlsx', stable: '/workspace/isa-arc/isa-xlsx/', label: 'ISA-XLSX' },
  { file: 'WR-XLSX.md', slug: 'wr-xlsx', stable: '/workspace/isa-arc/wr-xlsx/', label: 'WR-XLSX' },
];
const workspaceVersions = files('workspace', 'docs/specifications/').filter((path) => /^docs\/specifications\/[^/]+\/index\.md$/.test(path))
  .map((path) => path.split('/')[2]);
if (!workspaceVersions.length) throw new Error('Workspace submodule has no versioned docs/specifications collections. Select a snapshot containing the versioned documentation.');
for (const version of workspaceVersions) {
  const prefix = `/workspace/isa-arc/versions/${version}/`;
  addPage('workspace', `docs/specifications/${version}/index.md`, prefix, version, '/workspace/isa-arc/versions/', version);
  for (const doc of workspaceDocuments) addPage('workspace', `docs/specifications/${version}/${doc.file}`, `${prefix}${doc.slug}/`, doc.label, prefix, version);
  for (const sourcePath of files('workspace', `docs/specifications/${version}/`).filter((path) => /\.(png|svg|jpe?g|gif|webp|json|jsonld|ya?ml|xlsx|pdf)$/i.test(path))) {
    addAsset('workspace', sourcePath, `${prefix}${sourcePath.slice(`docs/specifications/${version}/`.length)}`);
  }
}
for (const doc of workspaceDocuments) {
  const target = resolveSourcePath('workspace', `docs/specifications/${doc.file}`);
  addPage('workspace', target, doc.stable, doc.label, doc.slug === 'workspace' ? '/workspace/' : '/workspace/isa-arc/', target.split('/')[2]);
}

// RO-Crate supplies documentation and machine-readable profile crates.
addPage('ro-crate', 'docs/index.md', '/ro-crate/', 'RO-Crate', '/');
const roVersions = files('ro-crate', 'docs/profiles/').filter((path) => /^docs\/profiles\/\d+\.\d+\/index\.md$/.test(path))
  .map((path) => path.split('/')[2]);
if (!roVersions.length) throw new Error('RO-Crate submodule has no versioned profile documentation.');
for (const version of roVersions) {
  const sourcePrefix = `docs/profiles/${version}/`;
  addPage('ro-crate', `${sourcePrefix}index.md`, `/ro-crate/${version}/`, `${version} collection`, '/ro-crate/', version);
  for (const sourcePath of files('ro-crate', sourcePrefix).filter((path) => /^docs\/profiles\/[^/]+\/[^/]+\/index\.md$/.test(path))) {
    const profile = sourcePath.split('/')[3];
    const prefix = `/ro-crate/${profile}/${version}/`;
    addPage('ro-crate', sourcePath, prefix, version, `/ro-crate/${profile}/`, version);
    addAsset('ro-crate', sourcePath, `${prefix}index.md`);
    const metadata = [`${sourcePrefix}${profile}/ro-crate-metadata.jsonld`, `${sourcePrefix}${profile}/ro-crate-metadata.json`]
      .find((path) => trees['ro-crate'].has(path));
    if (!metadata) throw new Error(`Missing profile metadata: ${profile}/${version}`);
    for (const extension of ['json', 'jsonld']) addAsset('ro-crate', metadata, `${prefix}ro-crate-metadata.${extension}`);
  }
  for (const sourcePath of files('ro-crate', `${sourcePrefix}img/`).filter((path) => /\.(png|svg|jpe?g|gif|webp)$/i.test(path))) {
    addAsset('ro-crate', sourcePath, `/ro-crate/${version}/assets/${sourcePath.slice(`${sourcePrefix}img/`.length)}`);
  }
  for (const sourcePath of files('ro-crate', 'docs/img/').filter((path) => /\.(png|svg|jpe?g|gif|webp)$/i.test(path))) {
    addAsset('ro-crate', sourcePath, `/ro-crate/${version}/assets/shared/${sourcePath.slice('docs/img/'.length)}`);
  }
  for (const sourcePath of files('ro-crate', 'docs/examples/').filter((path) => /\.json(?:ld)?$/.test(path))) {
    addAsset('ro-crate', sourcePath, `/ro-crate/${version}/examples/${sourcePath.slice('docs/examples/'.length)}`);
  }
}
for (const [profile, label] of Object.entries(profileLabels)) {
  const target = resolveSourcePath('ro-crate', `docs/profiles/${profile}/index.md`);
  const page = specificationPages.find((entry) => entry.sourceId === 'ro-crate' && entry.sourcePath === target);
  if (!page) throw new Error(`RO-Crate latest alias has no published target: ${profile}`);
  const path = `/ro-crate/${profile}/`;
  specificationRedirects.push({ path, title: `RO-Crate: ${label}`, label, parent: '/ro-crate/', target: page.path, pid: registeredSpecificationPid(path) });
  for (const asset of specificationAssets.filter((item) => item.path.startsWith(page.path))) {
    addAsset('ro-crate', asset.sourcePath, `${path}${asset.path.slice(page.path.length)}`);
  }
}

export function readSpecification(page: SpecificationPage): string {
  return blob(page.sourceId, page.sourcePath).toString('utf8');
}
export function readSpecificationAsset(asset: SpecificationAsset): Buffer {
  return blob(asset.sourceId, asset.sourcePath);
}
export function getSpecificationSourceUrl(page: Pick<SpecificationPage, 'sourceId' | 'sourcePath'>): string {
  const source = specificationSources[page.sourceId];
  return `https://github.com/${source.repository}/blob/${source.commit}/${page.sourcePath.split('/').map(encodeURIComponent).join('/')}`;
}

/** Rewrite presentation links only; source Markdown and machine-readable bytes remain unchanged. */
export function resolveSpecificationLink(page: SpecificationPage, href: string): string {
  if (!href || href.startsWith('#') || /^(?:mailto:|tel:|data:)/i.test(href)) return href;
  let value = href;
  let absoluteSource = false;
  const oldSite = 'https://nfdi4plants.github.io/arc-ro-crate-profile/';
  if (page.sourceId === 'ro-crate' && href.startsWith(oldSite)) {
    value = `docs/${href.slice(oldSite.length)}`;
    absoluteSource = true;
  } else if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(href)) return href;
  const match = value.match(/^([^?#]*)([?#].*)?$/)!;
  const suffix = match[2] ?? '';
  let sourcePath = decodeURIComponent(match[1]);
  if (absoluteSource && (sourcePath === 'docs/' || sourcePath.endsWith('/'))) sourcePath += 'index.md';
  sourcePath = resolveSourcePath(page.sourceId, absoluteSource ? sourcePath : posix.join(posix.dirname(page.sourcePath), sourcePath));
  if (!trees[page.sourceId].has(sourcePath) && trees[page.sourceId].has(`${sourcePath}/index.md`)) sourcePath += '/index.md';
  let pages = specificationPages.filter((candidate) => candidate.sourceId === page.sourceId && candidate.sourcePath === sourcePath);
  if (page.sourceId === 'workspace') {
    const archived = page.path.includes('/versions/');
    const preferred = pages.filter((candidate) => candidate.path.includes('/versions/') === archived);
    if (preferred.length) pages = preferred;
  }
  if (pages.length) return `${pages[0].path}${suffix}`;
  let assets = specificationAssets.filter((candidate) => candidate.sourceId === page.sourceId && candidate.sourcePath === sourcePath);
  // Serve both metadata filenames, including the extension absent from the source checkout.
  if (!assets.length && /\/ro-crate-metadata\.json(?:ld)?$/.test(sourcePath)) {
    const alternative = sourcePath.endsWith('.jsonld') ? sourcePath.slice(0, -2) : `${sourcePath}ld`;
    assets = specificationAssets.filter((candidate) => candidate.sourceId === page.sourceId && candidate.sourcePath === alternative);
  }
  if (assets.length) {
    const version = page.version ?? (page.sourceId === 'ro-crate' ? resolveSourcePath('ro-crate', 'docs/profiles/index.md').split('/')[2] : undefined);
    const matchingVersion = assets.filter((asset) => version && asset.path.includes(`/${version}/`));
    if (matchingVersion.length) assets = matchingVersion;
    const matchingExtension = assets.find((asset) => posix.extname(asset.path) === posix.extname(sourcePath));
    return `${(matchingExtension ?? assets[0]).path}${suffix}`;
  }
  return `${getSpecificationSourceUrl({ sourceId: page.sourceId, sourcePath })}${suffix}`;
}

const destinations = [...specificationPages, ...specificationAssets, ...specificationRedirects].map((entry) => entry.path);
if (new Set(destinations).size !== destinations.length) throw new Error('Duplicate specification destination; check the source route mappings.');
