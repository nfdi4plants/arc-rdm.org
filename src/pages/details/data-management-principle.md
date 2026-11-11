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

Research documentation can grow alongside the work. Contributors can add descriptions when the relevant information is available, identify gaps, and prepare outputs for sharing.

ARC supports this through a shared [abstract model](/details/arc-data-model/), metadata representations, workspace conventions, and an ecosystem of tools. Different communities can choose practical organizations suited to their work while describing research context through common concepts.

This supports progress toward FAIRness: making data findable, accessible, interoperable, and reusable. The result still depends on the quality of documentation, access arrangements, applicable standards, and the needs of those reusing the data.

## Documentation and Organization

An ARC workspace brings research data together with three complementary kinds of context:

- [Administrative metadata](/details/arc-data-model/administrative-core/) identify the dataset, its contributors, rights, and versions.
- [Provenance metadata](/details/arc-data-model/provenance-core/) describe the processes, inputs, and outputs involved in producing or transforming resources.
- [Semantic metadata](/details/arc-data-model/semantic-core/) express scientific meaning, including variables, units, and vocabulary terms.

For a measurement table, these perspectives explain who produced it and under which reuse conditions, how the measurements were obtained, and what its columns and values mean.

The [ISA-based workspace profile](/details/arc-workspace/isa-arc/) offers familiar folders and tabular metadata for investigations, studies, assays, workflows, and runs. It is one concrete way to organize a workspace; the ARC model does not prescribe that format for every research setting.

## Separation for Reusability

Data and their descriptions serve different purposes. A data file can remain in a suitable scientific format while metadata describe its meaning, provenance, and reuse conditions. Those descriptions must clearly identify the resources they concern.

[Datamap](/details/arc-data-model/datamap/) can associate metadata with a specific data fragment, such as a table column. This allows annotation at a more precise level than an entire file.

When preparing a publication, transformation maps the recorded context into ARC RO-Crate. Additional curation may be needed to make local conventions understandable outside the team. Generating metadata, checking requirements, and publishing through a repository remain distinct steps.

## Getting Started

Start by deciding how collaborators will organize data, record context, and identify the resources their descriptions refer to. The [workspace overview](/details/arc-workspace/) explains these choices; [organization and structure](/details/organization-principle) gives an ISA-based folder example.

Tools such as **ARCitect** and **Swate** support established ISA-oriented annotation practices. Browse [tools and services](/details/tools-and-services) and [learning resources](/details/resources) for practical entry points. Tool support depends on the formats and versions in use.

## Open Source and Community-Driven

ARC develops through community contributions to its models, specifications, software, and documentation. Shared conventions help tools work together while allowing communities to address their own research practices.

Read about [documentation and annotation](/details/documentation-principle), or follow the path to [publication and exchange](/details/exchange-and-publication).
