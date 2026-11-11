# ARC content and workspace illustration update

Status: **In progress**

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
- [ ] Add reference content rendering and conditional search inclusion.
- [ ] Author ten conceptual reference explanations.
- [ ] Update existing articles, dictionary, tool wording, and diagrams.
- [ ] Update homepage illustration, navigation copy, and restrained accents.
- [ ] Complete editorial and automated verification.
- [ ] Complete background desktop/mobile, light/dark, interaction, and accessibility checks.
- [ ] Record results and leave local preview available.

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
