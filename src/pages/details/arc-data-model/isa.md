---
layout: ../../../layouts/MarkdownLayout.astro
title: 'ISA extension'
tags: ["isa", "metadata"]
description: "Understand the ISA extension and how investigation, study, and assay concepts connect with the ARC Abstract Model."
---

The ISA extension connects investigations, studies, and assays to the [ARC Abstract Model](/details/arc-data-model/). It specializes Administrative and Provenance Core structures for organizing experimental research, preserving their common relationships while adding the concepts of the Investigation–Study–Assay model.

This extension is one component of [ISA ARC](/details/isa-arc/). ISA ARC combines it with other extensions, working formats, tools, validation, and publication services to support a domain's research practices.

## Organization and context

An **investigation** describes the overall research context. **Studies** organize materials and treatments, while **assays** describe measurements. These levels can be represented as nested datasets, keeping their contributors, publications, resources, and processes connected.

For example, a study can document preparation of biological samples and an assay the measurement of protein abundance in those samples. Processes connect materials and data through the procedures performed. Protocols supply recipes, and parameter values describe particular executions. The [Administrative Core](/details/arc-data-model/administrative-core/) connects this research context to identity and responsibility; the [Provenance Core](/details/arc-data-model/provenance-core/) provides its process relationships.

## Model, format, and workspace

The model describes research concepts independently of how contributors record them. [ISA-XLSX](/workspace/isa-arc/isa-xlsx/) records investigation, study, assay, and experimental process metadata in spreadsheets. [WR-XLSX](/workspace/isa-arc/wr-xlsx/) extends shared ISA-XLSX conventions for workflows and runs. [Datamap tables](/workspace/isa-arc/isa-xlsx/#datamap-file) record descriptions of files and their fragments; their current spreadsheet specification is documented within ISA-XLSX.

The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) provides conventions for using that metadata together with research resources, including computational workflow and run information. These layers address related questions: what the information represents, how it is encoded, and how collaborators work with it.

## Connecting related descriptions

[Workflow Run](/details/arc-data-model/wr/) connects computational procedures with their executions. [Datamap](/details/arc-data-model/datamap/) adds Semantic Core descriptions of file contents, such as the proteins, quantities, and units represented by measurement columns. Together with ISA organization, these extensions support experimental and computational research without making all three perspectives mandatory in every ARC implementation.

The [ISA RO-Crate profile](/ro-crate/isa/) expresses nested datasets and experimental descriptions using Administrative and Provenance Core structures in the publication graph. [Compilation](/details/arc-representation/) interprets recorded workspace relationships against the shared model and translates them into the selected profiles. Its results depend on the available information and the mapping implemented.

The selected core and extension constraints apply together. Preserving common relationships lets consumers follow experimental provenance even when interpreting a specialized method requires domain knowledge. For example, discovering a preparation parameter does not establish that it is a property of the measured abundance values.
