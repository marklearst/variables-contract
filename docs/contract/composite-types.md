---
title: Composite Types
---

# Composite Types

Composite types combine multiple primitive types into structured values. They represent complex design decisions like borders, shadows, and typography styles.

## Border

`$type: "border"`

Represents a border with width, color, and style.

Structure:

- `width`: dimension value or reference
- `color`: color value or reference
- `style`: stroke style value or reference

Example:

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
    },
    "thick": {
      "$type": "border",
      "$value": {
        "width": { "value": 2, "unit": "px" },
        "color": "{color.border.primary}",
        "style": "solid"
      }
    }
  }
}
```

Stroke style values:

- String: `"solid"`, `"dashed"`, `"dotted"`
- Object: `{ "dashArray": [4, 4], "lineCap": "round" }`

Property-level references:

- `{variable.width}` - border width
- `{variable.color}` - border color
- `{variable.style}` - border style

## Transition

`$type: "transition"`

Represents a CSS transition with duration, delay, and timing function.

Structure:

- `duration`: duration value or reference
- `delay`: duration value or reference (optional)
- `timingFunction`: cubic Bézier value or reference

Example:

```json
{
  "transition": {
    "default": {
      "$type": "transition",
      "$value": {
        "duration": "200ms",
        "delay": "0ms",
        "timingFunction": [0.25, 0.1, 0.25, 1]
      }
    },
    "fast": {
      "$type": "transition",
      "$value": {
        "duration": "{duration.fast}",
        "timingFunction": "{easing.default}"
      }
    }
  }
}
```

Property-level references:

- `{variable.duration}` - transition duration
- `{variable.delay}` - transition delay
- `{variable.timingFunction}` - timing function

## Shadow

`$type: "shadow"`

Represents a box shadow with color, offset, blur, and spread.

Structure:

- `color`: color value or reference
- `offsetX`: dimension value or reference
- `offsetY`: dimension value or reference
- `blur`: dimension value or reference
- `spread`: dimension value or reference (optional)

Example:

```json
{
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
    },
    "large": {
      "$type": "shadow",
      "$value": {
        "color": "{color.shadow.base}",
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 8, "unit": "px" },
        "blur": { "value": 16, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      }
    }
  }
}
```

Property-level references:

- `{variable.color}` - shadow color
- `{variable.offsetX}` - horizontal offset
- `{variable.offsetY}` - vertical offset
- `{variable.blur}` - blur radius
- `{variable.spread}` - spread radius

## Gradient

`$type: "gradient"`

Represents a gradient with color stops.

Structure:

Array of stop objects, each with:
- `color`: color value or reference
- `position`: number between 0 and 1, or reference

Example:

```json
{
  "gradient": {
    "primary": {
      "$type": "gradient",
      "$value": [
        {
          "color": "#0066cc",
          "position": 0
        },
        {
          "color": "#004499",
          "position": 1
        }
      ]
    },
    "brand": {
      "$type": "gradient",
      "$value": [
        {
          "color": "{color.primary}",
          "position": 0
        },
        {
          "color": "{color.secondary}",
          "position": 1
        }
      ]
    }
  }
}
```

Rules:

- Stops MUST be ordered by position (ascending)
- Position values outside 0-1 are clamped to 0 or 1
- If no stop at position 0, the first stop's color extends to 0
- If no stop at position 1, the last stop's color extends to 1

## Typography

`$type: "typography"`

Represents a typographic style with font family, size, weight, letter spacing, and line height.

Structure:

- `fontFamily`: font family value or reference
- `fontSize`: dimension value or reference
- `fontWeight`: font weight value or reference
- `letterSpacing`: dimension value or reference
- `lineHeight`: number value or reference (multiplier of fontSize)

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
        "letterSpacing": { "value": 0, "unit": "px" },
        "lineHeight": 1.5
      }
    },
    "body": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.primary}",
        "fontSize": "{font.size.base}",
        "fontWeight": "{font.weight.normal}",
        "letterSpacing": { "value": 0, "unit": "px" },
        "lineHeight": 1.2
      }
    }
  }
}
```

Property-level references:

- `{variable.fontFamily}` - font family
- `{variable.fontSize}` - font size
- `{variable.fontWeight}` - font weight
- `{variable.letterSpacing}` - letter spacing
- `{variable.lineHeight}` - line height

## Composite type validation

Rules:

- All required properties MUST be present
- Property values MUST match their expected types
- References in properties MUST resolve to compatible types
- Array-based composites (gradient) MUST have at least one element

## Array aliasing in composite types

Composite types can reference other composite types as arrays. This allows reusing entire composite values.

Example:

```json
{
  "shadow": {
    "base": {
      "$type": "shadow",
      "$value": {
        "color": "rgba(0, 0, 0, 0.1)",
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 2, "unit": "px" },
        "blur": { "value": 4, "unit": "px" }
      }
    },
    "card": {
      "$type": "shadow",
      "$value": "{shadow.base}"
    }
  }
}
```

## Groups versus composite variables

Use groups when:

- You want to organize related variables
- You need to extend or override group structure
- Variables are independent but related

Use composite variables when:

- The combination represents a single design decision
- Properties must be used together
- You need property-level references

Example comparison:

Group approach:

```json
{
  "border": {
    "width": {
      "$type": "dimension",
      "$value": "1px"
    },
    "color": {
      "$type": "color",
      "$value": "#e0e0e0"
    }
  }
}
```

Composite approach:

```json
{
  "border": {
    "default": {
      "$type": "border",
      "$value": {
        "width": "1px",
        "color": "#e0e0e0",
        "style": "solid"
      }
    }
  }
}
```

## Examples

### Complete composite types example

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
  "transition": {
    "default": {
      "$type": "transition",
      "$value": {
        "duration": "200ms",
        "timingFunction": [0.25, 0.1, 0.25, 1]
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
        "blur": { "value": 4, "unit": "px" }
      }
    }
  },
  "gradient": {
    "primary": {
      "$type": "gradient",
      "$value": [
        { "color": "#0066cc", "position": 0 },
        { "color": "#004499", "position": 1 }
      ]
    }
  },
  "typography": {
    "heading": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Roboto",
        "fontSize": { "value": 24, "unit": "px" },
        "fontWeight": 700,
        "letterSpacing": { "value": 0, "unit": "px" },
        "lineHeight": 1.5
      }
    }
  }
}
```

## Failure modes

If you ignore composite type rules:

- Missing required properties cause validation failures
- Type mismatches in properties break resolution
- Invalid array structures (gradient) cause parsing errors
- Property-level references on wrong types fail

## Validation checklist

A composite type is valid if:

- All required properties are present
- Property values match their expected types
- References resolve to compatible types
- Array-based composites have valid structure
- Property-level references target valid properties

## Out of scope

- Custom composite types (use `$extensions` for metadata)
- Composite type coercion
- Runtime composite type validation libraries (use DTCG-compliant validators)

