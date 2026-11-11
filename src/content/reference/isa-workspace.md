---
description: "Learn how the ARC ISA XLSX Workspace Profile connects ISA-oriented research organization, spreadsheet metadata, and research resources."
---

The ARC ISA XLSX Workspace Profile is a concrete implementation of an [ARC Workspace](/workspace/). It combines research organized through investigations, studies, and assays with ISA-XLSX metadata and associated research resources.

Its purpose is to give collaborators and compatible tools shared conventions for working with that information. It is one way to implement a workspace within the broader ARC framework.

## Research organization and metadata

ISA provides an organization for research through investigations, studies, and assays. ISA-XLSX expresses ISA-based descriptions in spreadsheets, with extensions for computational workflows, their runs, and file fragments.

These descriptions can connect experimental measurements with later computational analysis. A measurements table can be associated with its scientific variables and units, while the analysis result is connected to the inputs and process that produced it. Administrative information records contributors and conditions of reuse alongside that scientific context.

The workspace profile supplies conventions for bringing the metadata and research resources together. Familiar folder layouts and spreadsheet editors can support this work; they are implementation choices rather than the definition of every ARC Workspace.

## Three related layers

The [ISA extension of the abstract model](/abstract-model/isa/) relates investigation, study, and assay concepts to the shared ARC model. ISA-XLSX describes their tabular representation. The workspace profile describes conventions for using that representation in a working environment.

Keeping these layers distinct helps explain the role of software. An annotation application helps researchers maintain their information; it does not replace the concepts or conventions that make the information interpretable.

## Connecting to publication

The [administrative](/abstract-model/administrative-core/), [provenance](/abstract-model/provenance-core/), and [semantic](/abstract-model/semantic-core/) cores provide complementary perspectives on the recorded research context. A transformation can express this context through [ARC RO-Crate](/ro-crate/) for publication and reuse.

The resulting description depends on the information captured and the relationships preserved during transformation. Using the workspace profile does not, by itself, establish that metadata are scientifically sufficient for every reuse question.

For the associated specialized concepts, see [Workflow Run](/abstract-model/wr/) and [Datamap](/abstract-model/datamap/).
