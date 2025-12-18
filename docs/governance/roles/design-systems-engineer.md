---
title: Role - Design Systems Engineer
---

# Variable Governance - Design Systems Engineer Role

This role owns the variable contract and the systems that make variables usable across design and engineering.

## Responsibilities

- Own the Variable Contract ([Variable Contract](contract/variable-contract)) and its validation requirements.
- Maintain naming rules and category boundaries (base, alias, component).
- Review variable changes for contract correctness, references, and mode strategy.
- Define consumption patterns in code (CSS variables, TypeScript, theming) and keep them stable.
- Maintain adapter inputs and outputs (example: Figma exports in, build artifacts out), without making tool metadata a dependency.
- Publish release notes and migrations for breaking changes.

## What success looks like

- Variable names and references are stable enough to treat as an API.
- Designers can author variables without creating duplicate values or unreviewable naming.
- Engineers can consume variables with minimal manual wiring.
- Variables ship with predictable versioning, review, and migration notes.
- Adapters can evolve without breaking the core contract.

## Interfaces

- Design: agrees on semantic intent, modes, and naming.
- Engineering: agrees on consumption patterns, build outputs, and upgrade paths.
- Product: agrees on change priorities and release timing.

## Non-goals

- Owning product feature delivery.
- Encoding tool-specific metadata as required contract fields.
