---
title: "What a good evaluation can still miss"
subtitle: "A few reflections on new AI capabilities, useful benchmarks, and what a single score leaves out."
author: "YU Chenbo"
date: "2026-09-18"
category: "research"
readingMinutes: 5
---

## Start with the question

Before I run an evaluation, I write down the decision it is supposed to help me make. A score is easier to interpret when I know what kind of progress would matter for the task in front of me.

For a small prototype, that often means collecting a handful of realistic cases and describing what a useful answer would look like. I treat these descriptions as a working hypothesis, and keep revisiting them as the system changes.

## Keep the failures close

My favorite part of an experiment report is the small table of failures. I want to see where the system was uncertain, what information it missed, and whether the problem belonged to the model, the setup, or the question.

I keep the aggregate result alongside these examples. The number gives me a way to compare runs; the examples give me something concrete to investigate next. This is a practice I am still refining, one experiment at a time.
