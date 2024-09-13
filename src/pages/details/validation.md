---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Validation'
pubDate: 2024-09-10
description: 'ARCs are evolving FDOs. A mechanism to continuously assess quality metrics of an ARC is indispensable during its lifecycle.'
author: 'Kevin Schneider'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["validation", "quality control", "unit testing"]
---

ARCs are evolving FDOs.
A mechanism to continuously assess quality metrics of an ARC is indispensable during its lifecycle.

## Validation: Potential Meanings and Interpretations

The term _validation_ is widely used across various fields, but its meaning can shift depending on context.
Broadly speaking, data can - a bit like language - be validated in terms of **syntax** and **semantics**.

### Syntactic Validation

In the context of data, syntax is usually captured with **data formats** such as _JSON_ or _XML_. An example of syntactic validation of a JSON file would be if a JSON document parser can reach the end of the document fully and unambiguously.

### Semantic Validation

**Semantics is the study of linguistic meaning.**
In the context of data validation, this usually means that data must fulfill certain requirements by a consuming application to be considered meaningful.
Semantic Validation ensures that data is within the boundaries that an application will understand.
If that is the case, the data is considered _valid_.

Most real-world use cases of data validation fall under this category (usually following an initial syntactic validation step), as context is typically necessary to ingest and process data. To stick with the JSON example, [JSON Schema](https://github.com/json-schema-org/json-schema-spec) provides a vocabulary to create a schema file that formulates the  target-specific context for semantic validation of JSON documents.

## ARC-specific challenges

**_Virtually all file formats are allowed_**.
The nature of the broad specification of the ARC means that it is unfeasible to impossible to validate it holistically.
It is however possible to syntactically validate the ARC metadata documents of its [respective representations]()

**_The ARC itself has no domain context_**.
The same is true for a 'general' semantic validation of ARCs with existing tools due to the myriad of possible contexts that arise from containing any kind of experiment.
The ARC does not have a single domain logic to adhere to. It is intentionally designed to encompass any data shape and therefore has almost no _semantic_ requirements.
This means that only _target specific_ semantic validation of ARCs is feasible.

**_The ARC may have external or generative references_**.
The ARC is not a single document, a challenge that can not be overcome when assessed exclusively via their metadata document formats.
It contains data, workflow artifacts, run results, etc.
It can reference external data and semantic contexts (e.g. ontologies).
Paths for example may be correct as in they are formatted like a correct URI, but a workflow must first be executed to produce it.

**_The solution lies in unit testing_**.
To overcome these challenges, we again borrow from software development principles - this time: _unit testing_.
Unit testing usually involves a fine-grained set of requirements or _assertions_ formulated for a program that it must fulfill.
Assertions on an ARC must be context specific for experiment type, data analysis methodology, endpoint repository etc. - it might be necessary to pull external data, run additional programs, and content can be "conditionally valid" based on other data.

## Validation as a pull model

- assertions formulated for parts of the ARC
- programmatically retrieve (pull) relevant parts to validate
- reference provenance graph section

### Validation packages
