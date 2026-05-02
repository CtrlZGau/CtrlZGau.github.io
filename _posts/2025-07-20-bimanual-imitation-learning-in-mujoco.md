---
title: Bimanual Imitation Learning in MuJoCo
date: 2025-07-20 10:00:00 +0530
categories: [Projects, Robotics]
tags: [imitation-learning, mujoco, robotics, manipulation]
subsection: Robot Learning
cmu_subsection: Robot Learning
pin: true
cmu_pin: true
image: /assets/aboutme_2.jpg
---

This project explores how a two-arm manipulation system can learn useful behavior from demonstrations rather than from a fully hand-designed controller. The core idea is to represent a bimanual task in MuJoCo, collect or replay demonstrations, and train a policy that can reproduce coordinated arm motion while remaining stable under small changes in object pose and timing.

The work started with environment design. A bimanual robot has more ways to fail than a single-arm setup: the arms can collide, fight each other through the object, or learn motions that only work for a narrow initial state. I modeled the task with explicit state observations for the robot joints, object pose, end-effector positions, and task progress so that the policy could learn coordination rather than memorize a visual trace.

## Technical Focus

- Built a MuJoCo simulation loop for bimanual manipulation experiments.
- Structured demonstrations into state-action trajectories suitable for imitation learning.
- Compared direct behavior cloning with objective-driven imitation variants.
- Added evaluation hooks for rollout success, object displacement, and stability across randomized starts.

The most useful lesson was that the reward or imitation objective is only one part of the system. Small choices in observation design, normalization, rollout resets, and success metrics often decide whether the learned behavior is actually robotics-ready. For future work, I want to connect this with visual inputs, force-aware constraints, and real-world calibration routines.
