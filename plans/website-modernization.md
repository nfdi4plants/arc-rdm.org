# Website modernization and reference pages

Status: **Complete — implemented and verified locally**

## Delivery constraints

- Work in this checkout only. Do not push, publish, or deploy.
- Make granular, self-contained local commits as coherent implementation steps are completed.
- Provide a running local preview for review.
- Preserve existing article content, URLs, and linked heading anchors.
- Keep npm, Astro static output, GitHub Pages, the domain, English content, and light/dark themes.

## Work package 1: tooling and design

- Upgrade Astro 4 to Astro 7 and compatible integrations; use Node 24 LTS locally and in CI.
- Upgrade Tailwind 3 to Tailwind 4 via its Vite integration, and daisyUI 4 to 5.
- Replace removed Astro.glob calls with typed import.meta.glob imports.
- Retain the unified Markdown pipeline, URL substitutions, dictionary tooltips, admonitions, and heading anchors.
- Declare directly imported dependencies, remove obsolete imports, and preserve Markdown/MDX authoring.
- Use npm ci in CI, refresh Actions, add a check command, correct the verification workflow filename, and update contributor documentation.
- Preserve teal #00a896 and crimson #c70039 with accessible variants, neutral surfaces, consistent spacing, restrained borders/shadows, and modest corner rounding.
- Use system sans-serif typography, left-aligned prose, a roughly 1200px content maximum, and roughly 70-character article lines.
- Refresh shared navigation, footer, article layouts, dictionary, tools, search, and error page.
- Make mobile navigation, search, and theme switching keyboard accessible. Search must support Escape, focus containment/restoration, and safe keyboard shortcuts.
- Correct the repository link. Replace dead framework links with the existing Developer Toolstack destination.
- Homepage: compact ARC introduction; Get started links to data-management guidance; Explore the data model links to the existing model article.
- Retain a simplified non-interactive ARC illustration; replace graph navigation with descriptive researcher and RDM/developer links, preserving every graph destination and existing audience anchors.
- Retain a small DataHUB stats strip (ARC count, stored GB, contributions), one request per page load, and honest loading/unavailable states.

## Work package 2: reference pages

Interpret arc/ as the domain root. New canonical URLs have trailing slashes.

| Area | Routes |
| --- | --- |
| ARC | /definition/ |
| Workspace | /workspace/, /workspace/definition/ |
| ISA-ARC | /workspace/isa-arc/, with definition/, isa-xlsx/, wr-xlsx/, datamap-xlsx/ |
| Abstract model | /abstract-model/, with administrative-core/, provenance-core/, semantic-core/, isa/, wr/, datamap/ |
| RO-Crate | /ro-crate/, with administrative-core/, provenance-core/, semantic-core/, isa/, wr/, datamap/ |
| Initial versions | /ro-crate/{profile}/1.0/ for all six profiles |

28 new routes: 22 heading-only pages and six latest-version redirects.

- Use a typed registry for paths, titles, hierarchy, versions, and explicitly selected latest versions.
- Generate only registered static pages; unknown versions/profiles return 404.
- Shared reference layout: descriptive H1, document title, canonical metadata, breadcrumbs, navigation. Version headings include 1.0. No specification prose yet.
- Add hierarchical Reference navigation. Exclude placeholders and redirects from Pagefind; include canonical content pages in the sitemap.
- Unversioned RO-Crate profiles redirect to their latest registered version, initially 1.0, using HTML redirects, canonical metadata, and a fallback link.
- Numbered URLs stay stable when new versions are registered. Update latest pointers separately.
- w3id registration/rules and machine-readable representations are out of scope. w3id can point directly to these canonical destinations; GitHub Pages HTML redirects are not HTTP redirects.

## Validation and local delivery

- Record baseline build/route state; compare routes and important heading anchors afterward.
- Clean dependency installation, Astro checks, and production build on Node 24.
- Verify Markdown, MDX publications, tools, dictionary, tags, tooltips, and admonitions.
- Check all 28 new routes, headings, canonicals, breadcrumbs, redirects, and unknown-version 404s.
- Check production search and placeholder exclusions.
- Exercise statistics success, failure, and incomplete responses.
- Review mobile/desktop and both themes; keyboard navigation, focus visibility, contrast, and overflow.
- Run a local preview and provide its URL. No remote actions.

## Implementation tracker

- [x] Inspect repository and agree scope/design/route behavior.
- [x] Save plan and local-only delivery constraints.
- [x] Record baseline and modernize tooling.
- [x] Refresh shared styling, navigation, search, and article layouts.
- [x] Redesign homepage and statistics strip.
- [x] Generate reference routes and latest-version redirects.
- [x] Update CI configuration and contributor documentation locally.
- [x] Complete build, route, interaction, and visual checks.
- [x] Start local preview and record final results.

## Evidence and decisions

- Initial checkout is clean; installed system Node is 22.20.0, npm 10.9.3; node_modules is absent.
- Existing stack: Astro 4.15.7, Tailwind 3.4.12, daisyUI 4.12.10 (lockfile).
- Existing PR workflow uses Node 18; hosting uses GitHub Pages and public/CNAME.
- Banner hotspots are not links; topic graphs contain links but have small mobile targets; framework links point to #.
- Current article layout can dereference an empty heading list; fix while refreshing layouts.
- Actual npm availability and official Actions tags were verified. The agreed toolchain versions are supported; no framework or hosting change was needed.

## Completion notes

- Implemented Astro 7.4.10, Tailwind 4.3.5, daisyUI 5.7.50, and compatible integrations. Clean dependency installation and the final production build pass with zero Astro errors, warnings, or hints.
- Node 24.22.3 is pinned. A checksum-verified portable runtime is available under ignored `.local/node-v24.22.3-win-x64`; the system installation was not changed.
- The original build is preserved in `.local/baseline`. Regression checks retain all 77 original HTML routes and 91 heading IDs. All 7,984 internal links in the completed build pass validation.
- All 28 reference URLs pass route, heading, canonical, breadcrumb, sitemap, and redirect checks. The actual 88-page Pagefind index excludes every reference placeholder and alias.
- Nine background-browser smoke checks pass against development and production previews: desktop/mobile layout, search/results/keyboard/focus, theme persistence, article/dictionary layout, redirects/404s, statistics success/missing/failure, and no uncaught browser exceptions.
- The live DataHUB feed works, with one request per homepage load. Missing/invalid values and failed requests show an unavailable state. Parser scenarios also passed independently.
- Accessibility review covered homepage, article, tools, and reference pages at 320px and 1440px in both themes: no overflow or contrast violations. Shared accessible-name findings were fixed and rechecked; the skip link is visible with a clear focus ring.
- Browser reports and screenshots are in ignored `.local/qa/`; the final build log is `.local/final-build.log`. Visual review used background rendering as requested.
- The production dependency audit reports zero vulnerabilities. Compatible patch fixes and a scoped typography dependency override are committed.
- Existing scientific Markdown/MDX text is unchanged. Rendering fixes repair previously broken tag links, tooltip URL casing, standalone cross-tool anchors, and a missing URL scheme.
- No remote push, deployment, publication, or w3id registration was performed.

## Local commits

| Commit | Change |
| --- | --- |
| `382cfea` | Save implementation plan and delivery constraints |
| `04122a0` | Modernize toolchain and shared site foundation; independently built/tested from the staged snapshot |
| `f34f625` | Redesign homepage, audience navigation, illustration, and statistics |
| `20ee5e3` | Correct search focus and mobile tooltip overflow |
| `f1e0b9f` | Add reference hierarchy, versions, navigation, sitemap policy, and checks |
| Final completion commit | Align accessible names and record verification results |

## Local review

The development server remains available at **http://127.0.0.1:4321/** with live reload.
The temporary production server used for QA has been stopped.

To restart using this checkout's portable runtime in PowerShell:

```powershell
$env:PATH = (Join-Path (Get-Location) '.local/node-v24.22.3-win-x64') + ';' + $env:PATH
npm run dev -- --host 127.0.0.1
```

On another checkout, install the Node version from `.node-version` and follow `README.md`.
