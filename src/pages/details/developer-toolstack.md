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



## ARCtrl 

[ARCtrl](https://github.com/nfdi4plants/ARCtrl) is a well established library, providing a rich toolkit for all kinds of ARC related operations. For maximising user benefit for the biggest available range of programmers, the library is available in [.NET](https://dotnet.microsoft.com/en-us/), [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [Python](https://www.python.org/).


Depending on your programming language, ARCtrl can be found on different package hosters:

| nuget | npm | PyPI |
| :--------|----------|--------:|
| <a href="https://www.nuget.org/packages/ARCtrl/"><img alt="Nuget" src="https://img.shields.io/nuget/v/ARCtrl?logo=nuget&color=%2300a896"></a> | <a href="https://www.npmjs.com/package/@nfdi4plants/arctrl"><img alt="NPM" src="https://img.shields.io/npm/v/%40nfdi4plants/arctrl?logo=npm&color=%2300a896"></a> | <a href="https://pypi.org/project/ARCtrl/"><img alt="PyPI" src="https://img.shields.io/pypi/v/arctrl?logo=pypi&color=%2300a896"></a> |

#### Handling representations

The library supports a wide set of base operations for working with different representations. To this effect, ARCtrl can parse ISA metadata files in XLSX format and CWL files in YAML format, resulting in a full parsing of the ARC scaffold representation. On the other hand, the full scaffold data model can also be transformed to the RO-Crate metadata model and parsed as such. Through this, transition between the two representations is merely a few function calls away. In addition to the RO-Crate and the Scaffold representation, ARCtrl also supports parsing the experimental metadata to ISA-JSON, providing an additional entry and exit point.

#### ARC manipulation

ARCtrl supports all sorts of CRUD operations on the top-level layer, including manipulation of investigations, studies, assays, persons and many more. Where it really shines is the palette of functionality for manipulating and querying annotation tables, the tabular representation of the process graph.

#### Framework access

ARCtrl also has some web-capabilities for accessing web-resources of the ARC framework. The Process template registry can be retreived and templates can be downloaded, filled out and included in the ARC datasets. Likewise, the validation package registry can be accessed and validation packages can be selected for validation in DataHUB CI/CD.

#### Transpilation

The library guarantees to behave consistently across the different programming environments. This includes providing the same API, method naming and datamodels on the one hand and writing the ARC representations uniformly. This compatability is achieved by all the packages being based on the same source code. 

For this, the source code is written in FSharp. From there it is being compiled to Common Intermediate Language for usage in .NET, and transpiled to Javascript and Python source code using the [Fable compiler](https://github.com/fable-compiler/Fable). As file access can be vastly diverging between different frameworks, especially for javascript, a contract layer was established. This way, every implementation of ARCtrl can decide for itself, how to handle file-system access.

![ARCtrl layers](/arc-website/ARCtrl-layers.png)

To test the functioning of all of this, especially the cross-compatability, a comprehensive set of well over 1000 tests was established which is also being transpiled and run in javascript and python. 

#### Usage

ARCtrl is currently used in the following tools:

- [ARCitect](https://github.com/nfdi4plants/ARCitect)
- [Swate](https://github.com/nfdi4plants/Swate)
- [ARCCommander](https://github.com/nfdi4plants/ARCCommander)
- [arc-export](https://github.com/nfdi4plants/arc-export)