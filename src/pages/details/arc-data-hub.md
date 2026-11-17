---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARC Data Hub: Collaborative workspaces'
pubDate: 2024-09-10
description: 'Connect collaborative ARC workspaces with automated checks, metadata generation, and publication services.'
author: 'Kevin Schneider'
tags: ["validation", "quality control", "unit testing", "CI", "CD", "continuous integration", "continuous deployment", "continuous quality control"]
---

An **ARC Data Hub** applies Continuous Integration (CI) and Continuous Deployment (CD) practices to collaborative research workspaces. In Git-based implementations, changes can trigger checks, metadata transformations, or other configured tasks.

The [PLANTdataHUB](/details/tools-and-services/PLANTdataHUB/) provides this collaboration infrastructure for [ISA ARC](/details/isa-arc/). Researchers, facility personnel, computational specialists and data stewards can contribute complementary parts of the research context. Other Domain ARCs can choose infrastructure suited to their own working practices while connecting to the same [Publication Space](/details/arc-ro-crate/).

## Continuous Deployment

CD can generate and make artifacts available when a workspace changes. These may include metadata exports or computational results, depending on the configured pipeline.

Compilation can prepare [ARC RO-Crate](/details/arc-ro-crate/) metadata from a supported workspace representation. The graph reflects the recorded information and the mapping implemented. Pipelines should identify its [workspace revision, transformation, and profile versions](/details/versioning/#publication-versions), and expose missing or unsupported information separately from validation results.

Generating metadata is separate from publication. Depositing a selected output with a repository, arranging access, and assigning a persistent identifier require the relevant publication services.

## Continuous Integration

Changes can trigger selected validation packages. Communities and repositories supply requirements; researchers select packages for their intended targets. A package may check an entire ARC or selected objects for required metadata and consistent relationships.

Reports and status badges provide feedback alongside the workspace. They should identify the target, evaluated scope and revision, and requirement versions. A passing result concerns those checks, rather than scientific correctness or readiness for every reuse.

See [validation](/details/validation) for the distinction between format checks and requirements specific to a research context.

## Continuous Quality Control

Continuous Quality Control (CQC) repeatedly runs selected checks as a workspace evolves, helping contributors fill gaps and correct inconsistencies during research. Actionable badges and downstream tasks can build on that feedback when suitable integrations are configured.

The [ISA ARC publication pathway](/details/exchange-and-publication/#an-isa-arc-publication-pathway) connects PLANTdataHUB validation to an ARChigator publication request, review, and release through ARChive. Validation enables the next step; publication remains a deliberate release of selected research information.

Other repository submissions depend on the availability of a suitable mapping, validation requirements, and submission application. Research teams remain responsible for deciding whether the recorded context is adequate for the intended output and audience.
