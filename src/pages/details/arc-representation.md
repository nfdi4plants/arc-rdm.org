---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC representation'
pubDate: 2024-09-15
description: 'A short description of the ARC representation.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["RO-Crate", "FAIR digital object","JSON-LD", XLSX, CWL]
---

The ARC data model describes the core entities and the connections between them, that make up an ARC. These entities can manifest themselves in different formats and shapes resulting in distinct representations. This is encouraged, as different representations come with their own advantages, easing access and usability for different user-groups and tastes. Currently, two representation of an ARC have been specified. 

The main representation is the [ARC RO-Crate profile](https://www.researchobject.org/ro-crate/profiles#arc-ro-crate-profile), which is an extension of RO-Crate. An ARC RO-Crate therefore follows the structural rules set by RO-Crate, with the metadata file formatted as JSON-LD, being packed with the data files in a ZIP archive. This representation is meant for use by the RDM experts and developers, stemming from the ease of implementing against JSON-LD files. It is also the main exchange format with other RDM platforms.

On the other hand, there exists a file system representation of the ARC, which is specified in https://github.com/nfdi4plants/ARC-specification. Here, the datasets are represented as folders, grouped by their category. The datasets containing workflow and run descriptions are accompanied by metadata files in YAML format, following the CWL specification. The datasets containing information about experimental setups and processes are accompanied by metadata files in tabular XLSX format, following the ISA-XLSX specification. This representation is meant for use by experimenters and data-stewards, as the representation as a folder structure and the metadata being formatted as XLSX tables closely resembles many traditional workflows for scientific documentation.

![ARC RO Crate](/arc-website/ro-crate-vs-filesystem.png)

As all representations follow the same underlying data model, switching between them is merely a conversion and requires no mapping. Because of this, even between users or parties fostering different representations, a frictionless exchange is possible and encouraged.