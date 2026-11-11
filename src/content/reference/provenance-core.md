---
description: "Understand how the provenance core connects research resources with experimental and computational processes, inputs, and outputs."
---

The provenance core describes research entities through the experimental and computational processes in which they participate. It connects resources with the activities that generate, use, or transform them.

Within the [ARC Abstract Model](/abstract-model/), this perspective provides a route through the recorded history of a research output.

## Processes, inputs, and outputs

Provenance descriptions relate processes to their inputs and outputs. They can also carry methodological information, such as experimental conditions and computational parameters, that helps explain how a process was performed.

This applies across experimental and computational work. Acquiring a measurement and analyzing a measurements table are different activities, but both can be described through the resources they use and produce. Recording these connections helps keep the stages of research interpretable together.

## A shared example

Consider a dataset containing a table of experimental measurements and a derived analysis result. Provenance metadata connects the measurements to their acquisition process. It also connects the derived result to the analysis process and the measurements used as input.

A reader can follow those recorded relationships from the result back toward its origins. The detail available depends on what was documented; the existence of a connection does not, by itself, provide a complete account of the method.

## Distinguishing process context from meaning

An instrument setting can explain how a measurement was acquired. It does not automatically become a measured characteristic of the material. Similarly, an analysis parameter records a choice in processing without necessarily describing a property of the output itself.

The [semantic core](/abstract-model/semantic-core/) supplies the scientific meaning of variables, values, and units. The [administrative core](/abstract-model/administrative-core/) records identity, responsibility, and reuse conditions. Together, the three perspectives support interpretation without treating every connected annotation as interchangeable.

## Specialized descriptions and representations

The [ISA extension](/abstract-model/isa/) relates research organized through investigations, studies, and assays to the common model. [Workflow Run](/abstract-model/wr/) adds specialized descriptions of computational workflow execution.

Provenance can develop incrementally in an [ARC Workspace](/workspace/), then be expressed through [ARC RO-Crate](/ro-crate/) for publication. Preserving the relevant process relationships is part of preparing useful context for consumers beyond the original research team.
