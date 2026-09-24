---
title: "Notes on action chunking"
number: 14
date: 2026-09-25
tag: papers
minutes: 4
---

[Sample entry — replace with your own.] Instead of predicting one action per
timestep, a chunked policy predicts the next k actions at once and executes them
before querying again.

Fewer decisions per episode means fewer chances for small errors to compound —
which is exactly where single-step imitation learning tends to fall apart.

```python
actions = policy(obs)[:k]   # k-step chunk
for a in actions:
    robot.step(a)
```

Today I learned: [one-line takeaway].
