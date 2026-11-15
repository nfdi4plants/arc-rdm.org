---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC RO-Crate and FAIR Digital Objects'
pubDate: 2024-09-13
description: 'How ARC RO-Crate supports FAIR data publication through explicit research context.'
author: 'Timo Mühlhaus'
tags: ["tools", "services", "community"]
---

ARC supports the preparation of research outputs for discovery, interpretation, and reuse. [ARC RO-Crate](/details/arc-ro-crate/) is the research-object representation used in its **Publication Space**. A published ARC RO-Crate can serve as a FAIR Digital Object when persistent identification, machine-actionable descriptions, and suitable publication services support its discovery, access, and reuse.

The [ARC Workspace](/details/arc-workspace/) supports ongoing research and documentation. Compilation prepares a representation of its recorded context using the shared [abstract model](/details/arc-data-model/) and selected ARC RO-Crate profiles. This can happen before formal publication.

## Context for reuse

The independently selectable Core Profiles address complementary needs:

- **Administrative context** identifies and attributes the dataset and records information such as rights and versions.
- **Provenance context** relates research entities to the experimental and computational processes in which they participate.
- **Semantic context** explains scientific meaning, including variables, units, vocabulary terms, and the scope of annotations.

ISA, Workflow Run, and Datamap extensions specialize selected core structures. ARC RO-Crate expresses the resulting relationships in JSON-LD. Profile selection determines the relevant structural requirements; it does not require every object to include all three perspectives.

## Supporting the FAIR principles

FAIRness depends on the object, its documentation, and the services through which it is made available. A format or directory structure alone cannot establish it.

| Principle | How ARC contributes | What also needs attention |
| --- | --- | --- |
| Findable | Explicit identifiers and descriptive metadata | Registration, indexing, and persistent identification by suitable services |
| Accessible | Descriptions of resources and their access context | Working access mechanisms, stated restrictions, and continued metadata availability |
| Interoperable | Shared model concepts, publication profiles, and vocabulary references | Correct mappings and support for the relevant terms and extensions |
| Reusable | Administrative, provenance, and semantic context | Adequate methods, clear rights, meaningful annotations, and community requirements |

The [RDA FAIR Data Maturity Model][FAIR Data Maturity Model] provides indicators for assessing FAIRness. Applying an indicator requires evidence about the particular dataset and its publication environment. An ARC representation is not a blanket claim that every indicator has been met.

## Incremental documentation and publication

Research teams can improve context during active work. A missing unit, unclear contributor role, or incomplete process description can be addressed before preparing a publication output.

Generating ARC RO-Crate, checking conformity, and publishing through a service are distinct activities. Structural validation checks selected profile constraints; target-specific packages assess requirements of a repository, standard, or application. Results apply to the state and scope evaluated. Repository services can add review, persistent identifiers, access controls, and preservation arrangements.

A workspace may continue to evolve after an output has been published. [Versioning](/details/versioning) helps distinguish changes during research from identifiable publication versions.

Read [publication and exchange](/details/exchange-and-publication) for the path from workspace documentation to a published output.

[FAIR Data Maturity Model]: https://doi.org/10.15497/RDA00050 "FAIR Data Maturity Model"


