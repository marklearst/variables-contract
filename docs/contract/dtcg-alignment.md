---
title: DTCG Alignment
---

# DTCG Alignment

Variable Design Standard (VDS) is DTCG 2025.10 compliant. What that means and what Variable Design Standard (VDS) adds.

## Compliance statement

Variable Design Standard (VDS) uses the Design Tokens Community Group (DTCG) format 2025.10 as its base format. Variable Design Standard (VDS) extends DTCG with modes and convenience formats. Files using only DTCG features are strictly compliant. Files using modes or string shortcuts for dimension/duration are Variable Design Standard (VDS) format.

## Requirements

- Variable JSON MUST follow DTCG 2025.10 structure.
- `$type` and `$value` MUST exist on every variable.
- References MUST use curly brace syntax in Variable Design Standard (VDS) files.
- JSON Pointer references MAY be supported for DTCG compliance.
- Modes in `$value` are a Variable Design Standard (VDS) extension.

## What DTCG provides

DTCG 2025.10 defines:

- JSON structure for variables and groups
- Type system (color, dimension, fontFamily, fontWeight, duration, cubicBezier, number)
- Reference syntax (curly brace `{path}` and JSON Pointer `#/path`)
- Composite types (border, transition, shadow, gradient, typography)
- Group extension with `$extends`
- `$extensions` for vendor-specific metadata

## What Variable Design Standard (VDS) adds

Variable Design Standard (VDS) adds governance and extensions on top of DTCG format:

- **Modes**: Contextual variants (light/dark, mobile/desktop) stored in `$value` objects. DTCG does not define modes. This is a Variable Design Standard (VDS) extension.
- **String shortcuts**: Convenience formats like `"16px"` for dimensions and `"200ms"` for durations. DTCG requires object format.
- **Hex color shorthand**: Convenience format like `"#0066cc"` for colors. DTCG requires object format with `colorSpace` and `components`.
- Naming convention rules (see [Naming](naming))
- Change control process (see [Change Control](/governance/change-control))
- Role definitions (see [Design Engineer](/governance/roles/design-engineer))
- Adapter patterns for tool integration (see [Adapters](/adapters))
- Validation requirements beyond format correctness

## Compatibility matrix

| Feature                                | Source            | Variable Design Standard (VDS) Requirement | Notes                                        |
| -------------------------------------- | ----------------- | ----------------------------- | -------------------------------------------- |
| Variable structure (`$type`, `$value`) | DTCG              | MUST                          | Required for all variables                   |
| Groups                                 | DTCG              | MUST                          | Required for organization                    |
| Group extension (`$extends`)           | DTCG              | MAY                           | Use curly brace syntax: `"$extends": "{group}"` |
| Curly brace references (`{path}`)      | DTCG              | MUST                          | Canonical format                             |
| JSON Pointer references (`$ref`)       | DTCG              | MAY                           | Supported for DTCG compliance                |
| Composite types                        | DTCG              | MAY                           | Use when structure is needed                 |
| `$extensions`                          | DTCG              | MAY                           | For tool metadata only                       |
| `$deprecated`                          | DTCG              | SHOULD                        | Use when deprecating variables               |
| Modes in `$value`                      | Variable Design Standard (VDS) | SHOULD                        | VC extension for contextual variants         |
| Dimension string (`"16px"`)            | Variable Design Standard (VDS) | MAY                           | VC convenience; DTCG requires object format  |
| Duration string (`"200ms"`)            | Variable Design Standard (VDS) | MAY                           | VC convenience; DTCG requires object format  |
| Hex color string (`"#hex"`)            | Variable Design Standard (VDS) | MAY                           | VC convenience; DTCG requires object format  |

## Format differences

Variable Design Standard (VDS) extends DTCG format with:

1. Modes in `$value` objects for contextual variants (not in DTCG spec)
2. String shortcuts for dimension (`"16px"`), duration (`"200ms"`), and color (`"#hex"`)
3. Naming rules that enforce dot-separated paths
4. Validation that checks references resolve
5. Governance that treats renames as breaking changes

## Examples

Strict DTCG:

```json
{
  "$type": "color",
  "$value": {
    "colorSpace": "srgb",
    "components": [0, 0.4, 0.8],
    "hex": "#0066cc"
  }
}
```

Variable Design Standard (VDS) extension:

```json
{
  "$type": "color",
  "$value": "#0066cc"
}
```

## Strict DTCG compliance

For strict DTCG 2025.10 compliance, use:

- Color: `{"colorSpace": "srgb", "components": [r, g, b], "hex": "#optional"}`
- Dimension: `{"value": 16, "unit": "px"}`
- Duration: `{"value": 200, "unit": "ms"}`
- No modes in `$value` (use separate variables or `$extensions` for mode metadata)

## Migration from older formats

If you have variables in older DTCG formats (pre-2025.10):

1. Update reference syntax to use curly braces: `{path.to.variable}`
2. Add `$type` to all variables if missing
3. Move tool metadata to `$extensions` if it's in root properties
4. Update group extension from `$ref` to `$extends` with curly brace syntax

## Failure modes

If you ignore DTCG compliance:

- Tools that expect strict DTCG format may reject string shortcuts for dimension/duration/color
- Tools that expect strict DTCG format will not recognize modes in `$value`
- Reference resolution may break if you use non-standard syntax
- Group extension requires `$extends` with curly brace syntax in DTCG 2025.10

## Out of scope

- Runtime validation libraries (use DTCG-compliant validators)
- Format conversion tools (use adapters)
- Tool-specific features not in DTCG spec

## Validation checklist

- [ ] All variables include `$type` and `$value`
- [ ] References in Variable Design Standard (VDS) files use `{path}` syntax
- [ ] JSON Pointer references are only used for DTCG compliance
- [ ] Modes in `$value` are documented as a Variable Design Standard (VDS) extension
