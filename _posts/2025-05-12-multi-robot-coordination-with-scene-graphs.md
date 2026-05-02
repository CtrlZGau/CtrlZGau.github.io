---
title: Multi-Robot Coordination with Scene Graphs
date: 2025-05-12 09:45:00 +0530
categories: [Projects, Robotics]
tags: [multi-robot-systems, scene-graphs, planning, mapping]
subsection: Multi-Robot Systems
cmu_subsection: Multi-Robot Systems
image: /assets/projects/multi-robot-scene-graphs.png
---

At Inspire Lab, I worked on multi-robot coordination strategies for collaborative navigation and task execution in dynamic environments. The challenge is not just moving multiple robots without collisions; it is helping each robot make decisions using a shared representation of space, tasks, obstacles, and other agents.

Scene graphs provide a useful middle layer between raw perception and high-level planning. Instead of treating the world only as pixels or occupancy grids, a graph can encode objects, rooms, traversable regions, semantic labels, robot states, and task-relevant relationships. That representation makes it easier to reason about which robot should go where, which areas are blocked, and when two agents are likely to interfere.

## Representation

The scene graph is designed to carry information that a planner can actually use. Nodes can represent rooms, frontiers, landmarks, task objects, temporary obstacles, robots, and goals. Edges encode relationships such as reachability, visibility, containment, ownership, or task dependency. This keeps the planner from reasoning directly over raw perception output while still preserving semantic structure.

## Pipeline

- **Perception:** segmentation-based mapping identifies regions, obstacles, and task-relevant objects.
- **Graph update:** new observations add, merge, or update graph nodes with confidence and timestamp metadata.
- **Task allocation:** robots choose goals using distance, availability, task priority, and estimated interference.
- **Path reasoning:** graph reachability narrows the search space before local navigation handles geometry.
- **Conflict handling:** the system flags shared corridors, blocked goals, and robots moving toward overlapping regions.

## Evaluation Signals

The metrics that matter are coordination quality and robustness: task completion time, duplicated work, robot idle time, number of path conflicts, replanning frequency, and how gracefully the team handles partial information. A strong graph representation should reduce unnecessary interference without requiring perfect global knowledge.

## Research Direction

The work sits at the boundary between perception and planning. The perception system needs to produce a representation that is stable enough for planning, while the planner needs to tolerate uncertainty and stale information. I am especially interested in graph updates that preserve useful long-term structure while still reacting quickly to dynamic changes.
