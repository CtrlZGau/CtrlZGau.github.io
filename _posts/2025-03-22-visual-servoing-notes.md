---
title: Visual Servoing Notes for Manipulation
date: 2025-03-22 14:20:00 +0530
categories: [Robotics, Blog]
tags: [visual-servoing, perception, control, manipulation]
cmu_subsection: Perception and Control
image: /assets/projects/visual-servoing-manipulation.png
---

Visual servoing is one of the cleanest examples of perception and control depending on each other. The camera gives a robot information about where the task is going wrong, and the controller turns that error into motion. In practice, the hard part is making the visual signal stable enough that the controller does not chase noise.

For manipulation work, I think about visual servoing as a loop with three important questions. What features are reliable enough to track? What coordinate frame should the error live in? How quickly should the robot respond when the camera estimate changes?

## Control Loop

The basic loop is: detect task-relevant features, estimate error, transform that error into a robot command, apply the command, and repeat. In image-based visual servoing, the error can live directly in image space. In position-based servoing, visual features are converted into a pose estimate first. Both approaches depend heavily on calibration, camera latency, and feature stability.

## Practical Design Notes

- Track visual features that are directly tied to the manipulation objective, not just features that are easy to detect.
- Log image-space error, estimated pose error, robot command, and end-effector motion in the same timeline.
- Start with conservative gains so perception noise does not become oscillatory robot motion.
- Treat frame transforms as first-class debug data; many servoing bugs are hidden coordinate mismatches.
- Test with lighting changes, partial occlusion, camera delay, and object pose perturbations before trusting the loop.

## Failure Modes

The main failures are lost features, delayed estimates, bad calibration, unstable gains, and visual ambiguity. A controller can also appear to fail when the real issue is inconsistent timestamping between the camera and robot state. For this reason, I prefer servoing experiments with simple visual dashboards that show the camera view, tracked features, error vector, and command direction together.

## Takeaway

The most useful visual servoing systems are not necessarily the most complicated ones. They are the ones whose failure modes are visible and whose logs make it clear whether the problem is perception, calibration, timing, or control.
