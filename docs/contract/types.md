---
title: Types
---

# Types

Types define how a variable's `$value` is interpreted. Variable Design Standard (VDS) supports all DTCG 2025.10 types.

## Requirements

- Every variable MUST include `$type`.
- `$value` MUST match the structure defined for that type.
- DTCG object formats are the canonical forms for color, dimension, and duration.

## Type system overview

Every variable MUST have a `$type` property. The type determines:

- What values are valid for `$value`
- How references resolve
- What property-level references are allowed

## Primitive types

### Color

`$type: "color"`

Represents a color value.

**DTCG 2025.10 format** (canonical):

```json
{
  "$type": "color",
  "$value": {
    "colorSpace": "srgb",
    "components": [0.278431, 0.388235, 0.749020],
    "hex": "#4763BF"
  }
}
```

The DTCG spec requires a color space object with `colorSpace`, `components` array (values 0-1), and optional `hex` string. Supported color spaces: `srgb`, `hsl`, `p3`, `rec2020`.

**Variable Design Standard (VDS) shorthand** (convenience):

```json
{
  "$type": "color",
  "$value": "#4763BF"
}
```

Hex strings (`"#0066cc"`, `"#06c"`) are a Variable Design Standard (VDS) convenience format. They are NOT strictly DTCG 2025.10 compliant but are widely supported by tools.

Examples:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0.278431, 0.388235, 0.749020],
        "hex": "#4763BF"
      },
      "$extensions": {
        "com.variables-contract.version": "0.5.0"
      }
    },
    "primary-shorthand": {
      "$type": "color",
      "$value": "#4763BF",
      "$description": "Variable Design Standard (VDS) shorthand - not strict DTCG"
    }
  }
}
```

Property-level references: `{variable.components}`, `{variable.colorSpace}`, `{variable.hex}`

### Dimension

`$type: "dimension"`

Represents a length value with a unit.

**DTCG 2025.10 format** (canonical):

```json
{
  "$type": "dimension",
  "$value": {
    "value": 16,
    "unit": "px"
  }
}
```

The DTCG spec requires an object with numeric `value` and string `unit`. Note: Figma only imports dimensions with `"px"` unit.

**Variable Design Standard (VDS) shorthand** (convenience):

```json
{
  "$type": "dimension",
  "$value": "16px"
}
```

String format (`"16px"`, `"1.5rem"`) is a Variable Design Standard (VDS) convenience format. It is NOT strictly DTCG 2025.10 compliant.

Examples:

```json
{
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": {
        "value": 16,
        "unit": "px"
      }
    },
    "base-shorthand": {
      "$type": "dimension",
      "$value": "16px",
      "$description": "Variable Design Standard (VDS) shorthand - not strict DTCG"
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

**DTCG 2025.10 format** (canonical):

```json
{
  "$type": "duration",
  "$value": {
    "value": 200,
    "unit": "ms"
  }
}
```

The DTCG spec requires an object with numeric `value` and string `unit`. Valid units: `ms` (milliseconds), `s` (seconds). Note: Figma only imports durations with `"s"` (seconds) unit.

**Variable Design Standard (VDS) shorthand** (convenience):

```json
{
  "$type": "duration",
  "$value": "200ms"
}
```

String format (`"200ms"`, `"0.5s"`) is a Variable Design Standard (VDS) convenience format. It is NOT strictly DTCG 2025.10 compliant.

Examples:

```json
{
  "duration": {
    "fast": {
      "$type": "duration",
      "$value": {
        "value": 200,
        "unit": "ms"
      }
    },
    "fast-shorthand": {
      "$type": "duration",
      "$value": "200ms",
      "$description": "Variable Design Standard (VDS) shorthand - not strict DTCG"
    }
  }
}
```

Validation:

- Value MUST be a number
- Unit MUST be `ms` or `s`

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

Composite types combine multiple primitive types into structured values. See [Composite Types](composite-types) for details.

Supported composite types:

- `border`: border width, color, and style
- `transition`: duration, delay, and timing function
- `shadow`: shadow color, offset, blur, and spread
- `gradient`: array of color stops with positions
- `typography`: font family, size, weight, letter spacing, and line height

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
      "$value": "16" // Missing unit
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

### DTCG 2025.10 compliant examples

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0.278431, 0.388235, 0.749020],
        "hex": "#4763BF"
      }
    }
  },
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": {
        "value": 16,
        "unit": "px"
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
      "$value": {
        "value": 200,
        "unit": "ms"
      }
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

### Variable Design Standard (VDS) shorthand examples

These use convenience formats that are widely supported but NOT strictly DTCG 2025.10 compliant:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#4763BF"
    }
  },
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "16px"
    }
  },
  "duration": {
    "fast": {
      "$type": "duration",
      "$value": "200ms"
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

## Validation Checklist

A variable type is valid if:

- `$type` is present and matches a supported type
- `$value` conforms to the type's format
- References point to variables of compatible types
- Property-level references target valid properties for the type

## Out of scope

- Custom type definitions (use `$extensions` for metadata)
- Type coercion or conversion
- Runtime type checking libraries (use DTCG-compliant validators)
