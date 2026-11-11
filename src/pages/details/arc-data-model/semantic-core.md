---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Semantic metadata'
tags: ["ontology", "annotation", "metadata"]
description: "Learn how the semantic core explains scientific meaning through descriptions, values, units, classifications, and vocabulary references."
---

The semantic core describes the scientific meaning of research entities and data. It helps a reader understand what a measurement represents, how a value should be interpreted, and which scientific concepts apply.

It is one of the three complementary annotation perspectives in the [ARC Abstract Model](/details/arc-data-model/).

## Making meaning explicit

Semantic descriptions can include values, units, classifications, and references to controlled vocabularies or ontologies. A shared structure gives these annotations a recognizable place; the terminology supplies their meaning within a research domain.

Vocabulary references help distinguish concepts that might otherwise be expressed through ambiguous local labels. They work alongside the descriptive detail needed for interpretation. Using a term does not remove the need to understand its definition and the conventions of the research.

## A shared example

Consider a dataset containing a table of experimental measurements and a derived analysis result. Semantic metadata describes the measured variables and their units, and associates those descriptions with the relevant columns of the table.

This makes it possible to distinguish what each column represents and how its values should be read. A description of the derived result can explain its scientific interpretation, while the [provenance core](/details/arc-data-model/provenance-core/) connects it to the analysis that produced it.

## The scope of an annotation

An annotation may describe a whole dataset, a particular research entity, or a fragment within a file. Identifying that scope is part of making the meaning clear: a description of one column should not be mistaken for a description of every value in the table.

The [Datamap extension](/details/arc-data-model/datamap/) addresses this need for data-fragment annotation. It connects more precise annotation targets with the wider research context.

## Connected context

The [administrative core](/details/arc-data-model/administrative-core/) supplies identity, attribution, and reuse conditions. Provenance describes processes and inputs or outputs. Semantic metadata explains meaning, while preserving the distinction between a process parameter and a characteristic of the resource being studied.

These descriptions can be collected and refined in an [ARC Workspace](/details/arc-workspace/) and represented through [ARC RO-Crate](/details/arc-ro-crate/). Their usefulness depends on the quality and specificity of the recorded context, as well as a consumer's understanding of the scientific terminology.
