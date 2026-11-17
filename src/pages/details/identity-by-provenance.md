---
layout: ../../layouts/MarkdownLayout.astro
title: 'Identity by Provenance'
description: 'Understand research objects through the experimental, computational, and engineering activities that use and produce them.'
tags: ["metadata", "documentation"]
---

**Identity by Provenance** asks: which activities used, generated, or transformed this research object? Describing an object through its participation in research makes its production history and the context of its use discoverable.

This annotation principle applies to experimental, computational, and other research activities. It guides structures that connect inputs and outputs through the procedures performed, their parameters, and the conditions recorded for those activities.

## Understanding an object through its history

A result is easier to assess when a reader can discover the measurements it used and the analysis that produced it. Those measurements can, in turn, be connected to acquisition and sample preparation.

The planned procedure and a particular execution have different roles. A protocol or workflow describes how work is intended to be performed. The execution records what happened with particular inputs, parameters, and outputs. Reusing a procedure can produce several executions, each with its own context.

Connecting the output of one activity to the input of the next makes a research history navigable across individual steps. The available account depends on what was documented; a chain of relationships alone cannot supply missing experimental detail.

The same principle applies to physical research objects. Manufacturing components, assembling and calibrating an instrument, and using it to collect measurements can form a connected history. Each activity retains the procedures and conditions relevant to its domain.

## From samples to an abundance analysis

Consider protein abundance measurements obtained from biological samples and analyzed computationally. A provenance description connects the samples to preparation, the prepared material to instrumental measurement, and the resulting measurements to the analysis.

The final result can then be traced through those activities. Preparation conditions, instrument settings, and analysis parameters remain associated with the steps in which they were recorded. Experimental and computational work contribute to one connected account while retaining their specific methods and terminology.

Following that account helps a reader discover relevant context. An instrument setting does not automatically become a property of an abundance value, however. Whether a condition should characterize a particular output depends on its scientific meaning, the method, and the question being asked.

## Independently useful, richer in combination

Processes can be documented before their outputs have been fully interpreted. A research context may also use provenance structures without adopting the other annotation perspectives.

- [Identity by Assignment](/details/identity-by-assignment/) states what the abundance values represent, including their proteins, quantities, units, and analytical roles.
- [Identity by Governance](/details/identity-by-governance/) identifies the dataset, its responsible contributors, and its reuse conditions.

Together, these purposes support complementary descriptions of the same objects. Provenance discovers context; scientific interpretation determines which conclusions that context supports. Recording an inferred characteristic is a further annotation step.

## How ARC RDM realizes the principle

The [Provenance Core](/details/arc-data-model/provenance-core/) provides the shared abstract-model structures: processes, recipes, parameters, inputs, and outputs. Shared inputs and outputs allow processes to be composed into a research history, independently of a particular file format.

The [Provenance Core Profile](/details/arc-ro-crate/#provenance-core) realizes these relationships in ARC RO-Crate. Its [profile specification](/ro-crate/provenance-core/) defines their concrete representation and conformance requirements. Domain extensions retain specialized concepts while preserving the relevant shared structures.

[ISA ARC](/details/isa-arc/) combines experimental and computational provenance using the [ISA](/details/arc-data-model/isa/) and [Workflow Run](/details/arc-data-model/wr/) extensions. The [ARC RDM architecture](/details/arc-representation/) explains how compilation connects these workspace descriptions to their publication representation.
