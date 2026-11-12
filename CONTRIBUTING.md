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

Tailwind 4 uses its Vite integration. Shared styles and daisyUI themes live in `src/styles/global.css`. Keep the teal/crimson branding, both themes, visible keyboard focus, and reduced-motion support. Use readable content widths and responsive layouts.

`src/components/ResearchFolder.astro` supplies the workspace folder illustration. Supply a unique `id`, heading/link, space label, logo, and typed `items` (title, description, icon, optional link). An optional `description` prop or named slot adds explanatory text beneath the space label and supplies the section's accessible description. Use the slot for inline emphasis. The component owns the folder shape, row styling, and accessible links.

`src/components/Home/PublicationLayers.astro` depicts the publication space with a narrow research data box at the center, one shared context layer containing the administrative, provenance, and semantic core profiles as three peer boxes, a surrounding domain-specific profiles layer, and persistent identifiers as the outermost layer. Use squarer shapes with the workspace's corner radii, teal for the profile layers, crimson for the identifier layer and surrounding object outline, and one RO-Crate logo. Keep labels readable and links accessible in both themes. `Home/WorkspaceIllustration.astro` combines the workspace folder, publication layers, and transformation connector. Preserve the sections' `aria-labelledby` references (`arc-workspace-heading` and `arc-publication-heading`); the knowledge check uses these regions to verify their explanation links.

`src/components/ResearchIcon.astro` owns the shared research data and core-profile icons. Reuse it in workspace rows and publication profile boxes so the icon paths, stroke styling, and decorative accessibility treatment stay consistent.

Folder logos have transparent backgrounds. Pass an optional `logo.darkSrc` for artwork with a separate dark-theme palette; the component follows the site's selected theme and exposes only the visible image to assistive technology.

The supplied RO-Crate wordmark is stored locally in light/dark colour variants, with its source, modification notice, and CC BY 4.0 attribution in `public/ro-crate-logo-LICENSE.txt`. Preserve that notice and the SVG's metadata when reusing the assets.

## Review

Before merging, run `npm run build`, inspect representative article/tool/dictionary pages and the homepage in both themes, and check mobile navigation and search. A local preview is separate from publication: GitHub Pages deploys only when its workflow is triggered.

## Knowledge articles and browsing

Explanations belong under `src/pages/details/`, using `MarkdownLayout.astro` in Markdown/MDX frontmatter. Keep a title, description, and relevant existing topic tags. Nested articles use the appropriate relative layout path. Reuse existing overview articles rather than creating a second explanation of the same topic.

`src/data/knowledge.ts` defines the educational topic groups and reading order. Register conceptual and overview pages there with a canonical trailing-slash path and a concise navigation label. The `/details/` index, section navigation, breadcrumbs, and previous/next links reuse that structure. Tool detail pages remain discoverable through the existing tools catalog and inherit its browsing context. Tags discover nested Markdown/MDX articles automatically.

Landing-page links and explanatory cross-links should point to knowledge articles or their heading anchors. Specification links should remain explicit reference/PID or official external links. Article text is indexed by Pagefind; browsing navigation is excluded. When an article heading changes, preserve its old ID with a compatibility anchor.

## Reference pages and versions

`src/data/reference.ts` is the source of truth for the reference hierarchy, titles, breadcrumbs, versions, and latest-version destinations. The shared route and layout generate pages from that registry; do not create a duplicate page file for a registered path.

- Add a heading-only page with its canonical trailing-slash path, title, navigation label, and parent path.
- Reference routes are reserved for actual specifications and deliberate redirects, including targets used by persistent identifiers such as w3id. Keep the current placeholders heading-only until their specification material is supplied; educational explanations belong in the knowledge articles.
- To add a RO-Crate version, append its `MAJOR.MINOR` value to that profile's `versions` list. Keep previous versions registered.
- Change the profile's `latest` value deliberately when the new version should become the default.
- Unversioned profile URLs use HTML redirects to the latest version. These are browser redirects, not server HTTP redirects on GitHub Pages. A w3id rule can target a numbered page directly.
- A deliberate redirect may target a registered internal page or an explicit HTTPS specification URL. Do not infer or invent an external target. Preserve existing PID route identities when adding specification material.
- All current reference placeholders and redirect aliases stay out of Pagefind. Reference navigation and breadcrumbs are excluded from indexed text. Canonical pages belong in the sitemap; redirect aliases do not.

Knowledge articles describe the current model without establishing normative conformance rules or release status. They must not populate or replace specification/PID routes. The reference registry and layout remain independent of the knowledge topic registry and article layout.

After changing content organization or the registry, run `npm run build`, `npm run check:existing`, `npm run check:references`, and `npm run check:knowledge`. The checks verify the original route/anchor baseline, reference placeholders and redirects, knowledge navigation, search separation, and internal links. Test direct nested URLs and unknown-version 404s in the local preview as well.
