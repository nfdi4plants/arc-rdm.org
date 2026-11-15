---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Provenance Core'
tags: ["metadata", "documentation"]
description: "Understand how the provenance core connects research resources with experimental and computational processes, inputs, and outputs."
---

**Identity by Provenance** describes a research object through the activities that used, generated, or transformed it. The Provenance Core connects research entities with those processes and the conditions under which they took place.

It is an independently selectable part of the [ARC Abstract Model](/details/arc-data-model/), giving readers a route through recorded research history without requiring every output to have already received a full scientific interpretation.

## Processes, inputs, and outputs

Provenance descriptions relate processes to their inputs and outputs. A process can reference a **recipe** describing the planned procedure and record parameter values used in its execution. The same recipe can be followed repeatedly, with each execution retaining its particular inputs, outputs, and conditions.

This applies across experimental and computational work: a laboratory protocol and a computational workflow can both supply recipes. Acquiring a measurement and analyzing a measurements table can both be described through the resources they use and produce.

## A shared example

Consider a dataset containing a table of experimental measurements and a derived analysis result. Provenance metadata connects the measurements to their acquisition process. It also connects the derived result to the analysis process and the measurements used as input.

When one process's output is used as another's input, their shared resource connects the steps into a provenance graph. A reader can follow that graph from an analysis result through measurement and sample preparation. The detail available depends on what was documented; a connection alone does not provide a complete account of the method.

## Distinguishing process context from meaning

An instrument setting can explain how a measurement was acquired. It does not automatically become a measured characteristic of the material. Similarly, an analysis parameter records a choice in processing without necessarily describing a property of the output itself.

The [semantic core](/details/arc-data-model/semantic-core/) supplies the scientific meaning of variables, values, and units. The [administrative core](/details/arc-data-model/administrative-core/) records identity, responsibility, and reuse conditions. Together, the three perspectives support interpretation without treating every connected annotation as interchangeable.

## Specialized descriptions and representations

The [ISA extension](/details/arc-data-model/isa/) relates research organized through investigations, studies, and assays to the common model. [Workflow Run](/details/arc-data-model/wr/) adds specialized descriptions of computational workflow execution.

Provenance can develop incrementally in an [ARC Workspace](/details/arc-workspace/), then be expressed through [ARC RO-Crate](/details/arc-ro-crate/) for publication. Preserving the relevant process relationships is part of preparing useful context for consumers beyond the original research team.
