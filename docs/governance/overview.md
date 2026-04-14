---
title: "Governance: Overview Index"
description: "Governance keeps a variable change from turning into a cleanup project across components. The rules here treat variable names and references like an API: changes are reviewed, and breaking changes are called out. The contract rules (schema and validation expectations) live in Variable Design Standard (VDS)."
---

# Variable Governance

Governance keeps a variable change from turning into a cleanup project across components.

The rules here treat variable names and references like an API: changes are reviewed, and breaking changes are called out.

The contract rules (schema and validation expectations) live in [Variable Design Standard (VDS)](/contract/variable-contract).

## Governance purpose

Governance keeps variable changes from breaking components. The contract is the JSON in version control. CI validates structure, naming, references, and modes. Contract changes are reviewed before merge.

## Quality and reliability

- Variable JSON is the contract input.
- CI blocks invalid JSON, broken references, and mode mismatches.
- Review is required for any change that edits names, references, or modes.

## Automation and AI

- Automated checks run on every PR.
- Changes from tools or AI follow the same validation rules.
- Only validated JSON is merged.

## Policies and standards

- Policies define what is allowed.
- Standards define required structure and naming.
- Procedures define the PR steps.

## Workflow

1. Create a PR that changes JSON in version control.
2. Run validation in CI (structure, naming, references, modes).
3. Review changes for breaking impact and release notes.
4. Merge only after checks pass.

## Review checklist

- [ ] Naming and structure follow the contract
- [ ] References resolve and no cycles exist
- [ ] Mode keys match within each collection
- [ ] Breaking changes are documented

## Risk and compliance

- Validation and review are the controls.
- The repo history is the audit trail.

## File selection rule

Brand and mode selection happens by file list, not by a mapped layer.

## Principles

- Variable names are an API.
- Prefer semantic aliases for UI usage.
- Keep base scales and palettes unchanged unless you plan a migration.
- Treat variable JSON (Design Tokens JSON) as the contract.
- Brand selection is a file selection rule. Do not add a mapped layer in tool panels.
- JSON-as-API means file paths and names are the interface. Review changes like API changes.

## What good looks like

- Designers can work with variables in Figma without creating duplicate values.
- Engineers can consume variables via generated outputs (CSS variables, TypeScript) with minimal manual wiring.
- Variable changes are reviewed, versioned, and communicated.

## Roles

- [Designer](roles/designer): Creates variables in Figma
- [Design Engineer](roles/design-engineer): Bridges design and development, owns contract
- [Frontend Engineer](roles/frontend-engineer): Consumes variables in code

## Scope

Covers:

- Variable categories (base, alias, component)
- Naming rules
- Change control and semantic versioning
- Accessibility constraints and checks
- Role definitions and responsibilities

## Links

- [Change Control](change-control)
- [Validation](validation)
- [Versioning](versioning)
