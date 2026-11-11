---
layout: ../../layouts/MarkdownLayout.astro
title: 'Documentation and Annotation'
pubDate: 2024-09-13
description: 'Record administrative, provenance, and semantic context, with practical ISA-based annotation examples.'
author: 'Timo Mühlhaus'
tags: ["community", "organization", "project management"]
---

## Documentation Principle

Research data need context that remains understandable beyond the people who produced them. The [ARC Abstract Model](/abstract-model/) brings together three perspectives: administrative information identifies and attributes resources; provenance records their participation in processes; semantic information describes their scientific meaning.

In an [ARC Workspace](/workspace/), collaborators record and refine that context as research develops. Workspace conventions determine how the information is organized and authored. They can use familiar formats while maintaining an explicit relationship to the shared model.

### An ISA-based example

The [ARC ISA XLSX Workspace Profile](/workspace/isa-arc/) organizes research through investigations, studies, and assays, with descriptions for computational workflows, runs, and data fragments. The examples below illustrate this implementation.

An **investigation** gives related research activities a shared context. Its metadata can include a title, purpose, contributors, and other administrative information. **Studies** describe subjects or samples and the processes that prepare them. **Assays** describe measurements or analyses and connect them to the resulting data.

![ISA-based example: a study describes sample preparation](/documentation-principle-study.png)

![ISA-based example: an assay describes measurement and its outputs](/documentation-principle-assay.png)

A **workflow** describes a computational procedure. A **run** records an execution of that procedure with particular inputs, parameters, and outputs. Keeping these descriptions distinct helps explain both the reusable procedure and what happened on a particular occasion. See the [Workflow Run extension](/abstract-model/wr/).

## Annotation Principle

An annotation should identify what it describes and the meaning of the information supplied. For example, the unit of a measured variable belongs to that variable; a temperature used in sample preparation describes a process condition. The two may share vocabulary without having the same scope.

Provenance connects inputs, processes, and outputs. Semantic descriptions add scientific meaning to resources and values. Administrative descriptions provide identity, attribution, and reuse conditions. No one perspective replaces the others.

In ISA-oriented tables, headers describe the kinds of information recorded and cells provide their values. Related columns can supply units and vocabulary references. Tables can document paths through experimental or computational processes, while other metadata describe the dataset or its individual data entities.

![Example of an ISA-based annotation table](/annotation-principle-figure-1.png)

### ISA Model Key Parametrization

ISA-oriented annotation tables distinguish kinds of context in their column headers. Common column types include:

- **Parameter:** Information about a process, such as a temperature or duration.
- **Component:** A component used in a process.
- **Characteristic:** A property of the entity being described.

A term in square brackets identifies the particular parameter, component, or characteristic. Related columns can record a unit and references to controlled vocabulary terms. Choosing a term requires checking that its meaning fits the observation or method being documented.

### ISA Input/Output Typization

Input and Output columns identify entities participating in a process. Their types can distinguish physical material, biological samples, and digital data. Consistent identifiers allow descriptions from different steps to refer to the same entity.

A file may contain measurements from several samples or processes. In that situation, a reference to the entire file can be too broad. A data-fragment reference can identify the relevant part.

### Data Fragment Annotation

A data fragment is a selected part of a resource, such as a column in a table, an image region, or a time interval. Its selector must be interpreted using the applicable fragment identification specification.

![An ISA-oriented table referring to a data fragment](/documentation-principle-DFS-ISA.png)

Fragment references connect metadata to a precise scope. The selector identifies the part of the resource; the scientific annotation explains what that part represents. If the file structure changes, the reference must be checked and updated accordingly.

The appropriate selector depends on the format and the convention in use. For example, [RFC 7111](https://datatracker.ietf.org/doc/html/rfc7111) defines fragment identifiers for CSV documents. A convention for one format should not be assumed to apply to every tabular file.

### Datamap

The [Datamap extension](/abstract-model/datamap/) supports descriptions of data fragments. A data context associates a fragment with information needed to interpret it, such as the variable it represents, its unit, or its datatype.

For a measurement table, one context could identify the column containing a measured concentration and describe its values. A separate provenance description connects the measurements to acquisition and subsequent analysis.

| Description | Example |
| --- | --- |
| Annotation target | The concentration column in a measurement table |
| Scientific variable | Glucose concentration |
| Unit | Millimoles per litre |
| Provenance connection | The measurement process that produced the values and the analysis that used them |

Such descriptions can be authored in a tabular representation and expressed in publication metadata. Their relationship is established through the modeled entities and annotations; the supported mapping depends on the representations and tools in use.

The workspace keeps these descriptions available during research. Transformation to [ARC RO-Crate](/ro-crate/) prepares an explicit representation for consumers beyond that environment. See [publication and exchange](/details/exchange-and-publication) for the next steps.
