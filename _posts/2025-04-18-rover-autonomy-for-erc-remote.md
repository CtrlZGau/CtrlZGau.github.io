---
title: Rover Autonomy for ERC Remote
date: 2025-04-18 15:00:00 +0530
categories: [Projects, Robotics]
tags: [ros, rover, autonomous-navigation, sensor-fusion]
subsection: Field Robotics
cmu_subsection: Field Robotics
image: /assets/projects/erc-rover-autonomy.png
---

As Software Subsystem Lead at Criss Robotics, I worked on the autonomy stack that helped the team place third in the European Rover Challenge 2025 Remote Category. The remote format made simulation fidelity and operator feedback especially important. The rover needed autonomy that was useful, explainable, and recoverable when the environment did not match the ideal case.

The stack centered on ROS-based navigation, terrain perception, and multi-sensor fusion. My focus was building workflows that let the team test rover behavior repeatedly in simulation, inspect failures quickly, and keep manual operators informed when autonomy needed help.

## Autonomy Stack

- **State estimation:** fused odometry, inertial data, and simulated sensor streams into a consistent rover pose estimate.
- **Mapping:** generated local terrain representations from depth or point-cloud style inputs for obstacle awareness.
- **Traversability:** separated safe driving regions from rocks, steep surfaces, and unreliable map zones.
- **Planning:** used waypoint-driven navigation with local obstacle checks and recovery behavior.
- **Operator support:** exposed map, pose, path, and autonomy state so failures could be understood during runs.

## Engineering Details

The competition workflow depended on fast iteration. I helped structure launch files, simulation scenes, logs, and visualization topics so the team could reproduce a run, inspect where localization or path planning drifted, and test a fix without rebuilding the whole stack. Unity-based simulation gave us a controlled environment for rover driving scenarios, while ROS kept the autonomy modules modular enough to test independently.

## What We Measured

Useful rover metrics included waypoint completion, path deviation, number of autonomy interruptions, obstacle clearance, map update rate, and recovery success after blocked paths. The most useful debugging artifact was often a synchronized view of pose, planned path, terrain map, and operator command history.

## Takeaway

Rover autonomy is never only an algorithm. It is also calibration, launch reliability, logs, visualization, operator trust, and recovery paths. The strongest systems are the ones that make failure visible quickly.
