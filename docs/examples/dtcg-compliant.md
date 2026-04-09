---
title: DTCG Compliant Example
---

# DTCG Compliant Example

A complete DTCG 2025.10 compliant variable file demonstrating primitive types, composite types, references, modes, and group extension.

- Raw file: [dtcg-compliant.json](dtcg-compliant.json)

This file can be used as a starting point for new projects or as a reference for Variable Contract compliance. See [DTCG Alignment](/contract/dtcg-alignment) for compliance details.

## File overview

The example file includes:

- Primitive types: color, dimension, fontFamily, fontWeight, duration, cubicBezier
- Composite types: border, transition, shadow, gradient, typography
- References using curly brace syntax
- Modes for light/dark theme variants
- Group extension using `$ref`
- Component layer demonstrating variable hierarchy

## Primitive types

Basic types with single values. See [Types](/contract/types) for complete reference.

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc"
      }
    }
  },
  "spacing": {
    "base": {
      "medium": {
        "$type": "dimension",
        "$value": "16px"
      }
    }
  },
  "font": {
    "family": {
      "primary": {
        "$type": "fontFamily",
        "$value": "Roboto"
      }
    },
    "weight": {
      "bold": {
        "$type": "fontWeight",
        "$value": 700
      }
    }
  },
  "duration": {
    "fast": {
      "$type": "duration",
      "$value": "200ms"
    }
  },
  "easing": {
    "default": {
      "$type": "cubicBezier",
      "$value": [0.25, 0.1, 0.25, 1]
    }
  }
}
```

## Composite types

Structured types combining multiple values. See [Composite Types](/contract/composite-types) for complete reference.

```json
{
  "border": {
    "default": {
      "$type": "border",
      "$value": {
        "width": { "value": 1, "unit": "px" },
        "color": "#e0e0e0",
        "style": "solid"
      }
    }
  },
  "shadow": {
    "small": {
      "$type": "shadow",
      "$value": {
        "color": "rgba(0, 0, 0, 0.1)",
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 2, "unit": "px" },
        "blur": { "value": 4, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      }
    }
  },
  "typography": {
    "heading": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.primary}",
        "fontSize": "{font.size.lg}",
        "fontWeight": "{font.weight.bold}",
        "letterSpacing": { "value": 0, "unit": "px" },
        "lineHeight": 1.5
      }
    }
  }
}
```

## References

Variables can reference other variables using curly brace syntax. See [References](/contract/references) for resolution rules.

```json
{
  "spacing": {
    "semantic": {
      "component": {
        "gap": {
          "md": {
            "$type": "dimension",
            "$value": "{spacing.base.medium}"
          }
        }
      }
    }
  },
  "transition": {
    "default": {
      "$type": "transition",
      "$value": {
        "duration": "{duration.fast}",
        "delay": "0ms",
        "timingFunction": "{easing.default}"
      }
    }
  }
}
```

## Modes

Mode objects define variants for different contexts (light/dark, mobile/desktop). See [Modes](/contract/modes) for structure rules.

```json
{
  "color": {
    "semantic": {
      "text": {
        "primary": {
          "$type": "color",
          "$value": {
            "light": "{color.base.gray.900}",
            "dark": "{color.base.gray.100}"
          }
        }
      },
      "surface": {
        "default": {
          "$type": "color",
          "$value": {
            "light": "#ffffff",
            "dark": "#000000"
          }
        }
      }
    }
  }
}
```

Mode values can be literals or references. References resolve per-mode at build time.

## Group extension

Groups can extend other groups using `$ref`. See [Groups](/contract/groups) for extension rules.

```json
{
  "color": {
    "semantic": {
      "$ref": "#/color/base",
      "text": {
        "primary": {
          "$type": "color",
          "$value": {
            "light": "{color.base.gray.900}",
            "dark": "{color.base.gray.100}"
          }
        }
      }
    }
  }
}
```

The `$ref` property imports all variables from the referenced group. Local definitions override inherited ones.

## Component layer

Component variables reference semantic variables, creating a consumption layer for UI components.

```json
{
  "component": {
    "button": {
      "color": {
        "background": {
          "default": {
            "$type": "color",
            "$value": {
              "light": "{color.semantic.surface.default}",
              "dark": "{color.semantic.surface.default}"
            }
          }
        },
        "text": {
          "default": {
            "$type": "color",
            "$value": {
              "light": "{color.semantic.text.primary}",
              "dark": "{color.semantic.text.primary}"
            }
          }
        }
      },
      "border": {
        "default": {
          "$type": "border",
          "$value": "{border.default}"
        }
      }
    }
  }
}
```

This pattern creates a clear hierarchy: base → semantic → component.

## Failure modes

Invalid DTCG format causes build failures and runtime errors:

- **Missing `$type`**: Validators reject the variable. Build tools cannot determine output format.
- **Invalid `$value` for type**: Schema validation fails. A `color` type with value `16px` is rejected.
- **Broken references**: References to non-existent paths (`{does.not.exist}`) cause build failures or produce undefined CSS custom properties.
- **Inconsistent mode keys**: If one variable uses `light`/`dark` and another uses `day`/`night`, mode resolution fails. All variables in a file MUST use the same mode keys.
- **Circular references**: `{a}` references `{b}` which references `{a}`. Build tools detect this and fail.

## Out of scope

This example demonstrates format compliance, not:

- **Platform output**: CSS, SCSS, or JavaScript output. See [Adapter Pipeline](/examples/adapter-pipeline) for transformation examples.
- **Tool-specific input**: Figma or Tokens Studio export formats. See [Figma Export](/examples/figma-export) for tool output.
- **Multi-brand architecture**: Brand overrides and theme composition. See [Multi-brand Architecture](/patterns/multi-brand-architecture).
- **Naming conventions**: Category prefixes and path structure rules. See [Naming](/contract/naming).

## Validation

Validate DTCG compliance using the JSON schema:

```bash
npx ajv validate -s schema/v1.json -d examples/dtcg-compliant.json
```

See [Validation](/governance/validation) for CI integration patterns.
