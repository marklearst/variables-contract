---
title: Scenarios - Multi-Theme
---

# Multi-Theme Patterns

How to structure variables for multiple themes (light/dark, mobile/desktop) using modes.

If themes are inconsistent, theme switching breaks and mode-specific outputs fail.

## Theme composition patterns

### Pattern 1: Mode-based themes

Use modes to represent different themes.

Structure:

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

Themes inherit from base and override specific values.

Structure:

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

Mode values reference other variables with modes.

Structure:

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

When resolving `light` mode: `color.text.primary` → `{color.gray.900}` → resolve `light` mode → `#1a1a1a`

## Mode inheritance

Groups can define mode strategy that applies to nested variables.

Example:

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

The `$extensions.modes` documents expected modes but does not enforce them. Validation should check mode consistency.

## Theme switching implementation

### CSS implementation

Generate mode-specific CSS files:

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

### JavaScript implementation

Switch themes by changing mode:

```javascript
// Set theme mode
document.documentElement.setAttribute("data-theme", "dark");

// Or use CSS class
document.documentElement.classList.add("theme-dark");
```

## Examples

### Light/dark theme

Complete light/dark theme example:

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

### Mobile/desktop breakpoints

Use modes for responsive variables:

```json
{
  "font": {
    "size": {
      "base": {
        "$type": "dimension",
        "$value": {
          "mobile": "16px",
          "desktop": "18px"
        }
      },
      "heading": {
        "$type": "dimension",
        "$value": {
          "mobile": "24px",
          "desktop": "32px"
        }
      }
    }
  },
  "spacing": {
    "layout": {
      "gutter": {
        "$type": "dimension",
        "$value": {
          "mobile": "16px",
          "desktop": "24px"
        }
      }
    }
  }
}
```

### Combined themes

Combine multiple mode dimensions:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light-mobile": "#ffffff",
        "light-desktop": "#f5f5f5",
        "dark-mobile": "#000000",
        "dark-desktop": "#1a1a1a"
      }
    }
  }
}
```

Avoid mode explosion. Prefer separate mode dimensions when possible.

## Implementation rules

1. Keep modes limited (`light`, `dark`)
2. Use consistent mode keys across variables
3. Reference base variables in mode values
4. Document mode strategy
5. Validate mode consistency

## Failure modes

If themes are inconsistent:

- Theme switching breaks
- Mode-specific outputs fail
- Reference resolution fails
- Build pipelines cannot generate mode-specific files

## Out of scope

- Runtime theme switching (handle in consumption layer)
- Theme transformation (handle in adapters)
- Theme management UI (use existing tools)
