---
title: "DiffusionPack: Preference-Aware Bin Packing"
date: 2025-02-15 13:10:00 +0530
categories: [Projects]
tags: [diffusion-models, optimization, planning, human-preferences]
subsection: Planning and Optimization
image: /assets/projects/diffusionpack-bin-packing.png
---

DiffusionPack studies 3D bin packing when the objective is not just volume efficiency. In many real packing problems, humans care about softer constraints: fragile objects should be protected, frequently used items should remain accessible, similar objects may need to be grouped, and heavy objects should not be stacked on delicate ones.

The project frames packing as a preference-aware planning problem. Instead of optimizing only a fixed geometric score, the planner incorporates custom human preferences, including natural-language constraints, and generates feasible arrangements that better match the user's intent.

## Planning Problem

Each object is represented by geometry, pose, category, and preference-relevant attributes such as fragility, weight, access priority, grouping labels, or orientation constraints. A candidate packing plan has to satisfy hard feasibility constraints while also maximizing softer human preference scores.

## System Design

- **Object representation:** bounding boxes or meshes, dimensions, mass category, fragility, and semantic labels.
- **Preference parsing:** convert user preferences into constraints, penalties, or ranking terms.
- **Diffusion planner:** sample candidate arrangements and refine them toward feasible, preference-satisfying layouts.
- **Constraint checks:** reject collisions, out-of-bin placements, unstable stacks, and invalid orientations.
- **Scoring:** combine packing density with preference satisfaction, stability, accessibility, and rule violations.

## Examples Of Preferences

- Keep fragile objects away from heavy contact.
- Place frequently accessed objects near the top or front.
- Group related items together without forcing unsafe stacking.
- Preserve upright orientation for objects that should not be rotated freely.
- Leave clearance around objects that may need to be removed first.

## Evaluation Signals

A useful packing planner should be judged on more than occupied volume. I would track feasibility rate, average unused volume, number of preference violations, stability of the arrangement, sensitivity to new preferences, and how often the system can adapt without retraining.

## Takeaway

This line of work connects robotics-adjacent planning with human-aligned decision making. A robot that packs, sorts, or organizes physical objects needs to understand more than collision-free geometry; it needs to preserve the priorities of the person it is helping.
