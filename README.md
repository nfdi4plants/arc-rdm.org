# ARC

The official [Annotated Research Context website](https://arc-rdm.org).

## Development

You need Git and Node.js **26.13.1 LTS**, pinned in `.node-version`. Node.js includes npm, the package manager used to install the website's JavaScript dependencies. Both CI workflows use the same runtime and the committed npm lockfile.

```sh
git clone --recurse-submodules https://github.com/nfdi4plants/arc-rdm.org.git
cd arc-rdm.org

# Install the website's dependencies
npm ci

# Start the local development server
npm run dev
```

[`npm ci`](https://docs.npmjs.com/cli/v11/commands/npm-ci/) is npm's built-in clean-install command. It installs the exact dependency versions recorded in `package-lock.json` into `node_modules/`, so local development uses the same versions as CI. It replaces an existing `node_modules/` directory and leaves `package.json` and the lockfile unchanged. Run it when first setting up the project or after pulling dependency changes; for subsequent development sessions, just run `npm run dev`.

For an existing clone, run `git submodule update --init` before building. After pulling a website update, run it again to check out the recorded specification revisions. The three public specification repositories live under `specifications/`; their implementation files are not built or published.

Open the local URL printed by Astro (normally `http://127.0.0.1:4321`). The explicit loopback address avoids `localhost` IPv4/IPv6 connection delays in Firefox on Windows. The development server reloads when source files change.

## Verification and production preview

```sh
npm run check
npm run build
npm run check:existing
npm run check:references
npm run check:specifications
npm run check:knowledge
npm run check:navigation
npm run check:statistics
npm run preview
```

`build` runs Astro checks, generates the static site in `dist/`, and builds the Pagefind search index. Use the production preview when checking search; a development server alone does not create a fresh index.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact JavaScript dependencies recorded in `package-lock.json` |
| `npm run dev` | Local development with live reload |
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run build` | Check and build the static website |
| `npm run check:existing` | Verify existing routes, heading anchors, and internal links in `dist/` |
| `npm run check:references` | Verify reference pages, redirects, metadata, sitemap entries, and search inclusion in `dist/` |
| `npm run check:specifications` | Verify specification content, links, source revisions, and original download bytes in `dist/` |
| `npm run check:knowledge` | Verify knowledge browsing, landing-page destinations, and search inclusion in `dist/` |
| `npm run check:navigation` | Check navbar event timing, focus handling, and dismissal controls |
| `npm run check:statistics` | Check published record totals, unavailable responses, and independent homepage counters |
| `npm run preview` | Serve the last production build locally |

The navigation check exercises the event handlers in a simulated DOM; browser testing is still needed to confirm Safari and other browsers' native link behavior.

The homepage's **Published ARCs** counter reads `hits.total` from the [InvenioRDM community records API](https://inveniordm.docs.cern.ch/reference/rest_api_communities/#get-community-records) at `https://archive.nfdi4plants.org/api/communities/dataplant/records?size=1&allversions=false`. This counts the latest published version of each record in the DataPLANT community; older versions and drafts are excluded. The request needs no credentials.

ARChive currently does not permit cross-origin browser requests, so Astro fetches this count during each build and embeds it with its retrieval date. It refreshes on the next deployment, or on page rendering in development. PLANTdataHUB figures continue to load in the browser independently. If ARChive times out or returns an invalid response, the counter shows “Unavailable” and the build continues; a failed request never becomes a zero count.

The site uses Astro 7, Tailwind CSS 4, and daisyUI 5. Educational articles use Markdown/MDX under `src/pages/details/`, with a browsable topic index at `/details/` and shared article navigation. Reference routes render specification Markdown from the submodules in the site's shared style. Versions and latest aliases come from those repositories; routes without an authoritative document remain title/PID placeholders. See [CONTRIBUTING.md](CONTRIBUTING.md) for authoring and specification update instructions, the [modernization plan](plans/website-modernization.md), the [ARC content update tracker](plans/arc-content-update.md), and the [knowledge/reference separation tracker](plans/knowledge-reference-separation.md).

## Updating a specification

Choose an upstream release tag or commit, update that submodule, and review the website change in a normal PR. For example:

```sh
git -C specifications/workspace fetch origin
git -C specifications/workspace checkout --detach <tag-or-full-commit-sha>
npm run build
npm run check:existing
npm run check:references
npm run check:specifications
npm run check:knowledge
npm run check:navigation
git add specifications/workspace
git commit -m "docs: update workspace specification"
```

Use `specifications/abstract-model` or `specifications/ro-crate` for the other sources. Review new versions, latest targets, and rendered content before merging. Restart the development server after selecting a different source revision. Source layout changes may require a small adapter change in `src/data/specifications.ts`. Edit normative content in its upstream repository, not in the website. Git records the selected source commits; builds never advance them automatically. The existing PR build and Pages deployment handle publication without upstream export branches or additional release workflows.

## Hosting

The deployment workflow publishes `dist/` to GitHub Pages on a push to `main` or manual dispatch. Local development, builds, and previews do not publish anything.

For this custom Actions workflow, configure **Settings > Pages > Source: GitHub Actions** and **Custom domain: arc-rdm.org** in the repository. `public/CNAME` records the intended domain in the build, but GitHub Pages ignores that file when using a custom Actions workflow; the repository setting is authoritative. Keep `astro.config.mjs` aligned with that domain for canonical URLs and the sitemap. See GitHub's [publishing source guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Release process

1. Review the local production preview and run the verification commands above using the pinned Node runtime.
2. When publication is authorized, push the feature branch and open a pull request to `main`. The PR build initializes the pinned submodules and runs the build, route/content checks, specification checks, and navigation check. Resolve any changes from the latest `main` before merging.
3. Confirm the Pages settings above, that the existing DNS records point to GitHub Pages, and that HTTPS is enabled. If the domain already serves this repository, a content release normally needs no DNS changes. Check any `github-pages` environment approval or branch restrictions.
4. Merge the approved pull request into `main`. This triggers **Deploy to GitHub Pages**, which repeats the checks, uploads `dist/`, and deploys it. Manual dispatch also publishes the selected ref, subject to environment restrictions; it is not a preview action.
5. After the workflow succeeds, check `https://arc-rdm.org/`, knowledge navigation, search, an existing article anchor, reference pages and their PID links, and any explicitly enabled redirects. For a code rollback, revert the release changes through a new reviewed commit to `main` and let the workflow redeploy.

The ARC namespace is already registered at `https://w3id.org/arc`; its resolution rules are maintained separately in [w3id.org](https://github.com/perma-id/w3id.org/tree/master/ids/arc). Workspace and Abstract Model PIDs resolve here. RO-Crate PIDs still resolve to the separate profile site; this integration publishes their HTML and JSON-LD counterparts but does not change external resolution. Latest-version aliases use HTML/JavaScript navigation on GitHub Pages and preserve fragments. Only verified PIDs are displayed; additional documentation routes do not imply new PID registrations.
