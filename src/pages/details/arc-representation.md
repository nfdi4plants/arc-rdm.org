---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC representations'
pubDate: 2024-09-15
description: 'How ARC connects flexible research workspaces with the ARC RO-Crate publication representation.'
author: 'Heinrich Lukas Weil'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD", "XLSX", "CWL"]
---

ARC connects the environment where research is carried out with the information needed to publish and reuse its outputs. The [ARC Abstract Model](/details/arc-data-model/) supplies shared concepts; content specifications describe how those concepts are expressed in particular metadata formats.

<span id="two-sides-of-the-same-coin"></span>

## Workspace and publication space

The [ARC Workspace](/details/arc-workspace/) serves data producers. It contains research data and their administrative, provenance, and semantic metadata, maintained as the work develops. Its organization can reflect the tools and conventions of a research community.

The **Publication Space** serves consumers who may not share that local knowledge. [ARC RO-Crate](/details/arc-ro-crate/) provides its common representation, with explicit descriptions of data, entities, and relationships.

| Concept or operation | Purpose |
| --- | --- |
| Workspace | Collect data and maintain context during research |
| Transformation | Map recorded information to the publication representation |
| ARC RO-Crate | Express data and their context through the publication profiles |
| Assessment | Check applicable specifications and community or repository requirements |
| Publication | Make an output available through a publication service |

The spaces describe different needs; they do not require separate systems or a fixed sequence of applications. An implementation can connect these activities throughout the research process.

Transformation may read structured metadata, associated files, or documented organizational conventions. Missing context may need to be supplied during curation. A mapping does not establish scientific correctness or guarantee that every workspace detail is preserved.

## ARC RO-Crate

ARC RO-Crate uses RO-Crate to describe research data and contextual metadata in JSON-LD. Its base profiles express the administrative, provenance, and semantic perspectives of the abstract model. Extension profiles support more specialized descriptions, including ISA, Workflow Run, and Datamap.

The publication graph can connect a dataset with its files, contributors, research entities, processes, and scientific descriptions. Properly schematized additional types and properties allow specialized context to be retained; a consumer must support the relevant terminology to interpret it.

Producing this representation, assessing conformity to specifications, and depositing it with a publication service are separate operations. A repository can add persistent identifiers, access arrangements, and preservation services. See [publication and exchange](/details/exchange-and-publication).

<span id="arc-scaffold"></span>

## ISA-based workspace

The [ARC ISA XLSX Workspace Profile](/details/arc-workspace/isa-arc/), presented here under ISA-ARC, provides conventions for research organized through investigations, studies, and assays. It brings ISA-XLSX metadata together with the associated research resources.

The folder organization previously described on this site as the **ARC Scaffold** is an ISA-based workspace implementation. Familiar directories and tabular metadata support annotation during research. Workflows describe computational procedures; runs describe their execution. Datamap descriptions can associate scientific context with selected parts of data files.

ISA-XLSX is a metadata content format. The ISA extension places those concepts in the abstract model, while the workspace profile supplies conventions for using the format in a working environment. These layers serve related but different purposes.

See [organization and structure](/details/organization-principle) for the established folder example and [documentation and annotation](/details/documentation-principle) for tabular examples. CWL may be used for computational procedures where supported by the chosen tools; it is not a requirement of every ARC workspace.

## Flexibility for Different Use Cases

Other workspaces can use organizations and authoring tools suited to their research practices. What matters for publication is an explicit relationship between the recorded context, the shared model, and the target metadata representation.

Tools can automate parts of this work. The information recorded, the mapping implemented, and the requirements of the intended consumers determine what the resulting publication can support.
