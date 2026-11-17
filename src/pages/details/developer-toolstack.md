---
layout: ../../layouts/MarkdownLayout.astro
title: 'Developer Toolstack'
pubDate: 2024-09-16
description: 'ARCtrl libraries for ISA ARC workspace metadata and transformations into exchange representations.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["tools", "services", "community"]
---

This guide focuses on the developer tools of [ISA ARC](/details/isa-arc/), a reference domain implementation of ARC RDM. The [system overview](/details/arc-representation/) explains the shared architecture: annotation principles guide the abstract-model cores, while ARC RO-Crate profiles specify their expression in the Publication Space.

## ARCtrl - Developer Toolkit

![ARCtrl](https://raw.githubusercontent.com/nfdi4plants/ARCtrl/refs/heads/main/logos/ARCtrl_horizontal.png)

[ARCtrl](https://github.com/nfdi4plants/ARCtrl) provides programmatic access to [ISA ARC Workspace](/details/arc-workspace/isa-arc/) structures and metadata, including transformations into ARC RO-Crate. It is available for .NET, JavaScript and Python.

Supported formats, APIs and profile versions depend on the release. Use the [ARCtrl documentation](https://nfdi4plants.github.io/nfdi4plants.knowledgebase/arctrl/) alongside the relevant [workspace specifications](/workspace/isa-arc/) and [RO-Crate profiles](/ro-crate/).

Depending on your programming language, ARCtrl can be found via different package managers:

| NuGet | npm | PyPI |
| :--------|----------|--------:|
| <a href="https://www.nuget.org/packages/ARCtrl/"><img alt="Nuget" src="https://img.shields.io/nuget/v/ARCtrl?logo=nuget&color=%2300a896"></a> | <a href="https://www.npmjs.com/package/@nfdi4plants/arctrl"><img alt="NPM" src="https://img.shields.io/npm/v/%40nfdi4plants/arctrl?logo=npm&color=%2300a896"></a> | <a href="https://pypi.org/project/ARCtrl/"><img alt="PyPI" src="https://img.shields.io/pypi/v/arctrl?logo=pypi&color=%2300a896"></a> |

### Handling representations

ISA ARC records investigation, study and assay metadata in [ISA-XLSX](/workspace/isa-arc/isa-xlsx/) and workflow/run metadata in [WR-XLSX](/workspace/isa-arc/wr-xlsx/), alongside computational descriptions in CWL. Datamap spreadsheets describe files and their fragments; their current workbook conventions are documented within [ISA-XLSX](/workspace/isa-arc/isa-xlsx/#datamap-file).

ARCtrl reads and writes these workspace structures and supports exchange operations such as ISA-JSON and ARC RO-Crate serialization. Check the release documentation for the implemented mappings.

The [ARC Abstract Model](/details/arc-data-model/) defines shared entities and relationships independently of metadata serialization. Compilation maps information recorded in an [ISA ARC Workspace](/details/arc-workspace/isa-arc/) to the selected [ARC RO-Crate Core and Extension Profiles](/details/arc-ro-crate/). Its coverage depends on the implemented mapping and the available context; support for an existing format should not be taken as support for every profile or extension.

For reproducible exports, record the [source state, transformation, and profile versions](/details/versioning/#publication-versions).

### ARC manipulation

ARCtrl models investigations, studies, assays, workflows, runs and their associated metadata. Its APIs create, read, update and remove these structures and manipulate annotation tables. Experimental annotation-table rows describe processes; workflow/run metadata distinguishes reusable computational descriptions from their executions. Datamap entries describe data-file contents and identifiable fragments.

### Framework access

Applications can combine ARCtrl with community annotation templates and [validation packages](/details/tools-and-services/avpr/). These serve different purposes: templates guide metadata entry, while selected packages test requirements for a community or target. See the [validation overview](/details/validation/) and the documentation of each service for its integration API.

### Transpilation

The packages share F# source code, compiled for .NET and transpiled to JavaScript and Python with [Fable](https://github.com/fable-compiler/Fable). A contract layer separates ARC operations from filesystem access so applications can provide the access methods appropriate to their runtime. Consult the package documentation for runtime requirements and supported APIs.

![ARCtrl layers](/ARCtrl-layers.png)

### Usage

Tools built with ARCtrl include:

- [ARCitISA](/details/tools-and-services/ARCitISA/), the current graphical ISA ARC application
- [ARCitect](/details/tools-and-services/ARCitect/) and [Swate](/details/tools-and-services/SWATE/), documented under their earlier application names
- [ARCCommander](/details/tools-and-services/ARCCommander/), a command-line interface
- [arc-export](/details/tools-and-services/arc-export/), a metadata export tool

The [published Workflow Run integration](https://doi.org/10.1515/jib-2025-0050) demonstrates how experimental processes and computational workflow/run descriptions can share a provenance graph while retaining their specialized representations. Exporting such metadata and submitting it to a publication service are separate operations; see [exchange and publication](/details/exchange-and-publication/).
