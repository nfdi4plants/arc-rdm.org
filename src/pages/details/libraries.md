---
layout: ../../layouts/MarkdownLayout.astro
title: 'Libraries'
pubDate: 2024-09-16
description: 'ARC related Libraries'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["tools", "services", "community"]
---



## ARCtrl 

[ARCtrl](https://github.com/nfdi4plants/ARCtrl) is a well established library providing a rich toolkit for all kinds of ARC related operations. For maximising user benefit for the biggest available range of programmers, the library is available in [.NET](https://dotnet.microsoft.com/en-us/), [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [Python](https://www.python.org/):

| nuget | npm | PyPI |
| :--------|----------|--------:|
| <a href="https://www.nuget.org/packages/ARCtrl/"><img alt="Nuget" src="https://img.shields.io/nuget/v/ARCtrl?logo=nuget&color=%234fb3d9"></a> | <a href="https://www.npmjs.com/package/@nfdi4plants/arctrl"><img alt="NPM" src="https://img.shields.io/npm/v/%40nfdi4plants/arctrl?logo=npm&color=%234fb3d9"></a> | <a href="https://pypi.org/project/ARCtrl/"><img alt="PyPI" src="https://img.shields.io/pypi/v/arctrl?logo=pypi&color=%234fb3d9"></a> |


### Reading and Writing

The library supports a wide set of base operations. 

- read-write to ARC Scaffold representation
    - Parsing of ISA-XLSX metadata
    - Parsing of CWL YAML and JSON metadata
- read-write to ARC RO-Crate representation
- read-write of experimental metadata to ISA

- top-level API for additions of Datasets
- fine grained API for annotation table manipulation, allowing for easy description of process graphs
- Template API

- well over a thousand tests (shared minimum of 1248 between programming languages)