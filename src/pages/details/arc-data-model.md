---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Abstract Model'
pubDate: 2024-09-13
description: 'Administrative, provenance, and semantic context in the ARC Abstract Model.'
author: 'Timo Mühlhaus'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD"]
---

The [ARC Abstract Model](/abstract-model/) organizes research information around a dataset and the context needed to identify, interpret, and trace its contents. It defines concepts and relationships independently of the files or software used to record them.

## Three complementary perspectives

The model has three base profiles. They describe different aspects of the same research information and can refer to shared entities.

| Perspective | Question | Typical information |
| --- | --- | --- |
| [Administrative core](/abstract-model/administrative-core/) | What is this dataset, who is responsible, and how may it be used? | Identifiers, titles, contributors, affiliations, rights, and versions |
| [Provenance core](/abstract-model/provenance-core/) | How were these resources generated, used, or transformed? | Experimental and computational processes, their inputs and outputs, methods, and parameters |
| [Semantic core](/abstract-model/semantic-core/) | What do these data mean? | Measured variables, units, classifications, vocabulary terms, and the scope of annotations |

Consider a table of experimental measurements and a derived analysis result. Administrative metadata identify the dataset, its contributors, and its reuse conditions. Semantic metadata describe the measured variables and units, including which table columns they describe. Provenance metadata connect the measurements to acquisition and the result to the analysis that used them.

These descriptions complement one another. A processing temperature describes a process condition; it does not automatically become a measured characteristic of the resulting data. The meaning and scope of each annotation must remain explicit.

## Base profiles and extensions

Extension profiles add specialized descriptions to the common model:

- [ISA](/abstract-model/isa/) represents investigations, studies, and assays.
- [Workflow Run](/abstract-model/wr/) describes computational workflow execution and its relationship to the procedure being executed.
- [Datamap](/abstract-model/datamap/) associates descriptions with data fragments, such as selected columns in a table.

These extensions connect specialized research descriptions to administrative, provenance, and semantic context. They do not require every workspace to use the same directory layout or authoring format.

## From concepts to representations

The abstract model defines its own types and properties. It is conceptually aligned with RO-Crate, while remaining distinct from the [ARC RO-Crate](/ro-crate/) publication representation.

ARC RO-Crate profiles map these concepts into concrete metadata relationships using schema.org and Bioschemas terms. JSON-LD expresses those relationships in the publication metadata. ISA-XLSX provides a tabular representation of ISA-oriented descriptions and their extensions for use during annotation.

The [ARC Workspace](/workspace/) is where research data and metadata are created and maintained. A workspace profile supplies practical conventions for that environment. Transformation relates the information recorded there to the publication representation; its usefulness depends on the available context and the mapping used.

Continue with [workspace and publication representations](/details/arc-representation), or explore the [three core profiles](/abstract-model/).

