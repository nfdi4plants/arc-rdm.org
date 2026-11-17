---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Datamap'
tags: ["annotation", "metadata"]
description: "Learn how the Datamap extension connects annotations with specific data fragments, such as columns in a measurements table."
---

The Datamap extension specializes the [Semantic Core](/details/arc-data-model/semantic-core/) for describing files and selected fragments of their contents. It applies [Identity by Assignment](/details/identity-by-assignment/) where a description of the whole file is too broad to explain a particular measurement column or other part.

## Giving annotations a precise target

A file may contain several variables or kinds of information. An annotation needs to make clear which part it describes, so that a reader or application can connect the context with the intended data.

A Datamap entry identifies a file or uses a **selector** to address a fragment within it. A descriptor associates that target with scientific annotations, such as an explanation, unit, object type, or label. This preserves the Semantic Core's separation of a description from the object it describes. Several descriptions can refer to the same data while expressing different interpretations.

The selector identifies the part of the resource; the annotations explain its meaning. A selector must be interpreted according to the applicable format and fragment convention. Changes to a file's structure may require its fragment references to be updated.

## A shared example

Consider a table of protein abundance measurements. Columns may represent different measured proteins or use different scales. Associating each description with its relevant column prevents a protein identity, quantity, or unit from appearing to apply to the whole table.

A further descriptor can assign measurements a role as a normalization reference or a machine-learning feature. Those interpretations leave the original values unchanged and retain the scope of each annotation.

The same dataset may also contain a derived analysis result. [Provenance metadata](/details/arc-data-model/provenance-core/) connects that result to the analysis and its input measurements; [administrative metadata](/details/arc-data-model/administrative-core/) describes identity, contributors, and reuse conditions. Fragment annotations add precision to this connected context.

## From annotation to publication

The shared descriptor-and-target structure is independent of serialization. [ISA ARC](/details/isa-arc/) uses **Datamap-XLSX** as a spreadsheet representation of these descriptions. Its current [Datamap file and table specification](/workspace/isa-arc/isa-xlsx/#datamap-file) is documented within ISA-XLSX. The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) keeps these metadata associated with the research resources they describe.

The [Datamap RO-Crate profile](/ro-crate/datamap/) realizes the extension in publication metadata using Semantic Core descriptors and their targets. [Compilation](/details/arc-representation/) needs to preserve the target alongside each annotation's value, unit, or vocabulary reference. The linked specifications define the supported selector syntax and encoding; retaining the file alone does not preserve the meaning of its fragments.

This gives consumers a consistent route from a data fragment to its assigned meaning. Interpreting a specialized term or comparing measurements from different domains can still require scientific knowledge and vocabulary mappings.
