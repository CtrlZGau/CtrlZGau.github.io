---
title: Multi-Robot Coordination with Scene Graphs
date: 2025-05-12 09:45:00 +0530
categories: [Projects, Robotics]
tags: [multi-robot-systems, scene-graphs, planning, mapping]
subsection: Multi-Robot Systems
cmu_subsection: Multi-Robot Systems
image: /assets/aboutme_2.jpg
---

At Inspire Lab, I worked on multi-robot coordination strategies for collaborative navigation and task execution in dynamic environments. The challenge is not just moving multiple robots without collisions; it is helping each robot make decisions using a shared representation of space, tasks, obstacles, and other agents.

Scene graphs provide a useful middle layer between raw perception and high-level planning. Instead of treating the world only as pixels or occupancy grids, a graph can encode objects, rooms, traversable regions, semantic labels, robot states, and task-relevant relationships. That representation makes it easier to reason about which robot should go where, which areas are blocked, and when two agents are likely to interfere.

## What The Stack Tracks

- Segmentation-based mapping outputs for semantic structure.
- Graph nodes for regions, landmarks, objects, and robot/task states.
- Edges that encode reachability, visibility, ownership, or task dependencies.
- Coordination heuristics for allocation, path selection, and conflict reduction.

The work sits at the boundary between perception and planning. The perception system needs to produce a representation that is stable enough for planning, while the planner needs to tolerate uncertainty and stale information. I am especially interested in making these systems more robust when robots have partial views of the environment.
