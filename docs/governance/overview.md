---
title: Variable Governance
---

# Variable Governance

This governance defines how a design system team creates, changes, reviews, and releases variables.

The goal is stable variable names and predictable change control, so design and engineering can treat variables as a shared contract.

The contract rules (schema and validation expectations) live in `../contract/variable-contract.md`.

## Principles

- Variable names are an API.
- Prefer semantic aliases for UI usage.
- Keep base scales and palettes stable.
- Treat variable JSON (Design Tokens JSON) as the source of truth.

## What good looks like

- Designers can work with variables in Figma without creating duplicate values.
- Engineers can consume variables via generated outputs (CSS variables, TypeScript) with minimal manual wiring.
- Variable changes are reviewed, versioned, and communicated.

## Scope

This repo covers:

- token categories (base, alias, component)
- naming rules
- Tokens Studio usage guidelines
- change control and semantic versioning
- accessibility constraints and checks
