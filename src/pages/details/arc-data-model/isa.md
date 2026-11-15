---
layout: ../../../layouts/MarkdownLayout.astro
title: 'ISA extension'
tags: ["isa", "metadata"]
description: "Understand the ISA extension and how investigation, study, and assay concepts connect with the ARC Abstract Model."
---

The ISA extension connects investigations, studies, and assays to the [ARC Abstract Model](/details/arc-data-model/). It specializes administrative and provenance structures for organizing experimental research.

## Organization and context

An **investigation** describes the overall research context. **Studies** organize materials and treatments, while **assays** describe measurements. These levels can be represented as nested datasets, keeping their contributors, publications, resources, and processes connected.

For example, a study can document sample preparation and an assay the measurement of those samples. Processes connect materials and data through the procedures performed. Protocols supply recipes, and parameter values describe particular executions. The [administrative core](/details/arc-data-model/administrative-core/) connects this research context to identity and responsibility; the [provenance core](/details/arc-data-model/provenance-core/) provides its process relationships.

## Model, format, and workspace

The model describes the research concepts. **ISA-XLSX** records investigation, study, assay, and experimental process metadata in spreadsheets. **WR-XLSX** extends shared ISA-XLSX conventions for workflows and runs. **Datamap tables** record descriptions of files and their fragments; their current spreadsheet specification is documented within ISA-XLSX.

The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) provides conventions for using that metadata together with research resources, including computational workflow and run information. These layers address related questions: what the information represents, how it is encoded, and how collaborators work with it.

## Connecting related descriptions

[Workflow Run](/details/arc-data-model/wr/) connects computational procedures with their executions. [Datamap](/details/arc-data-model/datamap/) adds Semantic Core descriptions of file contents, such as what a measurement column represents. Together with ISA organization, these extensions support experimental and computational research without making all three perspectives mandatory in every ARC implementation.

The [ISA RO-Crate profile](/ro-crate/isa/) maps the nested datasets and experimental descriptions into Administrative and Provenance Core structures. Compilation translates the recorded relationships into this representation, with results depending on the workspace information and the transformation's supported profile version.
