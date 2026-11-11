---
layout: ../../layouts/MarkdownLayout.astro
title: 'Versioning'
pubDate: 2024-09-18
description: 'Track changes in research workspaces and distinguish evolving documentation from publication versions.'
author: 'Heinrich Lukas Weil'
tags: ["git", "FAIR Digital Object"]
---

Research data and their descriptions change during a project. New results, corrected annotations, and additional context need a history that collaborators can follow. A publication, meanwhile, needs an identifiable version of the output being described.

## Immutable yet evolving

An [ARC Workspace](/details/arc-workspace/) can continue to develop before and after a publication. Versioning records stages of that work so that changes can be reviewed and particular states identified.

Established ISA-based ARC workspaces use Git for this purpose. Commits record snapshots and their history; branches support parallel contributions. Git repositories are an implementation choice for these workspaces, rather than a requirement of the [ARC Abstract Model](/details/arc-data-model/).

![Git-based workspace example: documentation improves through successive versions](/git-fairification.png)

Git history records changes to the workspace. [Scientific provenance](/details/arc-data-model/provenance-core/) describes the experimental and computational processes that generated, used, or transformed research resources. Recording one does not replace documenting the other.

### Collaboration in a Git-based workspace

Git supports shared work through many hosting platforms. Collaborators can review contributions and coordinate changes to data and metadata. Clear conventions for identifiers and organization remain necessary when combining their work.

![Git-based workspace example: collaborators contribute changes to shared research](/git-collaboration.png)

Git LFS is used in established ARC implementations to manage large files alongside Git-tracked metadata. The storage and access arrangements depend on the chosen hosting environment.

### Publication versions

Transformation can prepare a selected workspace state as [ARC RO-Crate](/details/arc-ro-crate/). A publication service can then provide persistent identification and access to the deposited version.

A Git commit identifies a state in repository history; it does not replace the persistent identifier or preservation arrangements of a publication service. Later changes in the workspace can inform a new publication version through the relevant publication process.

See [publication and exchange](/details/exchange-and-publication) for the distinction between generating metadata, assessing requirements, and publishing an output.
