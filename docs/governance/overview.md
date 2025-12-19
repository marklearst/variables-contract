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

## Roles

- [Designer](/variable-contract/governance/roles/designer) - Creates variables in Figma
- [Design Engineer](/variable-contract/governance/roles/design-engineer) - Bridges design and development, owns contract
- [Frontend Developer](/variable-contract/governance/roles/frontend-developer) - Consumes variables in code

## Scope

Covers:

- Variable categories (base, alias, component)
- Naming rules
- Change control and semantic versioning
- Accessibility constraints and checks
- Role definitions and responsibilities
