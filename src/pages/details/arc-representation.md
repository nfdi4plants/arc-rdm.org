---
layout: ../../layouts/MarkdownLayout.astro
title: 'The ARC RDM system'
pubDate: 2024-09-15
description: 'How annotation principles and a shared abstract model connect flexible workspaces with ARC RO-Crate publication profiles and Domain ARCs.'
author: 'Heinrich Lukas Weil'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD", "XLSX", "CWL"]
---

ARC RDM connects two complementary needs: developing research context during ongoing work and communicating it to people and software beyond the original team. Annotation principles and the ARC Abstract Model provide a shared foundation for both.

## From annotation purposes to shared structures

The three principles explain why research objects are annotated. The model gives each purpose reusable entities and relationships. ARC RO-Crate Core Profiles specify how those structures are expressed in the publication representation.

| Annotation purpose | Shared abstract-model structures | Publication representation |
| --- | --- | --- |
| [Identity by Governance](/details/identity-by-governance/) | [Administrative Core](/details/arc-data-model/administrative-core/): datasets, agents, organizations, and publications | [Administrative Core Profile](/details/arc-ro-crate/#administrative-core) |
| [Identity by Assignment](/details/identity-by-assignment/) | [Semantic Core](/details/arc-data-model/semantic-core/): descriptors and the entities they characterize | [Semantic Core Profile](/details/arc-ro-crate/#semantic-core) |
| [Identity by Provenance](/details/identity-by-provenance/) | [Provenance Core](/details/arc-data-model/provenance-core/): processes, recipes, parameters, inputs, and outputs | [Provenance Core Profile](/details/arc-ro-crate/#provenance-core) |

The [abstract model](/details/arc-data-model/) is independent of serialization and supports the whole path from workspace to publication. A workspace can use its own formats; compilation interprets their information against the model. The selected RO-Crate profiles define the resulting representation.

Cores can be selected independently or combined around shared entities. Selecting a core entails following its structures; it does not require adopting all three. Domain-specific vocabularies and extensions add scientific detail while preserving the selected interfaces.

<span id="two-sides-of-the-same-coin"></span>

## Workspace and publication space

| Facet | Who it supports | How context is maintained or expressed |
| --- | --- | --- |
| [ARC Workspace](/details/arc-workspace/) | Researchers and collaborators producing and interpreting information | Evolving data and metadata in formats, tools, and organizational conventions suited to their work |
| [ARC Publication Space](/details/arc-ro-crate/) | People and software consuming information beyond its original environment | Explicit entities and relationships in ARC RO-Crate, following selected Core and Extension Profiles |

**Compilation connects the two spaces.** It turns an identifiable workspace state into a representation that consumers can inspect, exchange, and validate. The spaces describe complementary purposes; an implementation can support both without separate storage systems or a fixed sequence of applications.

## Compiling an identifiable state

Compilation reads metadata, associated resources, and working conventions to establish the relevant entities and relationships in ARC RO-Crate. Optional Workspace Profiles can supply reusable mappings, or domain-specific tools can implement the transformation directly.

A transformation should preserve the scientific information relevant to the selected profiles and report missing, ambiguous, or unsupported context. Extensions can retain specialized information. A compiler cannot reconstruct context that was never recorded.

Traceable compilation identifies the workspace state, transformation rules, profile versions, and relevant software configuration. Under equivalent inputs and conditions, the aim is semantically equivalent representations; JSON serialization need not be byte-identical. The support available depends on the implementation.

Compilation can happen repeatedly during research. A generated crate may still be incomplete or fail profile constraints. Creating a representation in the Publication Space does not itself publish it or make it immutable.

## ARC RO-Crate

[ARC RO-Crate](/details/arc-ro-crate/) uses RO-Crate and JSON-LD to express research context through independently selectable Core Profiles. Extension Profiles such as ISA, Workflow Run, and Datamap specialize selected cores.

The graph connects research entities through predictable relationships. Domain-specific terminology supplies further meaning, and consumers may need additional knowledge or mappings to interpret it. Declaring a profile identifies an intended interface; validation determines whether its requirements are met.

## Validation and publication

| Operation | What it establishes |
| --- | --- |
| Compilation | A representation of the selected workspace information |
| Structural validation | Whether that representation satisfies the selected Core and Extension Profiles |
| Target-specific validation | Whether the evaluated information satisfies a repository's, community's, or application's selected requirements |
| Publication | A defined release through a service that provides access and may supply persistent identification and preservation |

Target-driven [validation](/details/validation/) can guide documentation while work develops. Structural conformance alone does not establish scientific adequacy or overall FAIRness. [Publication and exchange](/details/exchange-and-publication/) explains how a selected research state can become a citable output while its workspace continues to evolve.

<span id="flexibility-for-different-use-cases"></span>

## Domain ARCs

A Domain ARC puts the architecture into practice for a community. It combines established metadata standards, selected cores and extensions, workspace conventions, software, validation packages, and publication pathways.

An ARC Workspace is defined by a meaningful transformation into ARC RO-Crate using one or more selected Core Profiles. Its identity does not depend on a particular directory structure, application, or version-control system. Optional Workspace Profiles help tools interpret working conventions; other defined transformations can serve the same purpose.

<span id="arc-scaffold"></span>
<span id="isa-based-workspace"></span>
<span id="isa-arc-workspace"></span>

## ISA ARC across both spaces

[ISA ARC](/details/isa-arc/) is a reference domain implementation connecting experimental and computational research. Its [workspace](/details/arc-workspace/isa-arc/) uses Git repositories, folders, and spreadsheet metadata. Its model extensions and RO-Crate profiles connect those working descriptions to the shared publication structures.

The folder organization previously called the **ARC Scaffold** belongs to this implementation. The [ISA ARC overview](/details/isa-arc/) shows the complete path through annotation tools, validation, compilation, and publication services. Follow [organizing a workspace](/details/organization-principle/) and [documenting research context](/details/documentation-principle/) for its practical conventions.
