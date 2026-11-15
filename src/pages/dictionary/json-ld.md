---
layout: ../../layouts/DictionaryPageLayout.astro
title: 'JSON-LD'
pubDate: 2024-09-16
description: 'A JSON-based format for linked data, using identifiers, types and contexts to describe connected resources.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["specification", "services", "community"]
keywords: ["JSON-LD", "linked-data"]
url: "json-ld"
---

JSON-LD is a JSON-based format for linked data. It connects descriptions through identifiers and shared vocabularies. [ARC RO-Crate](/details/arc-ro-crate/) uses JSON-LD to represent research objects and their relationships.

The added core concepts include:

- `@id` identifies or references a node. JSON-LD also permits nodes without explicit identifiers, called blank nodes.

- `@type` assigns one or more types to a node, allowing a description to express both a general role and a specialized type.

- `@context` maps terms to identifiers and specifies how values are interpreted. A context can apply to nested descriptions without being repeated on every object.

RO-Crate and its profiles can impose identification or typing requirements beyond the general JSON-LD syntax. Multiple types alone do not demonstrate profile conformance.

See the [JSON-LD recommendation](https://www.w3.org/TR/json-ld11/), including its explanation of [blank nodes](https://www.w3.org/TR/json-ld11/#identifying-blank-nodes), or this [explanatory video](https://www.youtube.com/watch?v=vioCbTo3C-4).
