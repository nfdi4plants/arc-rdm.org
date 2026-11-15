---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Workflow Run (WR)'
tags: ["workflows", "metadata"]
description: "Explore the Workflow Run extension and the distinction between computational procedures and their recorded executions."
---

The Workflow Run extension describes computational procedures and their executions within the [ARC Abstract Model](/details/arc-data-model/). It connects a planned analysis to the data, parameters, and results of a particular run.

## A workflow and its execution

A workflow describes a computational procedure. A run describes an execution of that procedure. Keeping these concepts distinct helps relate an intended analysis to what was performed with particular inputs and recorded parameters.

This specializes the [provenance core](/details/arc-data-model/provenance-core/): a workflow's procedure supplies a recipe, and its execution is represented through a process. The workflow and run datasets also carry [administrative context](/details/arc-data-model/administrative-core/). These relationships do not make a particular workflow language a universal requirement for an ARC Workspace.

## A shared example

Consider a measurements table used to produce a derived analysis result. The workflow describes the analysis procedure, while a run records its execution in relation to the input measurements and resulting output.

The [semantic core](/details/arc-data-model/semantic-core/) explains the measured variables and units. The [administrative core](/details/arc-data-model/administrative-core/) provides identity, responsibility, and reuse conditions. Run information contributes the computational history needed to interpret the result alongside those other descriptions.

## Across workspace and publication

[WR-XLSX](/workspace/isa-arc/wr-xlsx/) specifies workflow and run metadata, extending shared ISA-XLSX conventions. The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) brings these spreadsheets and associated resources together with investigation, study, and assay information.

The [Workflow Run RO-Crate profile](/ro-crate/wr/) connects these descriptions to established workflow representations and shared ARC process structures. Compilation can preserve experimental and computational relationships in the same graph while specialized tools interpret the workflow details. Recording a run does not by itself establish scientific correctness or reproducibility in every environment.
