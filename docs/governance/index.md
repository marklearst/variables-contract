---
title: Variable Governance Overview
---

# Variable Governance Overview

This governance exists to keep variables stable, predictable, and easy to consume across tools and platforms.

## What a governed variable system provides

- A shared variable contract between design and code.
- Stable variable names and structures that support automation.
- A semantic layer that prevents direct palette usage in components.
- Change control and versioning so teams can upgrade safely.

## Operating model

- Base variables: palettes and scales (the raw source of truth).
- Alias variables: semantic variables that reference base variables.
- Component variables: component-scoped aliases that reference semantic variables.

## Where changes happen

- Variables are stored as Design Tokens JSON in version control.
- Design tools can be used for authoring, but the repo is the contract.

## How changes ship

- Variable changes are reviewed.
- Breaking changes are versioned and documented.
- Releases include notes and migration guidance when needed.

## Next docs to read

- [Getting Started](getting-started)
- [Naming](../contract/naming)
- [Tokens Studio](../tooling/tokens-studio)
- [Change Control](change-control)
