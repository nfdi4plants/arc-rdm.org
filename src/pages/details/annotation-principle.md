---
layout: ../../layouts/MarkdownLayout.astro
title: 'Annotation Principle '
pubDate: 2024-09-13
description: 'A short summary for ARC related tools and services.'
author: 'Timo Mühlhaus'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["tools", "services", "community"]
---

The ARC annotation principle aims to document all processes—from the object of study, through measurements and analysis, to the final results—as data. Each step, whether it involves sampling, sample preparation, measurement, simulation, or analysis, is treated as a process that generates outputs. These outputs can take the form of result files or sample identifiers, which in turn serve as inputs for subsequent processes. This allows for the chaining and branching of different processes, effectively modeling real-world workflows in the lab and providing a clear, documented path leading to the final results. 

Each process is annotated with descriptive metadata in the form of key-value pairs, where the key defines the type of data, and the value may optionally include a unit. For example, the key might be "temperature" with a value of "37" and a unit of "°C." To maintain consistency, avoid errors, and support FAIR data principles, keys should be selected from domain-specific terminologies or dictionaries, where each term or its ID can be referenced. If the value is not numerical, it is recommended to use a controlled term from such a dictionary. 

In the ARC, metadata is organized in tables. The headers store the keys (tags), while the corresponding values are recorded in the cells below. Each row represents a complete path from input to output, detailing the processes or steps involved in producing a given output from its initial input. 

Special header keys have specific meanings, such as sample name, protocol reference, and data.

![Annotation Principle](/arc-website/annotation-principle-figure-1.png)

## ISA Model Key Structuring 

Following the ISA model, keys are enclosed in square brackets. Additional qualifiers may be used to further specify the key. Common qualifiers include: 

- Parameter: Typically used for process-related metadata. 
- Component: Refers to an element used during the process. 
- Characteristic: Describes the properties or characteristics of the input to a given process. 

These conventions ensure a structured and consistent approach to annotating complex experimental workflows, making the data more traceable and understandable. 