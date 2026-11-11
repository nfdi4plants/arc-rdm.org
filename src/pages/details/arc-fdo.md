---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC RO-Crate and FAIR Digital Objects'
pubDate: 2024-09-13
description: 'How ARC RO-Crate supports FAIR data publication through explicit research context.'
author: 'Timo Mühlhaus'
tags: ["tools", "services", "community"]
---

ARC supports the preparation of research outputs for discovery, interpretation, and reuse. [ARC RO-Crate](/ro-crate/) is the FAIR Digital Object representation used in its **Publication Space**.

The [ARC Workspace](/workspace/) supports ongoing research and documentation. Transformation prepares the recorded context as publication metadata, using the shared [abstract model](/abstract-model/) and the relevant ARC RO-Crate profiles.

## Context for reuse

The three base profiles address complementary needs:

- **Administrative context** identifies and attributes the dataset and records information such as rights and versions.
- **Provenance context** relates research entities to the experimental and computational processes in which they participate.
- **Semantic context** explains scientific meaning, including variables, units, vocabulary terms, and the scope of annotations.

ISA, Workflow Run, and Datamap extensions provide more specialized descriptions. ARC RO-Crate expresses the resulting relationships in JSON-LD using its publication profiles.

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

Generating ARC RO-Crate, checking conformity, and publishing through a service are distinct activities. Validation can assess stated requirements; interpretation and scientific adequacy depend on the content recorded and the intended reuse. Repository services can supply persistent identifiers, access controls, and preservation arrangements.

A workspace may continue to evolve after an output has been published. [Versioning](/details/versioning) helps distinguish changes during research from identifiable publication versions.

Read [publication and exchange](/details/exchange-and-publication) for the path from workspace documentation to a published output.

[FAIR Data Maturity Model]: https://doi.org/10.15497/RDA00050 "FAIR Data Maturity Model"


