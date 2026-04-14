---
title: "Contract: References"
description: "References allow variables to point to other variables. Variable Design Standard (VDS) supports two reference syntaxes: curly brace and JSON Pointer."
---

# References

References allow variables to point to other variables. Variable Design Standard (VDS) supports two reference syntaxes: curly brace and JSON Pointer.

## Requirements

- References MUST point to an existing variable path.
- References MUST NOT create cycles.
- Variable Design Standard (VDS) files MUST use curly brace syntax.

## Reference syntax

### Curly brace syntax (canonical)

The canonical reference format uses curly braces:

```
{path.to.variable}
```

Example:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.primary}"
      }
    }
  }
}
```

Rules:

- References MUST use dot-separated paths
- Paths MUST match variable names in the JSON structure
- References MUST point to existing variables

### JSON Pointer syntax (DTCG required)

JSON Pointer syntax uses a hash and slash:

```
#/path/to/variable
```

Example:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "#/color/primary"
      }
    }
  }
}
```

Rules:

- JSON Pointer paths use forward slashes
- Paths start with `#/`
- Array indices use numeric segments (not used in Variable Design Standard (VDS))

## When to use each format

- Use curly brace syntax (`{path}`) for Variable Design Standard (VDS) files
- JSON Pointer syntax (`#/path`) is supported for DTCG compliance but curly brace is preferred

## Reference resolution

References are resolved by following the path to find the target variable's `$value`. If the target variable also contains a reference, resolution continues until a literal value is found.

### Resolution algorithm for curly brace syntax

1. Split the reference path by dots: `{color.text.primary}` → `["color", "text", "primary"]`
2. Traverse the JSON object using the path segments
3. If a segment is missing, the reference is invalid
4. If the target has a `$value`, resolve it:
   - If `$value` is a literal, return it
   - If `$value` is a reference, resolve recursively
   - If `$value` is a mode object (Variable Design Standard (VDS) extension), resolve the mode value for the current mode

### Resolution algorithm for JSON Pointer

1. Remove the `#/` prefix: `#/color/text/primary` → `color/text/primary`
2. Split by forward slashes: `["color", "text", "primary"]`
3. Traverse the JSON object using the path segments
4. Follow the same resolution logic as curly brace syntax

## Chained references

References can chain: variable A references variable B, which references variable C.

Example:

```json
{
  "color": {
    "gray": {
      "900": {
        "$type": "color",
        "$value": "#1a1a1a"
      }
    },
    "text": {
      "base": {
        "$type": "color",
        "$value": "{color.gray.900}"
      },
      "primary": {
        "$type": "color",
        "$value": "{color.text.base}"
      }
    }
  }
}
```

Resolution chain: `color.text.primary` → `{color.text.base}` → `{color.gray.900}` → `#1a1a1a`

Rules:

- Chained references MUST resolve to a literal value
- Circular references MUST be detected and rejected
- Maximum chain depth SHOULD be limited (recommended: 100)

## Circular references

Circular references occur when variable A references variable B, which references variable A (directly or indirectly).

Example of invalid circular reference:

```json
{
  "color": {
    "a": {
      "$type": "color",
      "$value": "{color.b}"
    },
    "b": {
      "$type": "color",
      "$value": "{color.a}"
    }
  }
}
```

Rules:

- Circular references MUST be detected during validation
- Circular references MUST be rejected

Detection algorithm:

1. Maintain a set of variables being resolved
2. When resolving a reference, add the current variable to the set
3. If the target variable is already in the set, a cycle exists
4. After resolution, remove the variable from the set

## Property-level references

References can target specific properties of composite types.

### Color component references

Color variables can reference individual color components (r, g, b, alpha).

Example:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": {
        "r": 0,
        "g": 102,
        "b": 204,
        "alpha": 1
      }
    },
    "primary-r": {
      "$type": "number",
      "$value": "{color.primary.r}"
    }
  }
}
```

Supported color component references:

- `{variable.r}`: red component
- `{variable.g}`: green component
- `{variable.b}`: blue component
- `{variable.alpha}`: alpha component

### Dimension component references

Dimension variables can reference the value component.

Example:

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
    "base-value": {
      "$type": "number",
      "$value": "{spacing.base.value}"
    }
  }
}
```

Supported dimension component references:

- `{variable.value}`: numeric value
- `{variable.unit}`: unit string (read-only, cannot be referenced)

### Typography component references

Typography variables can reference individual typography properties.

Example:

```json
{
  "typography": {
    "heading": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Roboto",
        "fontSize": { "value": 24, "unit": "px" },
        "fontWeight": 700,
        "lineHeight": 1.5
      }
    },
    "heading-size": {
      "$type": "dimension",
      "$value": "{typography.heading.fontSize}"
    },
    "heading-weight": {
      "$type": "fontWeight",
      "$value": "{typography.heading.fontWeight}"
    }
  }
}
```

Supported typography component references:

- `{variable.fontFamily}`: font family
- `{variable.fontSize}`: font size (dimension)
- `{variable.fontWeight}`: font weight
- `{variable.letterSpacing}`: letter spacing (dimension)
- `{variable.lineHeight}`: line height (number)

## References in modes (Variable Design Standard (VDS) extension)

**Note**: Modes in `$value` are a Variable Design Standard (VDS) extension, NOT part of the DTCG 2025.10 specification. See [Modes](modes) for details.

When a variable uses modes, references can appear in mode values.

Example:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      }
    },
    "surface": {
      "default": {
        "$type": "color",
        "$value": {
          "light": "{color.primary}",
          "dark": "#000000"
        }
      }
    }
  }
}
```

Resolution:

- Resolve the mode key first (example: `light`)
- Then resolve the reference in that mode value

## Error conditions

References fail validation if:

- The target variable does not exist
- The path is malformed (invalid characters, wrong separators)
- A circular reference is detected
- A property-level reference targets a non-existent property
- A property-level reference targets a non-composite type

## Examples

### Basic reference (DTCG compliant)

```json
{
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": { "value": 16, "unit": "px" }
    },
    "medium": {
      "$type": "dimension",
      "$value": "{spacing.base}"
    }
  }
}
```

### Reference with modes (Variable Design Standard (VDS) extension)

**Note**: Modes in `$value` are a Variable Design Standard (VDS) extension, NOT part of DTCG 2025.10.

```json
{
  "color": {
    "gray": {
      "900": {
        "$type": "color",
        "$value": {
          "light": "#1a1a1a",
          "dark": "#ffffff"
        }
      }
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": {
          "light": "{color.gray.900}",
          "dark": "{color.gray.900}"
        }
      }
    }
  }
}
```

Resolution for `light` mode: `color.text.primary` → `{color.gray.900}` → resolve `light` mode → `#1a1a1a`

### Property-level reference

```json
{
  "color": {
    "brand": {
      "$type": "color",
      "$value": {
        "r": 255,
        "g": 0,
        "b": 102,
        "alpha": 1
      }
    },
    "brand-red": {
      "$type": "number",
      "$value": "{color.brand.r}"
    }
  }
}
```

## Failure modes

If you ignore reference rules:

- Missing references break resolution and cause build failures
- Circular references cause infinite loops
- Invalid paths silently fail or resolve incorrectly
- Property-level references on wrong types cause type errors

## Validation Checklist

A reference is valid if:

- The syntax matches curly brace or JSON Pointer format
- The target variable exists
- No circular reference is detected
- If property-level, the target type supports property references
- The property exists on the target type

## Out of scope

- Runtime reference resolution libraries (use DTCG-compliant resolvers)
- Reference rewriting or conversion
- Cross-file references (all references are within the same JSON document)
