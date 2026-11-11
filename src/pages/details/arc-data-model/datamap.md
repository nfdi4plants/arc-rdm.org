---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Datamap'
tags: ["annotation", "metadata"]
description: "Learn how the Datamap extension connects annotations with specific data fragments, such as columns in a measurements table."
---

The Datamap extension supports annotation of data fragments within the [ARC Abstract Model](/details/arc-data-model/). It addresses situations where describing a file as a whole is too broad to express the meaning of its contents.

## Giving annotations a precise target

A file may contain several variables or kinds of information. An annotation needs to make clear which part it describes, so that a reader or application can connect the context with the intended data.

Datamap supports this more specific scope. It contributes to [semantic context](/details/arc-data-model/semantic-core/) by connecting scientific descriptions with selected parts of a resource, while keeping them related to the wider dataset.

## A shared example

Consider a table of experimental measurements. Different columns may contain different variables and use different units. Associating each description with its relevant column prevents a unit or variable name from appearing to apply to the whole table.

The same dataset may also contain a derived analysis result. [Provenance metadata](/details/arc-data-model/provenance-core/) connects that result to the analysis and its input measurements; [administrative metadata](/details/arc-data-model/administrative-core/) describes identity, contributors, and reuse conditions. Fragment annotations add precision to this connected context.

## From annotation to publication

ISA-XLSX includes support for file-fragment annotation within its extended tabular descriptions. The [ISA-based workspace profile](/details/arc-workspace/isa-arc/) connects these metadata with research resources during active work.

When preparing [ARC RO-Crate](/details/arc-ro-crate/), preserving the target of an annotation matters alongside preserving its text, value, or vocabulary reference. Keeping the file alone does not explain which portion a description concerns. This overview introduces that purpose without prescribing a fragment syntax or conformance rules.
