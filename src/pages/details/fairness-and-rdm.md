---
layout: ../../layouts/MarkdownLayout.astro
title: 'RDM and FAIRness'
pubDate: 2024-09-13
description: 'Research data management and incremental progress toward FAIR data publication.'
author: 'Timo Mühlhaus'
tags: ["Data publication", "FAIRness", "FAIR digital object"]
---

### Research Data Management (RDM)

[ARC RDM](/details/data-management-principle/) connects active research documentation with publication descriptions. Research data management covers the data lifecycle, including:

- Collecting
- Organizing
- Documenting
- Processing
- Analyzing
- Storing
- Sharing

The [ARC Workspace](/details/arc-workspace/) supports documentation during these activities. Preparing [ARC RO-Crate](/details/arc-ro-crate/) brings the recorded context into a publication representation for consumers beyond the original team. These [two facets](/details/arc-representation/) connect ongoing research with exchange and reuse.

![Research data lifecycle](/research-data-lifecycle.png)

#### Goals of Research Data Management (RDM):

- **Enhancing research effectiveness and efficiency**: Well-organized data accelerates the research process by making data easier to find, analyze, and reuse.
- **Improving data security**: Appropriate storage, backup, and access arrangements help reduce the risk of data or metadata loss.
- **Preventing errors**: Clear documentation and structuring minimize the risk of mistakes during data handling and analysis.
- **Increasing research impact**: Clear descriptions and suitable access arrangements help others discover and reuse data.
- **Supporting reproducibility**: Recording methods, inputs, and outputs helps others assess how research was carried out.
- **Promoting data reusability**: Properly managed data can be reused by other researchers, increasing its value beyond the original project.

### Open Data: The Path to Open Science

Publicly funded research is often expected to provide a return to society, and research data is frequently one of the most valuable outputs of these projects. Data reusability plays a crucial role in maximizing this return.

Sharing research data and methods can support scrutiny and reuse. Access conditions depend on the data and the circumstances of their publication. FAIR does not require unrestricted access: metadata should describe how resources can be accessed and under which conditions they may be reused.

<span id="data-publication-solving-the-data-reuse-problem"></span>

### Supporting data reuse through publication

Traditionally, researchers are evaluated based on the knowledge they publish in scientific journals. However, the data behind these publications also hold substantial value. 

- **Reusability**: Data can be reused to generate further insights, validate findings, or support new research directions.
- **Re-examination**: As new techniques or theories emerge, existing data may need to be revisited.
- **Evolution of conclusions**: Scientific conclusions can change or evolve when additional data is considered.

Articles and repository deposits provide essential descriptions and access to research outputs. Relevant context can still be distributed across methods sections, files, and other research records. Structured, machine-actionable descriptions complement these forms of communication by making the meaning, origins, and relationships of data explicit.

### Data as a Primary Product in Science

Research data can remain useful beyond the question that prompted their collection. They can be:

- **Reused** to drive new discoveries and insights
- **Re-examined** when novel techniques or theories arise
- **Reintegrated** with new datasets to refine or revise conclusions

Reuse depends on context. [Identity by Governance](/details/identity-by-governance/) addresses identification, attribution, and conditions of use; [Identity by Assignment](/details/identity-by-assignment/) addresses scientific meaning; [Identity by Provenance](/details/identity-by-provenance/) addresses the activities that use and produce research objects. These annotation purposes help consumers judge whether data are appropriate for a new question. They guide how ARC RDM captures context in support of the FAIR objectives.

### FAIR Digital Objects (FDOs) and Data Publication

Research outputs can be published and cited independently of a journal article. ARC RO-Crate connects data with explicit contextual metadata in ARC's Publication Space. A published version can serve as a FAIR Digital Object when persistent identification, machine-actionable descriptions, and suitable publication services support discovery, access, and reuse.

The **FAIR Data Principles** (Findable, Accessible, Interoperable, Reusable) guide the description and handling of data and metadata for human and machine use.

- **Findable**: Data should be easy to locate, indexed, and searchable.
- **Accessible**: Data and metadata should have clear access mechanisms and conditions using standardized protocols.
- **Interoperable**: Shared machine-readable structures and vocabulary references support integration; scientific comparison may still require mappings or community agreements.
- **Reusable**: Data should be well-documented, structured, and licensed for reuse.

FAIRness can be assessed and improved incrementally. The format of an object alone does not establish its FAIRness; documentation, repository services, access arrangements, and community requirements also matter. See [ARC RO-Crate and FAIR Digital Objects](/details/arc-fdo).

### FAIRness as an Ongoing Process

An evolving workspace allows contributors to improve context as research develops. Publication requirements can guide that work, while a published output provides an identifiable state for citation and reuse. Compilation, conformity assessment, and publication are distinct parts of this process.

The FAIR aspects can be assessed and improved independently; they do not form a fixed sequence of completion. Useful questions include:

| Aspect | Example evidence to assess |
| --- | --- |
| Findable | Does a searchable record identify the resource and its metadata persistently? |
| Accessible | Are access protocols and conditions documented, including how metadata remain available? |
| Interoperable | Can consumers interpret the shared structures, vocabulary references, and qualified relationships? |
| Reusable | Are rights, methods, provenance, and scientific descriptions sufficient for the intended use? |

[Validation](/details/validation/) can report progress against a selected target, such as missing metadata for a repository submission. Its results should identify the evaluated revision, scope, and requirements. A passing package or a later workspace revision is not an overall FAIRness score.

### "Small Data Done Right" is Big Data

Small datasets can contribute to larger studies when their context remains available and interpretable. Combining data across projects requires shared structures, meaningful vocabulary references, and clear methods and reuse conditions. These agreements need to remain usable beyond the lifespan of the projects that created the data.

![Conceptual illustration of the long tail of research data](/fairness-long-tail-data.png)

*Conceptual illustration of the long tail of research data.*

The [ARC Abstract Model](/details/arc-data-model/) supplies common concepts for these descriptions, while optional Workspace Profiles and publication services address practical needs of producers and consumers.
