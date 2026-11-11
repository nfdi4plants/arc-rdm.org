---
description: "Explore the Workflow Run extension and the distinction between computational procedures and their recorded executions."
---

The Workflow Run extension describes computational workflow execution within the [ARC Abstract Model](/abstract-model/). It adds specialized context for research in which computational processes use data and produce new results.

## A workflow and its execution

A workflow describes a computational procedure. A run describes an execution of that procedure. Keeping these concepts distinct helps relate an intended analysis to what was performed with particular inputs and recorded parameters.

This extends the [provenance core](/abstract-model/provenance-core/), which connects research resources with processes, inputs, and outputs. It does not make a particular workflow language a universal requirement for an ARC Workspace.

## A shared example

Consider a measurements table used to produce a derived analysis result. The workflow describes the analysis procedure, while a run records its execution in relation to the input measurements and resulting output.

The [semantic core](/abstract-model/semantic-core/) explains the measured variables and units. The [administrative core](/abstract-model/administrative-core/) provides identity, responsibility, and reuse conditions. Run information contributes the computational history needed to interpret the result alongside those other descriptions.

## Across workspace and publication

ISA-XLSX supports tabular descriptions of computational workflows and runs alongside experimental metadata. The [ISA-based workspace profile](/workspace/isa-arc/) provides a working context for these descriptions and associated resources.

A transformation to [ARC RO-Crate](/ro-crate/) can express the recorded execution context in the publication representation. Its usefulness depends on the information captured and the relationships preserved. Recording a run does not by itself establish that an analysis is scientifically correct or can be reproduced in every environment.
