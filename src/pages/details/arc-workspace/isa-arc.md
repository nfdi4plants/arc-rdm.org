---
layout: ../../../layouts/MarkdownLayout.astro
title: 'ISA ARC Workspace'
tags: ["isa", "XLSX", "organization"]
description: "Learn how the ISA ARC Workspace brings together investigations, studies, assays, computational workflows and runs, metadata, and research resources."
---

The ISA ARC Workspace is a concrete implementation of an [ARC Workspace](/details/arc-workspace/). It brings together investigations, studies, assays, computational workflows and runs, their metadata, and associated research resources.

It is the working environment of **ISA ARC**, a Domain ARC combining established metadata standards, selected ARC profiles, annotation tools, validation, and publication services. These shared conventions help collaborators and compatible tools interpret the same research information.

## Research organization and metadata

ISA organizes research through investigations, studies, and assays. The [ISA ARC Workspace specification](/workspace/isa-arc/) defines a Git repository with investigation metadata at its root and directories for studies, assays, workflows, and runs. Data and metadata are kept together so they can be revised and shared together. See the [directory example](/details/organization-principle/#isa-arc-directory-structure).

A workflow describes a computational procedure; a run records an execution with particular inputs, parameters, and outputs. Spreadsheet metadata complement the executable CWL descriptions. Datamap descriptions annotate files and identifiable fragments, such as measurement-table columns.

| Working metadata | Role | Corresponding publication extension |
| --- | --- | --- |
| [ISA-XLSX](/workspace/isa-arc/isa-xlsx/) | Investigations, studies, assays, and experimental processes | [ISA](/ro-crate/isa/), using Administrative and Provenance Core structures |
| [WR-XLSX](/workspace/isa-arc/wr-xlsx/) | Computational workflows and their executions | [Workflow Run](/ro-crate/wr/), using Provenance Core structures and Administrative Core dataset metadata |
| [Datamap spreadsheet descriptions](/workspace/isa-arc/isa-xlsx/#datamap-file) | Meaning and scope of file contents and fragments | [Datamap](/ro-crate/datamap/), using Semantic Core structures |

Datamap spreadsheet metadata are stored in `isa.datamap.xlsx`; their current format is specified within ISA-XLSX. All these tables can associate values and units with vocabulary terms.

These descriptions can connect experimental measurements with later computational analysis. A measurements table can be associated with its scientific variables and units, while the analysis result is connected to the inputs and process that produced it. Administrative information records contributors and conditions of reuse alongside that scientific context.

These directory and format conventions belong to ISA ARC. Other ARC Workspaces can organize their information differently while providing a defined transformation into the shared publication representation.

## Three related layers

The [ISA extension of the abstract model](/details/arc-data-model/isa/) defines specialized concepts; metadata formats express those concepts; workspace conventions organize the files and resources. Keeping these layers distinct lets different tools work with the same descriptions.

[ARCitISA](/details/tools-and-services/ARCitISA/) provides an interface for managing and annotating ISA ARC Workspaces. [ARCtrl](/details/tools-and-services/ARCtrl/) provides programmatic access and transformations. Supported formats and operations depend on the tool version.

## Connecting to publication

Compilation expresses the recorded context through [ARC RO-Crate](/details/arc-ro-crate/). Investigations, studies, and assays become related datasets. An experimental annotation-table row describes a process with its inputs, outputs, and recipe; a workflow is a computational recipe and a run is an execution. A datamap row becomes a descriptor about the addressed file or fragment.

The resulting description depends on the information captured and the relationships preserved during transformation. Using the ISA ARC Workspace does not, by itself, establish that metadata are scientifically sufficient for every reuse question.

The [publication process](/details/exchange-and-publication/) connects selected validation requirements, review, and release. For the associated specialized concepts, see [Workflow Run](/details/arc-data-model/wr/) and [Datamap](/details/arc-data-model/datamap/).
