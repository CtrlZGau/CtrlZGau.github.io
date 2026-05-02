---
title: Dynamic Throwing Pipeline in Drake
date: 2025-06-28 11:30:00 +0530
categories: [Projects, Robotics]
tags: [drake, manipulation, trajectory-optimization, control]
subsection: Robot Learning
cmu_subsection: Controls and Planning
image: /assets/projects/drake-dynamic-throwing.png
---

Throwing is a compact robotics problem with a surprisingly large amount of system design inside it. A robot has to plan a release pose, generate a fast but feasible trajectory, respect joint and torque limits, and still hit a target after the object leaves the gripper. This project used Drake as the modeling and planning framework for building a dynamic throwing pipeline.

The pipeline treats throwing as both a planning and estimation problem. Before release, the robot is constrained by its kinematics and actuation limits. After release, the object follows ballistic dynamics, which makes the release velocity and timing central to the task. Drake made it possible to express these pieces in a single framework and iterate on trajectory generation without rewriting the physics stack each time.

## Pipeline

- **Target model:** define target position, acceptable landing radius, and object release constraints.
- **Ballistic estimate:** compute candidate release positions and velocities that can reach the target.
- **Robot feasibility:** check whether the manipulator can reach the release state without violating joint limits.
- **Trajectory generation:** produce a smooth pre-release motion that reaches the required end-effector velocity.
- **Event timing:** trigger release at the planned state and evaluate object flight in simulation.

## Drake Components

Drake is useful here because it keeps geometry, dynamics, constraints, and simulation in one environment. The project uses plant models for the robot and object, scene geometry for collision checks, trajectory optimization or inverse-kinematics style constraints for feasible motion, and simulation rollouts to inspect where the object actually lands.

## What I Track

I track release pose error, release velocity error, target miss distance, joint-limit margin, collision-free execution, trajectory smoothness, and sensitivity to small timing offsets. The timing sensitivity is especially important because a trajectory that looks correct can miss badly if release happens a few frames early or late.

## Takeaway

The interesting part of this project is the handoff between continuous control and discrete event timing. Throwing forces the planner to care about both robot feasibility and post-release physics, which makes it a useful testbed for connecting dynamics, planning, and execution details.
