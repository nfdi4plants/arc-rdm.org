---
layout: ../../layouts/MarkdownLayout.astro
title: 'RDM and FAIRness'
pubDate: 2024-09-13
description: 'Research data management and incremental progress toward FAIR data publication.'
author: 'Timo Mühlhaus'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["Data publication", "FAIRness", "FAIR digital object"]
---

### Research Data Management (RDM)

ARC supports Research Data Management (RDM) by connecting active research documentation with publication descriptions. RDM involves managing research data throughout their lifecycle, including:

- Collecting
- Organizing
- Documenting
- Processing
- Analyzing
- Storing
- Sharing

The [ARC Workspace](/details/arc-workspace/) supports documentation during these activities. Preparing [ARC RO-Crate](/details/arc-ro-crate/) brings the recorded context into a publication representation for consumers beyond the original team.

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

### Data Publication: Solving the Data Reuse Problem

Traditionally, researchers are evaluated based on the knowledge they publish in scientific journals. However, the data behind these publications also hold substantial value. 

- **Reusability**: Data can be reused to generate further insights, validate findings, or support new research directions.
- **Re-examination**: As new techniques or theories emerge, existing data may need to be revisited.
- **Evolution of conclusions**: Scientific conclusions can change or evolve when additional data is considered.

Unfortunately, in traditional publications, data often remain buried in supplemental materials or summarized in figures, making it difficult to reuse. This approach does not scale well with the growing volumes of research data, which needs to be findable, accessible, and usable in more structured ways.

### Data as a Primary Product in Science

Data itself is a primary product of scientific research, holding significant intrinsic value. It can be:
- **Reused** to drive new discoveries and insights
- **Re-examined** when novel techniques or theories arise
- **Reintegrated** with new datasets to refine or revise conclusions

Reuse depends on context. Administrative descriptions identify and attribute data, provenance relates them to the processes that produced them, and semantic descriptions explain their scientific meaning. These complementary perspectives help consumers judge whether data are appropriate for a new purpose.

### FAIR Digital Objects (FDOs) and Data Publication

Research outputs can be published and cited independently of a journal article. ARC RO-Crate is the FAIR Digital Object representation used in ARC's Publication Space, connecting data with explicit contextual metadata.

The **FAIR Data Principles** (Findable, Accessible, Interoperable, Reusable) guide the description and handling of data and metadata for human and machine use.

- **Findable**: Data should be easy to locate, indexed, and searchable.
- **Accessible**: Data and metadata should have clear access mechanisms and conditions using standardized protocols.
- **Interoperable**: Data should be compatible with other datasets, enabling integration.
- **Reusable**: Data should be well-documented, structured, and licensed for reuse.

FAIRness can be assessed and improved incrementally. The format of an object alone does not establish its FAIRness; documentation, repository services, access arrangements, and community requirements also matter. See [ARC RO-Crate and FAIR Digital Objects](/details/arc-fdo).

### FAIRness as an Ongoing Process

An evolving workspace allows contributors to improve context as research develops. Publication requirements can guide that work, while a published output provides an identifiable state for citation and reuse. Transformation, conformity assessment, and publication are distinct parts of this process.

![Gradual FAIRness](/fairness-gradual-process.png)

### "Small Data Done Right" is Big Data

When data are well-managed and shared effectively, even small datasets can contribute to large-scale scientific efforts. Combining data across studies requires data-sharing practices that extend beyond the lifespan of individual projects. This reinforces the idea that **research done right is teamwork by default**, and well-structured, shareable data is a cornerstone of collaborative science.

![RDM long tail data](/fairness-long-tail-data.png)

The [ARC Abstract Model](/details/arc-data-model/) supplies common concepts for these descriptions while workspace profiles and publication services address the practical needs of producers and consumers.
