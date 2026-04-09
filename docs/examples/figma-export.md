---
title: Figma Export JSON
---

# Figma Export JSON

A Figma Variables export in JSON format. This file represents raw output from Figma and requires normalization before use with Variable Contract tooling.

- Raw file: [figma-export.json](figma-export.json)

## Figma Variables overview

Figma Variables store reusable values that can be referenced across designs. Key concepts:

- **Variable types**: color, number, string, boolean
- **Collections**: Group related variables (e.g., "Primitives", "Tokens")
- **Modes**: Contextual variants within a collection (e.g., light/dark, mobile/desktop)
- **Aliasing**: Variables can reference other variables

For complete Figma documentation, see:

- [Overview of variables, collections, and modes](https://help.figma.com/hc/en-us/articles/14506821864087)
- [Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383)
- [Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471)

## Export structure

### Collections

Collections are prefixed with `@` and contain `$collection_metadata`:

```json
{
  "@primitives": {
    "$collection_metadata": {
      "name": "Primitives",
      "figmaId": "VariableCollectionId:502:189",
      "modes": [
        { "key": "mode_1", "name": "Mode 1" }
      ]
    }
  }
}
```

The `figmaId` is Figma's internal identifier, used for round-trip sync with the design file.

### Variables

Variables include `$type`, `$value`, and `$variable_metadata`:

```json
{
  "$color": {
    "$green": {
      "200": {
        "$type": "color",
        "$value": "#37ff57",
        "$description": "",
        "$variable_metadata": {
          "name": "color/green/200",
          "figmaId": "VariableID:502:227",
          "modes": {
            "mode_1": "rgba(55,255,87,1.00)"
          }
        }
      }
    }
  }
}
```

Group names use `$` prefix (e.g., `$color`, `$green`). The `$variable_metadata.name` contains the Figma path with `/` separators.

### Modes

Mode values live inside `$variable_metadata.modes`, not in `$value`:

```json
{
  "primary": {
    "$type": "color",
    "$value": "{@primitives.$color.$neutral.0}",
    "$variable_metadata": {
      "name": "surface/primary",
      "figmaId": "VariableID:510:6354",
      "modes": {
        "light": "{@primitives.$color.$neutral.0}",
        "dark": "{@primitives.$color.$neutral.1000}"
      }
    }
  }
}
```

The top-level `$value` contains one mode's value (typically the first). All mode values are in `modes`.

### References

Figma uses `{@collection.$group.variable}` syntax for references:

```json
{
  "minimal": {
    "$type": "color",
    "$value": "{@primitives.$color.$neutral.200}",
    "$variable_metadata": {
      "modes": {
        "light": "{@primitives.$color.$neutral.200}",
        "dark": "{@primitives.$color.$neutral.800}"
      }
    }
  }
}
```

Note the `@` prefix on collection names and `$` prefix on group names.

## Figma vs Variable Contract format

| Aspect | Figma Export | Variable Contract |
|--------|--------------|-------------------|
| Collection prefix | `@primitives` | `primitives` |
| Group prefix | `$color` | `color` |
| Reference syntax | `{@primitives.$color.x}` | `{primitives.color.x}` |
| Mode values | In `$variable_metadata.modes` | In `$value` object |
| Metadata | `$collection_metadata`, `$variable_metadata` | `$extensions` |
| Path separator | `/` in metadata name | `.` in JSON path |

## Obtaining exports

Figma Variables can be exported via:

- **REST API**: [Local Variables endpoint](https://developers.figma.com/docs/rest-api/variables/) (Enterprise/Organization plans only)
- **Plugin API**: [figma.variables](https://developers.figma.com/docs/plugins/api/figma-variables/) (all plans, requires plugin development)
- **Third-party plugins**: Tokens Studio, Design Tokens export plugins

The example file was generated using a plugin export.

## Failure modes

Using raw Figma exports without normalization causes:

- **Invalid references**: `{@primitives.$color.x}` is not valid DTCG syntax. Build tools fail or produce broken output.
- **Missing mode values**: Mode data in `$variable_metadata.modes` is ignored by DTCG-compliant tools that expect modes in `$value`.
- **Metadata loss**: `$collection_metadata` and `$variable_metadata` are not preserved in standard DTCG `$extensions`.
- **Path mismatches**: Figma's `/` separators and `$` prefixes create inconsistent naming with other sources.

## Out of scope

This example shows raw Figma output, not:

- **Normalized format**: See [DTCG Compliant Example](/examples/dtcg-compliant) for canonical structure.
- **Normalization steps**: See [Figma Adapter](/adapters/figma) for transformation rules.
- **Tokens Studio format**: Different export structure with its own adapter.
- **Plugin development**: See [Figma Plugin API](https://developers.figma.com/docs/plugins/api/figma-variables/) for building export tools.

## Normalization

The [Figma Adapter](/adapters/figma) transforms this format into Variable Contract canonical structure:

1. Remove `@` and `$` prefixes from paths
2. Move `$variable_metadata.modes` into `$value` objects
3. Convert reference syntax to DTCG format
4. Relocate metadata to `$extensions`

See [Adapter Pipeline](/examples/adapter-pipeline) for end-to-end transformation examples.
