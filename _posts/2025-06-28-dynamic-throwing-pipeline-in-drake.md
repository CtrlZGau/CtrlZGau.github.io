---
title: Dynamic Throwing Pipeline in Drake
date: 2025-06-28 11:30:00 +0530
categories: [Projects, Robotics]
tags: [drake, manipulation, trajectory-optimization, control]
subsection: Robot Learning
cmu_subsection: Controls and Planning
image: /assets/aboutme_3.jpg
---

Throwing is a compact robotics problem with a surprisingly large amount of system design inside it. A robot has to plan a release pose, generate a fast but feasible trajectory, respect joint and torque limits, and still hit a target after the object leaves the gripper. This project used Drake as the modeling and planning framework for building a dynamic throwing pipeline.

The pipeline treats throwing as both a planning and estimation problem. Before release, the robot is constrained by its kinematics and actuation limits. After release, the object follows ballistic dynamics, which makes the release velocity and timing central to the task. Drake made it possible to express these pieces in a single framework and iterate on trajectory generation without rewriting the physics stack each time.

## System Pieces

- Modeled the robot, object, and target geometry for repeatable simulation tests.
- Planned candidate release states from target position and object dynamics.
- Generated arm trajectories that satisfy feasibility constraints before release.
- Added rollout checks for target error, release timing, and trajectory smoothness.

The interesting part of this project was the handoff between continuous control and discrete event timing. A visually reasonable trajectory can miss badly if release happens slightly early or late. That made the project a useful study in how dynamics, planning, and execution details meet in a real robot pipeline.
