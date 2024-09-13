---
layout: ../../layouts/MarkdownLayout.astro
title: 'CI/CD for ARCs: Continuous Quality Control'
pubDate: 2024-09-10
description: 'ARCs are first-class citizens in the cloud.'
author: 'Kevin Schneider'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["validation", "quality control", "unit testing"]
---

ARCs are first-class citizens in the cloud. Leverage CI/CD capabilities of cloud platforms such as [PLANTdataHUB](), [GitLab](), or [GitHub]() to automate processes such as validation or publication, and deploy different [ARC perspectives](). Use validation packages to create _**Continuous Quality Control (CQC)**_ pipelines.

## Continuous Deployment

CD can be used to continuously deploy the ARC artifacts to another environment.
PLANTdataHUB for example uses CD to deploy the **RO-Crate metadata representations** of each commit to a central package registry. This way, both representations of the ARC are always in sync and accessible.

## Continuous Integration

Incremental changes on ARCs can be used to trigger _integrations_. When realized as a git repo, this can for example be done on each commit or pull request running a set of validation packages to verify that the ARC is still _valid_ for the respective target after the change.

## Continuous Quality Control (CQC)

- combines CI/CD with validation packages
- CQC hooks