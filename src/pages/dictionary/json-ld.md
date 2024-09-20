---
layout: ../../layouts/MarkdownLayout.astro
title: 'json-ld'
pubDate: 2024-09-16
description: 'Based on JSON file format, but with additional rules and capabilities encouraging recycling of shared types and web resources.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["specification", "services", "community"]
keywords: ["JSON-LD", "linked-data"]
url: "json-ld"
---

# JSON-LD

JSON-LD is an extension of the widely used, machine readable JSON file format. It extends JSON with additional rules and capabilities encouraging recycling of shared types and web resources. 

The added core concepts include:

- `@id` property: Every object MUST have an `@id` property, whose value can be used to unambiguously identify the object and reference it from other places on the web.

- `@type` property: Every object should have a `@type` property, which assigns a previously defined type for the object. This gives context about which properties can be expected.

- `@context` property: Every object MAY have a `@context` property, which contextualizes all other properties of the object.

Find out more about JSON-LD on the [official website](https://json-ld.org/) or in this [explanatory video](https://www.youtube.com/watch?v=vioCbTo3C-4)
