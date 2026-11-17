# Annotation principles and ARC RDM content review

Review date: 17 November 2026.

The homepage previously linked the three Identity principles directly to abstract-model core articles. The revised content explains annotation purposes first, presents the abstract model as a shared foundation for both spaces, and introduces ISA ARC as a domain implementation spanning workspace and publication.

The conceptual review used the supplied ARC RDM manuscript. Its cleaned context copy remains gitignored at `.local/context/arc-rdm-paper.md`.

## Implemented structure

- Added Identity by Governance, Identity by Assignment, and Identity by Provenance pages, with research examples and separate links to model structures and publication profiles.
- Reworked the introduction and existing architecture overview to explain principles, shared structures, workspace, compilation, validation, and publication.
- Kept the abstract model in its own navigation section. Its cores and extensions explain shared structures, composition, contextual annotation, and scientific expression.
- Added an ISA ARC overview spanning standards, workspace conventions, profiles, tools, validation, and publication. Its existing workspace and practical guides now sit beneath that overview in the reading hierarchy.
- Replaced ambiguous practical “principle” titles with “Organizing a workspace” and “Documenting research context.” Existing URLs and heading fragments remain available.
- Updated homepage links and copy to show the common foundation and two complementary spaces. The compilation and Extension Profile links now lead to their specific explanations. A separate ISA ARC callout beneath the illustration was removed following review.

## Review coverage

All 55 existing explanatory articles were reviewed: 25 knowledge articles, 16 tool descriptions, and 14 dictionary entries. Four new knowledge articles bring the total to 59. The knowledge and dictionary indexes, homepage content sections, navigation labels, footer, and 404 copy were also reviewed.

This records the content reorganization. CDF and RPTU partner entries were added afterward as separate changes; their sourced summaries are not partner quotations.

| Content area | Result |
| --- | --- |
| Introduction and architecture | Rewritten around the manuscript's motivation and conceptual distinctions |
| Abstract-model overview, three cores, ISA, Workflow Run, and Datamap | Clarified structures, annotation scope, composition, extensions, and links to principles and representations |
| Workspace, ISA workspace, organization, documentation, vocabulary, and versioning | Clarified domain conventions, optional Workspace Profiles, interpretation through compilation, and practical links |
| ARC RO-Crate, validation, exchange/publication, FAIR Digital Objects, and FAIRness | Distinguished purposes from concrete profiles and generation from conformance and publication |
| Tools catalog, developer guidance, Data Hub, and resources | Connected implementation-specific guidance to ISA ARC and improved explanatory entry points |
| Tool descriptions | Updated ARCCommander, ARCitect, ARCitISA, ARCSearch, ARCtrl, DPBO, MIRA, PLANTdataHUB, Swate, and brapi2arc; retained the remaining six descriptions after review |
| Dictionary | Updated DataPLANT, ISA, ontology, RDM, and RO-Crate; retained the other nine definitions after review |
| Homepage and discovery | Updated principle destinations, system explanation, supporting cards, statistics wording, topic index, and browsing hierarchy |
| Partners | Preserved both partner records byte-for-byte, including all quotations; retained the partner overview |
| Specification references | Preserved pinned source text, revisions, routes, and downloads; verified rendering and navigation rather than changing normative content |

ARC Search wording was checked against its interface and DataPLANT's official service description, linked from its tool page. Other changes use the supplied manuscript and existing repository content; they do not claim new tool capabilities or promote developing Workspace Profile features to implemented functionality. Datamap spreadsheet links continue to point to the available ISA-XLSX specification.

## Verification

- Production build with pinned Node 26.13.1 passed.
- Existing-route checks passed: the saved pre-change build's 169 HTML routes and 812 heading anchors remain available.
- Internal link checks passed across all 173 generated pages.
- Knowledge checks passed for 29 knowledge articles, 16 tool pages, 32 tag listings, reading order, search inclusion, homepage destinations, and the new Domain ARC editorial parents.
- Reference checks passed for 67 routes. Specification checks passed for 54 pages and 55 byte-preserved downloads.
- All 20 existing navigation-handler cases passed.
- Partner-file SHA-256 hashes match the pre-change versions.
- The local production preview returned HTTP 200.

The link checker continues to report five documented missing sections in the pinned upstream Provenance Core specification. These are unchanged upstream warnings.

Visual browser verification could not be completed: the browser access host was unavailable, and computer-use was not approved to control Firefox. Desktop/mobile layout, theme switching, and native search/navigation interactions still need visual verification. The automated build and structural checks do not substitute for that inspection.
