---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Administrative Core'
tags: ["metadata", "documentation"]
description: "Learn how the administrative core identifies, attributes, and manages datasets and their associated resources."
---

**Identity by Governance** means identifying a research object, who is responsible for it, and the conditions under which it may be used. The Administrative Core provides shared structures for recording that context.

It is an independently selectable part of the [ARC Abstract Model](/details/arc-data-model/). Administrative descriptions can identify and attribute a dataset even while its scientific meaning or production history is still being documented.

## Identity, responsibility, and reuse

Administrative descriptions can include identifiers and titles, contributors and organizational affiliations, rights, and version information. These are examples of the information this perspective addresses, rather than a checklist of required fields.

Datasets can reference agents and publications, and agents can reference their organizational affiliations. These are related entities, so the same contributor or organization can be referenced across research outputs. Identifiers such as an ORCID for a person help connect those descriptions to external records.

Contributors may be recorded as work proceeds; rights and version information may develop as resources are prepared for sharing. Keeping these descriptions connected to the dataset carries responsibility and governance context from the [workspace](/details/arc-workspace/) into publication.

## A shared example

Consider a dataset containing a table of experimental measurements and a derived analysis result. Its administrative metadata can identify the dataset, name its contributors, record their affiliations, and state the conditions governing reuse.

This helps a reader understand which research output they are using and whom to credit. Version information can help distinguish that output from related revisions. These descriptions complement, rather than replace, explanations of the measurements and analysis.

## Connected to scientific context

The [semantic core](/details/arc-data-model/semantic-core/) explains the measured variables and their units. The [provenance core](/details/arc-data-model/provenance-core/) connects the measurements to acquisition and the derived result to its analysis inputs and process.

Together, these perspectives allow a dataset to be identified, interpreted, and traced. They can share entities and relationships; the categories do not require separate files or isolated records.

## Representation and publication

[The Administrative Core RO-Crate profile](/ro-crate/administrative-core/) expresses these relationships in the publication representation. It can be used independently or combined with other profiles. The linked specification defines its encoding and conformance requirements.

Identifiers, rights descriptions, and attribution support reuse, but reliable access and long-term availability also depend on the services and stewardship supporting the published research output.
