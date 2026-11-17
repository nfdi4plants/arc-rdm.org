---
layout: ../../layouts/MarkdownLayout.astro
title: 'Organizing a workspace'
pubDate: 2024-09-13
description: 'Workspace conventions and an ISA-based example of organizing research data and metadata.'
author: 'Timo Mühlhaus'
tags: ["community", "organization", "project management"]
---

<span id="organization-principle"></span>

### Choosing working conventions

An [ARC Workspace](/details/arc-workspace/) organizes research resources together with metadata for the selected annotation perspectives and intended use. Its organization should help collaborators find resources, maintain their descriptions, and understand how they belong together.

Optional Workspace Profiles provide reusable conventions for these tasks. A profile can describe how an authoring format is used and how data are associated with metadata. The [ARC Abstract Model](/details/arc-data-model/) supplies shared concepts without requiring every community to adopt one directory structure.

The following example shows the workspace facet of [ISA ARC](/details/isa-arc/), a reference domain implementation of ARC RDM. Its [ISA ARC Workspace](/details/arc-workspace/isa-arc/) connects research resources with metadata for investigations, studies, assays, computational workflows, and runs. Other workspace organizations can serve different research practices.

<span id="arc-directory-structure"></span>

### ISA ARC directory structure

In the ISA-based example, an investigation brings related studies, assays, workflows, and runs together. Metadata files describe the investigation and its resources, while directories contain the associated data and supporting material.

The following example follows the [current ISA ARC Workspace specification](/workspace/isa-arc/). Optional workbooks are shown to make their locations explicit.

```text
isa.investigation.xlsx
studies/
  sample-preparation/
    isa.study.xlsx
    isa.datamap.xlsx        (optional)
    resources/
assays/
  measurements/
    isa.assay.xlsx
    isa.datamap.xlsx        (optional)
    dataset/
workflows/
  analysis/
    workflow.cwl
    isa.workflow.xlsx      (optional)
    isa.datamap.xlsx        (optional)
runs/
  analysis-run/
    run.cwl
    isa.run.xlsx           (optional)
    isa.datamap.xlsx        (optional)
```

These folders organize research activities and resources. Administrative, provenance, and semantic metadata are complementary descriptions of those resources; they do not have to occupy three separate directories.

#### Study

The **studies** directory holds individual study folders. A study can include:

- A **study metadata file** describing the study and its sample preparation processes.
- A **resources** folder for associated or reused material.
- A **protocols** folder containing methods referenced from the metadata.

#### Assay

The **assays** directory holds individual assay folders. An assay can include:

- An **assay metadata file** describing measurements or analyses.
- A **dataset** folder containing their data files.
- A **protocols** folder for the relevant methods.

Metadata should identify how samples, measurement processes, and outputs are related. Choose data formats appropriate to the methods and the intended reuse.

#### Workflows

The **workflows** directory contains reusable computational procedures. Each ISA ARC workflow has an executable `workflow.cwl` description; `isa.workflow.xlsx` records prospective metadata using [WR-XLSX](/workspace/isa-arc/wr-xlsx/). Supporting scripts and software descriptions can accompany it.

A workflow describes the procedure. The particular input files, parameter values, and outputs of an execution belong to a run description.

#### Runs

The **runs** directory contains computational executions and their outputs. `run.cwl` describes the execution, and `isa.run.xlsx` records its retrospective WR-XLSX metadata. These descriptions relate the procedure to the inputs and parameters used on that occasion and to the resulting resources.

This distinction connects computational activity with the wider provenance of the research. See the [Workflow Run extension](/details/arc-data-model/wr/).

### Flexibility and Expansion

A workspace can develop incrementally. Contributors can add supporting documents, notes, or other resources as needed while following the conventions required by their chosen profile and tools.

Git and Git LFS support versioning and collaboration in established ISA-based implementations. They are practical implementation choices rather than requirements of the abstract model. See [versioning](/details/versioning).

The [ISA ARC Workspace overview](/details/arc-workspace/isa-arc/) explains the relationship between workspace conventions, metadata formats such as ISA-XLSX, and the shared model.

### Continuous Quality Control

Validation can help identify missing or inconsistent information while a workspace is being maintained. A [Data Hub](/details/arc-data-hub) can connect these checks to a collaborative workflow.

When preparing an output for publication, transformation expresses the recorded context as [ARC RO-Crate](/details/arc-ro-crate/). Checking applicable requirements and depositing the result with a service that provides persistent identifiers are separate steps. These can be connected by infrastructure, but generating metadata alone does not publish the data.

