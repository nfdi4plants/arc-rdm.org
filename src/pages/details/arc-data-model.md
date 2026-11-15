---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Abstract Model'
pubDate: 2024-09-13
description: 'Administrative, provenance, and semantic context in the ARC Abstract Model.'
author: 'Timo Mühlhaus'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD"]
---

The ARC Abstract Model gives research communities shared structures for identifying research objects, assigning scientific meaning, and describing their history. These structures are independent of the files or software used to record them. A dataset connects related research objects and their context.

<span id="three-perspectives-on-a-dataset"></span>

## Three complementary perspectives

Three annotation principles guide the model's complementary cores:

| Annotation principle | Model core | Practical question |
| --- | --- | --- |
| Identity by Governance | [Administrative Core](/details/arc-data-model/administrative-core/) | What is this resource, who is responsible, and under which conditions may it be used? |
| Identity by Assignment | [Semantic Core](/details/arc-data-model/semantic-core/) | What meaning, characteristics, or role are being assigned to this object? |
| Identity by Provenance | [Provenance Core](/details/arc-data-model/provenance-core/) | Which processes used, generated, or transformed this object? |

The cores are independently selectable. A community can adopt one or combine several, with descriptions referring to shared entities. Selecting a core means following its applicable specification; it does not require the other two or prescribe every scientific fact that must be documented.

Consider a table of experimental measurements and a derived analysis result. Administrative metadata identify the dataset, its contributors, and its reuse conditions. Semantic metadata describe the measured variables and units, including which table columns they describe. Provenance metadata connect the measurements to acquisition and the result to the analysis that used them.

These descriptions complement one another. A processing temperature describes a process condition; it does not automatically become a measured characteristic of the resulting data. The meaning and scope of each annotation must remain explicit.

Descriptions can develop at different times. Researchers can assign meaning before a complete production history is available, or record processes before their outputs have been fully interpreted.

<span id="specialized-research-descriptions"></span>

## Base profiles and extensions

Communities can extend the shared structures in three complementary ways:

- **Ontology-based annotations** give an attribute a domain-specific meaning through a term, value, and unit where applicable.
- **Model extensions and Extension Profiles** formalize specialized entities, relationships, and constraints while preserving the selected cores.
- **Vocabulary-defined additional types and properties** express emerging concepts that existing profiles do not yet cover, while remaining compatible with the selected specifications.

Established standards provide reusable foundations. Researchers can describe a new concept without waiting for a new standard, and communities can turn recurring descriptions into shared conventions. Generic software can follow common relationships even when interpreting a specialized term requires domain knowledge.

[ISA](/details/arc-data-model/isa/), [Workflow Run](/details/arc-data-model/wr/), and [Datamap](/details/arc-data-model/datamap/) specialize the model for experimental organization, computational procedures and executions, and file-content annotation. Their publication profiles connect these descriptions to ARC RO-Crate.

## From concepts to representations

An annotation principle describes a purpose. A model core supplies shared entities and relationships for that purpose. An [ARC RO-Crate Core Profile](/details/arc-ro-crate/) specifies their concrete representation and constraints in publication metadata. The model specification also calls its coherent subsets profiles; these remain distinct from the RO-Crate profiles that map them to a serialization.

ARC RO-Crate uses Schema.org and Bioschemas terms in a JSON-LD graph. During annotation, communities can instead use formats suited to their work, such as ISA-XLSX, WR-XLSX, and Datamap tables in an ISA ARC Workspace.

The [ARC Workspace](/details/arc-workspace/) is where research data and metadata are created and maintained. Optional Workspace Profiles describe reusable working conventions. Compilation interprets a workspace state and maps its information into selected publication profiles.

Shared structure gives people and software a way to find relevant context. Scientific interpretation still depends on the meaning, specificity, and quality of the recorded information. Conformity to a structure alone cannot establish that a description is correct or sufficient for a particular reuse task.

Continue with [workspace and publication representations](/details/arc-representation), or explore the [three cores](#three-complementary-perspectives).

