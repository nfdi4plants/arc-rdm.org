---
layout: ../../layouts/MarkdownLayout.astro
title: 'Publication and Exchange'
pubDate: 2024-09-22
description: 'Prepare workspace information as ARC RO-Crate, assess publication requirements, and share research outputs.'
author: 'Timo Mühlhaus'
tags: ["community", "exchange", "publication", "collaboration"]
---

### ARCs for Data Publication, Exchange, and Collaboration

The [ARC Workspace](/details/arc-workspace/) supports people producing and documenting research. The **Publication Space** supports consumers who need to interpret those outputs beyond the original team. These are [complementary facets of ARC RDM](/details/arc-representation/), guided by the same annotation principles and connected through the shared abstract model.

[ARC RO-Crate](/details/arc-ro-crate/) is ARC's research-object representation for exchange and FAIR-oriented publication. It connects data with the selected administrative, provenance, and semantic descriptions. The [abstract model](/details/arc-data-model/) provides the shared concepts. Publishing a defined version with persistent identification, access, and supporting services can make it a FAIR Digital Object.

### Data Publication and its Importance

A data publication makes an output available as a resource that can be identified, cited, and reused. It can accompany a journal article or provide a contribution in its own right. Useful descriptions include who produced the data, how they were generated, what their values mean, and under which conditions they may be reused.

This includes data from negative or null results, which can remain useful to other researchers even when they do not lead to a journal article. Recording the methods and conditions helps others interpret those results.

Preparing a publication involves distinct operations:

1. **Maintain context in the workspace.** Record data and their descriptions as research develops.
2. **Compile the information.** Map a selected workspace state or subset to ARC RO-Crate entities and relationships. Supply additional descriptions where local conventions would otherwise be unclear.
3. **Assess the result.** Check the relevant metadata specifications and the requirements of the intended repository or community.
4. **Publish through a service.** Deposit the output under the appropriate access conditions and obtain a persistent identifier where the service provides one.

Generation, assessment, and publication can be connected in an implementation. They remain separate operations: creating an ARC RO-Crate does not by itself assign a DOI or deposit the data.

### An ISA ARC publication pathway

In [ISA ARC](/details/isa-arc/), the reference domain implementation, DataPLANT connects collaborative workspaces to reviewed publication through the following integration:

1. Select the relevant validation package. [PLANTdataHUB](/details/tools-and-services/PLANTdataHUB/) runs checks as the workspace evolves and provides Continuous Quality Control feedback.
2. When the `invenio` package's publication checks pass, the integrated badge leads to [ARChigator](/details/tools-and-services/ARChigator/). Inspect the proposed content and metadata, then submit a publication request.
3. Authors, data stewards, and reviewers can resolve outstanding issues during review. Passing automated checks does not replace acceptance by the publication service.
4. After acceptance, [ARChive](/details/tools-and-services/ARChive/), built on InvenioRDM, publishes the ARC RO-Crate with a DOI. The originating workspace can continue to evolve.

Publication can also concern a subset. A separately configured [WorkflowHub integration](https://github.com/nfdi4plants/endpoint-submission/blob/dev/README.md) can validate and extract selected workflows or runs as Workflow (Run) RO-Crates for submission with the researcher's authorization. The receiving repository determines its requirements and submission representation; available integrations depend on the configured services and tool versions.

### Data Publication and Quality

Automated checks can identify missing fields, invalid references, or failures against a chosen set of requirements. Their results are evidence about those checks. Assessing the adequacy of methods, annotations, and scientific interpretation also requires appropriate expertise.

The context needed for reuse depends on the data and the intended consumers. A vocabulary reference can clarify a variable, but consumers still need to understand its scope and the conditions under which it was measured. See [validation](/details/validation) and [shared vocabulary](/details/shared-vocabulary).

FAIR does not necessarily mean unrestricted access. Publication descriptions should make access conditions and reuse rights clear, including when access to the underlying data is controlled.

### ARCs for Collaboration

Workspace conventions help collaborators associate data with their descriptions and divide documentation responsibilities. A contributor can maintain methodological information while another adds scientific annotations or administrative details.

Git-based implementations can track changes and support shared work through a [Data Hub](/details/arc-data-hub). They still require coordination: identifiers, file organization, and metadata meaning must remain consistent as contributions are combined.

The publication representation captures the context prepared for an output while the workspace can continue to evolve. Later outputs may incorporate further research or improved documentation. See [versioning](/details/versioning) for the distinction between evolving work and identifiable snapshots.
