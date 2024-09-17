---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARCs are FAIR Digital Objects'
pubDate: 2024-09-13
description: 'ARCs RO-crates are FAIR Digital Objects.'
author: 'Timo Mühlhaus'
tags: ["tools", "services", "community"]
---

Enabling the researchers to achieve data FAIRness and facilitating FAIR compliance is central to the ARC concept. FAIRness is a continuum that evolves and can be continuously improved. This philosophy is encapsulated in ARC's "immutable-yet-evolving" design, which allows for the dynamic addition of metadata through collaborative metadata evolution. This approach accommodates the diverse and changing requirements of researchers from various domains, supported by a Git-based versioning mechanism and a comprehensive suite of tools and services.
ARCs employ FAIRness by design and provide dual representations: a Git file and directory project structure that is also represented as an RO-Crate JSON-LD using the ARC-ISA RO-Crate profile. This consistently integrates existing standards and, combined with Git version tracking, achieves full compliance with the FAIR Data Maturity Model of the RDA. By leveraging standardized metadata and ontology-driven annotation supported by annotation tools, ARC ensures that research data is increasingly FAIR. Interoperability is emphasized by improving the integration of ARC FDOs in workflows, search engines, analytic tools, community platforms, databases, endpoint repositories, and journals. 

The RDA has proposed the so-called [FAIR Data Maturity Indicators][FAIR Data Maturity Model] to gauge the degree to which FAIR principles are implemented. The following table shows these indicators for ARCs to be FAIR. For each indicator, the table lists the

- **Priority** (E – Essential; I – Important; U – Useful),
- **Readiness** (C – Complete; P – Planned) of implementation, and
- **Description** of realization by ARC.


| <div style="min-width:100px">ID</div> | <div style="width:10px">P</div> | <div style="width:10px">R</div> | Description |
|--|--|--|--|
| RDA-F1-01D RDA-F1-01M | E  E | C  C | Unique and persistent identifiers are assigned for data and metadata by Git project-ID, URL, index and version hash. |
| RDA-F1-02D | E | C | Standardized Git data projects including necessary and auxiliary metadata (ARCs) can be directly published as ARC data publications using an Invenio instance. Stable DOIs are provided for both the underlying Git repository as well as specific published versions.|
| RDA-F1-02M  RDA-A1-03M | E  E | C  C | Metadata development is achieved using the DataPLANT Broker Ontology as a stable index, with participation and involvement of the national and international plant research communities. Community participation is actively enabled via schema templates (available openly on GitHub) to close the ontology gap and provide flexibility to quickly support vocabulary that describes novel and individual experiments. Metadata can also be reused from existing ontologies. |
| RDA-F2-01M | E | C | ARCs define a structure that combines ISA and CWL metadata information into a set of fields. Metadata values are provided by applying relevant and standard schemata and ontologies. Pre-provided templates facilitate and accelerate the addition of metadata descriptions across common cases (e.g., research question or institute policy).|
| RDA-F3-01M | E | C | ARCs contain administrative metadata within the ISA investigation. Combined with Git project-ID, URL, index and version hash an identifier is provided for all data.|
| RDA-F4-01M | E | C | ARCs are de-facto RO-Crate (JSON-LD) implementations with content following the ISA and/or CWL standard. Compliant RO-Crates with appropriate descriptions (using schema.org terms and the bioschema.org profile description) can be generated, either automatically without user intervention using the PLANTdataHUB’s continuous integration procedures, or triggered manually, using a prototypical implementation. Such RO-Crates are comprehensible to data harvesters such as Google data search, the FAIDARE data discovery portal, and DataPLANT’s PLANTdataHUB ARC registry. |
| RDA-A1-04M  RDA-A1-04D  RDA-A1.1-01M  RDA-A1.1-01D  | E  E  E  I  | C  C  C  C  | Git repository access is based on standardized protocols such as HTTPS and SSH; these can be used for retrieving all data and metadata. |
| RDA-A1-02M RDA-A1-02D RDA-A1-05D | E  E  I | C  C  C | Git is supported by a multitude of easily accessible desktop and web tools available for management. DataPLANT provides a custom user interface aimed at plant biologists.|
| RDA-A1-01M  | I | C | In combination with Git and Invenio, each ARC contains the metadata information needed to enable users to access its data.|
| RDA-A1.2-01D| U | C | Data and metadata can be made accessible both publicly and securely via open authentication mechanisms proxied by DataPLANT's keycloak for unification  |
| RDA-A2-01M  RDA-A1-03D  | E  E | C  C | DataPLANT’s data publication process triggers metadata harvesting and persistent storage in an Invenio instance, providing an individual DOI. |
| RDA-I1-02M  | E | C | (Meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation. The tabular ISA facilitates maintenance by humans, whereas JSON-LD-based RO-Crate that contains the complete ISA JSON as well as the CWL information completes a formal machine-actionability. In order to bridge the gap between user interaction and machine-actionability, RO-Crate ARC decoration is produced by a continuous integration process either triggered manually or after synchronization with the PLANTdataHUB.  |
| RDA-I1-01D  RDA-I2-01D  | I U | C  C | For data and derived data representation, the use of technology-specific yet vendor-agnostic file formats is suggested in the ARC. This is ideal to cover standard processing steps in a FAIR manner, but predefined formats fall short in the description of individual analyses. Therefore, DataPLANT uses an additional, ISA-based data map layer to annotate result file content (e.g., a data frame derived from an analysis). |
| RDA-I1-01M  RDA-I2-01M  | I  I | C  C | All user input is supported by the use of curated FAIR-compliant ontologies that are schematized (RDF/XML, OBO, OWL) and find- and identifiable via PID (purl). |
| RDA-I3-01M  | E | C | Using FAIR vocabularies in the context of the ISA framework, all (meta)data are referenced, including a reference to the ontology used in the investigation section.  |
| RDA-I3-01D RDA-I3-02D | E  E | C  C | In the RO-Crate representation of ARCs, all data included in the investigation are referenced; moreover, Git partial checkout and referencing mechanism allows automatic tracking of references to reused or linked data. |
| RDA-I1-02M RDA-I3-02M  RDA-I3-04M | U  U  U | C  C  C | Machine-understandability is achieved by the JSON-LD-based RO-Crate ARC decoration, including references to internal and external data within the metadata. |
| RDA-I3-03M  | I | C | DataPLANT’s Broker Ontology provides stable indexing via Git. Furthermore, individual terms are linked and cross-referenced to other ontologies and can be shadowed by PIDs of the target ontology after the brokering process for compliance.|
| RDA-R1-01M  | E | C | Experimental processes are formally described using the ISA framework, while computational workflows including processing, analysis and simulations are described using CWL. While any available workflow engine/language (e.g., Galaxy, Nextflow, Snakemake) can be used, the processing graph with input and output needs to be specified in CWL to ensure a homogenized interoperability and entry point for computation. |
| RDA-R1.1-01M  RDA-R1.1-02M  RDA-R1.1-03M | E  I  I | C  C  C | Strong orientation in the area of open-source software: Licensing options are firmly anchored in repositories and directly visible in and included in the RO-Crate. Our strong commitment to open science is reflected in the firmly established licensing options within repositories, directly visible in and integrated into the RO-Crate. |
| RDA-R1.2-01M RDA-R1.2-02M | I  U| C  C| By using Git, consistent versioning allows traceability (provenance) of all data according to (cross)-community-specific standards. |
| RDA-R1.3-01M  RDA-R1.3-01D  | E  E| C  C| Due to the immutable-yet-evolving design of an ARC especially the information completeness can be achieved gradually without a roadblock during data contextualization. This means that the annotation process never fails but will be marked as incomplete. To insure (meta)data compliance with community standards, requirements prepared as ISA-templates can be directly used for data annotation.  |
| RDA-R1.3-02M  RDA-R1.3-02D  | E  I| C  C| ARC environment ensures immediate machine readability and actionability and is given its standards “AI ready”, while the git repository-based template generation crowd sources community-driven metadata standard development. |

<!-- Links -->

[FAIR Data Maturity Model]: http://dx.doi.org/10.15497/RDA00050 "FAIR Data Maturity Model"


