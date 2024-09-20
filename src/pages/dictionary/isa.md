---
layout: ../../layouts/DictionaryPageLayout.astro
title: 'ISA'
pubDate: 2024-09-16
description: 'A specification for annotation of biological experiments. A research cycle is called investigation and the subdivisions are called studies and assays.'
author: 'Heinrich Lukas Weil'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["specification", "metadata", "community"]
keywords: ["ISA"]
url: 'isa'
---

ISA is a specification for annotation of biological experiments. It's name is based on its structural subdivision of the experiment:

- **I**nvestigation: The whole research cycle. Contains studies.
- **S**tudy: Middle layer, descriptions of origin and preparation of samples. Contains assays.
- **A**ssay: Description of the measurement of samples and simple computational steps.

At the core of ISA is the process graph, which describes the steps conducted in the experiment, relating different entities with each other, resulting in a full provenance graph. For this it encourages the user to describe the experiment with ontology terms, fostering a shared vocabulary and semantic comprehensibility.

Besides the description of experimental setups, ISA also contains information about People being involved in the Experiment and Publications related to the investigation.

For the full ISA model specification, see [ISA-Model](https://isa-specs.readthedocs.io/en/latest/isamodel.html)

## Representations

- [ISA-Tab](https://isa-specs.readthedocs.io/en/latest/isatab.html) by ISA-tools
- [ISA-JSON](https://isa-specs.readthedocs.io/en/latest/isajson.html) by ISA-tools
- [ISA-XLSX](https://github.com/nfdi4plants/ARC-specification/blob/release/ISA-XLSX.md) by nfdi4plants