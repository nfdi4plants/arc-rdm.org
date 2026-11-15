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

The [ARC Workspace](/details/arc-workspace/) supports contributors as data and descriptions develop. Its organization can reflect a community's tools and conventions, with administrative, semantic, and provenance structures selected according to the research context.

The **Publication Space** serves consumers who may not share that local knowledge. [ARC RO-Crate](/details/arc-ro-crate/) provides its common representation, with explicit descriptions of data, entities, and relationships.

| Concept or operation | Purpose |
| --- | --- |
| Workspace | Collect data and maintain context during research |
| Compilation | Interpret a workspace state and map its information into selected publication profiles |
| ARC RO-Crate | Express data and their context through the publication profiles |
| Structural validation | Check the constraints of the selected Core and Extension Profiles |
| Target-specific validation | Check requirements for a particular repository, standard, or application |
| Publication | Make an output available through a publication service |

The spaces describe different needs; they do not require separate systems or a fixed sequence of applications. An implementation can connect these activities throughout the research process.

## Compiling an identifiable state

Compilation reads structured metadata, associated files, and working conventions to establish entities and relationships in ARC RO-Crate. It should preserve the scientific information relevant to the selected profiles and identify missing, ambiguous, or unsupported context. Domain-specific extensions can retain specialized information. A compiler cannot reconstruct context that was never recorded.

Traceable compilation identifies the workspace state, transformation rules, profile versions, and relevant software configuration. Under equivalent inputs and conditions, the aim is semantically equivalent representations; their JSON serialization need not be byte-identical. These are expectations for a reproducible transformation, with actual support depending on the implementation.

Compilation can produce intermediate crates for inspection, exchange, and validation throughout research. A generated crate may still fail profile constraints. Creating a representation in the Publication Space does not itself publish it or make it immutable.

## ARC RO-Crate

ARC RO-Crate uses RO-Crate to describe research data and contextual metadata in JSON-LD. Its independently selectable Core Profiles express the administrative, semantic, and provenance structures of the abstract model. Extension Profiles such as ISA, Workflow Run, and Datamap specialize selected cores.

The graph can connect a dataset with its files, contributors, research entities, processes, and scientific descriptions. Vocabulary-defined additional types and properties can retain specialized context while preserving selected profile requirements. A consumer may need domain-specific terminology or mappings to interpret that detail.

Declaring a profile identifies the intended interface; validation checks whether its requirements are met. Further [validation packages](/details/validation/) can assess a particular publication or reuse target. Scientific adequacy and repository review remain distinct from structural conformance. Publication services can provide persistent identifiers, access arrangements, and preservation. See [publication and exchange](/details/exchange-and-publication).

<span id="arc-scaffold"></span>
<span id="isa-based-workspace"></span>

## ISA ARC Workspace

The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) provides conventions for investigations, studies, assays, computational workflows and runs. It brings their metadata together with the associated research resources.

The folder organization previously described on this site as the **ARC Scaffold** is an ISA-based workspace implementation. Familiar directories and tabular metadata support annotation during research. Workflows describe computational procedures; runs describe their execution. Datamap descriptions can associate scientific context with selected parts of data files.

ISA-XLSX records investigation, study, assay, and experimental metadata. WR-XLSX extends its shared conventions for workflows and runs. Datamap tables describe file contents and fragments; their current spreadsheet specification is included in ISA-XLSX. The corresponding model specializations and RO-Crate profiles define how these descriptions connect to shared research structures.

See [organization and structure](/details/organization-principle) for the established folder example and [documentation and annotation](/details/documentation-principle) for tabular examples. CWL may be used for computational procedures where supported by the chosen tools; it is not a requirement of every ARC workspace.

## Flexibility for Different Use Cases

Other workspaces can use organizations and authoring tools suited to their research practices. An ARC Workspace has a defined transformation that meaningfully establishes one or more selected core structures in ARC RO-Crate. Simply packaging files or naming a profile does not establish those relationships.

Optional Workspace Profiles can describe reusable working conventions and mappings; domain-specific transformations can also implement the mapping directly. The information recorded, the mapping implemented, and the requirements of the intended consumers determine what the result can support.
