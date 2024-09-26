---
layout: ../../layouts/MarkdownLayout.astro
title: 'Shared Vocabulary, Shared Comprehension'
pubDate: 2024-09-10
description: 'Controlled Vocabularies play a major role at the ARC, allowing for an explicit description of an unrestricted range.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["ontology", "annotation", "isa"]
---

Shared comprehension is one of the main goals in making research FAIR. Only datasets that can be understood, can be reused, multiplying their worth. 
For this, using terminology with well-defined meanings is one key step. The ARC enables and encourages usage of such terms stemming from controlled vocabularies and ontologies. 

![Structural-and-Semantic-Ontology](/ontology-connection.png)

Flexibility is achieved by combining an ARC-specific container ontology providing structure with terms coming from other ontologies, providing information specific to the experimental setup. 

## Providing terminology guidance

Any term stemming from any controlled vocabulary is allowed to be used in the ARC. Picking the right term can sometimes be difficult because of the amount of different vocabularies that exist. 
To ease this initial superabundance of possibilites, streamline the picked terms and guide the user to use high-quality term collection, the ARC tool framework features a curated ontology collection.

## Harnessing ontological reasoning

Using terms picked from well-maintained ontologies offers other advantages than just the controlled definitions and naming of the terms themselves. Through ontological reasoning, predefined connections between terms can be automatically interpreted.

![Ontology Term Mapping](/ontology-conversion.png)

This allows providing a controlled set of terms agnostic to the specifics of the experimental context. By having these terms ontologically connected to their counterparts in experiment specific ontologies used in end-point repositories, even generic ARCs can be automatically mapped to these end-point repositories.