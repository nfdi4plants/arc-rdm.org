---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Datamap'
tags: ["annotation", "metadata"]
description: "Learn how the Datamap extension connects annotations with specific data fragments, such as columns in a measurements table."
---

The Datamap extension specializes the Semantic Core for describing files and selected fragments of their contents. It addresses situations where a description of the whole file is too broad to explain a particular measurement column or other part.

## Giving annotations a precise target

A file may contain several variables or kinds of information. An annotation needs to make clear which part it describes, so that a reader or application can connect the context with the intended data.

A Datamap entry identifies a file or uses a **selector** to address a fragment within it. A descriptor associates that target with scientific annotations, such as an explanation, unit, object type, or label. This specializes the [Semantic Core's](/details/arc-data-model/semantic-core/) separation of a description from the object it describes.

## A shared example

Consider a table of experimental measurements. Different columns may contain different variables and use different units. Associating each description with its relevant column prevents a unit or variable name from appearing to apply to the whole table.

The same dataset may also contain a derived analysis result. [Provenance metadata](/details/arc-data-model/provenance-core/) connects that result to the analysis and its input measurements; [administrative metadata](/details/arc-data-model/administrative-core/) describes identity, contributors, and reuse conditions. Fragment annotations add precision to this connected context.

## From annotation to publication

**Datamap-XLSX** is the spreadsheet representation of these descriptions. Its current [Datamap file and table specification](/workspace/isa-arc/isa-xlsx/#datamap-file) is documented within ISA-XLSX. The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) keeps these metadata associated with the research resources they describe.

The [Datamap RO-Crate profile](/ro-crate/datamap/) represents entries using Semantic Core descriptors and their targets. Compilation needs to preserve the target alongside each annotation's value, unit, or vocabulary reference. The linked specifications define the supported selector syntax and encoding; retaining the file alone does not preserve the meaning of its fragments.
