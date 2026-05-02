---
title: Bimanual Imitation Learning in MuJoCo
date: 2025-07-20 10:00:00 +0530
categories: [Projects, Robotics]
tags: [imitation-learning, mujoco, robotics, manipulation]
subsection: Robot Learning
cmu_subsection: Robot Learning
pin: true
cmu_pin: true
image: /assets/projects/bimanual-imitation-learning.png
---

This project studies how a two-arm manipulation system can learn coordinated behavior from demonstrations instead of relying on a fully hand-written controller. The goal is not just to replay arm motion, but to learn a policy that preserves the important structure of a bimanual task: synchronized reach, stable grasp timing, object handoff or transport, and recovery from small pose changes.

## Problem Setup

A bimanual robot has more failure modes than a single-arm setup. The arms can collide, pull the object in opposite directions, learn a brittle sequence that only works from one initial pose, or produce motions that look smooth in joint space but fail at the object level. I treated the simulation as a data pipeline first, then as a learning problem.

The environment tracks joint positions and velocities, end-effector poses, object pose, contact state, and task progress. Demonstrations are converted into fixed-rate state-action trajectories so that training and evaluation use the same clock, reset logic, and observation normalization.

## System Design

- **Simulator:** MuJoCo task scene with two manipulators, task object, workspace limits, and randomized initial object poses.
- **Observation vector:** joint state, gripper pose, object position/orientation, relative end-effector-object offsets, and phase or progress indicators.
- **Action space:** joint velocity or target delta commands, depending on the controller wrapper used for the experiment.
- **Data format:** demonstration rollouts stored as aligned state, action, reward, done, and metadata records for reproducible training.
- **Training loop:** behavior cloning baseline with hooks for objective-driven imitation and rollout-based validation.

## Evaluation Signals

The important metrics are object-centric rather than only policy-centric. I track whether the object reaches the target region, whether both arms remain coordinated during contact, whether collisions occur, and how far performance drops when the start pose is randomized. I also log rollout videos and state traces because bimanual failures are often easier to understand visually than from a scalar score.

## What I Learned

The imitation objective matters, but small engineering choices matter just as much. Observation scaling, reset consistency, gripper timing, and success definitions can decide whether a policy learns robust coordination or simply memorizes a demonstration trace. The next step is to connect this pipeline with visual observations and force-aware constraints so the learned behavior is less dependent on privileged simulator state.
