---
title: DTCG Alignment
---

# DTCG Alignment

Variable Contract is DTCG 2025.10 compliant. What that means and what Variable Contract adds.

## Compliance statement

Variable Contract uses the Design Tokens Community Group (DTCG) format 2025.10 as its base format. Any JSON file that follows Variable Contract rules is valid DTCG 2025.10 format.

## What DTCG provides

DTCG 2025.10 defines:

- JSON structure for variables and groups
- Type system (color, dimension, fontFamily, etc.)
- Reference syntax (curly brace and JSON Pointer)
- Composite types (border, transition, shadow, gradient, typography)
- Group extension with `$ref`
- Mode support

## What Variable Contract adds

Variable Contract adds a governance layer on top of DTCG format:

- Naming convention rules (see [Naming](naming))
- Change control process (see [Change Control](../governance/change-control))
- Role definitions (see [Design Engineer](../governance/roles/design-engineer))
- Adapter patterns for tool integration (see [Adapters](../adapters))
- Validation requirements beyond format correctness

## Compatibility matrix

| DTCG Feature                           | Variable Contract Requirement | Notes                          |
| -------------------------------------- | ----------------------------- | ------------------------------ |
| Variable structure (`$type`, `$value`) | MUST                          | Required for all variables     |
| Groups                                 | MUST                          | Required for organization      |
| Group extension (`$ref`)               | MAY                           | Supported but not required     |
| Curly brace references (`{path}`)      | MUST                          | Canonical format               |
| JSON Pointer references (`#/path`)     | MAY                           | Supported for DTCG compliance  |
| Modes                                  | SHOULD                        | Use when needed for variants   |
| Composite types                        | MAY                           | Use when structure is needed   |
| `$extensions`                          | MAY                           | For tool metadata only         |
| `$deprecated`                          | SHOULD                        | Use when deprecating variables |

## Format differences

Variable Contract does not change DTCG format. It adds:

1. Naming rules that enforce dot-separated paths
2. Validation that checks references resolve
3. Governance that treats renames as breaking changes

## Migration from older formats

If you have variables in older DTCG formats (pre-2025.10):

1. Update reference syntax to use curly braces: `{path.to.variable}`
2. Add `$type` to all variables if missing
3. Move tool metadata to `$extensions` if it's in root properties
4. Update group structure if using deprecated patterns

## Failure modes

If you ignore DTCG compliance:

- Tools that expect DTCG format will fail to parse your variables
- Reference resolution may break if you use non-standard syntax
- Group extension will not work if `$ref` format is wrong

## Out of scope

- Runtime validation libraries (use DTCG-compliant validators)
- Format conversion tools (use adapters)
- Tool-specific features not in DTCG spec
