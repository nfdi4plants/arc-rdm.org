# Contributing

## Local workflow

Use the Node version in `.node-version`, initialize the specification sources with `git submodule update --init`, then run `npm ci` to install the exact JavaScript dependency versions from `package-lock.json`. See [the setup instructions](README.md#development) for an explanation of each command. Use `npm run dev` for live editing, `npm run build` to check production output, and `npm run preview` to inspect it locally. Pagefind requires a production build for a current search index.

## Pages and links

Astro creates routes from files in `src/pages/`. Existing documentation uses Markdown or MDX with frontmatter selecting a shared layout. Preserve existing URLs and heading anchors when changing presentation.

`src/statics.ts` contains shared URLs. Import `URLS` in Astro components, or reference an enum key from Markdown:

```md
[Tools and services]({{INTERNAL_TOOLS}})
```

Keys are case-insensitive. Unknown keys produce a build warning and should be corrected before merging. MDX can import `URLS` directly and use it in an anchor.

## Markdown extensions

The explicit unified processor preserves the site's custom remark/rehype plugins:

- Shared URL substitution.
- Dictionary links and tooltips, derived from dictionary frontmatter.
- `:::note`, `:::tip`, `:::caution`, and `:::danger` admonitions.
- Stable heading slugs and heading permalinks.

Keep dictionary descriptions and URLs in their existing frontmatter fields. Do not replace the processor without verifying these extensions and the MDX publications page.

## Styling

Tailwind 4 uses its Vite integration. Shared styles and daisyUI themes live in `src/styles/global.css`. Keep the teal/plum branding: `#007b6d` / `#7a347f` in light mode and `#65d8be` / `#c18bcb` in dark mode. Keep the site and daisyUI color tokens aligned, and use semantic error colors for danger notices. Preserve both themes, visible keyboard focus, and reduced-motion support. Use readable content widths and responsive layouts. Retain labels, icons, and distinct shapes so meaning never depends on color alone.

`src/components/ResearchFolder.astro` supplies the workspace folder illustration. Supply a unique `id`, heading/link, space label, logo, and typed `items` (title, description, icon, optional link). An optional `description` prop or named slot adds explanatory text beneath the space label and supplies the section's accessible description. Use the slot for inline emphasis. The component owns the folder shape, row styling, and accessible links.

`src/components/Home/PublicationLayers.astro` depicts the publication space with a narrow research data box at the center, one shared context layer containing the administrative, provenance, and semantic core profiles as three peer boxes, a surrounding domain-specific profiles layer, and persistent identifiers as the outermost layer. Use squarer shapes with the workspace's corner radii, teal for the profile layers, plum for the identifier layer and surrounding object outline, and one RO-Crate logo. Keep labels readable and links accessible in both themes. `Home/WorkspaceIllustration.astro` combines the workspace folder, publication layers, and transformation connector. Preserve the sections' `aria-labelledby` references (`arc-workspace-heading` and `arc-publication-heading`); the knowledge check uses these regions to verify their explanation links.

`src/components/ResearchIcon.astro` owns the shared research data and core-profile icons. Reuse it in workspace rows and publication profile boxes so the icon paths, stroke styling, and decorative accessibility treatment stay consistent.

`src/components/BrandWordmark.astro` supplies the shared navbar and footer wordmark: ARC followed by teal RDM and a plum period, matching the hero's highlighted text treatment.

Logos have transparent backgrounds and light/dark variants matching the site palette. `src/data/branding.ts` centralizes their URLs; bump its logo version when editing public artwork to refresh cached copies, including the favicon. The ARC artwork is stored in `public/favicon.svg` and `public/favicon-dark.svg`. Pass `logo.darkSrc` to the workspace folder; the component follows the site's selected theme and exposes only the visible image to assistive technology.

The supplied RO-Crate wordmark is stored locally in light/dark colour variants, with its source, modification notice, and CC BY 4.0 attribution in `public/ro-crate-logo-LICENSE.txt`. Preserve that notice and the SVG's metadata when reusing the assets.

## Review

Theme colors are defined in the DaisyUI light/dark theme blocks in `src/styles/global.css`. The `--site-*` semantic colors alias that palette; use those tokens in component styles. Keep structure and spacing scoped to the component that owns them, and share components for repeated UI such as breadcrumbs and navigation. Mermaid diagrams read the same computed theme colors instead of defining a separate palette.

Before merging, run `npm run build`, inspect representative article/tool/dictionary pages and the homepage in both themes, and check mobile navigation and search. A local preview is separate from publication: GitHub Pages deploys only when its workflow is triggered.

## Knowledge articles and browsing

`ContentLayout.astro` supplies the shared reading layout for knowledge articles and reference pages. Its `navigation` slot places `ContentNavigation.astro` on the left; its `contents` slot places `OnThisPage.astro` on the right. Pass the relevant link tree and heading list from the page layout. Empty slots do not reserve a column. `ContentSidebar.astro` owns sticky positioning and a single native disclosure per sidebar: the table of contents collapses below 1200 px, and section navigation below 900 px. A small controller follows the CSS breakpoint; without JavaScript the navigation stays expanded and usable. Keep this behavior in the shared components rather than duplicating it in individual layouts. `Breadcrumbs.astro` owns the shared breadcrumb markup and styling.

Explanations belong under `src/pages/details/`, using `MarkdownLayout.astro` in Markdown/MDX frontmatter. Keep a title, description, and relevant existing topic tags. Nested articles use the appropriate relative layout path. Reuse existing overview articles rather than creating a second explanation of the same topic.

`src/data/knowledge.ts` defines the educational topic groups and reading order. Register conceptual and overview pages there with a canonical trailing-slash path and a concise navigation label. The `/details/` index, section navigation, breadcrumbs, and previous/next links reuse that structure. Tool detail pages remain discoverable through the existing tools catalog and inherit its browsing context. Tags discover nested Markdown/MDX articles automatically.

Keep annotation purposes, shared model structures, and concrete publication profiles distinct. Links labelled Identity by Governance, Assignment, or Provenance lead to their dedicated `/details/identity-by-*/` explanations. The ARC Abstract Model supports the whole workspace-to-publication path and has its own navigation section. The system overview at `/details/arc-representation/` connects the two spaces through compilation; `/details/isa-arc/` introduces the domain implementation across both spaces. Its workspace and practical guides inherit that editorial parent while retaining their existing URLs.

Partner quotations are attributed contributions. Preserve their wording when reviewing surrounding site content.

Landing-page links and explanatory cross-links should point to knowledge articles or their heading anchors. Specification links should remain explicit reference/PID or official external links. Article text is indexed by Pagefind; browsing navigation is excluded. When an article heading changes, preserve its old ID with a compatibility anchor.

## Partners

Add one Markdown file under `src/content/partners/`, for example `example-institute.md`:

```md
---
name: Example Institute
website: https://example.org/
logo: https://example.org/logo.svg
contributions:
  - Community Engagement
---

Introduce the institute and its research.

> Describe how your organization uses ARC.
```

`name`, `website`, and `logo` are required; `contributions` is optional. The Markdown body supports paragraphs, links, and blockquotes. The shared components supply the partner heading, linked logo, and contribution list, so no HTML or layout field is needed.

The entry automatically appears in the homepage's **Used by** grid, the [partners page](https://arc-rdm.org/details/partners/), and its **On this page** navigation. Partners are sorted alphabetically by name. There is no separate registry to edit.

An external HTTPS logo URL allows a single-file submission. Alternatively, add the image under `public/partners/` and use a root-relative URL such as `/partners/example-institute.svg`; document its source in `public/partners/SOURCES.md`.

The filename supplies the entry's link anchor, for example `/details/partners/#example-institute`. Keep the filename stable after publication. An optional `anchor` frontmatter field overrides it with a stable lowercase dashed ID; the existing partners use this to preserve their earlier links. Keep any explicit anchor stable as well.

## Reference pages and versions

Left-side navigation enables `RecMenu`'s collapsible branches. The current page's branch and its ancestors start expanded; other branches start collapsed. Parent labels remain links, while their chevrons toggle children using native disclosures. Navbar menus and the topic index keep their expanded lists.

`src/data/reference.ts` combines the reference hierarchy with the upstream documentation discovered by `src/data/specifications.ts`. The shared route and layout generate pages from that registry; do not create a duplicate page file for a registered path. The three Git submodules under `specifications/` are the authoritative content sources. Their Git revisions are the publication pins; no export branches, generated content commits, or extra lockfile are needed.

- Add a reference page with its canonical trailing-slash path, title, navigation label, and parent path. Only add a PID when its registration is verified; entity pages and collection archives normally have no PID.
- Reference routes contain authoritative specifications, deliberate aliases, or title/PID placeholders where no source document exists. Educational explanations belong in the knowledge articles.
- Versions and latest targets are discovered from real upstream directories and Git symlinks. Do not invent website versions or infer specification releases from library package versions. Preserve upstream draft labels and the distinction between workspace collection versions and individual document versions.
- To update a source, fetch inside its submodule, check out the selected tag or full commit SHA, and commit the submodule revision in a website PR. See the commands in [README.md](README.md#updating-a-specification). Do not use `git submodule update --remote` in the build: publication must use the reviewed commit.
- Review upstream version removals before accepting an update; previous published editions should stay available upstream. If a source changes its documentation layout, update that source's small adapter and verify the complete route/link output.
- Imported Markdown is read from the pinned Git revision and rendered in the reference layout. Its wording, attribution, explicit anchors, and machine-readable download bytes remain intact. Relative documentation/image links are mapped to their website destinations; links to material outside the published selection point to the pinned GitHub source. Educational dictionary insertion does not run on specifications.
- Mermaid diagrams use the locally bundled renderer in both themes and retain their source as a fallback. Only selected images, YAML schemas, raw Markdown, and JSON/JSON-LD downloads enter the build; upstream code, build systems, and site templates do not.
- Latest aliases use HTML/JavaScript navigation on GitHub Pages and preserve URL fragments. Machine-readable aliases serve actual files rather than HTML redirect pages.
- All reference pages and redirects stay out of Pagefind. Reference navigation and breadcrumbs are excluded from indexed text. Rendered reference pages, including disabled redirects, belong in the sitemap; enabled redirects do not.

`getReferencePid` returns only an explicitly registered PID, or `undefined` for ordinary documentation routes. The authoritative rules are in [w3id.org's ARC directory](https://github.com/perma-id/w3id.org/tree/master/ids/arc). Definition, workspace, and abstract-model PIDs currently resolve to this site; RO-Crate PIDs resolve to the separate profile site. Updating the website does not change those external resolution rules. RO-Crate HTML and JSON-LD endpoints are available here for a future, separately reviewed migration.

Knowledge articles describe the current model without establishing normative conformance rules or release status. They must not populate or replace specification/PID routes. The reference registry and layout remain independent of the knowledge topic registry and article layout.

After changing content organization, a submodule revision, or the registry, run `npm run build`, `npm run check:existing`, `npm run check:references`, `npm run check:specifications`, `npm run check:knowledge`, and `npm run check:navigation`. The checks verify the original route/anchor baseline, specification pages and downloads, reference aliases, knowledge navigation, search separation, and internal links. Inspect diagrams and tables in both themes and test direct nested URLs and unknown-version 404s in the local preview as well.

The initial RO-Crate snapshot has five unresolved Provenance Core references: four PropertyValue specialization sections (parameter, component, characteristic, factor) and a section on representing multi-file objects. Those sections are absent upstream. The link check reports these known defects as warnings only for this exact source commit; new unresolved links and unresolved references after a source update fail validation. Correct the references upstream when their intended sections are available. Compatibility anchors cover clearly renamed headings without changing normative source text.
