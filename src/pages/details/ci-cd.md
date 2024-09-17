---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARCHub: Bring your ARCs to the cloud'
pubDate: 2024-09-10
description: 'The ARCHub concept applies the software development principles of CI/CD to the research data management framework provided by ARCs, making ARCs first-class citizens in the cloud.'
author: 'Kevin Schneider'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["validation", "quality control", "unit testing", "CI/CD", "continuous integration", "continuous deployment", "continuous quality control"]
---

The **ARCHub** concept applies the software development principles of _Continuous Integration (CI)_ and _Continuous Deployment (CD)_ to the research data management framework provided by ARCs, making ARCs first-class citizens in the cloud.
ARCs can be continuously validated, built, and deployed much like software.
By using CI/CD in for a set of subsequently defined tasks, many collaborative cloud platforms such as GitLab, GitHub, or Bitbucket can be used to build an ARCHub.

![ARCHub leverages CI/CD capabilities to build, deploy, and validate ARCs](/arc-website/archub-overview.png)

## Continuous Deployment

CD can be used to continuously deploy ARC artifacts such as metadata export formats, computational results, etc. to another environment.

ARCHubs use CD to build and deploy the [**ARC-RO-Crate metadata]() of each commit to a central package registry.
This way, both representations of the ARC are always in sync and accessible, deploying both a user-centric and a machine-readable view on the ARC.

![ARCHubs use CD to build and deploy the ARC-RO-Crate metadata](/arc-website/ci-cd-arc-application.png)

## Continuous Integration

Incremental changes on ARCs can be used to trigger _integrations_.
ARCHubs can run a user-selected set of validation packages on each commit or pull request to verify that an ARC is still _valid_ for the targets of choice after the change is done .

Furthermore, the validation package output can be used to continuously inform the user about the current state of the ARC, for example by creating badges on the ARC page, much like the widely known `build and test` badges in software development.

## Continuous Quality Control (CQC)

Continuous Quality Control (CQC) is a combination of CI and CD that integrates external services depending on the result of ARC validation.
Successful validation can trigger downstream applications, either automatically or manually via _CQC Hooks_.

[PLANTdataHUB](git.nfdi4plants.org) for example uses CQC for it's data publication pipeline, ensuring that necessary metadata for publication is present.
CQC can also be used to enable submission to any end point repository, given the respective validation package and downstream submission application.

![cqc can be used to submit relevant parts of an ARC to endpoint repositories](/arc-website/ci-cd-cqc.png)
