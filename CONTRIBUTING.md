# Contributing

## Local workflow

Use the Node version in `.node-version`, then run `npm ci`. Use `npm run dev` for live editing, `npm run build` to check production output, and `npm run preview` to inspect it locally. Pagefind requires a production build for a current search index.

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

Before merging, run `npm run build`, inspect representative article/tool/dictionary pages and the homepage in both themes, and check mobile navigation and search. A local preview is separate from publication: GitHub Pages deploys only when its workflow is triggered.

## Knowledge articles and browsing

Explanations belong under `src/pages/details/`, using `MarkdownLayout.astro` in Markdown/MDX frontmatter. Keep a title, description, and relevant existing topic tags. Nested articles use the appropriate relative layout path. Reuse existing overview articles rather than creating a second explanation of the same topic.

`src/data/knowledge.ts` defines the educational topic groups and reading order. Register conceptual and overview pages there with a canonical trailing-slash path and a concise navigation label. The `/details/` index, section navigation, breadcrumbs, and previous/next links reuse that structure. Tool detail pages remain discoverable through the existing tools catalog and inherit its browsing context. Tags discover nested Markdown/MDX articles automatically.

Landing-page links and explanatory cross-links should point to knowledge articles or their heading anchors. Specification links should remain explicit reference/PID or official external links. Article text is indexed by Pagefind; browsing navigation is excluded. When an article heading changes, preserve its old ID with a compatibility anchor.

## Reference pages and versions

`src/data/reference.ts` is the source of truth for the reference hierarchy, titles, breadcrumbs, versions, latest-version destinations, and redirect activation. The shared route and layout generate pages from that registry; do not create a duplicate page file for a registered path.

- Add a reference page with its canonical trailing-slash path, title, navigation label, and parent path. Verify its w3id PID registration before adding the link.
- Reference routes are reserved for actual specifications and deliberate redirects. Keep the current placeholders limited to their title and PID link until specification material is supplied; educational explanations belong in the knowledge articles.
- To add a RO-Crate version, append its `MAJOR.MINOR` value to that profile's `versions` list. Keep previous versions registered.
- Change the profile's `latest` value deliberately when the new version should become the default.
- Redirects are disabled by default: an omitted or false `redirectEnabled` flag renders the normal reference page, with its own canonical URL, navigation, and PID link. The existing redirect kind and target remain registered.
- Activate redirects gradually by setting `redirectEnabled: true` on an individual redirect entry. For an unversioned RO-Crate profile alias, set it on the corresponding `referenceProfiles` entry; the alias retains its registered `latest` destination. Ordinary page entries do not become redirects through this flag.
- Enabled redirects use HTML/JavaScript navigation, not server HTTP redirects on GitHub Pages. External specification redirects preserve URL fragments; internal aliases lead to their registered latest-version page.
- A deliberate redirect may target a registered internal page or an explicit HTTPS specification URL. Do not infer or invent an external target. Preserve existing PID route identities and pinned specification snapshots when adding material.
- All reference pages and redirects stay out of Pagefind. Reference navigation and breadcrumbs are excluded from indexed text. Rendered reference pages, including disabled redirects, belong in the sitemap; enabled redirects do not.

`getReferencePid` follows the registered `https://w3id.org/arc` namespace. The workspace, abstract-model, and RO-Crate directory PIDs end in `/`; the remaining current reference PIDs do not. The authoritative rules are in [w3id.org's ARC directory](https://github.com/perma-id/w3id.org/tree/master/ids/arc). Definition, workspace, and abstract-model PIDs currently resolve to this site; RO-Crate PIDs resolve to the separate profile site. Updating the local reference registry does not change those external resolution rules.

Knowledge articles describe the current model without establishing normative conformance rules or release status. They must not populate or replace specification/PID routes. The reference registry and layout remain independent of the knowledge topic registry and article layout.

After changing content organization or the registry, run `npm run build`, `npm run check:existing`, `npm run check:references`, and `npm run check:knowledge`. The checks verify the original route/anchor baseline, reference placeholders and redirects, knowledge navigation, search separation, and internal links. Test direct nested URLs and unknown-version 404s in the local preview as well.
