---
layout: ../../../layouts/MarkdownLayout.astro
title: 'Administrative Core'
tags: ["metadata", "documentation"]
description: "Learn how the administrative core identifies, attributes, and manages datasets and their associated resources."
---

The Administrative Core connects datasets to responsible agents, organizations, scholarly publications, and information about identification and reuse. It is the shared structural realization of [Identity by Governance](/details/identity-by-governance/) in the ARC Abstract Model.

It is an independently selectable part of the [ARC Abstract Model](/details/arc-data-model/) and is independent of metadata serialization. Its structures guide descriptions across workspace and publication representations. A dataset can be identified and attributed even while its scientific meaning or production history is still being documented.

## Identity, responsibility, and reuse

Administrative descriptions can include identifiers and titles, contributors and organizational affiliations, rights, and version information. These are examples of the information this perspective addresses, rather than a checklist of required fields.

Datasets can reference agents and publications, and agents can reference their organizational affiliations. Agents and organizations are identifiable entities, allowing the same contributor or institution to be referenced across research outputs. Identifiers such as an ORCID for a person help connect those descriptions to external records.

Contributors may be recorded as work proceeds; rights and version information may develop as resources are prepared for sharing. Keeping these descriptions connected to the dataset carries responsibility and governance context from the [workspace](/details/arc-workspace/) into publication.

## A shared example

Consider a dataset containing protein abundance measurements and a derived analysis result. Dataset descriptions identify the research output and its reuse conditions; relationships to agents and organizations identify contributors and their affiliations. Related publications connect the data to the scientific communication that describes or interprets them.

This helps a reader understand which research output they are using and whom to credit. Version information can help distinguish that output from related revisions. These descriptions complement, rather than replace, explanations of the measurements and analysis.

## Connected to scientific context

The [semantic core](/details/arc-data-model/semantic-core/) explains the measured variables and their units. The [provenance core](/details/arc-data-model/provenance-core/) connects the measurements to acquisition and the derived result to its analysis inputs and process.

The cores compose descriptions around shared research objects. Governance, assignment, and provenance are annotation purposes, so their structures can be combined without requiring separate files or isolated records.

## Representation and publication

[ARC RO-Crate's Administrative Core Profile](/details/arc-ro-crate/#administrative-core) expresses these relationships in the publication representation. It can be used independently or combined with other profiles. The [profile specification](/ro-crate/administrative-core/) defines its encoding and conformance requirements.

Working formats can record the same concepts in forms suited to their contributors. [ISA ARC](/details/isa-arc/), for example, captures administrative information alongside experimental and computational descriptions. Compilation interprets the recorded relationships and maps them to the selected publication profiles; it cannot supply missing attribution or reuse information.

Identifiers, rights descriptions, and attribution support reuse, but reliable access and long-term availability also depend on the services and stewardship supporting the published research output.
