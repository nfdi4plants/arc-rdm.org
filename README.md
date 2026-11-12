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
npm run check:knowledge
npm run check:navigation
npm run preview
```

`build` runs Astro checks, generates the static site in `dist/`, and builds the Pagefind search index. Use the production preview when checking search; a development server alone does not create a fresh index.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with live reload |
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run build` | Check and build the static website |
| `npm run check:existing` | Verify existing routes, heading anchors, and internal links in `dist/` |
| `npm run check:references` | Verify reference pages, redirects, metadata, sitemap entries, and search inclusion in `dist/` |
| `npm run check:knowledge` | Verify knowledge browsing, landing-page destinations, and search inclusion in `dist/` |
| `npm run check:navigation` | Check navbar event timing, focus handling, and dismissal controls |
| `npm run preview` | Serve the last production build locally |

The navigation check exercises the event handlers in a simulated DOM; browser testing is still needed to confirm Safari and other browsers' native link behavior.

The site uses Astro 7, Tailwind CSS 4, and daisyUI 5. Educational articles use Markdown/MDX under `src/pages/details/`, with a browsable topic index at `/details/` and shared article navigation. Reference/PID routes are reserved for specifications and redirects; they currently remain heading-only placeholders and latest-version aliases. See [CONTRIBUTING.md](CONTRIBUTING.md) for authoring conventions, the [modernization plan](plans/website-modernization.md), the [ARC content update tracker](plans/arc-content-update.md), and the [knowledge/reference separation tracker](plans/knowledge-reference-separation.md).

## Hosting

The deployment workflow publishes `dist/` to GitHub Pages on a push to `main` or manual dispatch. Local development, builds, and previews do not publish anything.

For this custom Actions workflow, configure **Settings > Pages > Source: GitHub Actions** and **Custom domain: arc-rdm.org** in the repository. `public/CNAME` records the intended domain in the build, but GitHub Pages ignores that file when using a custom Actions workflow; the repository setting is authoritative. Keep `astro.config.mjs` aligned with that domain for canonical URLs and the sitemap. See GitHub's [publishing source guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Release process

1. Review the local production preview and run the verification commands above using the pinned Node runtime.
2. When publication is authorized, push the feature branch and open a pull request to `main`. The PR build runs the build, all three route/content checks, and the navigation check. Resolve any changes from the latest `main` before merging.
3. Confirm the Pages settings above, that the existing DNS records point to GitHub Pages, and that HTTPS is enabled. If the domain already serves this repository, a content release normally needs no DNS changes. Check any `github-pages` environment approval or branch restrictions.
4. Merge the approved pull request into `main`. This triggers **Deploy to GitHub Pages**, which repeats the checks, uploads `dist/`, and deploys it. Manual dispatch also publishes the selected ref, subject to environment restrictions; it is not a preview action.
5. After the workflow succeeds, check `https://arc-rdm.org/`, knowledge navigation, search, an existing article anchor, reference placeholders, and latest-version aliases. For a code rollback, revert the release changes through a new reviewed commit to `main` and let the workflow redeploy.

GitHub Pages publishes the current aliases as HTML redirects. Proper HTTP redirects and any w3id registration are separate release tasks if these URLs are to serve machine-facing PID resolution. Do not represent the current heading-only placeholders as released specifications.
