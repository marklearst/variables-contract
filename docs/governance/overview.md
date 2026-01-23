---
title: Variable Governance
---

# Variable Governance

Governance is how you keep a token change from turning into a cleanup project across components.

The rules here treat variable names and references like an API: changes are reviewed, and breaking changes are called out.

The contract rules (schema and validation expectations) live in [Variable Contract](/variable-contract/contract/variable-contract).

## Principles

- Variable names are an API.
- Prefer semantic aliases for UI usage.
- Keep base scales and palettes unchanged unless you plan a migration.
- Treat variable JSON (Design Tokens JSON) as the contract.

## What good looks like

- Designers can work with variables in Figma without creating duplicate values.
- Engineers can consume variables via generated outputs (CSS variables, TypeScript) with minimal manual wiring.
- Variable changes are reviewed, versioned, and communicated.

## Scope

Covers:

- token categories (base, alias, component)
- naming rules
- Tokens Studio usage guidelines
- change control and semantic versioning
- accessibility constraints and checks
