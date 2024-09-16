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

ARCs are first-class citizens in the cloud.
Leverage CI/CD capabilities of cloud platforms such as [PLANTdataHUB](), [GitLab](), or [GitHub]() to automate processes such as validation or publication, and deploy different [ARC perspectives]().
Use validation packages to create _**Continuous Quality Control (CQC)**_ pipelines.

## Continuous Deployment

CD can be used to continuously deploy ARC artifacts such as metadata export formats, computational results, etc. to another environment.

[PLANTdataHUB](git.nfdi4plants.org) for example uses CD to deploy the [**RO-Crate metadata representations**]() of each commit to a central package registry.
This way, both representations of the ARC are always in sync and accessible, deploying both a user-centric and a machine-readable view on the ARC.

![PLANTdataHUB uses CD to couple user-centric and machine readable ARC perspectives](/arc-website/ci-cd-arc-application.png)

## Continuous Integration

Incremental changes on ARCs can be used to trigger _integrations_.
When realized as a git repo, this can for example be done on each commit or pull request running a set of validation packages to verify that the ARC is still _valid_ for the respective target after the change.

[PLANTdataHUB](git.nfdi4plants.org) for example integrates the execution of user-selected [validation packages]() on each commit to the ARC.
Furthermore, the validation package output is integrated to create badges on the ARC repository that continuously inform the user about the current state of the ARC.

## Continuous Quality Control (CQC)

Continuous Quality Control (CQC) is a combination of CI and CD that integrates external services depending on the result of ARC validation.
Successful validation can trigger downstream applications, either automatically or manually.

[PLANTdataHUB](git.nfdi4plants.org) for example uses CQC for it's data publication pipeline, ensuring that necessary metadata for publication is present.
CQC can also be used to enable submission to end point repositories, such as PRIDE, ENA, or BioImage Archive.

![cqc can be used to submit relevant parts of an ARC to endpoint repositories](/arc-website/ci-cd-cqc.png)
