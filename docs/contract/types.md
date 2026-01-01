---
title: Types
---

# Types

Types define how a variable's `$value` is interpreted. Variable Contract supports all DTCG 2025.10 types.

## Type system overview

Every variable MUST have a `$type` property. The type determines:

- What values are valid for `$value`
- How references resolve
- What property-level references are allowed

## Primitive types

### Color

`$type: "color"`

Represents a color value.

Valid formats:

- Hex string: `"#0066cc"` or `"#06c"`
- RGB object: `{ "r": 0, "g": 102, "b": 204, "alpha": 1 }`
- RGBA object: `{ "r": 0, "g": 102, "b": 204, "alpha": 0.5 }`
- Color space object: `{ "colorSpace": "srgb", "components": [0, 0.4, 0.8] }`

Examples:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "primary-rgb": {
      "$type": "color",
      "$value": {
        "r": 0,
        "g": 102,
        "b": 204,
        "alpha": 1
      }
    },
    "primary-srgb": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8]
      }
    }
  }
}
```

Property-level references: `{variable.r}`, `{variable.g}`, `{variable.b}`, `{variable.alpha}`

### Dimension

`$type: "dimension"`

Represents a length value with a unit.

Valid formats:

- String with unit: `"16px"`, `"1.5rem"`, `"100%"`
- Object: `{ "value": 16, "unit": "px" }`

Examples:

```json
{
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "16px"
    },
    "base-object": {
      "$type": "dimension",
      "$value": {
        "value": 16,
        "unit": "px"
      }
    }
  }
}
```

Validation:

- Value MUST be a number
- Unit MUST be a valid CSS unit (px, rem, em, %, etc.)

Property-level references: `{variable.value}`, `{variable.unit}` (read-only)

### Font family

`$type: "fontFamily"`

Represents a font family name or list of font families.

Valid formats:

- String: `"Roboto"`
- Array: `["Roboto", "sans-serif"]`

Examples:

```json
{
  "font": {
    "family": {
      "primary": {
        "$type": "fontFamily",
        "$value": "Roboto"
      },
      "fallback": {
        "$type": "fontFamily",
        "$value": ["Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  }
}
```

### Font weight

`$type: "fontWeight"`

Represents a font weight value.

Valid formats:

- Number: `400`, `700`
- String: `"normal"`, `"bold"`

Examples:

```json
{
  "font": {
    "weight": {
      "normal": {
        "$type": "fontWeight",
        "$value": 400
      },
      "bold": {
        "$type": "fontWeight",
        "$value": 700
      }
    }
  }
}
```

Validation:

- If number, MUST be between 1 and 1000
- If string, MUST be `"normal"` (400) or `"bold"` (700)

### Duration

`$type: "duration"`

Represents a time duration.

Valid formats:

- String with unit: `"200ms"`, `"0.5s"`
- Number in milliseconds: `200` (interpreted as milliseconds)

Examples:

```json
{
  "duration": {
    "fast": {
      "$type": "duration",
      "$value": "200ms"
    },
    "slow": {
      "$type": "duration",
      "$value": "500ms"
    }
  }
}
```

Validation:

- If string, MUST end with `ms` or `s`
- If number, interpreted as milliseconds

### Cubic Bézier

`$type: "cubicBezier"`

Represents a cubic Bézier timing function.

Valid formats:

- Array of four numbers: `[0.25, 0.1, 0.25, 1]`

Examples:

```json
{
  "easing": {
    "default": {
      "$type": "cubicBezier",
      "$value": [0.25, 0.1, 0.25, 1]
    },
    "ease-in": {
      "$type": "cubicBezier",
      "$value": [0.42, 0, 1, 1]
    }
  }
}
```

Validation:

- Array MUST have exactly 4 numbers
- Each number MUST be between 0 and 1

### Number

`$type: "number"`

Represents a numeric value without a unit.

Valid formats:

- Number: `42`, `3.14`, `-10`

Examples:

```json
{
  "opacity": {
    "disabled": {
      "$type": "number",
      "$value": 0.5
    },
    "hidden": {
      "$type": "number",
      "$value": 0
    }
  }
}
```

## Composite types

Composite types combine multiple primitive types into structured values. See [Composite Types](/variables-contract/contract/composite-types) for details.

Supported composite types:

- `border` - border width, color, and style
- `transition` - duration, delay, and timing function
- `shadow` - shadow color, offset, blur, and spread
- `gradient` - array of color stops with positions
- `typography` - font family, size, weight, letter spacing, and line height

## Type validation rules

Rules:

- `$type` MUST be present on every variable
- `$type` MUST match one of the supported types
- `$value` MUST conform to the type's format
- Changing `$type` is a breaking change

## Invalid type examples

```json
{
  "invalid": {
    "missing-type": {
      "$value": "#0066cc"
    },
    "wrong-format": {
      "$type": "color",
      "$value": 123
    },
    "invalid-dimension": {
      "$type": "dimension",
      "$value": "16"  // Missing unit
    }
  }
}
```

## Type references

Variables can reference other variables of compatible types:

- Color variables can reference other color variables
- Dimension variables can reference other dimension variables
- Font weight variables can reference other font weight variables
- Number variables can reference other number variables

Type mismatches MUST be rejected during validation.

## Examples

### Complete type examples

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  },
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "16px"
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
  },
  "opacity": {
    "disabled": {
      "$type": "number",
      "$value": 0.5
    }
  }
}
```

## Failure modes

If you ignore type rules:

- Invalid `$value` formats cause parsing errors
- Type mismatches in references break resolution
- Missing `$type` prevents tools from interpreting values
- Changing `$type` breaks consumers expecting the old type

## Validation checklist

A variable type is valid if:

- `$type` is present and matches a supported type
- `$value` conforms to the type's format
- References point to variables of compatible types
- Property-level references target valid properties for the type

## Out of scope

- Custom type definitions (use `$extensions` for metadata)
- Type coercion or conversion
- Runtime type checking libraries (use DTCG-compliant validators)

