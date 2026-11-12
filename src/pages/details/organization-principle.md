---
layout: ../../layouts/MarkdownLayout.astro
title: 'Organization and structure'
pubDate: 2024-09-13
description: 'Workspace conventions and an ISA-based example of organizing research data and metadata.'
author: 'Timo Mühlhaus'
tags: ["community", "organization", "project management"]
---

### Organization Principle

An [ARC Workspace](/details/arc-workspace/) contains research data and the administrative, provenance, and semantic metadata needed to describe them. Its organization should help collaborators find resources, maintain their descriptions, and understand how they belong together.

Workspace profiles provide reusable conventions for these tasks. A profile can specify how an authoring format is used and how data are associated with metadata. The [ARC Abstract Model](/details/arc-data-model/) supplies shared concepts without requiring every community to adopt one directory structure.

The following example shows the organization of an [ISA ARC Workspace](/details/arc-workspace/isa-arc/). It illustrates how workspace conventions connect research resources with metadata for investigations, studies, assays, computational workflows, and runs. Other workspace organizations can serve different research practices.

### ARC Directory Structure

In the ISA-based example, an investigation brings related studies, assays, workflows, and runs together. Metadata files describe the investigation and its resources, while directories contain the associated data and supporting material.

![Established ISA-based workspace example: investigation metadata and study, assay, workflow, and run directories](/orga-principle-scaffold.png)

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

The **workflows** directory contains reusable computational procedures, such as scripts, programs, or workflow definitions. Their descriptions can record the required software and execution environment.

A workflow describes the procedure. The particular input files, parameter values, and outputs of an execution belong to a run description.

#### Runs

The **runs** directory contains records of computational executions and their outputs. A run description relates the procedure to the inputs and parameters used on that occasion and to the resulting resources.

This distinction connects computational activity with the wider provenance of the research. See the [Workflow Run extension](/details/arc-data-model/wr/).

### Flexibility and Expansion

A workspace can develop incrementally. Contributors can add supporting documents, notes, or other resources as needed while following the conventions required by their chosen profile and tools.

Git and Git LFS support versioning and collaboration in established ISA-based implementations. They are practical implementation choices rather than requirements of the abstract model. See [versioning](/details/versioning).

The [ISA ARC Workspace overview](/details/arc-workspace/isa-arc/) explains the relationship between workspace conventions, metadata formats such as ISA-XLSX, and the shared model.

### Continuous Quality Control

Validation can help identify missing or inconsistent information while a workspace is being maintained. A [Data Hub](/details/arc-data-hub) can connect these checks to a collaborative workflow.

When preparing an output for publication, transformation expresses the recorded context as [ARC RO-Crate](/details/arc-ro-crate/). Checking applicable requirements and depositing the result with a service that provides persistent identifiers are separate steps. These can be connected by infrastructure, but generating metadata alone does not publish the data.

