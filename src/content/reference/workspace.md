---
description: "Understand the ARC Workspace: a flexible environment for documenting research data and their administrative, provenance, and semantic context."
---

An ARC Workspace is the environment where research data and metadata develop together. Researchers, data stewards, and collaborators use it to collect information, revise descriptions, and keep research outputs connected to their context.

The workspace supports work in progress. A measurement can be recorded before its interpretation is settled; an analysis can be revised as new information becomes available. Documentation grows with the research.

## Data and their context

An ARC Workspace brings research data together with three complementary kinds of metadata:

- [Administrative metadata](/abstract-model/administrative-core/) identifies resources, records contributors, and describes rights and other management information.
- [Provenance metadata](/abstract-model/provenance-core/) connects resources with the experimental and computational processes that use or produce them.
- [Semantic metadata](/abstract-model/semantic-core/) explains scientific meaning through descriptions, values, units, and vocabulary terms.

For a table of measurements and a derived analysis result, this could mean recording the contributors and reuse conditions, describing the measured variables and units, and connecting the result to the analysis and its inputs. These perspectives describe the same research information. They need not occupy three separate folders or files.

## Flexible working environments

ARC does not require every community to use the same tools, file layout, or metadata editor. A workspace may use conventions suited to the people who supply its information. Its connection to ARC rests on being able to express that research information in the publication representation.

Workspace profiles make recurring organizational conventions explicit. The [ARC ISA XLSX Workspace Profile](/workspace/isa-arc/) provides one implementation, combining ISA-oriented research organization with spreadsheet metadata and associated resources.

## Preparing for publication

The [ARC Abstract Model](/abstract-model/) provides shared concepts for describing research context. A transformation uses the information recorded in the workspace to construct [ARC RO-Crate](/ro-crate/), the representation used in the ARC Publication Space.

That transition makes context explicit for people and software beyond the original working environment. Local labels may need fuller descriptions or vocabulary references; missing context may need curation. Changing a representation cannot supply information that was never recorded.

Generating ARC RO-Crate, checking conformity, and making a research output available through a publication service are distinct steps. Workspace and publication space describe complementary purposes, rather than requiring separate storage systems or a fixed sequence of applications.
