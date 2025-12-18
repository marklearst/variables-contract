---
title: Variable Contract
---

# Variable Contract

This document defines the minimum contract for variables stored as Design Tokens JSON.

The goal is that design and engineering can share a stable, machine-checkable shape for variables, references, and change control.

## Inputs and adapters

This contract defines the canonical shape used in version control.

Tool exports (example: a Figma variable export JSON) are treated as inputs. They may include extra metadata and alternate reference syntax. An adapter can normalize those inputs into this contract.

## Adapter pipeline

A typical pipeline looks like:

1. Input: Figma export JSON (Dev Mode plugin export) or Figma Variables REST API output.
2. Adapter: normalize naming, references, and metadata into this contract.
3. Build: use Style Dictionary to generate CSS variables, TypeScript, Tailwind theme, and other platform outputs.

## Variable object shape

A variable is an object with the following properties:

- `$type`: required
- `$value`: required
- `$description`: optional but recommended
- `$extensions`: optional
- `$deprecated`: optional

A group is an object that contains nested groups and/or variables. Groups do not have `$type`/`$value`.

## `$type`

`$type` describes how a tool should interpret `$value`.

Rules:

- `$type` is required on every variable.
- A variable's `$type` must not change unless it is a breaking change.
- Composite types must use the expected structure for that type.

## `$value`

`$value` is the variable value.

Rules:

- `$value` is required on every variable.
- `$value` may be a single value or an object keyed by mode name.
- Base variables may store raw values.
- Alias and component variables should reference other variables when possible.

## Modes

Modes represent intentional variants of a variable (example: `light`/`dark`, `mobile`/`desktop`).

Rules:

- If `$value` is an object, its keys are treated as mode names.
- Mode names should be stable and treated as part of the contract.
- A mode value may be a literal value or a reference.

## References (aliases)

A reference is a `$value` that points to another variable by name.

Rules:

- References must point to an existing variable.
- References must not create cycles.
- Alias variables should reference base variables.
- Component variables should reference alias variables.

## Reference syntax

The canonical reference format is a string that uses braces:

- `{path.to.variable}`

Rules:

- References must use the canonical format in the contract.
- Tool-specific reference formats are allowed only as adapter inputs.

## `$description`

`$description` captures intent.

Rules:

- Add `$description` when the name does not fully communicate intent.
- Use the description to clarify usage constraints and expected consumers.

## `$extensions`

`$extensions` stores non-standard metadata.

Rules:

- Extensions must not change the meaning of `$value`.
- Extensions should be treated as optional by consumers.
- If an extension becomes required for a workflow, document it and validate it.

Tool metadata (example: design tool IDs) should live under `$extensions` and must not be required for consuming the variable values.

## `$deprecated`

`$deprecated` marks a variable as deprecated.

Rules:

- Deprecated variables must include a migration path in release notes.
- Deprecated variables should remain available for at least one release cycle unless removal is urgent.

## Validation checklist

A change is considered valid if:

- Names follow the naming convention ([Naming](naming)).
- Every variable has `$type` and `$value`.
- References resolve and are acyclic.
- References use the canonical reference syntax.
- If `$value` uses modes, mode keys are intentional and consistent within a collection.
- Alias variables do not duplicate raw palette values when a base variable exists.
- Component variables do not reference base variables directly unless explicitly documented.
- Breaking changes are versioned and documented (rename, removal, `$type` change).
