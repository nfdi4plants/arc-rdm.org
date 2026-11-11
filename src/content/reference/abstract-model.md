---
description: "Explore the dataset-centred ARC Abstract Model and its administrative, provenance, and semantic cores, with ISA, Workflow Run, and Datamap extensions."
---

The ARC Abstract Model describes a dataset and the context needed to identify, trace, and interpret its contents. It gives different working environments a shared conceptual basis for expressing research information.

The model has its own concepts and relationships. It is independent of a particular file format, spreadsheet layout, or application, while remaining conceptually aligned with RO-Crate.

## Three perspectives on a dataset

Three base profiles organize complementary kinds of annotation. They describe different aspects of the same research information, rather than separate datasets.

| Base profile | Main question | Example: measurements and an analysis result |
| --- | --- | --- |
| [Administrative core](/abstract-model/administrative-core/) | How is this resource identified, attributed, and managed? | Dataset identifiers, contributors, affiliations, rights, and versions. |
| [Provenance core](/abstract-model/provenance-core/) | How was this resource produced or used? | Acquisition of measurements, analysis inputs, processing steps, and the derived result. |
| [Semantic core](/abstract-model/semantic-core/) | What does this information mean? | Measured variables, units, and their association with columns in the measurements table. |

A reader may start with any of these questions. Knowing a variable and its unit helps interpret values; following the analysis inputs explains the recorded research history; attribution and rights support responsible reuse. The relationships between these descriptions keep their context connected.

## Specialized research descriptions

Extension profiles add concepts for particular research needs within this common model:

- [ISA](/abstract-model/isa/) describes organization through investigations, studies, and assays.
- [Workflow Run](/abstract-model/wr/) describes computational workflow execution.
- [Datamap](/abstract-model/datamap/) supports annotation of data fragments.

These extensions allow specialized information to remain connected to recognizable administrative, provenance, and semantic structures.

## From concepts to representations

An [ARC Workspace](/workspace/) supports the collection and revision of research information. Content specifications describe how that information is expressed in particular metadata formats.

[ARC RO-Crate profiles](/ro-crate/) map the three base profiles into a publication graph using schema.org and Bioschemas terms. ISA-XLSX provides a tabular representation of ISA-based descriptions and their extensions. The abstract model establishes the conceptual relationship between these representations; it is not itself a file format.

Shared structure gives people and software a way to find relevant context. Scientific interpretation still depends on the meaning, specificity, and quality of the recorded information. Conformity to a structure alone cannot establish that a description is correct or sufficient for a particular reuse task.
