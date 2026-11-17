---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC RO-Crate'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD"]
description: "How ARC RO-Crate realizes the ARC annotation principles through base profiles and extensions in the publication space."
---

ARC RO-Crate is the research-object representation used in the publication facet of [the ARC RDM system](/details/arc-representation/). Its Core Profiles realize the same three annotation principles that guide workspace descriptions: [Identity by Governance](/details/identity-by-governance/), [Identity by Assignment](/details/identity-by-assignment/), and [Identity by Provenance](/details/identity-by-provenance/). They make research context explicit for people and software beyond the original working environment.

The publication space provides shared structures suited to exchange and reuse. An [ARC Workspace](/details/arc-workspace/) supports information as it evolves during research. A publication representation can be generated at any stage; creating it does not imply formal publication or immutability. These purposes do not require separate storage systems.

## A publication graph

RO-Crate provides a foundation for packaging data and contextual metadata, using JSON-LD to express relationships between entities. ARC RO-Crate profiles describe how ARC's annotation perspectives are represented within that foundation.

The [Administrative Core Profile](/ro-crate/administrative-core/0.1/), [Provenance Core Profile](/ro-crate/provenance-core/0.1/), and [Semantic Core Profile](/ro-crate/semantic-core/0.1/) map the corresponding concepts of the [ARC Abstract Model](/details/arc-data-model/) into Schema.org and Bioschemas terms and specify constraints on their relationships. They can be selected independently or combined around shared research entities.

These three Core Profiles are ARC's base profiles. The abstract model supplies shared entities and relationships across workspace and publication space; the profiles define their concrete expression and constraints in RO-Crate. Communities can specialize these structures through Extension Profiles, as [ISA ARC](/details/isa-arc/) does for experimental and computational research.

## Selecting profiles and checking conformance

Following RO-Crate's [profile declaration convention](https://www.researchobject.org/ro-crate/specification/1.2/profiles.html#declaring-conformance-of-an-ro-crate-profile), a crate identifies its selected profiles through `conformsTo` references on the root dataset. These declarations tell consumers which structural interfaces to expect. Conformance requires satisfying the constraints of the selected profile versions; a declaration alone is not proof.

Extension Profiles specialize selected cores while preserving their requirements. For example, ISA adds investigation, study, and assay organization, while Workflow Run describes computational procedures and executions. Additional types or properties can retain specialized context, but multiple typing does not by itself establish compatibility. Validate the applicable core and extension constraints together; the [versioned profile collection](/ro-crate/) defines them.

<span id="administrative-core"></span>

## Administrative Core Profile

The Administrative Core Profile realizes [Identity by Governance](/details/identity-by-governance/) in the publication graph. It connects the research output with information such as its title, identifiers, contributors, affiliations, rights, and version.

For a measurements table and a derived analysis result, this gives consumers a way to recognize the dataset, identify responsibility, and understand its reuse conditions. The [Administrative Core](/details/arc-data-model/administrative-core/) explains the shared model structures; the [profile specification](/ro-crate/administrative-core/0.1/) defines their representation in ARC RO-Crate.

<span id="provenance-core"></span>

## Provenance Core Profile

The Provenance Core Profile realizes [Identity by Provenance](/details/identity-by-provenance/) by expressing how research entities participate in experimental, computational, and other research processes. Relationships between processes, inputs, and outputs connect a published result with the resources and activities recorded as contributing to it.

In the shared example, the publication graph can connect measurements to their acquisition and the derived result to the analysis that used them. Its usefulness depends on the process information that was documented. The [Provenance Core](/details/arc-data-model/provenance-core/) distinguishes a process, its conditions, and the resources it uses or produces; the [profile specification](/ro-crate/provenance-core/0.1/) defines their publication representation.

<span id="semantic-core"></span>

## Semantic Core Profile

The Semantic Core Profile realizes [Identity by Assignment](/details/identity-by-assignment/) through attributes, values, units, classifications, and vocabulary references. A separate descriptor can assign meaning to a sample, file, or identifiable fragment. The Datamap extension specializes this fragment annotation capability.

For the measurements table, that context identifies the measured variables and units and makes clear which columns the descriptions concern. The [Semantic Core](/details/arc-data-model/semantic-core/) explains descriptors and annotation scope; the [profile specification](/ro-crate/semantic-core/0.1/) defines their publication representation. Shared structure helps consumers locate the context; interpreting specialized terms still requires support for their meaning.

## Connected research context

For a dataset containing measurements and a derived analysis result, the publication graph can connect the dataset with contributor and rights information, variable and unit descriptions, and the processes that acquired or analyzed the data.

Shared entities and relationships allow consumers to move between these perspectives. A descriptor can assign a variable and unit to a measurement column, or identify its role as a normalization reference. Those annotations remain associated with their descriptor, allowing different interpretations of the same data.

Process parameters remain associated with the activity in which they were recorded. Following the graph can reveal an instrument setting, but deciding whether it characterizes a particular output requires knowledge of the method. Context discovery, scientific inference, and recording an inferred property are separate operations. [ISA](/details/arc-data-model/isa/), [Workflow Run](/details/arc-data-model/wr/), and [Datamap](/details/arc-data-model/datamap/) provide specialized structures that consumers can interpret alongside the shared cores.

## Preparing and publishing an output

Compilation interprets recorded workspace information and maps it into the selected publication profiles. It may draw on structured metadata, associated files, and documented organizational conventions. Diagnostics should expose missing, ambiguous, or unsupported context. The [source state, transformation, and profile versions](/details/versioning/#publication-versions) make the result traceable.

Generating the representation, assessing its conformity, and making it available through a publication service are distinct operations. A structurally conforming description does not establish scientific correctness or suitability for every reuse task.

ARC RO-Crate supports FAIR-oriented publication. Persistent identification, access, and long-term availability also rely on publication infrastructure and stewardship. The quality of the recorded metadata and the services maintaining the research output both contribute to its usefulness. Continue with [publication and exchange](/details/exchange-and-publication/) or explore how [ISA ARC](/details/isa-arc/) connects both facets in practice.
