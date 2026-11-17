---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC and research data management'
pubDate: 2024-09-13
description: 'Why ARC RDM connects researcher-led annotation, shared structures, and flexible workspaces with interoperable publication.'
author: 'Timo Mühlhaus'
tags: ["documentation", "services", "community"]
---

Research data gain meaning through the people, interpretations, and activities connected to them. That context develops throughout research: collaborators collect measurements, revise analyses, refine descriptions, and reuse earlier results. Waiting until publication to document it can leave important knowledge behind.

**ARC RDM**, the Annotated Research Context approach to research data management, connects this evolving work with explicit descriptions that others can interpret and reuse. It combines annotation principles, a shared abstract model, flexible research workspaces, and a common publication representation.

<span id="data-management-principle"></span>
<span id="core-features-and-benefits"></span>

## Document meaning as research develops

Researchers understand the scientific meaning of their data. Facilities contribute acquisition details, computational specialists describe analyses, and data stewards help align descriptions with standards. Tools should make these contributions easier to record and maintain together.

Established metadata standards and vocabularies capture valuable community knowledge. Research also introduces methods and interpretations that those standards do not yet cover. ARC RDM supports both: communities can reuse established conventions and extend shared structures to express emerging scientific knowledge.

<span id="documentation-and-organization"></span>

## Three annotation principles

The principles describe the purposes of annotation and guide the design of reusable metadata structures. They can be applied independently or combined around the same research objects.

| Principle | What it helps explain |
| --- | --- |
| [Identity by Governance](/details/identity-by-governance/) | What the research object is, who is responsible, and under which conditions it can be used |
| [Identity by Assignment](/details/identity-by-assignment/) | What meaning, characteristics, or interpretation are assigned to it |
| [Identity by Provenance](/details/identity-by-provenance/) | Which activities used, generated, or transformed it |

Consider a table of protein abundance measurements. Governance connects the dataset to contributors and reuse conditions. Assignment identifies the measured quantities and units, and can describe a column's role in a later analysis. Provenance connects the measurements to sample preparation, acquisition, and processing.

These principles guide annotation without prescribing every scientific fact a community must document. The [ARC Abstract Model](/details/arc-data-model/) gives them shared structures through its Administrative, Semantic, and Provenance Cores.

<span id="separation-for-reusability"></span>

## One foundation, two complementary spaces

The **[ARC Workspace](/details/arc-workspace/)** supports people developing data and descriptions together. Working conventions, formats, and tools can reflect the needs of a research community.

The **Publication Space** supports consumers beyond that environment. **[ARC RO-Crate](/details/arc-ro-crate/)** expresses the recorded context through profiles that realize the shared model in machine-actionable metadata.

**Compilation** interprets a workspace state against the model and generates this publication representation. It can be repeated throughout research. [Validation](/details/validation/) assesses selected requirements, and [publication](/details/exchange-and-publication/) releases a defined output through an appropriate service. These are distinct operations.

Data can stay in scientific formats suited to their use while metadata identify and describe them, including relevant file fragments. The [ARC RDM system overview](/details/arc-representation/) explains how the spaces, model, and transformations fit together.

<span id="open-source-and-community-driven"></span>

## Communities put the architecture into practice

A **Domain ARC** combines a community's standards, selected cores and extensions, workspace conventions, tools, validation requirements, and publication pathways. These components can evolve while preserving shared interfaces.

**[ISA ARC](/details/isa-arc/)** is a reference domain implementation developed in the life sciences. It connects experimental and computational research through ISA-based organization, spreadsheet annotation, software tools, and publication profiles. Its familiar folders and tables are conventions of that implementation.

ARC develops through open contributions to models, specifications, software, and documentation. Shared structures support progress toward [FAIR research data](/details/fairness-and-rdm/); useful reuse also depends on scientific context, metadata quality, access arrangements, and supporting services.

## Getting started

Follow the [three principles](#three-annotation-principles) to understand the foundation, or explore [the ARC RDM system](/details/arc-representation/) to see how it works. For practical adoption, start with [ISA ARC](/details/isa-arc/) and its [tools and services](/details/tools-and-services/).
