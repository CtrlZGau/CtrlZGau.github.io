---
title: "DiffusionPack: Preference-Aware Bin Packing"
date: 2025-02-15 13:10:00 +0530
categories: [Projects]
tags: [diffusion-models, optimization, planning, human-preferences]
subsection: Planning and Optimization
image: /assets/aboutme_3.jpg
---

DiffusionPack studies 3D bin packing when the objective is not just volume efficiency. In many real packing problems, humans care about softer constraints: fragile objects should be protected, frequently used items should remain accessible, similar objects may need to be grouped, and heavy objects should not be stacked on delicate ones.

The project frames packing as a preference-aware planning problem. Instead of optimizing only a fixed geometric score, the planner incorporates custom human preferences, including natural-language constraints, and generates feasible arrangements that better match the user's intent.

## Research Direction

- Represent objects with geometry and preference-relevant attributes.
- Convert human preferences into constraints or scoring signals.
- Use a diffusion-based planner to search over candidate 3D arrangements.
- Evaluate not only packing density, but also preference satisfaction and adaptability.

This line of work is exciting because it connects robotics-adjacent planning with human-aligned decision making. A robot that packs, sorts, or organizes physical objects needs to understand more than collision-free geometry; it needs to preserve the priorities of the person it is helping.
