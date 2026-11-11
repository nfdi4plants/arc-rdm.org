---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Data Hub: Collaborative workspaces'
pubDate: 2024-09-10
description: 'Connect collaborative ARC workspaces with automated checks, metadata generation, and publication services.'
author: 'Kevin Schneider'
tags: ["validation", "quality control", "unit testing", "CI", "CD", "continuous integration", "continuous deployment", "continuous quality control"]
---

An **ARC Data Hub** applies Continuous Integration (CI) and Continuous Deployment (CD) practices to collaborative research workspaces. In Git-based implementations, changes can trigger checks, metadata transformations, or other configured tasks.

The [PLANTdataHUB]({{DATAPLANT_ARC_HUB}}) provides an established implementation supporting collaborative work and continuous validation. These services support a workspace; they do not define the [ARC Abstract Model](/abstract-model/) or require every workspace to use the same infrastructure.

## Continuous Deployment

CD can generate and make artifacts available when a workspace changes. These may include metadata exports or computational results, depending on the configured pipeline.

A transformation can prepare [ARC RO-Crate](/ro-crate/) metadata from a supported workspace representation. The resulting graph reflects the information available and the mapping implemented. Pipelines should make it clear which workspace state an artifact describes and whether generation succeeded.

Generating metadata is separate from publication. Depositing a selected output with a repository, arranging access, and assigning a persistent identifier require the relevant publication services.

## Continuous Integration

Changes can trigger selected validation packages. A package checks a stated set of requirements, such as the presence of particular metadata or the consistency of references.

Results can be presented alongside the workspace, for example as reports or status badges. A passing result concerns those checks; it is not a general guarantee of scientific correctness or readiness for every reuse.

See [validation](/details/validation) for the distinction between format checks and requirements specific to a research context.

## Continuous Quality Control

Continuous Quality Control (CQC) connects checks with subsequent actions. A successful assessment can inform or trigger a downstream task when the corresponding integration is configured.

Established DataPLANT publication infrastructure connects workspace content with RO-Crate generation and deposition through a service that assigns persistent identifiers. The [publication process](/details/exchange-and-publication) relates these operations while keeping generation, assessment, and deposition distinct.

Other repository submissions depend on the availability of a suitable mapping, validation requirements, and submission application. Research teams remain responsible for deciding whether the recorded context is adequate for the intended output and audience.
