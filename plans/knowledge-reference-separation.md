# Separate ARC knowledge from specification references

Status: **Complete — implemented, verified, and committed locally**

## Direction

Reference/PID routes are reserved for specifications and deliberate redirects. Restore all 22 reference pages to heading-only placeholders and preserve all six latest-version aliases, their targets, canonicals, and navigation. Do not redirect reference paths to educational articles. All reference pages and aliases remain outside Pagefind.

Keep explanatory content in the existing Markdown/MDX article structure under `src/pages/details/`, using `MarkdownLayout.astro`. Reuse the existing contents navigation, tags, link plugins, and search. Add a browsable `/details/` topic index and shared section/previous-next navigation so articles work both as landing-page destinations and as a connected guide.

## Content destinations

| Former explanatory route | Knowledge destination |
| --- | --- |
| `/workspace/` | `/details/arc-workspace/` |
| `/workspace/isa-arc/` | `/details/arc-workspace/isa-arc/` |
| `/abstract-model/` | Existing `/details/arc-data-model/` (merge, avoid a duplicate overview) |
| `/abstract-model/{administrative-core,provenance-core,semantic-core,isa,wr,datamap}/` | `/details/arc-data-model/{same slug}/` |
| `/ro-crate/` | `/details/arc-ro-crate/` |

Retarget explanatory links in the homepage, articles, and dictionary. Publication-folder profile links should reach explanations of their roles in ARC RO-Crate. Retain explicit specification/PID links and external specifications. Preserve existing article URLs and heading IDs, including compatibility anchors.

## Implementation tracker

- [x] Inspect existing layouts, article overlap, reference rendering, links, and checks; record the approach.
- [x] Move the explanations, merge the model overview, and retarget explanatory article/dictionary links.
- [x] Restore clean reference placeholders and preserve redirect behavior.
- [x] Add the knowledge topic index and reusable browsing navigation; update homepage and site entry points.
- [x] Update tags, search verification, authoring documentation, and reference/knowledge checks.
- [x] Build and verify legacy routes/anchors, all internal links, reference exclusions, knowledge search, responsive navigation, and local previews.

## Delivery

Make granular, self-contained local commits: plan; content migration/reference restoration; knowledge browsing and documentation; verification fixes and completed tracker as needed. Do not push or deploy. Leave the research source folder unchanged and keep the local preview running.

## Acceptance

- All existing reference/PID routes retain their identity; 22 heading-only pages and six aliases remain browseable and excluded from search.
- Explanations have one clear home in the knowledge section, with model-overview duplication removed.
- Landing-page links lead to explanatory pages and relevant publication sections rather than empty specification placeholders.
- The knowledge index, section navigation, breadcrumbs, contents, and previous/next links support reading the content in full and arriving directly at any topic.
- Existing article routes/anchors, tag browsing, internal links, canonicals, and search remain valid.
- Build/Astro checks and focused desktop/mobile, light/dark, and keyboard review pass.

## Progress notes

The nine moved articles retain their original explanatory content; the model overview is consolidated into the existing article with compatibility anchors. ARC RO-Crate adds three explanatory profile sections for the publication-folder links. An independent editorial audit confirms no content loss or remaining educational links to reference placeholders, with external specification links retained.

Reference checks confirm all 28 routes retain their identity: 22 heading-only pages and six original latest-version aliases, all excluded from Pagefind. The existing route/anchor check passes. A duplicate Partners body title was replaced by its compatibility anchor so the shared article layout supplies one H1.

The shared knowledge registry now connects 25 articles in five sections. The index, article breadcrumbs, section navigation, and previous/next links reuse it; existing audience menus, per-page contents, tags, and tool catalogs remain available. The new `check:knowledge` command verifies the reading order, 77 tag memberships, actual search inclusion, excluded navigation text, and ten landing-page destinations. README and CONTRIBUTING document the separation.

## Completed verification

- Build and Astro checks pass: 127 generated pages, zero errors, warnings, or hints.
- Existing-content regression passes: 77 original routes, 91 heading anchors, and 9,749 internal links.
- Reference verification passes: 22 heading-only placeholders and six preserved aliases, with all 28 routes excluded from the 98-page Pagefind index. Canonicals, sitemap behavior, and breadcrumbs remain correct.
- Knowledge verification passes: all 25 articles and the topic index are searchable; the ten relocated explanations, reading order, 77 tag memberships, and ten landing-page destinations are valid. Navigation text is excluded from search.
- Background browser review passes 18 targeted layout/theme cases, including 320/390/900/1100/1200/1440px as applicable. No overflow, header overlap, browser errors, or sampled accessibility violations were found. Mobile section browsing and keyboard focus, contents, previous/next links, all sixteen mouse/touch folder-link cases, nested tags, search, six aliases, and unknown-version 404s work.
- Desktop/mobile screenshots were inspected. Evidence is in ignored `.local/qa/knowledge-ui-review.json` and `knowledge-*.png`; build log is `.local/knowledge-separation-build.log`.
- Both previews respond: `http://localhost:4321/details/` (live development) and `http://127.0.0.1:4322/details/` (built preview with search). The reference pages remain browseable separately.

Implementation was recorded in granular local commits for the plan, content/reference migration, knowledge browsing/documentation/checks, and completed verification. Nothing was pushed or deployed, and the research source folder was not changed.
