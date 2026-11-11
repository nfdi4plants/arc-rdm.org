---
layout: ../../../layouts/MarkdownLayout.astro
title: PLANTdataHUB
slug: PLANTdataHUB
category: Services
position: 1
contributors: DataPLANT community
tags: 
  - repository
  - collaboration
  - cqc
website: git.nfdi4plants.org
repo: https://github.com/nfdi4plants/DataHUB
readMore: 
  - { text: "DataHUB manual", url: "https://www.nfdi4plants.org/nfdi4plants.knowledgebase/datahub" }
---

An established implementation of the [ARC Data Hub concept]({{INTERNAL_DEV_ARC_DATA_HUB}}), providing **collaborative Git-based ARC workspaces** through GitLab. It includes self-hosting and federation options.
Implements CQC pipelines for ARC validation distributed via the [AVPR service](#avpr), and a semi-automated data publication process for the [ARChive](#ARChive) based on CQC hooks.
The [ARC Search](#arc-search) service can be used to search for ARCs across federated instances.
