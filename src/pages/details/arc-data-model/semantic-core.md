---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Semantic Core'
tags: ["ontology", "annotation", "metadata"]
description: "Learn how the semantic core explains scientific meaning through descriptions, values, units, classifications, and vocabulary references."
---

The Semantic Core associates scientific annotations with explicit targets through descriptors. It gives [Identity by Assignment](/details/identity-by-assignment/) a shared structure for expressing meaning, characteristics, and interpretations of research entities and data.

It can be selected independently within the [ARC Abstract Model](/details/arc-data-model/), allowing scientific descriptions to develop even when administrative or provenance information is incomplete. The structure is independent of metadata serialization and guides both working descriptions and their publication representation.

## Making meaning explicit

A **descriptor** bundles annotations and explicitly identifies the sample or data object it describes. Keeping that description separate from its target allows further interpretations to be added without changing the underlying data. Direct properties of an object, such as a file's format, can remain on the object itself.

Annotations can include values, units, classifications, and vocabulary references. The shared structure gives them a recognizable place; the terminology supplies their meaning within a research domain.

Vocabulary references help distinguish concepts that might otherwise be expressed through ambiguous local labels. They work alongside the descriptive detail needed for interpretation. Using a term does not remove the need to understand its definition and the conventions of the research.

## A shared example

Consider a table of protein abundance measurements. A descriptor can identify a column's protein, measured quantity, and unit or scale. Another can assign those measurements a role as a normalization reference; a later analysis might describe them as a machine-learning feature.

These descriptions express different interpretations of the same values. The [provenance core](/details/arc-data-model/provenance-core/) can separately connect a derived result to the analysis that produced it.

## The scope of an annotation

Annotations can have different scopes. A descriptor's explicit target makes clear which entity or file fragment its assertions concern: a description of one column should not be mistaken for a description of every value in the table. An application can present the assigned attributes with that target while retaining the descriptor that records their meaning and context.

The [Datamap extension](/details/arc-data-model/datamap/) specializes this capability for file-content descriptions and fragment selectors.

## Connected context

The [administrative core](/details/arc-data-model/administrative-core/) supplies identity, attribution, and reuse conditions. Provenance describes processes and their inputs or outputs. Following these relationships discovers context; deciding that a process parameter also characterizes an output requires scientific interpretation. Recording that inference is a further step, not an automatic consequence of the connection.

## Across workspace and publication

These descriptions can be collected and refined in an [ARC Workspace](/details/arc-workspace/) using formats suited to its research community. [ISA ARC](/details/isa-arc/) provides Datamap spreadsheets for describing files and fragments as part of its domain implementation.

The [Semantic Core Profile](/details/arc-ro-crate/#semantic-core) realizes the shared structure in ARC RO-Crate; the [profile specification](/ro-crate/semantic-core/) defines its encoding and conformance requirements. Compilation preserves the connection between annotations and their targets. Generic software can discover that context, while scientific interpretation still depends on the recorded detail and the consumer's understanding of its terminology.
