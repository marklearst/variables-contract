---
title: "Governance: Overview"
---

# Variable Governance Overview

Governance keeps variable changes reviewed, versioned, and safe to roll out.

## What a governed variable system provides

- A shared Variable Design Standard (VDS) between design and code.
- Variable names and structures that support CI validation and code generation.
- A semantic layer that prevents direct palette usage in components.
- Change control and versioning so upgrades are explicit.

## Operating model

- Base variables: palettes and scales (raw values live here).
- Alias variables: semantic variables that reference base variables.
- Component variables: component-scoped aliases that reference semantic variables.

## Where changes happen

- Variables are stored as Design Tokens JSON in version control.
- Design tools can be used for authoring, but the repo is the Variable Design Standard (VDS).

## How changes ship

- Variable changes are reviewed.
- Breaking changes are versioned and documented.
- Releases include notes and migration guidance when needed.

## Workflow

1. Design proposes a change with intended usage.
2. Design Engineer updates JSON and runs validation.
3. Frontend Engineer validates consumption impact.
4. PR is reviewed and merged.
5. Release notes document breaking changes.

## Review checklist

- [ ] Naming follows the contract
- [ ] References resolve and are acyclic
- [ ] Mode keys match within a collection
- [ ] Breaking changes are versioned

## Links

- [Getting Started](getting-started)
- [Change Control](change-control)
- [Validation](validation)
- [Versioning](versioning)
- [Migration](migration)
- [Troubleshooting](troubleshooting)

## Roles

- [Designer](roles/designer): Creates variables in Figma
- [Design Engineer](roles/design-engineer): Bridges design and development, owns contract
- [Frontend Engineer](roles/frontend-engineer): Consumes variables in code

## Related

- [Naming](/contract/naming)
- [Tokens Studio](/adapters/tokens-studio)
- [Accessibility](accessibility)
