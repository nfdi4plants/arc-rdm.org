---
layout: ../../layouts/MarkdownLayout.astro
title: 'Identity by Governance'
description: 'Identify research objects through responsibility, attribution, and the conditions governing their use.'
tags: ["metadata", "documentation"]
---

**Identity by Governance** asks: which research object is this, who is responsible for it, and under which conditions can it be used? A dataset gains an identifiable place in research through its identifiers, contributors, institutional context, related publications, and conditions of access and reuse.

This is one of ARC RDM's three annotation principles. It guides the design of shared structures for identifying and attributing research objects. Communities decide which information they need to document for a particular purpose.

## Recognizing an accountable research object

A file name may help a research team locate its data, but someone outside the team also needs to recognize the research output, distinguish it from related versions, and understand whom to credit. Recording responsibility and reuse conditions makes that context explicit.

Governance context can grow during research. Contributors become known as work proceeds; publications and release identifiers may be added later. The principle applies throughout that development, including before a dataset is ready for publication.

The same person or organization may contribute to several outputs. Treating those contributors as identifiable participants allows their relationships to be followed across research objects. Publication services can build on this information to support discovery and citation.

## A dataset of protein abundance measurements

Consider a dataset containing protein abundance measurements and a computational analysis of those measurements. Its governance context identifies the dataset, the researchers and institutions responsible for it, related scientific publications, and the conditions governing reuse.

When a collaborator shares a revised analysis, an identifiable version helps another researcher establish which output they are using. Attribution connects that output to its contributors. A licence or other recorded reuse conditions helps the researcher assess how it can be used.

These descriptions establish responsibility and distinguish research objects. Understanding what the abundance values mean and how the analysis produced its result requires the complementary scientific context.

## Independently useful, richer in combination

Governance descriptions can be useful even when scientific annotations or production history are incomplete. A catalogue can identify and attribute a dataset while its documentation continues to develop.

Combining the principles gives readers additional routes into the same research object:

- [Identity by Assignment](/details/identity-by-assignment/) explains the proteins, quantities, units, and analytical roles represented by the measurements.
- [Identity by Provenance](/details/identity-by-provenance/) traces sample preparation, measurement, and computational analysis.

The principles describe complementary annotation purposes. They guide composable structures rather than prescribing a universal list of metadata fields or requiring separate records for each perspective.

## How ARC RDM realizes the principle

The [Administrative Core](/details/arc-data-model/administrative-core/) supplies the shared abstract-model structures: datasets connected to agents, organizations, publications, and information about identification and reuse. Those concepts are independent of a working format and support the path from workspace documentation to publication.

In the Publication Space, the [Administrative Core Profile](/details/arc-ro-crate/#administrative-core) expresses this structure in ARC RO-Crate. Its [profile specification](/ro-crate/administrative-core/) defines the concrete representation and conformance requirements. Publication infrastructure supplies further services, such as persistent identification and long-term access.

[ISA ARC](/details/isa-arc/) shows how a domain implementation maintains this context alongside experimental and computational descriptions. For the relationship between principles, shared structures, and the two spaces, continue with [the ARC RDM architecture](/details/arc-representation/).
