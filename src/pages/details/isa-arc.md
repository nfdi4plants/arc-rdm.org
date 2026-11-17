---
layout: ../../layouts/MarkdownLayout.astro
title: 'ISA ARC'
description: 'The reference Domain ARC: connect experimental and computational research through shared principles, workspace conventions, publication profiles, and tools.'
tags: ["isa", "community", "RO-Crate", "documentation"]
---

ISA ARC is the reference domain implementation of [ARC RDM](/details/arc-representation/), developed in the life sciences and supported by DataPLANT. It combines the Investigation–Study–Assay (ISA) model with descriptions of computational workflows, their executions, and data-file contents. Its workspace conventions, publication profiles, tools, and services connect experimental and computational research from annotation to publication.

ISA organizes research into investigations describing the overall context, studies documenting materials and their preparation, and assays describing measurements. Workflows and runs extend that record to computational procedures and executions. Datamap descriptions explain the contents of data files and identifiable parts of them.

## A Domain ARC spans both facets

A **Domain ARC** combines a community's selected model cores and extensions with working conventions, software, validation requirements, and publication pathways. It applies the shared ARC annotation principles to a particular research setting.

ISA ARC implements both facets of the system. Its [workspace](/details/arc-workspace/isa-arc/) supports collaborative research through files, spreadsheet metadata, and familiar authoring tools. Its [ARC RO-Crate](/details/arc-ro-crate/) profiles express the recorded context for exchange and reuse. The ARC Abstract Model supplies the shared structures that connect these representations; compilation carries an identifiable workspace state into the selected publication profiles.

## The principles in experimental and computational research

Consider measurements made on biological samples and a computational analysis of the results:

- [Identity by Governance](/details/identity-by-governance/) addresses the dataset's identity, responsible researchers and institutions, associated publications, and reuse conditions.
- [Identity by Assignment](/details/identity-by-assignment/) addresses the measured variables, units, and interpretations. A descriptor can identify a measurement column or assign it a role in an analysis without changing its values.
- [Identity by Provenance](/details/identity-by-provenance/) addresses sample preparation, measurement, and analysis. Inputs and outputs connect these activities; protocols, workflows, and parameters describe how they were performed.

ISA ARC combines all three perspectives. The [Administrative](/details/arc-data-model/administrative-core/), [Semantic](/details/arc-data-model/semantic-core/), and [Provenance](/details/arc-data-model/provenance-core/) Cores provide their common structures. The [ISA](/details/arc-data-model/isa/), [Workflow Run](/details/arc-data-model/wr/), and [Datamap](/details/arc-data-model/datamap/) model extensions specialize those structures for the research information being described. Other Domain ARCs can select different combinations.

## Workspace conventions and annotation

The [ISA ARC Workspace](/details/arc-workspace/isa-arc/) is a Git repository containing investigation metadata and directories for studies, assays, workflows, and runs. Data stay alongside their descriptions so that collaborators can revise, version, and share them together.

[ISA-XLSX](/workspace/isa-arc/isa-xlsx/) records investigations, studies, assays, and experimental processes. [WR-XLSX](/workspace/isa-arc/wr-xlsx/) records computational procedures and executions, alongside their CWL descriptions. Datamap spreadsheets describe data files and identifiable fragments; their current format is specified in the [ISA-XLSX datamap section](/workspace/isa-arc/isa-xlsx/#datamap-file).

These conventions make the shared model usable through tabular annotation. They are choices of ISA ARC; ARC RDM also accommodates other working formats and organizations. See [organizing a workspace](/details/organization-principle/) and [documenting research context](/details/documentation-principle/) for practical examples.

## Publication profiles and compilation

Compilation interprets those descriptions and expresses their entities and relationships through ARC RO-Crate Core and Extension Profiles. The publication extensions retain the specialized context while preserving the applicable base structures.

| Publication extension | Context represented | Shared structures |
| --- | --- | --- |
| [ISA Profile](/ro-crate/isa/) | Investigations, studies, assays, and experimental processes | Administrative and Provenance Cores |
| [Workflow Run Profile](/ro-crate/wr/) | Computational procedures and their executions | Provenance Core, with administrative dataset descriptions |
| [Datamap Profile](/ro-crate/datamap/) | Scientific descriptions of files and identifiable fragments | Semantic Core |

Experimental and computational activities can share process relationships while retaining their specialized types. A workflow describes a reusable procedure; a run describes an execution with particular inputs, parameters, and outputs. Datamap descriptors make clear which data the scientific annotations concern. This allows consumers to follow shared relationships even when interpreting specialized terms requires domain knowledge.

Compilation can occur during ongoing research for inspection, exchange, or validation. It preserves recorded context; it cannot supply scientific information that was never documented. Generating a crate, validating it, and publishing it remain separate operations.

## Tools and collaboration

- [ARCitISA](/details/tools-and-services/ARCitISA/) provides an interface for creating, organizing, and annotating ISA ARC Workspaces, with ontology-assisted metadata editing.
- [ARCtrl](/details/tools-and-services/ARCtrl/) provides programmatic access to the workspace structures and transformations into publication representations.
- [PLANTdataHUB](/details/tools-and-services/PLANTdataHUB/) provides Git-based collaboration, versioning, and continuous validation.

Researchers contribute scientific interpretations, facility staff can describe acquisition, computational specialists document analyses, and data stewards support curation. Shared conventions allow these contributions to form one research context. Available operations depend on the tools and versions in use.

## Validation and publication

ISA ARC implements [target-driven validation](/details/validation/): communities provide packages for particular standards, repositories, or applications, and researchers select the requirements relevant to their intended use. The [ARC Validation Package Registry](/details/tools-and-services/avpr/) distributes packages, and PLANTdataHUB can run selected checks as the workspace evolves.

In the [DataPLANT publication pathway](/details/exchange-and-publication/#an-isa-arc-publication-pathway), passing the selected publication checks enables a request through [ARChigator](/details/tools-and-services/ARChigator/). Authors inspect the proposed content and metadata, and review can lead to further curation. After acceptance, [ARChive](/details/tools-and-services/ARChive/) publishes the ARC RO-Crate with a DOI while the originating workspace can continue to evolve. Specialized publication pathways can also release selected objects, such as workflows, under the receiving repository's requirements.

For practical work, continue with the [ISA ARC Workspace](/details/arc-workspace/isa-arc/). For the domain-independent architecture that it implements, return to [the ARC RDM system](/details/arc-representation/).
