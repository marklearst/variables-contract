---
title: Variable Contract
---

# Variable Contract

JSON shape for variables stored in version control, validated in CI, and used to generate outputs.

If the contract is loose, you get silent renames, broken references, and "same variable, different meaning" across tools.

## DTCG compliance

This contract is DTCG 2025.10 compliant. See [DTCG Alignment](/variable-contract/contract/dtcg-alignment) for details.

## Inputs and adapters

This contract defines the canonical shape used in version control.

Tool exports (example: a Figma variable export JSON) are treated as inputs. They may include extra metadata and alternate reference syntax. An adapter can normalize those inputs into this contract.

See [Adapters](/variable-contract/adapters) for adapter patterns and implementations.

## Adapter pipeline

A typical pipeline looks like:

1. Input: Figma export JSON (Dev Mode plugin export) or Figma Variables REST API output.
2. Adapter: normalize naming, references, and metadata into this contract.
3. Build: use Style Dictionary to generate CSS variables, TypeScript, Tailwind CSS v4 (`@theme` directive), and other platform outputs.

## Variable object shape

A variable is an object with the following properties:

- `$type`: required
- `$value`: required
- `$description`: optional but recommended
- `$extensions`: optional
- `$deprecated`: optional

A group is an object that contains nested groups and/or variables. Groups do not have `$type`/`$value`.

Groups can extend other groups using `$ref`. See [Groups](/variable-contract/contract/groups) for details.

## `$type`

`$type` describes how a tool should interpret `$value`.

Rules:

- `$type` is required on every variable.
- A variable's `$type` must not change unless it is a breaking change.
- Composite types must use the expected structure for that type.

See [Types](/variable-contract/contract/types) for the complete type reference and [Composite Types](/variable-contract/contract/composite-types) for structured types.

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
- Mode names should not change without a breaking change.
- A mode value may be a literal value or a reference.

See [Modes](/variable-contract/contract/modes) for complete mode documentation including structure, resolution, and consistency rules.

## References (aliases)

A reference is a `$value` that points to another variable by name.

Rules:

- References must point to an existing variable.
- References must not create cycles.
- Alias variables should reference base variables.
- Component variables should reference alias variables.

## Reference syntax

Variable Contract supports two reference syntaxes:

- Curly brace syntax (canonical): `{path.to.variable}`
- JSON Pointer syntax (DTCG required): `#/path/to/variable`

Rules:

- References must use curly brace format in Variable Contract files.
- JSON Pointer syntax is supported for DTCG compliance.
- Tool-specific reference formats are allowed only as adapter inputs.

See [References](/variable-contract/contract/references) for complete reference documentation including resolution algorithms, chained references, and property-level references.

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

- Names follow the naming convention ([Naming](/variable-contract/contract/naming)).
- Every variable has `$type` and `$value`.
- References resolve and are acyclic (see [References](/variable-contract/contract/references)).
- References use the canonical reference syntax (`{path}`).
- If `$value` uses modes, mode keys are explicit and shared within a collection.
- Alias variables do not duplicate raw palette values when a base variable exists.
- Component variables do not reference base variables directly unless explicitly documented.
- Breaking changes are versioned and documented (rename, removal, `$type` change).
- Group extensions (`$ref`) do not create circular references (see [Groups](/variable-contract/contract/groups)).

## Conformance

Variable Contract conformance requires:

- DTCG 2025.10 format compliance
- Naming convention compliance
- Reference syntax compliance
- Validation implementation
- Versioning compliance

See [Conformance](/variable-contract/reference/conformance) for complete conformance requirements and how to claim compliance.

## Out of scope

Variable Contract does NOT define:

- Variable values (your design decisions: colors, spacing, typography)
- Tools to use (works with any DTCG-compliant tool)
- Consumption patterns (CSS, TypeScript, whatever works for your team)
- Design system decisions (governs structure, not values)
- Runtime libraries (validation is build-time)
- UI frameworks (tool-agnostic)
- Component structure (focuses on variables only)
