---
layout: ../../layouts/DictionaryPageLayout.astro
title: 'ISA'
pubDate: 2024-09-16
description: 'Investigation–Study–Assay: a model for organizing investigations, studies, assays, and associated research descriptions.'
author: 'Heinrich Lukas Weil'
tags: ["specification", "metadata", "community"]
keywords: ["ISA"]
url: 'isa'
---

**ISA** stands for **Investigation, Study, and Assay**. It organizes descriptions of research activities and their associated resources.

- An **investigation** provides a shared context for related research.
- A **study** describes subjects or samples and their preparation.
- An **assay** describes measurements or analyses and their outputs.

ISA descriptions can record processes, their inputs and outputs, and associated metadata. Controlled vocabulary terms can make the intended scientific meaning more explicit.

The [ISA extension](/details/arc-data-model/isa/) relates ISA concepts to the ARC Abstract Model. [ISA ARC](/details/isa-arc/) uses ISA as a foundation for a Domain ARC spanning workspace conventions, tools, validation and publication profiles. Its [ISA ARC Workspace](/details/arc-workspace/isa-arc/) brings investigation, study, and assay metadata together with computational workflow and run information and associated research resources.

For the ISA model specification, see [ISA-Model](https://isa-specs.readthedocs.io/en/latest/isamodel.html).

## Representations

- [ISA-Tab](https://isa-specs.readthedocs.io/en/latest/isatab.html) by ISA-tools.
- [ISA-JSON](https://isa-specs.readthedocs.io/en/latest/isajson.html) by ISA-tools.
- [ISA-XLSX](/workspace/isa-arc/isa-xlsx/) by NFDI4Plants, the spreadsheet representation used for investigation, study, assay and experimental-process metadata in ISA ARC.

ISA ARC uses [WR-XLSX](/workspace/isa-arc/wr-xlsx/) for workflow and run metadata. Datamap spreadsheets annotate files and identifiable fragments of their contents; their current workbook conventions are documented within [ISA-XLSX](/workspace/isa-arc/isa-xlsx/#datamap-file). These metadata have distinct roles within the same workspace.
