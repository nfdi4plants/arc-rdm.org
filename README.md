# ARC

The official [Annotated Research Context website](https://arc-rdm.org).

## Development

Use Node.js **24.22.3**, pinned in `.node-version`, and npm. Both CI workflows use the same runtime and the committed npm lockfile.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`). The development server reloads when source files change.

## Verification and production preview

```sh
npm run check
npm run build
npm run check:existing
npm run check:references
npm run preview
```

`build` runs Astro checks, generates the static site in `dist/`, and builds the Pagefind search index. Use the production preview when checking search; a development server alone does not create a fresh index.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with live reload |
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run build` | Check and build the static website |
| `npm run check:existing` | Verify existing routes, heading anchors, and internal links in `dist/` |
| `npm run check:references` | Verify reference pages, redirects, metadata, and sitemap entries in `dist/` |
| `npm run preview` | Serve the last production build locally |

The site uses Astro 7, Tailwind CSS 4, and daisyUI 5. Content stays in Markdown/MDX under `src/pages/`. See [CONTRIBUTING.md](CONTRIBUTING.md) for authoring conventions and [the implementation plan](plans/website-modernization.md) for the current modernization status.

## Hosting

GitHub Pages serves `dist/` at `arc-rdm.org`; `public/CNAME` preserves the custom domain. The deployment workflow runs on a push to `main` or manual dispatch. Local development, builds, and previews do not publish anything.
