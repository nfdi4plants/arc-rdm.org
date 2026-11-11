---
layout: ../../../layouts/MarkdownLayout.astro
title: 'ISA ARC Workspace'
tags: ["isa", "XLSX", "organization"]
description: "Learn how the ISA ARC Workspace brings together investigations, studies, assays, computational workflows and runs, metadata, and research resources."
---

The ISA ARC Workspace is a concrete implementation of an [ARC Workspace](/details/arc-workspace/). It brings together investigations, studies, assays, computational workflows and runs, their metadata, and associated research resources.

Its purpose is to give collaborators and compatible tools shared conventions for working with that information. It is one way to implement a workspace within the broader ARC framework.

## Research organization and metadata

ISA provides an organization for research through investigations, studies, and assays. ISA-XLSX expresses ISA-based descriptions in spreadsheets.

The workspace also includes computational workflow and run information. A workflow describes a computational procedure; a run records an execution of that procedure with particular inputs, parameters, and outputs. The [Workflow Run extension](/details/arc-data-model/wr/) explains these concepts in the abstract model. [Datamap](/details/arc-data-model/datamap/) descriptions can add annotations for specific parts of data files.

These descriptions can connect experimental measurements with later computational analysis. A measurements table can be associated with its scientific variables and units, while the analysis result is connected to the inputs and process that produced it. Administrative information records contributors and conditions of reuse alongside that scientific context.

The ISA ARC Workspace supplies conventions for bringing the metadata and research resources together. Familiar folder layouts and spreadsheet editors can support this work; they are implementation choices rather than the definition of every ARC Workspace.

## Three related layers

The [ISA extension of the abstract model](/details/arc-data-model/isa/) relates investigation, study, and assay concepts to the shared ARC model; Workflow Run adds descriptions of computational procedures and their executions. Metadata formats such as ISA-XLSX provide tabular representations. The ISA ARC Workspace supplies conventions for working with those descriptions and the associated research resources.

Keeping these layers distinct helps explain the role of software. An annotation application helps researchers maintain their information; it does not replace the concepts or conventions that make the information interpretable.

## Connecting to publication

The [administrative](/details/arc-data-model/administrative-core/), [provenance](/details/arc-data-model/provenance-core/), and [semantic](/details/arc-data-model/semantic-core/) cores provide complementary perspectives on the recorded research context. A transformation can express this context through [ARC RO-Crate](/details/arc-ro-crate/) for publication and reuse.

The resulting description depends on the information captured and the relationships preserved during transformation. Using the ISA ARC Workspace does not, by itself, establish that metadata are scientifically sufficient for every reuse question.

For the associated specialized concepts, see [Workflow Run](/details/arc-data-model/wr/) and [Datamap](/details/arc-data-model/datamap/).
