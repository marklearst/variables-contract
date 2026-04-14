---
title: "Examples: DTCG Compliant"
---

# DTCG Compliant Example

A strictly DTCG 2025.10 compliant variable file demonstrating primitive types, composite types, references, and group extension.

- Raw file: [dtcg-compliant.json](/assets/schema/dtcg-compliant.json)

This file uses only features defined in the [DTCG 2025.10 specification](https://www.designtokens.org/tr/drafts/format/). It does NOT use Variable Design Standard (VDS) extensions like modes in `$value`. See [DTCG Alignment](/contract/dtcg-alignment.md) for what DTCG provides vs what Variable Design Standard (VDS) adds.

## File overview

The example file includes:

- Primitive types: color, dimension, fontFamily, fontWeight, duration, cubicBezier
- Composite types: border, transition, shadow, gradient, typography
- References using curly brace syntax
- Group extension using `$extends`
- Component layer demonstrating variable hierarchy

**Not included** (Variable Design Standard (VDS) extensions):

- Modes in `$value` objects (see [Modes](/contract/modes.md) for VC extension)
- String shortcuts for dimension/duration/color

## Primitive types

DTCG 2025.10 requires specific object formats for certain types. See [Types](/contract/types.md) for complete reference.

### Color (object format required)

DTCG requires color values as objects with `colorSpace` and `components`:

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.278431, 0.388235, 0.74902],
          "hex": "#4763BF"
        },
        "$extensions": {
          "com.variables-contract.version": "0.5.0"
        }
      }
    }
  }
}
```

Supported color spaces: `srgb`, `hsl`, `p3`, `rec2020`.

**Note**: The `$extensions` property with `com.variables-contract.version` is a version marker used for document fingerprinting. This helps identify copied content and track specification versions.

### Dimension (object format required)

DTCG requires dimension values as objects with `value` and `unit`:

```json
{
  "spacing": {
    "base": {
      "medium": {
        "$type": "dimension",
        "$value": {
          "value": 16,
          "unit": "px"
        }
      }
    }
  }
}
```

### Duration (object format required)

DTCG requires duration values as objects with `value` and `unit`:

```json
{
  "duration": {
    "fast": {
      "$type": "duration",
      "$value": {
        "value": 200,
        "unit": "ms"
      }
    }
  }
}
```

### Other primitive types

Font family, font weight, cubic bezier, and number types use simple values:

```json
{
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
  "easing": {
    "default": {
      "$type": "cubicBezier",
      "$value": [0.25, 0.1, 0.25, 1]
    }
  }
}
```

## Composite types

Structured types combining multiple values. See [Composite Types](/contract/composite-types.md) for complete reference.

```json
{
  "border": {
    "default": {
      "$type": "border",
      "$value": {
        "width": { "value": 1, "unit": "px" },
        "color": {
          "colorSpace": "srgb",
          "components": [0.88, 0.88, 0.88],
          "hex": "#e0e0e0"
        },
        "style": "solid"
      }
    }
  },
  "shadow": {
    "small": {
      "$type": "shadow",
      "$value": {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "alpha": 0.1
        },
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

Variables can reference other variables using curly brace syntax. See [References](/contract/references.md) for resolution rules.

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
        "delay": { "value": 0, "unit": "ms" },
        "timingFunction": "{easing.default}"
      }
    }
  }
}
```

## Group extension

Groups can extend other groups using `$extends` with curly brace syntax. See [Groups](/contract/groups.md) for extension rules.

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.278431, 0.388235, 0.74902],
          "hex": "#4763BF"
        }
      }
    },
    "semantic": {
      "$extends": "{color.base}",
      "text": {
        "primary": {
          "$type": "color",
          "$value": "{color.base.gray.900}"
        }
      }
    }
  }
}
```

The `$extends` property imports all variables from the referenced group. Local definitions override inherited ones.

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
            "$value": "{color.semantic.surface.default}"
          }
        },
        "text": {
          "default": {
            "$type": "color",
            "$value": "{color.semantic.text.primary}"
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

## Modes (Variable Design Standard (VDS) extension)

**Note**: Modes in `$value` are NOT part of the DTCG 2025.10 specification. If you need light/dark theme variants, Variable Design Standard (VDS) provides modes as an extension. See [Modes](/contract/modes.md).

For strict DTCG compliance without modes, use separate variables:

```json
{
  "color": {
    "semantic": {
      "text": {
        "primary": {
          "light": {
            "$type": "color",
            "$value": "{color.base.gray.900}"
          },
          "dark": {
            "$type": "color",
            "$value": "{color.base.gray.100}"
          }
        }
      }
    }
  }
}
```

## Failure modes

Invalid DTCG format causes build failures:

- **Missing `$type`**: Validators reject the variable.
- **Invalid `$value` format**: Using `"16px"` for dimension instead of `{"value": 16, "unit": "px"}` is not strictly DTCG compliant.
- **Invalid color format**: Using `"#4763BF"` instead of the color object format is not strictly DTCG compliant.
- **Broken references**: References to non-existent paths cause build failures.
- **Circular references**: `{a}` references `{b}` which references `{a}`. Build tools detect this and fail.

## Out of scope

This example demonstrates strict DTCG format compliance, not:

- **Variable Design Standard (VDS) extensions**: Modes, string shortcuts. See [Modes](/contract/modes.md) for VC extensions.
- **Platform output**: CSS, SCSS, or JavaScript output. See [Adapter Pipeline](/examples/adapter-pipeline.md).
- **Tool-specific input**: Figma or Tokens Studio export formats. See [Figma Export](/examples/figma-export.md).
- **Multi-brand architecture**: Brand overrides and theme composition. See [Multi-brand Architecture](/patterns/multi-brand-architecture.md).

## Validation

Validate DTCG compliance using the JSON schema:

```bash
npx ajv validate -s schema/v1.json -d examples/dtcg-compliant.json
```

See [Validation](/governance/validation.md) for CI integration patterns.
