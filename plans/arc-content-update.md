# ARC content and workspace illustration update

Status: **Complete — including stronger light-mode outlines**

## Delivery constraints

- Implement in this checkout, with granular, self-contained local commits. Do not push or deploy.
- Keep a local preview available and use background browser rendering for visual checks.
- Leave the research source folder unchanged.
- Preserve article URLs, linked heading IDs, all persistent-identifier routes, and latest-version aliases.

## Source basis and terminology

Source folder: `C:/Users/schne/OneDrive - Computational Systems Biology/Research-Nature SD 10 Years of FAIR - Documents`.

Use the current numbered drafts, particularly `02_RDM_spaces.md`, `03_ARC_Abstract_Model.md`, `04_Metadata_representations.md`, and `05_Workspace_implementation.md`, supported by the current manuscript, figures, and recorded terminology decisions. Earlier drafts supply background and examples, not superseded requirements.

- ARC is a research data management framework.
- The ARC Workspace is the environment where research data and metadata evolve.
- The ARC Abstract Model is dataset-centred, with administrative, provenance, and semantic cores and its own concepts and relationships.
- ISA, Workflow Run, and Datamap are extension profiles.
- ARC RO-Crate is the representation used for the Publication Space. Profiles map the abstract model into concrete metadata.
- Transformation, conformity assessment, and publication are distinct operations.
- Git repositories, ISA folders, XLSX, and CWL are implementation practices, not universal ARC requirements.
- Explain support for FAIRness without promising automatic FAIRness, lossless transformation, or scientific correctness.
- Keep ISA-ARC navigation and URLs; explain the ARC ISA XLSX Workspace Profile. Preserve established software names and avoid unsupported capability or release claims.

## Homepage and visual changes

Keep the current typography, layout, folder design, and “Your research. In context.” headline. Describe the identifying, provenance, and semantic context of research data.

Label the folder **ARC Workspace**, with a linked heading to `/workspace/` and these rows:

| Row | Supporting text | Destination |
| --- | --- | --- |
| Research data | Measurements, files, and research outputs | Non-interactive |
| Administrative Metadata | Identity, contributors, and rights | `/abstract-model/administrative-core/` |
| Provenance Metadata | Processes, inputs, and outputs | `/abstract-model/provenance-core/` |
| Semantic Metadata | Meaning, units, and vocabulary | `/abstract-model/semantic-core/` |

- Metadata rows are full links with visible arrows, keyboard focus, and adequate touch targets.
- Add “Transform for publication” below the folder, leading to a compact “Publication space — ARC RO-Crate” link to `/ro-crate/`.
- Explain that these are complementary kinds of context and workspace organization can vary.
- Replace “FAIR by design” with “Context for reuse.”
- Point primary introductory links to the workspace and abstract-model overviews.
- Use crimson for the connector, a small publication accent, and short introductory markers on explanatory pages; retain teal as the dominant colour.
- Expose meaningful illustration content to assistive technology; hide only decorative geometry.

## Explanatory content and consistency

Populate ten reference pages: `/workspace/`, `/workspace/isa-arc/`, `/abstract-model/`, its six core/extension pages, and `/ro-crate/`.

- Explain workspace flexibility, incremental documentation, ISA-based conventions, model/representation distinctions, and publication infrastructure.
- Explain each core's purpose, typical information, and relationship to the others using a shared measurements-table and derived-analysis example.
- Explain ISA organization, workflow procedures versus executions, and data-fragment annotation.
- Keep formal definitions, the three XLSX specification pages (including Datamap-XLSX), and numbered RO-Crate profiles as placeholders.
- Rewrite model, representations, data-management, documentation, organization, publication, and FDO articles.
- Align affected versioning, validation, shared-vocabulary, DataHUB, tool descriptions, and dictionary entries.
- Replace contradictory diagrams with accessible HTML/SVG explanations; label retained ISA folder examples as implementation-specific.
- Preserve existing linked heading IDs, adding compatible headings or anchors when headings change.

## Rendering and search

- Associate optional authored Markdown with reference registry entries and render it beneath the shared H1.
- Index populated explanations in Pagefind; exclude placeholders, aliases, and navigation text.
- Retain static output, canonical URLs, reference navigation, breadcrumbs, and redirect behaviour.

## Implementation tracker

- [x] Review research sources and audit existing site content.
- [x] Agree full consistency pass and ten explanatory reference pages.
- [x] Save plan and terminology decisions.
- [x] Add reference content rendering and conditional search inclusion.
- [x] Author ten conceptual reference explanations.
- [x] Update existing articles, dictionary, tool wording, and diagrams.
- [x] Update homepage illustration, navigation copy, and restrained accents.
- [x] Complete editorial and automated verification.
- [x] Complete background desktop/mobile, light/dark, interaction, and accessibility checks.
- [x] Record results and leave local preview available.

## Validation and acceptance

- Astro checks and production build pass.
- Existing article routes, linked heading IDs, internal links, canonicals, and redirects remain valid.
- All ten explanations are indexed; placeholders and aliases remain excluded.
- Folder links work with mouse, touch, and keyboard.
- Background browser checks cover desktop/mobile, both themes, contrast, visible focus, and overflow.
- Editorial review confirms consistent terminology and source-supported claims.

## Progress and evidence

- Starting checkout is clean on `pids-and-design-iteration`, at `00f4d47`.
- The previous modernization is complete; this work updates content and reuses its tooling and visual foundation.
- The research source folder is read-only for this task. No source documents are copied into the website.
- Reference pages now support optional Markdown content and descriptions; only populated explanations are eligible for search. Navigation is excluded separately.
- Existing heading-fragment checks accept explicit compatibility anchors, so articles can use current terminology while retaining old inbound links.
- Astro check passes with zero errors, warnings, or hints after the rendering changes.
- Ten explanations are authored and connected to the reference registry. They share the measurements-table/derived-analysis example and separate model concepts, workspace conventions, and publication representations.
- Contributor documentation explains how to author reference content and keep placeholders distinct from explanations.
- Production build passes. The reference check confirms all 28 routes and ten explanations in the actual 98-page Pagefind index, with placeholders and aliases excluded.
- Homepage now shows research data and three linked metadata perspectives inside the workspace, followed by a crimson transformation connector and ARC RO-Crate publication panel.
- Initial homepage background-browser checks pass at 320px and 1440px in light/dark themes: no overflow or WCAG A/AA violations, all five figure links have at least 44px height, and keyboard navigation works. Desktop and mobile screenshots were inspected.
- Seven core articles now explain the three cores, workspace/publication purposes, and representation layers. Historical diagrams are scoped as examples; an unsupported class diagram was replaced with a conceptual annotation table. Renamed representation headings retain their old fragment IDs.
- Source-aware editorial review of the core articles and ten explanations is complete. The RFC 7111 CSV-fragment statement and RDA assessment-indicator reference were checked against primary sources.
- Twenty supporting files align versioning, validation, FAIRness, vocabulary, infrastructure, tools, and dictionary descriptions with the new model. Existing software names and scoped implementation guidance are retained.
- Production browser verification passes 41 checks, including nine page types at 320px/1440px in both themes, mouse/touch/keyboard navigation, new search results and focus restoration, and no uncaught browser errors. A search test selector was narrowed to distinguish the page result from section results, then rechecked successfully.
- Visual review caught overly narrow table labels. Table text now wraps at word boundaries, retaining contained scrolling where needed on small screens.

## Completion evidence

- Final production build: zero Astro errors, warnings, or hints; 117 static pages generated.
- Regression checks: all 77 original HTML routes and 91 heading anchors preserved; 8,174 internal links checked.
- Reference checks: all 28 routes, canonical metadata, breadcrumbs, six latest aliases, and sitemap behaviour pass. Exactly ten explanations are indexed among 98 searchable pages; heading-only placeholders and aliases are excluded.
- Background browser verification: 41 functional/layout/accessibility checks pass. Final table and supporting-content review additionally passes at 320px and 1440px in light/dark themes, including tools, FAIRness, and dictionary pages. No page overflow or WCAG A/AA violations were found in the reviewed pages.
- Direct browser checks confirm latest-version navigation, unknown-version 404s, and both renamed-heading compatibility links.
- Desktop/mobile and light/dark screenshots were inspected. Reports and images are in ignored `.local/qa/`; the build log is `.local/arc-content-build.log`.
- Production preview with the current search index: `http://127.0.0.1:4322/`. Development preview: `http://127.0.0.1:4321/`.
- Work is committed locally in coherent plan, rendering, explanation, homepage, core-article, supporting-content, and verification changes. Nothing was pushed or deployed; the research folder was not changed.

## Follow-up: matching workspace and publication folders

Requested 2026-11-11. Move the introductory text and actions above the diagram. On desktop, show a horizontal workspace-to-publication flow with two matching folder layouts and a restrained crimson transformation connector.

- Workspace folder: research data plus linked Administrative, Provenance, and Semantic Metadata; ARC logo at the top right.
- Publication folder: research data plus the Administrative Core, Provenance Core, and Semantic Core profiles; official RO-Crate logo at the top right. Its folder heading links to the ARC RO-Crate explanation; profile links point to the corresponding existing RO-Crate profile routes.
- Use the same folder component for both representations, with a subtle packaging treatment around the RO-Crate folder.
- Retain full link targets, accessible names, visible keyboard focus, and existing route behaviour. Stack the two full-size folders on narrow screens where a horizontal pair would be unreadable.
- Keep the existing colours and scientific distinctions. Update and verify locally with granular commits; no pushes, deployment, or research-folder changes.

### Follow-up tracker

- [x] Inspect the current hero and record the requested revision.
- [x] Add the official RO-Crate logo and shared folder component.
- [x] Move the introduction above a horizontal workspace/publication flow.
- [x] Verify links, desktop/mobile rendering, both themes, focus, and accessibility.
- [x] Record completed checks and refresh the local preview.

The shared `ResearchFolder.astro` component accepts typed content, destinations, labels, logos, and an optional packaging treatment. Its parent controls the flow direction. The initial implementation used the official unmodified RO-Crate SVG; the later logo follow-up below replaces it with the supplied wordmark and preserves its CC BY 4.0 attribution.

Follow-up verification:

- Build passes with zero Astro errors, warnings, or hints. All 77 original routes, 91 heading anchors, 8,177 internal links, and 28 reference routes pass regression checks; search inclusion remains correct.
- Background browser review passes at 320, 390, 768, 900, 1024, and 1440px in light and dark themes. No overflow, uncaught browser errors, or WCAG A/AA violations were found.
- The introduction stays above the illustration. Folder surfaces have matching dimensions, stack through 900px, and appear side by side above that breakpoint. Both logos load at the top right.
- All eight links have at least 44px target height and visible sequential keyboard focus. All sixteen mouse/touch navigation cases pass, including the three publication-profile aliases resolving to their registered 1.0 pages.
- Desktop/mobile screenshots were inspected. Evidence is in ignored `.local/qa/two-folders-review.json` and `two-folders-*.png`; build log is `.local/folder-flow-build.log`.
- The production preview at `http://127.0.0.1:4322/` is refreshed and serves both folders successfully. All commits remain local; no push or deployment was performed.

## Follow-up: deeper dark green

- [x] Darken the dark-mode base surface from `#10231f` to `#0c1c18`, keeping the site and daisyUI tokens aligned. Darken the deeper neutral from `#0a1915` to `#07120f`.
- [x] Rebuild and refresh the local production preview.
- [x] Confirm contrast and unchanged light-mode background in the browser. The production homepage has no contrast violations, and the rendered dark screenshot was inspected.

Raised surfaces, accent colours, typography, and light-mode colours retain their existing values.

## Follow-up: transparent, themed folder logos

- [x] Inspect the supplied `ro-crate-w-text.svg` and retain its vector artwork and attribution.
- [x] Use the supplied RO-Crate mark with teal, green, and crimson components that adapt to the selected theme.
- [x] Remove the white logo backplates from both folder instances; retain the ARC artwork.
- [x] Verify both themes and small screens in the background browser, refresh the local preview, and commit locally.

The original Downloads SVG remains unchanged. Theme variants are selected by the reusable folder component rather than by homepage-specific styling.

Verification: build and Astro checks pass with zero errors, warnings, or hints. Background browser checks at 320, 390, 1024, and 1440px in both themes found no overflow, heading/logo overlap, browser errors, or contrast violations. Exactly one logo is visible per folder; the theme toggle switches the RO-Crate variant in both directions. The wrapper/image backgrounds and sampled canvas corners are transparent. Desktop/mobile screenshots were inspected. Evidence is in ignored `.local/qa/themed-logos-review.json` and `themed-logos-*.png`; build log is `.local/folder-logo-build.log`.

The production preview at `http://127.0.0.1:4322/` serves the updated logos. This follow-up is committed locally, with no push or deployment.

## Follow-up: matching workspace outline

- [x] Add the same outer outline geometry to the workspace folder in the shared component, using the workspace label's theme-aware teal. Preserve the publication folder's crimson outline.
- [x] Check the build and desktop/mobile appearance in both themes, refresh the local preview, and commit locally.

Verification: build and Astro checks pass with zero errors, warnings, or hints. Background browser review at 390 and 1440px in both themes confirms that the workspace outline exactly matches its label colour and shares the publication outline's width, radius, and inset. No overflow or clipping; screenshots inspected in ignored `.local/qa/folder-outline-*.png`. The production preview at `http://127.0.0.1:4322/` is refreshed. Changes remain local, with no push or deployment.

## Follow-up: larger introductory ARC heading

- [x] Increase the first "Annotated Research Context" label from `.72rem` to `.875rem` with a homepage-scoped style.
- [x] Check the build and desktop/mobile layout, refresh the local preview, and commit locally.

Verification: build and Astro checks pass. Background browser review at 320 and 1440px in both themes confirms a 14px label that stays on one line without overflow. Screenshots inspected in ignored `.local/qa/intro-heading-*.png`; local preview refreshed.

## Follow-up: quick DataHUB count-up

- [x] Animate valid retrieved totals from zero over 800ms, starting once the statistics enter the viewport. Keep the implementation small with native browser APIs.
- [x] Preserve unavailable/error states and number formatting; skip motion for reduced-motion users and expose final totals to screen readers without announcing intermediate frames.
- [x] Verify loading, viewport entry, final values, reduced motion, failures, and small-screen layout; refresh the local preview and commit locally.

Verification: build and Astro checks pass with zero errors, warnings, or hints. Background browser checks confirm monotonic counts reaching exact formatted totals, one request and animation per page load, viewport-triggered start, delayed-response handling, reduced-motion bypass, and correct zero/null/error/invalid-JSON/timeout states. The accessibility tree contains stable final values while the visual counters animate. A network-enabled check of the live source returned HTTP 200 and confirmed the animation with real totals. No animation library was needed.

Actual live storage totals revealed a narrow-screen divider collision; a small font adjustment through 360px keeps the full value within its column. Final 320/390px checks pass in both themes, with no overflow or accessibility violations in the statistics section. Screenshots were inspected. Evidence is in ignored `.local/qa/count-up-review.json`, `count-up-live.json`, `count-up-live-size-layout.json`, and `count-up-*.png`.

The development server was restarted after it stopped. Both `http://localhost:4321/` (live development) and `http://127.0.0.1:4322/` (built preview) respond successfully. Changes are committed locally; nothing was pushed or deployed.

## Follow-up: stronger light-mode outlines

- [x] Darken the shared light-mode border colour from `#dce6e3` to `#b2c4be`, keeping the site and daisyUI tokens aligned so cards, folders, controls, tables, and dividers remain consistent.
- [x] Check the build and desktop/mobile appearance, confirm the dark-mode border is unchanged, refresh the local preview, and commit locally.

Verification: build and Astro checks pass with zero errors, warnings, or hints. Background browser review of the homepage at 390/1440px in both themes and the abstract-model page confirms consistent `#b2c4be` borders in light mode and retained `#2c4740` borders in dark mode, with no overflow or browser errors. Screenshots inspected; evidence is in ignored `.local/qa/light-outlines-*.png` and `light-outlines-review.json`. Both local previews are available and refreshed. Changes are committed locally; nothing was pushed or deployed.
