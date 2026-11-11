---
layout: ../../../layouts/MarkdownLayout.astro
title: 'ISA extension'
tags: ["isa", "metadata"]
description: "Understand the ISA extension and how investigation, study, and assay concepts connect with the ARC Abstract Model."
---

The ISA extension relates research organized through investigations, studies, and assays to the [ARC Abstract Model](/details/arc-data-model/). It provides specialized research concepts within the shared framework of administrative, provenance, and semantic context.

## Organization and context

ISA-based organization helps describe how individual research activities belong to a larger investigation. The extension connects these descriptions to the common model, so that specialized research organization remains associated with recognizable metadata structures.

For a measurements table and a derived analysis result, ISA-oriented descriptions can situate the research activities within the investigation. The [administrative core](/details/arc-data-model/administrative-core/) addresses identity and responsibility, the [provenance core](/details/arc-data-model/provenance-core/) relates inputs and outputs to processes, and the [semantic core](/details/arc-data-model/semantic-core/) explains measured variables and units.

## Model, format, and workspace

The ISA extension is a conceptual part of the abstract model. ISA-XLSX specifies a tabular expression of ISA-based descriptions, with extensions for computational workflows, their runs, and file fragments.

The [ARC ISA XLSX Workspace Profile](/details/arc-workspace/isa-arc/) provides conventions for using that metadata together with research resources in a working environment. These layers address related questions: what the information represents, how it is encoded, and how collaborators work with it.

## Connecting related descriptions

[Workflow Run](/details/arc-data-model/wr/) addresses computational workflow execution; [Datamap](/details/arc-data-model/datamap/) addresses annotation of data fragments. Together with ISA organization, these extensions support descriptions that span experimental and computational research.

When preparing [ARC RO-Crate](/details/arc-ro-crate/), the relationship to the abstract model provides a basis for expressing the recorded context in the publication representation. The information available still depends on what was documented in the workspace.
