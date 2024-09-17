---
layout: ../../layouts/MarkdownLayout.astro
title: 'Developer Toolstack'
pubDate: 2024-09-16
description: 'ARC related Toolstack for developer'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["tools", "services", "community"]
---

# ARCtrl - Developer Toolkit

ARC is a community-driven initiative that mirrors the flexibility required to manage research data effectively in real-world scenarios.
To support the agility needed by developers and to enable them to concentrate on creating specialized tooling for their respective research domains, the ARC core team — supported by the NFDI DataPLANT — offers a comprehensive development library tailored for a wide range of ARC-related operations.
[ARCtrl](https://github.com/nfdi4plants/ARCtrl) is a robust software library designed to standardize and simplify the handling of ARCs. 
It is widely utilized across various ARC-related software projects and consistently aligns with the latest [ARC specification](https://github.com/nfdi4plants/ARC-specification/releases/latest), including new feature updates.
To maximize accessibility and utility for the broadest possible range of developers, ARCtrl is available in multiple programming languages, including [.NET](https://dotnet.microsoft.com/en-us/), [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), and [Python](https://www.python.org/).
This diversity in language support ensures that developers can work in the environment that best suits their skills and project requirements, enhancing their ability to develop and integrate ARC functionalities efficiently.

Depending on your programming language, ARCtrl can be found via different package managers:

| nuget | npm | PyPI |
| :--------|----------|--------:|
| <a href="https://www.nuget.org/packages/ARCtrl/"><img alt="Nuget" src="https://img.shields.io/nuget/v/ARCtrl?logo=nuget&color=%2300a896"></a> | <a href="https://www.npmjs.com/package/@nfdi4plants/arctrl"><img alt="NPM" src="https://img.shields.io/npm/v/%40nfdi4plants/arctrl?logo=npm&color=%2300a896"></a> | <a href="https://pypi.org/project/ARCtrl/"><img alt="PyPI" src="https://img.shields.io/pypi/v/arctrl?logo=pypi&color=%2300a896"></a> |

## Handling representations

The ARCtrl library supports a wide set of base operations for working with different [ARC representations](/arc-website/details/arc-representation). ARCtrl can parse ISA metadata files in XLSX format and CWL files in YAML format, resulting in a full parsing of the ARC Scaffold representation. On the other hand, the full scaffold data model can also be transformed to the RO-Crate metadata model and parsed as such. Through this, transition between the two representations is merely a few function calls away. In addition to the RO-Crate and the Scaffold representation, ARCtrl also supports parsing the experimental metadata to ISA-JSON, providing an additional entry and exit point.

## ARC manipulation

ARCtrl supports all sorts of CRUD operations on the top-level layer, including manipulation of investigations, studies, assays, persons and many more. Where it really shines is the palette of functionality for manipulating and querying annotation tables, the tabular representation of the process graph.

## Framework access

ARCtrl has some web-capabilities for accessing web-resources of the ARC framework. The process template registry can be retrieved and templates can be downloaded, filled out and included in the ARC datasets. Likewise, the validation package registry can be accessed and validation packages can be selected for validation in DataHUB CI/CD.

## Transpilation

The library guarantees to behave consistently across the different programming environments. This includes providing the same API, method naming and data models and writing the ARC representations uniformly. This compatibility is achieved by all the packages being based on the same source code.

For this, the source code is written in FSharp. From there it is being compiled to Common Intermediate Language for usage in .NET, and transpiled to Javascript and Python source code using the [Fable compiler](https://github.com/fable-compiler/Fable). As file access can be vastly diverging between different frameworks, especially for javascript, a contract layer was established. This way, every implementation of ARCtrl can decide for itself, how to handle file-system access.

![ARCtrl layers](/arc-website/ARCtrl-layers.png)

To test the functioning of all of this, especially the cross-compatibility, a comprehensive set of well over 1000 tests was established, which is also being transpiled and run in javascript and python.

## Usage

ARCtrl is currently used by the following tools:

- [ARCitect](https://github.com/nfdi4plants/ARCitect)
- [Swate](https://github.com/nfdi4plants/Swate)
- [ARCCommander](https://github.com/nfdi4plants/ARCCommander)
- [arc-export](https://github.com/nfdi4plants/arc-export)
