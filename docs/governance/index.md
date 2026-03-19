---
title: Variable Governance Overview
---

# Variable Governance Overview

Governance is what keeps variable changes boring: reviewed, versioned, and safe to roll out.

## What a governed variable system provides

- A shared variable contract between design and code.
- Variable names and structures that support CI validation and code generation.
- A semantic layer that prevents direct palette usage in components.
- Change control and versioning so upgrades are explicit.

## Operating model

- Base variables: palettes and scales (raw values live here).
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

- [Getting Started](/variables-contract/governance/getting-started)
- [Change Control](/variables-contract/governance/change-control)
- [Validation](/variables-contract/governance/validation)
- [Versioning](/variables-contract/governance/versioning)
- [Migration](/variables-contract/governance/migration)
- [Troubleshooting](/variables-contract/governance/troubleshooting)

## Roles

- [Designer](/variables-contract/governance/roles/designer) - Creates variables in Figma
- [Design Engineer](/variables-contract/governance/roles/design-engineer) - Bridges design and development, owns contract
- [Frontend Developer](/variables-contract/governance/roles/frontend-developer) - Consumes variables in code

## Reference

- [Naming](/variables-contract/contract/naming)
- [Tokens Studio](/variables-contract/adapters/tokens-studio)
- [Accessibility](/variables-contract/governance/accessibility)
