---
title: Patterns - Theme Composition
---

# Theme Composition Patterns

How to compose themes using modes and variable references.

## Theme composition patterns

### Pattern 1: Mode-based themes

Use modes to represent themes:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": {
          "light": "#000000",
          "dark": "#ffffff"
        }
      }
    }
  }
}
```

### Pattern 2: Theme inheritance

Themes inherit from base and override:

```json
// tokens/base/color.json
{
  "color": {
    "gray": {
      "0": { "$type": "color", "$value": "#ffffff" },
      "1000": { "$type": "color", "$value": "#000000" }
    }
  }
}

// tokens/theme-light/color.json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": "{color.gray.0}"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.1000}"
      }
    }
  }
}

// tokens/theme-dark/color.json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": "{color.gray.1000}"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.0}"
      }
    }
  }
}
```

### Pattern 3: Mode references

Mode values reference other variables with modes:

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

## Mode inheritance

Groups can define mode strategy:

```json
{
  "color": {
    "$extensions": {
      "modes": ["light", "dark"]
    },
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    }
  }
}
```

## Theme switching

### CSS implementation

Generate mode-specific CSS:

```css
/* variables-light.css */
:root {
  --color-surface: #ffffff;
  --color-text-primary: #000000;
}

/* variables-dark.css */
:root[data-theme="dark"] {
  --color-surface: #000000;
  --color-text-primary: #ffffff;
}
```

### JavaScript switching

```javascript
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
```

## Examples

### Light/dark theme

Complete light/dark theme:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": {
          "light": "#000000",
          "dark": "#ffffff"
        }
      },
      "secondary": {
        "$type": "color",
        "$value": {
          "light": "#666666",
          "dark": "#999999"
        }
      }
    }
  }
}
```

### Multi-mode theme

Theme with multiple modes:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff",
        "dark": "#000000",
        "high-contrast": "#000000"
      }
    }
  }
}
```

## Implementation rules

1. Use modes for theme variants
2. Reference base variables in mode values
3. Keep mode keys consistent
4. Document mode strategy
5. Test theme switching

## Failure modes

If theme composition is wrong:

- Theme switching breaks
- Mode-specific outputs fail
- Reference resolution fails
- Inconsistent theming

## Out of scope

- Runtime theme switching (handle in consumption layer)
- Theme management UI (use existing tools)
- Theme persistence (handle in application layer)

