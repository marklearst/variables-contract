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

- [Getting Started](getting-started)
- [Change Control](change-control)
- [Validation](validation)
- [Versioning](versioning)
- [Migration](migration)
- [Troubleshooting](troubleshooting)

## Roles

- [Designer](roles/designer) - Creates variables in Figma
- [Design Engineer](roles/design-engineer) - Bridges design and development, owns contract
- [Frontend Developer](roles/frontend-developer) - Consumes variables in code

## Reference

- [Naming](/contract/naming)
- [Tokens Studio](/adapters/tokens-studio)
- [Accessibility](accessibility)
