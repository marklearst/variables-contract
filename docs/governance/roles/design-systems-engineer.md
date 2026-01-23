---
title: Role - Design Systems Engineer
---

# Variable Governance - Design Systems Engineer Role

Owns the variable contract and the pipeline that turns variables into outputs teams can ship.

## Responsibilities

- Own the Variable Contract ([Variable Contract](/variable-contract/contract/variable-contract)) and its validation requirements.
- Maintain naming rules and category boundaries (base, alias, component).
- Review variable changes for contract correctness, references, and mode strategy.
- Define how variables are consumed in code (CSS variables, TypeScript, theming). Treat changes like API changes.
- Maintain adapter inputs and outputs (example: Figma exports in, build artifacts out), without making tool metadata a dependency.
- Publish release notes and migrations for breaking changes.

## What success looks like

- Renames and reference changes are handled like API changes (reviewed, versioned, documented).
- Designers can author variables without creating duplicate values or unreviewable naming.
- Engineers can consume variables with minimal manual wiring.
- Releases include migration notes when something breaks.
- Adapters can evolve without breaking the core contract.

## Interfaces

- Design: owns semantic intent and mode definitions.
- Engineering: owns consumption patterns, build outputs, and upgrade paths.
- Product: agrees on change priorities and release timing.

## Non-goals

- Owning product feature delivery.
- Encoding tool-specific metadata as required contract fields.
