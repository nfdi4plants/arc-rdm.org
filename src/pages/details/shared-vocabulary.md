---
layout: ../../layouts/MarkdownLayout.astro
title: 'Shared Vocabulary, Shared Comprehension'
pubDate: 2024-09-10
description: 'Use controlled vocabulary terms to make scientific meaning explicit in ARC metadata.'
author: 'Heinrich Lukas Weil'
tags: ["ontology", "annotation", "isa"]
---

Research descriptions need meanings that remain understandable beyond the original team. Controlled vocabularies and ontologies provide identified terms that can be referenced when describing variables, units, materials, methods, or classifications.

The [ARC Abstract Model](/details/arc-data-model/) provides concepts and relationships for organizing research context. Scientific vocabularies supply domain-specific meaning within those descriptions. The [semantic core](/details/arc-data-model/semantic-core/) addresses how that meaning relates to research entities and data.

A vocabulary reference needs an explicit scope. A term may describe a dataset, an individual entity, or a fragment such as a table column. A process parameter and a measured characteristic may use similar words while describing different things.

## Providing terminology guidance

Select terms by their definitions and intended use, rather than their labels alone. Record the vocabulary reference together with the value, unit, and other information needed to interpret the annotation.

Annotation tools such as [Swate](/details/tools-and-services/SWATE) support vocabulary selection in established ISA-oriented workflows. Curated collections and templates can guide authors, while the appropriate scientific terminology still depends on the research being described.

For a measurement table, a [Datamap](/details/arc-data-model/datamap/) description can identify the relevant column and associate it with a variable and unit. Separate provenance information records how the measurements were obtained.

## Harnessing ontological reasoning

Ontologies can express relationships between terms, allowing compatible software to interpret declared classifications or mappings. Such relationships can assist discovery and integration when the relevant definitions and assumptions apply.

A term reference alone does not prove that two measurements are comparable or that a dataset meets another repository's requirements. Consumers must also consider annotation scope, methods, units, and the supported mappings.

Transformation to [ARC RO-Crate](/details/arc-ro-crate/) expresses recorded context in publication metadata. Retaining vocabulary references and clear relationships helps consumers interpret it beyond the workspace, subject to their support for the corresponding terminology.
