---
layout: ../../layouts/MarkdownLayout.astro
title: 'Identity by Assignment'
description: 'Express the scientific meaning, characteristics, and interpretations assigned to research objects.'
tags: ["ontology", "annotation", "metadata"]
---

**Identity by Assignment** asks: what does this research object represent, and how is it being interpreted? A value, sample, file, or part of a file becomes scientifically understandable when its meaning and relevant characteristics are stated explicitly.

This annotation principle gives researchers a way to communicate meaning independently of an object's administrative identity or production history. It also allows several scientific interpretations of the same object to coexist as research questions change.

## Making scientific meaning explicit

A table column containing numbers does not, by itself, explain what was measured, which quantity the values express, or which unit or scale applies. Those facts may be familiar to the producer but unavailable to a future user.

An annotation connects the values to their scientific interpretation. It should make clear what it describes: a particular sample, a whole file, or a selected part such as a column. Its scope matters as much as its content.

Established vocabularies help researchers express shared meanings. Emerging concepts can also be described explicitly and developed into community conventions over time. The principle leaves scientific content to domain expertise while guiding structures through which that content can be communicated.

## One measurement, several interpretations

Consider a column of protein abundance measurements. Its initial description identifies the protein, the measured quantity, and the corresponding unit or scale. In one analysis, those measurements serve as a normalization reference. In another, they become a feature in a machine-learning model.

The measurements have not changed. Their analytical roles are additional interpretations arising in different contexts. Keeping descriptions distinct from the underlying values allows those roles to be recorded without replacing the original measurement or insisting on a single interpretation.

This also supports later annotation of existing data. A researcher can add a more precise explanation or a new analytical role while retaining earlier descriptions and the data they concern.

## Independently useful, richer in combination

Scientific meaning can be assigned before a full production history is available. Conversely, a recorded process does not remove the need to explain the meaning of its outputs.

- [Identity by Governance](/details/identity-by-governance/) identifies the dataset, its contributors, and its conditions of reuse.
- [Identity by Provenance](/details/identity-by-provenance/) explains the experimental and computational activities in which the measurements participated.

These purposes can be combined around the same research objects. An instrument setting discovered through provenance describes an activity. Deciding whether it also characterizes the resulting values requires scientific interpretation; the connection alone does not assign that meaning.

## How ARC RDM realizes the principle

The [Semantic Core](/details/arc-data-model/semantic-core/) supplies a shared structure for this principle. A descriptor connects scientific annotations to an explicit target, keeping the description separate from the object it describes. Multiple descriptors can therefore characterize the same object.

The [Semantic Core Profile](/details/arc-ro-crate/#semantic-core) realizes these relationships in ARC RO-Crate. Its [profile specification](/ro-crate/semantic-core/) defines their representation and conformance requirements. Shared structure lets software find an annotation and its target; understanding a specialized concept still depends on its vocabulary and scientific context.

The [Datamap extension](/details/arc-data-model/datamap/) applies this approach to files and fragments. [ISA ARC](/details/isa-arc/) brings it into a domain implementation through familiar annotation tables and their publication representation. The [ARC RDM architecture](/details/arc-representation/) explains how those working descriptions reach the Publication Space.
