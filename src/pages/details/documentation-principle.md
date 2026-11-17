---
layout: ../../layouts/MarkdownLayout.astro
title: 'Documenting research context'
pubDate: 2024-09-13
description: 'Record administrative, provenance, and semantic context, with practical ISA-based annotation examples.'
author: 'Timo Mühlhaus'
tags: ["community", "organization", "project management"]
---

<span id="documentation-principle"></span>

## Recording context during research

Research data need context that remains understandable beyond the people who produced them. Three annotation principles guide what that context addresses: [Identity by Governance](/details/identity-by-governance/) concerns identification, responsibility, and reuse conditions; [Identity by Assignment](/details/identity-by-assignment/) concerns scientific meaning; [Identity by Provenance](/details/identity-by-provenance/) concerns the activities in which research objects participate.

In an [ARC Workspace](/details/arc-workspace/), collaborators record and refine that context as research develops. Workspace conventions determine how the information is organized and authored. The [ARC Abstract Model](/details/arc-data-model/) provides shared structures for those descriptions and for their later representation through publication profiles.

### An ISA-based example

The examples below use [ISA ARC](/details/isa-arc/), the reference domain implementation of ARC RDM. Its [workspace](/details/arc-workspace/isa-arc/) brings together investigations, studies, assays, computational workflows and runs, and descriptions of data fragments.

An **investigation** gives related research activities a shared context. Its metadata can include a title, purpose, contributors, and other administrative information. **Studies** describe subjects or samples and the processes that prepare them. **Assays** describe measurements or analyses and connect them to the resulting data.

![ISA-based example: a study describes sample preparation](/documentation-principle-study.png)

![ISA-based example: an assay describes measurement and its outputs](/documentation-principle-assay.png)

A **workflow** describes a computational procedure. A **run** records an execution of that procedure with particular inputs, parameters, and outputs. Keeping these descriptions distinct helps explain both the reusable procedure and what happened on a particular occasion. See the [Workflow Run extension](/details/arc-data-model/wr/).

<span id="annotation-principle"></span>

## Giving annotations an explicit scope

An annotation should identify what it describes and the meaning of the information supplied. For example, the unit of a measured variable belongs to that variable; a temperature used in sample preparation describes a process condition. The two may share vocabulary without having the same scope.

Provenance connects inputs, processes, and outputs. Semantic descriptions add scientific meaning to resources and values. Administrative descriptions provide identity, attribution, and reuse conditions. No one perspective replaces the others.

In an ISA annotation table, each row describes a process. Input and output columns identify participating materials or data; other columns record the protocol, process parameters, and characteristics of the participating entities. Related columns supply units and vocabulary references. Reusing an output identifier as the input of a later step connects the processes into a provenance path.

![Schematic ISA annotation table illustrating process inputs, outputs, and annotations](/annotation-principle-figure-1.png)

This illustration shows the annotation pattern; the [ISA-XLSX specification](/workspace/isa-arc/isa-xlsx/) defines the current format. [WR-XLSX](/workspace/isa-arc/wr-xlsx/) applies related conventions to computational workflows and runs.

<span id="isa-model-key-parametrization"></span>

### Parameters, components, and characteristics

ISA-oriented annotation tables distinguish kinds of context in their column headers. Common column types include:

- **Parameter:** Information about a process, such as a temperature or duration.
- **Component:** A component used in a process.
- **Characteristic:** A property of the entity being described.

A term in square brackets identifies the particular parameter, component, or characteristic. Related columns can record a unit and references to controlled vocabulary terms. Choosing a term requires checking that its meaning fits the observation or method being documented.

<span id="isa-inputoutput-typization"></span>

### Identifying inputs and outputs

Input and Output columns identify entities participating in a process. Their types can distinguish physical material, biological samples, and digital data. Consistent identifiers allow descriptions from different steps to refer to the same entity.

A file may contain measurements from several samples or processes. In that situation, a reference to the entire file can be too broad. A data-fragment reference can identify the relevant part.

### Data Fragment Annotation

A data fragment is a selected part of a resource, such as a column in a table, an image region, or a time interval. Its selector must be interpreted using the applicable fragment identification specification.

![An ISA-oriented table referring to a data fragment](/documentation-principle-DFS-ISA.png)

Fragment references connect metadata to a precise scope. The selector identifies the part of the resource; the scientific annotation explains what that part represents. If the file structure changes, the reference must be checked and updated accordingly.

The appropriate selector depends on the format and the convention in use. For example, [RFC 7111](https://datatracker.ietf.org/doc/html/rfc7111) defines fragment identifiers for CSV documents: `measurements.csv#col=5` selects the fifth column, counting from one. A convention for one format should not be assumed to apply to every tabular file.

### Datamap

The [Datamap extension](/details/arc-data-model/datamap/) supports descriptions of data fragments. A data context associates a fragment with information needed to interpret it, such as the variable it represents, its unit, or its datatype.

For a measurement table, one context could identify the column containing a measured concentration and describe its values. A separate provenance description connects the measurements to acquisition and subsequent analysis.

| Description | Example |
| --- | --- |
| Annotation target | The concentration column in a measurement table |
| Scientific variable | Glucose concentration |
| Unit | Millimoles per litre |
| Provenance connection | The measurement process that produced the values and the analysis that used them |

In a datamap spreadsheet, a row identifies a file or fragment and records its interpretation. When mapped to the Datamap publication profile, that row becomes a descriptor about the selected target. The descriptor keeps the annotation's scope explicit; several descriptors can describe the same data without changing them. The current workbook format is defined in the [ISA-XLSX datamap section](/workspace/isa-arc/isa-xlsx/#datamap-file).

The workspace keeps these descriptions available during research. Transformation to [ARC RO-Crate](/details/arc-ro-crate/) prepares an explicit representation for consumers beyond that environment. See [publication and exchange](/details/exchange-and-publication) for the next steps.
