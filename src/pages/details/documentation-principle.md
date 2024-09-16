---
layout: ../../layouts/MarkdownLayout.astro
title: 'Documentation and Annotation'
pubDate: 2024-09-13
description: 'A introduction to the ARC documentation and annotation principles.'
author: 'Timo Mühlhaus'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["community", "organization", "project management"]
---

## Documentation Principle

In the course of addressing individual research questions, researchers generate data through systematic investigations. These investigations involve a structured process aimed at exploring and examining specific questions or problems to uncover new insights or evidence. The Annotated Research Context (ARC) serves as both the documentation framework and the container that organizes the investigation, encompassing all collected data, metadata, and analyses. While the ARC covers the entire research cycle, this document focuses on annotating and structuring the preparation of experiments, the process of data collection, and its analysis. 

To facilitate a shared understanding, a standardized nomenclature is introduced. The ARC adopts and extends the widely used ISA model, where ISA stands for Investigation, Study, and Assay. In addition to the ISA framework, the ARC includes Workflows and Runs. 

A single ARC encapsulates one investigation. The metadata of an investigation includes a title and a description of its focus. The authors and contributors to the research may include colleagues, measurement facility experts, bioinformaticians, supervisors, and supporting technicians. 

Crucially, the investigation also holds information about the objects or samples under study, which may be grouped into one or more studies. The study metadata describe the samples and observables, especially the processes leading to sample generation. One or more studies may be included in an investigation, depending on how the samples are intended to be processed or analyzed. 
![Documentation Principle](/arc-website/documentation-principle-study.png)

Samples, once created, typically undergo assays, which involve measurements or analyses of samples from one or multiple studies. The assay includes both the data generated and the metadata describing the process. If the samples require special treatment for a specific assay, the relevant metadata should be incorporated into the assay documentation.
![Documentation Principle](/arc-website/documentation-principle-assay.png)

When computational analysis is performed on a sample or on the data resulting from an assay, this process is referred to as a run.
![Documentation Principle](/arc-website/documentation-principle-run.png)
A workflow, on the other hand, is the computational protocol detailing how the data is processed, simulated, or analyzed on a computer without actually executing the computation. Since workflows offer significant value for reuse in other datasets, they are documented separately from runs. 
![Documentation Principle](/arc-website/documentation-principle-workflow.png)

> Notice: The ARC is designed to document the entire journey (process) from the object of study, through measurements and analysis (as processes) to the final results. This journey represents a process of processes, capturing each stage as part of the broader transformation from observable phenomena to conclusive outcomes. The ARC annotation principle is to add tags on these process for documentation.  

(The term "experiment" is avoided here to prevent confusion, as it can intuitively overlap with "investigation," "study," or "assay" depending on context.) 

![Documentation Principle](/arc-website/arc-process-graph.png)

## Annotation Principle

The ARC annotation principle aims to document all processes—from the object of study, through measurements and analysis, to the final results—as data. Each step, whether it involves sampling, sample preparation, measurement, simulation, or analysis, is treated as a process that generates outputs. These outputs can take the form of result files or sample identifiers, which in turn serve as inputs for subsequent processes. This allows for the chaining and branching of different processes, effectively modeling real-world workflows in the lab and providing a clear, documented path leading to the final results.

Each process is annotated with descriptive metadata in the form of key-value pairs, where the key defines the type of data, and the value may optionally include a unit. For example, the key might be "temperature" with a value of "37" and a unit of "°C." To maintain consistency, avoid errors, and support FAIR data principles, keys should be selected from domain-specific terminologies or dictionaries, where each term or its ID can be referenced. If the value is not numerical, it is recommended to use a controlled term from such a dictionary. 

In the ARC, metadata is organized in tables. The headers store the keys (tags), while the corresponding values are recorded in the cells below. Each row represents a complete path from input to output, detailing the processes or steps involved in producing a given output from its initial input. 

Special header keys have specific meanings, such as sample name, protocol reference, and data.

![Annotation Principle](/arc-website/annotation-principle-figure-1.png)

### Parametrization Columns

Following the ISA model, parametrization keys are enclosed in square brackets. An additional column type is written before this key to specify what the content in the column is referring to. Common types include: 

- **Parameter:** Typically used for process-related metadata. 
- **Component:** Refers to an element used during the process. 
- **Characteristic:** Describes the properties or characteristics of the input to a given process. 

The main column is followed up by additional columns providing contextual information about the ontology terms used. 

### I/O Columns

To annotate the entities that are transformed and created in the processes, Input and Output columns are used. The type of entity is enclosed in square brackets. Common types include: 

- **Material:** Physically existing entities. 
- **Sample:** Physically existing biological samples. 
- **Data:** Digital data stored in the ARC or online.

Different entities of data, stemming from distinct process setups or parallel measurements of distinct input samples, are often stored together in the same data file. In these cases, referencing the data file does not unambiguously represent the provenance graph. Therefore, following well established semantic web standards, Data Fragment Selectors can be appended to the file path to annotate specific fragments of these files.

----------

These conventions ensure a structured and consistent approach to annotating complex experimental workflows, making the data more traceable and understandable. 