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
