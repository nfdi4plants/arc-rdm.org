---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Workflow Run (WR)'
tags: ["workflows", "metadata"]
description: "Explore the Workflow Run extension and the distinction between computational procedures and their recorded executions."
---

The Workflow Run extension describes computational procedures and their executions within the [ARC Abstract Model](/details/arc-data-model/). It connects a planned analysis to the data, parameters, and results of a particular run, specializing the shared process structures for computational research.

## A workflow and its execution

A workflow describes a computational procedure. A run describes an execution of that procedure. Keeping these concepts distinct helps relate an intended analysis to what was performed with particular inputs and recorded parameters.

This specializes the [provenance core](/details/arc-data-model/provenance-core/): a workflow's procedure supplies a recipe, and its execution is represented through a process. The workflow and run datasets also carry [administrative context](/details/arc-data-model/administrative-core/). These relationships do not make a particular workflow language a universal requirement for an ARC Workspace.

## A shared example

Consider protein abundance measurements used to produce a normalized analysis result. The workflow describes the analysis procedure, while a run records its execution in relation to the input measurements, recorded parameters, and resulting output. A later execution can follow the same procedure with different inputs or settings and remain a distinct part of the research history.

The [Semantic Core](/details/arc-data-model/semantic-core/) explains the measured proteins, quantities, and units, and can assign measurements a role as a normalization reference. The [Administrative Core](/details/arc-data-model/administrative-core/) provides identity, responsibility, and reuse conditions. Run information contributes the computational history alongside those descriptions. An analysis parameter remains context of the execution; interpreting it as a characteristic of an output requires knowledge of the method.

## Across workspace and publication

[ISA ARC](/details/isa-arc/) combines experimental and computational descriptions in a Domain ARC. Its [WR-XLSX format](/workspace/isa-arc/wr-xlsx/) specifies workflow and run metadata, extending shared ISA-XLSX conventions. The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) brings these spreadsheets and associated resources together with investigation, study, and assay information. These authoring conventions express concepts that remain independent of spreadsheet serialization.

The [Workflow Run RO-Crate profile](/ro-crate/wr/) connects these descriptions to established workflow representations and shared ARC process structures. A computational workflow can carry both `ComputationalWorkflow` and `LabProtocol` types, while an execution can carry both `CreateAction` and `LabProcess` types. This allows consumers to recognize generic process relationships alongside specialized workflow roles.

Multiple typing supports that alignment when the applicable relationships and constraints are preserved; the type labels alone do not establish compatibility. [Compilation](/details/arc-representation/) can preserve experimental and computational relationships in the same graph, while specialized tools interpret workflow details. Validation checks the selected constraints. Recording a run does not by itself establish scientific correctness or reproducibility in every environment.
