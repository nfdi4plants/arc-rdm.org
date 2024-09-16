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

The ARC is a flexible and comprehensive research data management (RDM) framework. It not only facilitates FAIR (Findable, Accessible, Interoperable, Reusable) documentation, storage, and collaboration but also empowers researchers to create their own Fair Digital Objects (FDOs) using a broad set of tools and services, all without being locked into a specific platform or toolset. 

The ARC data model encompasses the necessary entities to document the full research cycle effectively. However, this model can be expressed in various formats, each offering distinct advantages. These different representations enhance accessibility and usability for a variety of users and workflows. Currently, two ARC representations have been specified, and while the unified **ARC scaffold** is highly encouraged to maintain consistency across user perspectives, domain-specific adaptations are also possible to suit particular needs.

### Two Sides of the Same Coin

The two main ARC representations are the **ARC RO-Crate** and the **ARC Scaffold**. Both adhere to the same underlying data model, making conversion between them straightforward and requiring no complex mapping. This seamless transition ensures frictionless collaboration, even between users who prefer different representations. Think of the ARC RO-Crate as a more machine-friendly, compiled version of the ARC Scaffold, which is geared toward human input and interaction.

![ARC RO Crate](/arc-website/ro-crate-vs-filesystem.png)

### ARC RO-Crate

The **ARC RO-Crate** is an extension of the RO-Crate framework. It follows the structural rules of RO-Crate, where metadata is stored in a **JSON-LD** file, bundled with the associated data files in a ZIP archive. This representation is particularly suited for RDM experts and developers, as the **JSON-LD** format simplifies integration with other systems. Additionally, it serves as the main format for exchanging data with other RDM platforms, making it a crucial part of ARC’s interoperability.

### ARC Scaffold

The **ARC Scaffold** offers a file system-based representation of the ARC. Datasets are organized into folders, categorized by their type, and include accompanying metadata files. Experimental data and process descriptions are accompanied by metadata in tabular **XLSX** format, following the ISA-XLSX standard. Datasets containing workflows and run descriptions are paired with metadata in **YAML** format, adhering to the Common Workflow Language (CWL) specification. 
This representation is designed for use by researchers, experimenters, and data stewards, as its folder-based structure and familiar **XLSX** metadata format align closely with traditional scientific documentation workflows. The ARC Scaffold is ideal for those involved in hands-on data management, offering an intuitive, human-readable approach to RDM while maintaining compliance with FAIR principles.

### Flexibility for Different Use Cases

ARC's versatility ensures that both experts and non-experts can benefit from a tailored approach to data management. Whether working with the highly structured, machine-friendly ARC RO-Crate or the more user-centered ARC Scaffold, the core data model remains consistent. This alignment enables seamless collaboration and data exchange across platforms, user preferences, and research domains.