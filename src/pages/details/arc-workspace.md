---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Workspace'
tags: ["documentation", "organization", "community"]
description: "The workspace facet of ARC RDM: develop research context using shared model structures and working conventions suited to your community."
---

An ARC Workspace is the environment where research data and metadata develop together. It serves the workspace facet of [the ARC RDM system](/details/arc-representation/): researchers, data stewards, and collaborators collect information, revise descriptions, and keep research outputs connected to their context.

The workspace supports work in progress. A measurement can be recorded before its interpretation is settled; an analysis can be revised as new information becomes available. Documentation grows with the research.

## Data and their context

ARC's three foundational annotation principles guide the context researchers record. They can be used independently or in combination:

- [Identity by Governance](/details/identity-by-governance/) addresses identification, responsibility, attribution, and conditions of use.
- [Identity by Assignment](/details/identity-by-assignment/) addresses the scientific meaning, characteristics, and interpretations assigned to research objects.
- [Identity by Provenance](/details/identity-by-provenance/) addresses the activities that use, produce, or transform those objects.

For a table of measurements and a derived analysis result, this could mean recording the contributors and reuse conditions, describing the measured variables and units, and connecting the result to the analysis and its inputs. These perspectives describe the same research information. They need not occupy three separate folders or files.

The [ARC Abstract Model](/details/arc-data-model/) gives these purposes shared structures through its Administrative, Semantic, and Provenance Cores. Workspace formats and tools record information that compilation relates to these shared structures. The corresponding [ARC RO-Crate Core Profiles](/details/arc-ro-crate/) express them in the publication space, so the model connects both facets.

## Flexible working environments

An ARC Workspace has a defined transformation that interprets its research information and generates [ARC RO-Crate](/details/arc-ro-crate/) implementing one or more selected Core Profiles. The transformation establishes the relevant entities and relationships; packaging files or declaring a profile alone is insufficient. Work in progress may still produce incomplete metadata that validation identifies for improvement.

Its identity does not depend on a particular directory layout, metadata format, application, or version-control system. Optional **Workspace Profiles** describe reusable organizational conventions and their relationship to the model. A domain-specific transformation can also interpret those conventions directly. Using a Workspace Profile does not by itself establish that a generated crate meets its publication-profile requirements.

## Domain ARCs and collaboration

A **Domain ARC** combines a community's selected cores and extensions with workspace conventions, tools, validation requirements, and publication pathways. It spans both facets of ARC RDM. [ISA ARC](/details/isa-arc/) is the reference domain implementation developed in the life sciences; its [ISA ARC Workspace](/details/arc-workspace/isa-arc/) brings together investigations, studies, assays, workflows, runs, spreadsheet metadata, and associated resources.

Researchers supply scientific interpretations, facilities can record acquisition details, computational specialists describe analyses, and data stewards help align descriptions with standards. These contributors can use different interfaces while maintaining shared context. Their roles and permissions depend on the collaboration, rather than being prescribed by the abstract model.

## Preparing for publication

**Compilation** interprets a recorded workspace state using the shared model and maps it to ARC RO-Crate using selected Core and Extension Profiles. This can happen repeatedly during research, producing representations for inspection, exchange, or validation.

That transition makes context explicit for people and software beyond the original working environment. Local labels may need fuller descriptions or vocabulary references; missing context may need curation. Changing a representation cannot supply information that was never recorded.

Generating ARC RO-Crate, checking conformity, and making a research output available through a publication service are distinct steps. Workspace and publication space describe complementary purposes, rather than requiring separate storage systems or a fixed sequence of applications.
