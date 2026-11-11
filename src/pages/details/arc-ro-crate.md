---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC RO-Crate'
tags: ["RO-Crate", "FAIR Digital Object", "JSON-LD"]
description: "Understand ARC RO-Crate as the publication representation that connects research data with explicit administrative, provenance, and semantic context."
---

ARC RO-Crate is the research-object representation used in the ARC Publication Space. It connects research data with explicit contextual descriptions for people and software beyond the original working environment.

The publication space emphasizes stable descriptions suited to sharing and reuse. An [ARC Workspace](/details/arc-workspace/), in contrast, supports the information as it evolves during research. These are complementary purposes and do not require separate storage systems.

## A publication graph

RO-Crate provides a foundation for packaging data and contextual metadata, using JSON-LD to express relationships between entities. ARC RO-Crate profiles describe how ARC's annotation perspectives are represented within that foundation.

The three base profiles retain the names [administrative core](/details/arc-data-model/administrative-core/), [provenance core](/details/arc-data-model/provenance-core/), and [semantic core](/details/arc-data-model/semantic-core/). They map the corresponding concepts of the [ARC Abstract Model](/details/arc-data-model/) into schema.org and Bioschemas terms and specify constraints on RDF relationships.

The abstract model and its publication representation remain distinct. One defines the concepts being described; the other establishes their concrete expression in metadata.

## Administrative core

The administrative core profile expresses the dataset's identity, attribution, and management context in the publication graph. It connects the research output with information such as its title, identifiers, contributors, affiliations, rights, and version.

For a measurements table and a derived analysis result, this gives consumers a way to recognize the dataset, identify responsibility, and understand its reuse conditions. The [administrative metadata explanation](/details/arc-data-model/administrative-core/) introduces the underlying concepts; the profile concerns their representation in ARC RO-Crate.

## Provenance core

The provenance core profile expresses how research entities participate in experimental and computational processes. Relationships between processes, inputs, and outputs connect a published result with the resources and activities recorded as contributing to it.

In the shared example, the publication graph can connect measurements to their acquisition and the derived result to the analysis that used them. Its usefulness depends on the process information that was documented. Read the [provenance metadata explanation](/details/arc-data-model/provenance-core/) for the conceptual distinction between a process, its conditions, and the resources it uses or produces.

## Semantic core

The semantic core profile expresses scientific meaning through descriptions, values, units, classifications, and vocabulary references. These annotations connect interpretation with the entities and data they describe, including more specific targets supported by extension profiles.

For the measurements table, that context identifies the measured variables and units and makes clear which columns the descriptions concern. The [semantic metadata explanation](/details/arc-data-model/semantic-core/) explores this scope and its relationship to vocabulary. A shared representation helps consumers locate the context; interpreting specialized terms still requires support for their meaning.

## Connected research context

For a dataset containing measurements and a derived analysis result, the publication graph can connect the dataset with contributor and rights information, variable and unit descriptions, and the processes that acquired or analyzed the data.

Shared entities and relationships allow consumers to move between these perspectives. Extension profiles support specialized descriptions, including [ISA](/details/arc-data-model/isa/), [Workflow Run](/details/arc-data-model/wr/), and [Datamap](/details/arc-data-model/datamap/). Properly schematized additional types and properties can retain further context; interpreting that specialization depends on support for its model and terminology.

## Preparing and publishing an output

A transformation reads recorded workspace information and expresses it through the publication representation. It may draw on structured metadata, associated files, and documented organizational conventions. Context that remained implicit may require curation before it is meaningful to other consumers.

Generating the representation, assessing its conformity, and making it available through a publication service are distinct operations. A structurally conforming description does not establish scientific correctness or suitability for every reuse task.

ARC RO-Crate supports FAIR-oriented publication. Persistent identification, access, and long-term availability also rely on publication infrastructure and stewardship. The quality of the recorded metadata and the services maintaining the research output both contribute to its usefulness.
