---
layout: ../../layouts/MarkdownLayout.astro
title: 'Data Management Principle'
pubDate: 2024-09-13
description: 'Maintain research context in an ARC workspace and prepare it for publication and reuse.'
author: 'Timo Mühlhaus'
tags: ["documentation", "services", "community"]
---

## Data Management Principle

ARC is a framework for organizing research data and the context needed to understand and reuse them. It connects documentation during active research with a shared representation for publication.

The [ARC Workspace](/details/arc-workspace/) is the environment where data and metadata evolve. The **Publication Space** provides descriptions for people and systems beyond the original research team, using [ARC RO-Crate](/details/arc-ro-crate/).

## Core Features and Benefits

Research documentation can grow alongside the work. Researchers explain scientific meaning, facility personnel contribute measurement context, computational specialists describe analyses, and data stewards support standards and quality. Their contributions can develop through different tools while forming a shared research context.

ARC supports this through a shared [abstract model](/details/arc-data-model/), metadata representations, workspace conventions, and an ecosystem of tools. Communities can reuse established standards and express emerging concepts through compatible extensions. Describing new scientific knowledge need not wait for a new metadata standard.

This supports progress toward FAIRness: making data findable, accessible, interoperable, and reusable. The result still depends on the quality of documentation, access arrangements, applicable standards, and the needs of those reusing the data.

## Documentation and Organization

Three independently applicable annotation principles guide the context recorded in an ARC workspace:

- [Identity by Governance](/details/arc-data-model/administrative-core/) connects resources to identification, responsibility, and reuse conditions through the Administrative Core.
- [Identity by Assignment](/details/arc-data-model/semantic-core/) expresses scientific meaning and interpretations through the Semantic Core.
- [Identity by Provenance](/details/arc-data-model/provenance-core/) describes resources through processes, recipes, inputs, outputs, and parameters in the Provenance Core.

Communities can select the cores relevant to their work. Combined for a measurement table, they explain who produced it and under which reuse conditions, how the measurements were obtained, and what its columns and values mean.

The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) offers familiar folders and tabular metadata for investigations, studies, assays, computational workflows, and runs. It is one concrete way to organize a workspace; the ARC model does not prescribe that format for every research setting.

## Separation for Reusability

Data and their descriptions serve different purposes. A data file can remain in a suitable scientific format while metadata describe its meaning, provenance, and reuse conditions. Those descriptions must clearly identify the resources they concern.

[Datamap](/details/arc-data-model/datamap/) can associate metadata with a specific data fragment, such as a table column. This allows annotation at a more precise level than an entire file.

Compilation maps an identifiable workspace state into ARC RO-Crate and can be repeated during research. Selected [validation packages](/details/validation/) provide feedback against intended uses or publication targets. Additional curation may be needed to explain local conventions; generating the representation, checking requirements, and publishing remain distinct operations.

## Getting Started

Start by deciding how collaborators will organize data, record context, and identify the resources their descriptions refer to. The [workspace overview](/details/arc-workspace/) explains these choices; [organization and structure](/details/organization-principle) gives an ISA-based folder example.

For ISA-oriented work, explore [ARCitISA](/details/tools-and-services/ARCitISA/) and [Swate](/details/tools-and-services/SWATE/), or browse [tools and services](/details/tools-and-services) and [learning resources](/details/resources). Check the supported formats and versions when choosing an annotation tool.

## Open Source and Community-Driven

ARC develops through community contributions to its models, specifications, software, and documentation. A **Domain ARC** combines selected cores and extensions with community workspace conventions, tools, validation requirements, and publication pathways. ISA ARC demonstrates this approach for experimental and computational research. These components can develop independently while preserving shared interfaces.

Read about [documentation and annotation](/details/documentation-principle), or follow the path to [publication and exchange](/details/exchange-and-publication).
