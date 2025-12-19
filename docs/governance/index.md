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

- [Getting Started](/variable-contract/governance/getting-started)
- [Change Control](/variable-contract/governance/change-control)
- [Validation](/variable-contract/governance/validation)
- [Versioning](/variable-contract/governance/versioning)
- [Migration](/variable-contract/governance/migration)
- [Troubleshooting](/variable-contract/governance/troubleshooting)

## Roles

- [Designer](/variable-contract/governance/roles/designer) - Creates variables in Figma
- [Design Engineer](/variable-contract/governance/roles/design-engineer) - Bridges design and development, owns contract
- [Frontend Developer](/variable-contract/governance/roles/frontend-developer) - Consumes variables in code

## Reference

- [Naming](/variable-contract/contract/naming)
- [Tokens Studio](/variable-contract/adapters/tokens-studio)
- [Accessibility](/variable-contract/governance/accessibility)
