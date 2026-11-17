---
layout: ../../layouts/DictionaryPageLayout.astro
title: 'Ontologies'
pubDate: 2024-09-16
description: 'A structured vocabulary of concepts and relationships used to make scientific annotations explicit.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["specification", "services", "community"]
keywords: ["Ontology", "Controlled Vocabulary", "Ontology Term"]
url: "ontology"
---


## Controlled Vocabulary vs Ontology

A controlled vocabulary supplies agreed terms for annotation. An ontology also describes relationships between concepts, helping people and software interpret how those terms relate. Identifiers let annotations refer to a concept without relying only on its written label.

ARC annotations can use ontology terms for scientific properties, values and units. Such terms support [Identity by Assignment](/details/identity-by-assignment/) by making assigned meaning explicit; they can also describe conditions and parameters recorded in provenance. Comparing annotations can still require domain knowledge, mappings or community agreements. See [shared vocabulary](/details/shared-vocabulary/).

## Representation

The [ARC Abstract Model](/details/arc-data-model/) provides common annotation structures. Domain vocabularies identify the scientific meanings recorded within them; [ARC RO-Crate profiles](/details/arc-ro-crate/) specify their representation using linked-data technologies.

An ontology term does not by itself establish which object an annotation describes or whether a process parameter characterizes its output. The surrounding relationships and scientific context determine that scope.
