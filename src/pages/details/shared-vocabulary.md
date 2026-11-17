---
layout: ../../layouts/MarkdownLayout.astro
title: 'Shared Vocabulary, Shared Comprehension'
pubDate: 2024-09-10
description: 'Use controlled vocabulary terms to make scientific meaning explicit in ARC metadata.'
author: 'Heinrich Lukas Weil'
tags: ["ontology", "annotation", "isa"]
---

Research descriptions need meanings that remain understandable beyond the original team. Controlled vocabularies and ontologies provide identified terms that can be referenced when describing variables, units, materials, methods, or classifications.

The principle of [Identity by Assignment](/details/identity-by-assignment/) concerns the scientific meaning attributed to research objects. The [ARC Abstract Model](/details/arc-data-model/) provides structures for expressing it, including descriptors in the [Semantic Core](/details/arc-data-model/semantic-core/). Scientific vocabularies supply domain-specific meanings within those structures. They also describe methods, parameters, and other context in the remaining cores.

A vocabulary reference needs an explicit scope. A term may describe a dataset, an individual entity, or a fragment such as a table column. A process parameter and a measured characteristic may use similar words while describing different things.

## Providing terminology guidance

Select terms by their definitions and intended use, rather than their labels alone. Record the vocabulary reference together with the value, unit, and other information needed to interpret the annotation.

When existing vocabularies do not cover an emerging concept, give it an explicit definition and retain the shared structures of the selected ARC cores. Recurring annotations can later become community vocabulary terms or [model extensions](/details/arc-data-model/). Researchers can describe new science while those conventions develop.

Annotation tools such as [Swate](/details/tools-and-services/SWATE) support vocabulary selection in established ISA-oriented workflows. Curated collections and templates can guide authors, while the appropriate scientific terminology still depends on the research being described.

For a measurement table, a [Datamap](/details/arc-data-model/datamap/) description can identify the relevant column and associate it with a variable and unit. Separate provenance information records how the measurements were obtained.

## Harnessing ontological reasoning

Ontologies can express relationships between terms, allowing compatible software to interpret declared classifications or mappings. Such relationships can assist discovery and integration when the relevant definitions and assumptions apply.

A term reference alone does not prove that two measurements are comparable or that a dataset meets another repository's requirements. Consumers must also consider annotation scope, methods, units, and the supported mappings.

Compilation to [ARC RO-Crate](/details/arc-ro-crate/) carries recorded context into publication metadata. Retaining vocabulary references, annotation scope, and shared relationships helps consumers interpret it beyond the workspace, subject to their support for the corresponding terminology. Vocabulary choices therefore matter across [both facets of ARC RDM](/details/arc-representation/).
