---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Abstract Model'
pubDate: 2024-09-13
description: 'The shared, format-independent structures connecting ARC annotation principles, workspaces, and publication representations.'
author: 'Timo Mühlhaus'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD"]
---

The ARC Abstract Model translates ARC RDM's annotation principles into shared entities and relationships. Its Administrative, Semantic, and Provenance Cores support identification and responsibility, scientific meaning, and research history. These structures are independent of metadata serialization, working formats, and software.

The model is a common foundation for the whole path from an [ARC Workspace](/details/arc-workspace/) to the [ARC Publication Space](/details/arc-ro-crate/). Workspace tools and conventions provide ways to record research information; compilation interprets that information against the model; ARC RO-Crate profiles specify its concrete publication representation.

<span id="three-perspectives-on-a-dataset"></span>

## Three complementary perspectives

The annotation principles describe purposes for research-object annotation. They guide the design of independently applicable, composable structures rather than classifying all metadata or prescribing a universal list of scientific fields. Each core gives one principle a shared structural realization:

| Annotation principle | Model core | Practical question |
| --- | --- | --- |
| [Identity by Governance](/details/identity-by-governance/) | [Administrative Core](/details/arc-data-model/administrative-core/) | What is this resource, who is responsible, and under which conditions may it be used? |
| [Identity by Assignment](/details/identity-by-assignment/) | [Semantic Core](/details/arc-data-model/semantic-core/) | What meaning, characteristics, or role are being assigned to this object? |
| [Identity by Provenance](/details/identity-by-provenance/) | [Provenance Core](/details/arc-data-model/provenance-core/) | Which processes used, generated, or transformed this object? |

The cores are independently selectable. A community can adopt one or combine several, with descriptions referring to shared entities. Selecting a core means following its applicable specification; it does not require the other two or prescribe every scientific fact that must be documented.

## Composing descriptions around shared objects

Consider a dataset of protein abundance measurements and a derived analysis result. A dataset provides an organizational anchor for related research objects. Administrative relationships identify its contributors, institutions, related publications, and reuse conditions. Semantic descriptors identify the measured proteins, quantities, and units, and may assign an analytical role such as a normalization reference. Provenance connects sample preparation, measurement, and computational analysis through their inputs and outputs.

Composition works both between cores and within the Provenance Core. Different cores describe shared research objects; individual processes form a research history when an output of one is used as the input of another. The descriptions need not have the same depth or be stored in separate files.

Descriptions can develop at different times. Researchers can assign meaning before a complete production history is available, or record processes before their outputs have been fully interpreted.

## Context and interpretation

Direct properties, such as a file's format, describe the object itself. A semantic descriptor instead associates scientific annotations with an explicit target. Separating the description from its target lets several interpretations of the same measurement coexist without changing its recorded values.

Process parameters stay with the activity in which they were recorded. Following a measurement's provenance can reveal an instrument setting, but deciding whether that setting also characterizes its output requires knowledge of the method. Context discovery, scientific inference, and recording an inferred property are distinct operations. Connected objects do not automatically inherit one another's attributes.

<span id="specialized-research-descriptions"></span>

<span id="base-profiles-and-extensions"></span>

## Extensions and scientific expression

Communities can extend the shared structures in three complementary ways:

- **Ontology-based annotations** express scientific attributes through shared structures, with their meaning designated by terms, values, and units where applicable.
- **Model extensions and Extension Profiles** formalize specialized entities, relationships, and constraints while preserving the selected cores. A specialized process, for example, retains its input and output relationships while adding domain-specific detail.
- **Vocabulary-defined additional types and properties** express emerging concepts that existing profiles do not yet cover, while remaining compatible with the selected structures.

Established standards provide reusable foundations. Researchers can describe a new concept without waiting for a new standard, and communities can turn recurring descriptions into shared conventions. Generic software can follow common relationships even when interpreting a specialized term requires domain knowledge.

[ISA](/details/arc-data-model/isa/), [Workflow Run](/details/arc-data-model/wr/), and [Datamap](/details/arc-data-model/datamap/) specialize the model for experimental organization, computational procedures and executions, and file-content annotation. Their publication profiles connect these descriptions to ARC RO-Crate. [ISA ARC](/details/isa-arc/) combines these extensions with working formats, tools, validation, and publication services in a Domain ARC.

## From concepts to representations

An annotation principle describes a purpose. A model core supplies shared entities and relationships for that purpose. An [ARC RO-Crate Core Profile](/details/arc-ro-crate/) specifies their concrete representation and constraints in publication metadata. These are related levels of the same architecture. The model specification also calls its coherent subsets profiles; those remain distinct from the RO-Crate profiles that map them to a serialization.

ARC RO-Crate uses Schema.org and Bioschemas terms in a JSON-LD graph. During annotation, communities can instead use formats suited to their work, such as ISA-XLSX, WR-XLSX, and Datamap tables in an ISA ARC Workspace.

The [ARC Workspace](/details/arc-workspace/) is where research data and metadata are created and maintained. Optional Workspace Profiles describe reusable working conventions and mappings; domain-specific transformations can also interpret those conventions directly. [Compilation](/details/arc-representation/) identifies the entities and relationships recorded in a workspace state and expresses them through selected Core and Extension Profiles. The abstract model guides both the interpretation of the source and its publication representation.

Shared structure gives people and software a way to find relevant context and recognize the roles defined by the selected cores. Understanding specialized concepts and comparing values across communities may still require domain knowledge, vocabulary mappings, or further agreements. Structural conformity alone cannot establish scientific correctness or suitability for a particular reuse task.

The three perspectives are a proposed common foundation whose usefulness across domains must be demonstrated through application. They leave domain reporting requirements and scientific interpretation to research communities.

Continue with [the ARC RDM architecture](/details/arc-representation/), or explore the [three cores](#three-complementary-perspectives).

