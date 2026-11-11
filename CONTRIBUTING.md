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

## Review

Before merging, run `npm run build`, inspect representative article/tool/dictionary pages and the homepage in both themes, and check mobile navigation and search. A local preview is separate from publication: GitHub Pages deploys only when its workflow is triggered.

## Reference pages and versions

`src/data/reference.ts` is the source of truth for the reference hierarchy, titles, breadcrumbs, versions, and latest-version destinations. The shared route and layout generate pages from that registry; do not create a duplicate page file for a registered path.

- Add a heading-only page with its canonical trailing-slash path, title, navigation label, and parent path.
- For an explanation, add a Markdown file under `src/content/reference/` and set the registry page's `content` to its filename without `.md`. Use a `description` in frontmatter, no layout or H1, and start sections at H2; the reference layout supplies the title and navigation. A missing registered content file fails the build.
- To add a RO-Crate version, append its `MAJOR.MINOR` value to that profile's `versions` list. Keep previous versions registered.
- Change the profile's `latest` value deliberately when the new version should become the default.
- Unversioned profile URLs use HTML redirects to the latest version. These are browser redirects, not server HTTP redirects on GitHub Pages. A w3id rule can target a numbered page directly.
- Populated explanations appear in Pagefind; heading-only placeholders and redirect aliases stay out. Reference navigation and breadcrumbs are excluded from indexed text. Canonical pages belong in the sitemap; redirect aliases do not.

Conceptual explanations describe the current model without establishing normative conformance rules or release status. Keep formal definition, XLSX specification, and numbered RO-Crate profile pages as placeholders until their specifications are supplied. When an existing article heading is renamed, retain its previous ID with an explicit compatibility anchor so inbound links keep working.

After changing the registry, run `npm run build`, `npm run check:existing`, and `npm run check:references`. The checks verify the original route/anchor baseline, all registered reference pages, redirects, metadata, and internal links. Test direct nested URLs and unknown-version 404s in the local preview as well.
