---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Provenance Core'
tags: ["metadata", "documentation"]
description: "Understand how the provenance core connects research resources with experimental and computational processes, inputs, and outputs."
---

The Provenance Core relates research entities through processes, recipes, parameters, inputs, and outputs. It provides the shared structures through which [Identity by Provenance](/details/identity-by-provenance/) makes the context of research activities discoverable.

It is an independently selectable part of the [ARC Abstract Model](/details/arc-data-model/), giving readers a route through recorded research history without requiring every output to have already received a full scientific interpretation. Its concepts are independent of metadata serialization and connect workspace descriptions with their publication representation.

## Processes, inputs, and outputs

Provenance descriptions relate processes to their inputs and outputs. A process can reference a **recipe** describing the planned procedure and record parameter values used in its execution. The same recipe can be followed repeatedly, with each execution retaining its particular inputs, outputs, and conditions.

This applies across experimental and computational work: a laboratory protocol and a computational workflow can both supply recipes. Acquiring a measurement and analyzing a measurements table can both be described through the resources they use and produce.

## A shared example

Consider a dataset containing protein abundance measurements and a derived analysis result. Processes connect biological samples to preparation, prepared material to measurement, and the resulting measurements to computational analysis. Each execution retains its inputs, outputs, recipe, and recorded parameters.

When one process's output is used as another's input, their shared resource connects the steps into a provenance graph. A reader can follow that graph from an analysis result through measurement and sample preparation. The detail available depends on what was documented; a connection alone does not provide a complete account of the method.

## Distinguishing process context from meaning

An instrument setting can explain how a measurement was acquired. It does not automatically become a measured characteristic of the material. Similarly, an analysis parameter records a choice in processing without necessarily describing a property of the output itself. Parameters remain attached to their process; projecting them onto an input or output may require domain-specific interpretation rules.

The [semantic core](/details/arc-data-model/semantic-core/) supplies the scientific meaning of variables, values, and units. The [administrative core](/details/arc-data-model/administrative-core/) records identity, responsibility, and reuse conditions. Together, the three perspectives support interpretation without treating every connected annotation as interchangeable.

## Specialized descriptions and representations

The [ISA extension](/details/arc-data-model/isa/) relates research organized through investigations, studies, and assays to the common model. [Workflow Run](/details/arc-data-model/wr/) adds specialized descriptions of computational workflow execution. [ISA ARC](/details/isa-arc/) combines both within a domain implementation, allowing experimental and computational work to share process relationships while retaining specialized details.

Provenance can develop incrementally in an [ARC Workspace](/details/arc-workspace/), then be expressed through the [Provenance Core Profile](/details/arc-ro-crate/#provenance-core) in ARC RO-Crate. The [profile specification](/ro-crate/provenance-core/) defines the concrete representation and conformance requirements. Compilation needs to preserve the recorded process relationships; validation assesses the selected profile constraints, and scientific interpretation remains dependent on the documented method and domain knowledge.
