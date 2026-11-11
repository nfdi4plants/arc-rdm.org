---
description: "Understand ARC RO-Crate as the publication representation that connects research data with explicit administrative, provenance, and semantic context."
---

ARC RO-Crate is the research-object representation used in the ARC Publication Space. It connects research data with explicit contextual descriptions for people and software beyond the original working environment.

The publication space emphasizes stable descriptions suited to sharing and reuse. An [ARC Workspace](/workspace/), in contrast, supports the information as it evolves during research. These are complementary purposes and do not require separate storage systems.

## A publication graph

RO-Crate provides a foundation for packaging data and contextual metadata, using JSON-LD to express relationships between entities. ARC RO-Crate profiles describe how ARC's annotation perspectives are represented within that foundation.

The three base profiles retain the names [administrative core](/abstract-model/administrative-core/), [provenance core](/abstract-model/provenance-core/), and [semantic core](/abstract-model/semantic-core/). They map the corresponding concepts of the [ARC Abstract Model](/abstract-model/) into schema.org and Bioschemas terms and specify constraints on RDF relationships.

The abstract model and its publication representation remain distinct. One defines the concepts being described; the other establishes their concrete expression in metadata.

## Connected research context

For a dataset containing measurements and a derived analysis result, the publication graph can connect the dataset with contributor and rights information, variable and unit descriptions, and the processes that acquired or analyzed the data.

Shared entities and relationships allow consumers to move between these perspectives. Extension profiles support specialized descriptions, including [ISA](/abstract-model/isa/), [Workflow Run](/abstract-model/wr/), and [Datamap](/abstract-model/datamap/). Properly schematized additional types and properties can retain further context; interpreting that specialization depends on support for its model and terminology.

## Preparing and publishing an output

A transformation reads recorded workspace information and expresses it through the publication representation. It may draw on structured metadata, associated files, and documented organizational conventions. Context that remained implicit may require curation before it is meaningful to other consumers.

Generating the representation, assessing its conformity, and making it available through a publication service are distinct operations. A structurally conforming description does not establish scientific correctness or suitability for every reuse task.

ARC RO-Crate supports FAIR-oriented publication. Persistent identification, access, and long-term availability also rely on publication infrastructure and stewardship. The quality of the recorded metadata and the services maintaining the research output both contribute to its usefulness.
