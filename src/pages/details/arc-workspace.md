---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Workspace'
tags: ["documentation", "organization", "community"]
description: "Understand the ARC Workspace: a flexible environment for documenting research data and their administrative, provenance, and semantic context."
---

An ARC Workspace is the environment where research data and metadata develop together. Researchers, data stewards, and collaborators use it to collect information, revise descriptions, and keep research outputs connected to their context.

The workspace supports work in progress. A measurement can be recorded before its interpretation is settled; an analysis can be revised as new information becomes available. Documentation grows with the research.

## Data and their context

An ARC Workspace brings research data together with metadata selected for the research context. Three complementary perspectives are available, independently or in combination:

- [Administrative metadata](/details/arc-data-model/administrative-core/) identifies resources, records contributors, and describes rights and other management information.
- [Provenance metadata](/details/arc-data-model/provenance-core/) connects resources with the experimental and computational processes that use or produce them.
- [Semantic metadata](/details/arc-data-model/semantic-core/) explains scientific meaning through descriptions, values, units, and vocabulary terms.

For a table of measurements and a derived analysis result, this could mean recording the contributors and reuse conditions, describing the measured variables and units, and connecting the result to the analysis and its inputs. These perspectives describe the same research information. They need not occupy three separate folders or files.

## Flexible working environments

An ARC Workspace has a defined transformation that interprets its research information and generates [ARC RO-Crate](/details/arc-ro-crate/) implementing one or more selected Core Profiles. The transformation establishes the relevant entities and relationships; packaging files or declaring a profile alone is insufficient. Work in progress may still produce incomplete metadata that validation identifies for improvement.

Its identity does not depend on a particular directory layout, metadata format, application, or version-control system. Optional **Workspace Profiles** make reusable organizational conventions explicit. A domain-specific transformation can also interpret those conventions directly.

## Domain ARCs and collaboration

A **Domain ARC** combines a community's selected cores and extensions with workspace conventions, tools, validation requirements, and publication pathways. ISA ARC is an implementation developed in the life sciences; its [ISA ARC Workspace](/details/arc-workspace/isa-arc/) brings together investigations, studies, assays, workflows, runs, spreadsheet metadata, and associated resources.

Researchers supply scientific interpretations, facilities can record acquisition details, computational specialists describe analyses, and data stewards help align descriptions with standards. These contributors can use different interfaces while maintaining shared context. Their roles and permissions depend on the collaboration, rather than being prescribed by the abstract model.

## Preparing for publication

The [ARC Abstract Model](/details/arc-data-model/) provides shared concepts for describing research context. **Compilation** systematically maps a recorded workspace state to ARC RO-Crate using selected Core and Extension Profiles. This can happen repeatedly during research, producing representations for inspection, exchange, or validation.

That transition makes context explicit for people and software beyond the original working environment. Local labels may need fuller descriptions or vocabulary references; missing context may need curation. Changing a representation cannot supply information that was never recorded.

Generating ARC RO-Crate, checking conformity, and making a research output available through a publication service are distinct steps. Workspace and publication space describe complementary purposes, rather than requiring separate storage systems or a fixed sequence of applications.
