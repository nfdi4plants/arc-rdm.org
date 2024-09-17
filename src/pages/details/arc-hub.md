---
layout: ../../layouts/MarkdownLayout.astro
title: 'ARCHub: Bring your ARCs to the cloud'
pubDate: 2024-09-10
description: 'The ARCHub concept applies the software development principles of CI/CD to the research data management framework provided by ARCs, making ARCs first-class citizens in the cloud.'
author: 'Kevin Schneider'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["validation", "quality control", "unit testing", "CI","CD", "continuous integration", "continuous deployment", "continuous quality control"]
---

The **ARCHub** concept applies the software development principles of _Continuous Integration (CI)_ and _Continuous Deployment (CD)_ to the research data management (RDM) framework provided by ARCs, making ARCs first-class citizens in the cloud.
ARCs can be continuously validated, built, and deployed much like software.
By using CI/CD for a set of subsequently defined tasks, many collaborative cloud platforms such as GitLab, GitHub, or Bitbucket can be used to build an ARCHub.

![ARCHub leverages CI/CD capabilities to build, deploy, and validate ARCs](/arc-website/archub-overview.png)

## Continuous Deployment

CD can be used to continuously deploy ARC artifacts such as metadata export formats, computational results, etc. to another environment.

ARCHubs use CD to build and deploy the [ARC-RO-Crate metadata]({{INTERNAL_DEV_REPRESENTATION_RO_CRATE}}) of each commit to a central package registry.
This way, both [representations of the ARC]({{INTERNAL_DEV_REPRESENTATION}}) are always in sync and accessible, deploying both a user-centric and a machine-readable view on the ARC.

![ARCHubs use CD to build and deploy the ARC-RO-Crate metadata](/arc-website/ci-cd-arc-application.png)

## Continuous Integration

Incremental changes on ARCs can be used to trigger _integrations_.
ARCHubs can run a user-selected set of validation packages on each commit or pull request to verify that an ARC is still _valid_ for the targets of choice after the change is done .

Furthermore, the validation package output can be used to continuously inform the user about the current state of the ARC, for example by creating badges on the ARC page, much like the widely known `build and test` badges in software development.

## Continuous Quality Control (CQC)

Continuous Quality Control (CQC) is a combination of CI and CD that integrates external services depending on the result of ARC validation.
Successful validation can trigger downstream applications, either automatically or manually via _CQC Hooks_.

The [PLANTdataHUB]({{DATAPLANT_ARCHUB}}) serves as a reference implementation of an ARCHub, centrally hosted by the NFDI DataPLANT for the plant research community.
Beyond its core functionality as an ARCHub, it incorporates **CQC** within the data publication pipeline, ensuring that all required metadata for publication is complete and accurate.

CQC also supports submissions to various endpoint repositories, provided the corresponding validation package and downstream submission application are available.
This flexible system ensures that ARC submissions meet the necessary standards for different repositories, enabling seamless integration and data sharing across platforms.

![cqc can be used to submit relevant parts of an ARC to endpoint repositories](/arc-website/ci-cd-cqc.png)
