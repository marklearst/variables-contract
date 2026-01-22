---
title: Modes
---

# Modes

Modes represent intentional variants of variables (example: `light`/`dark`, `mobile`/`desktop`).

If modes are inconsistent, theme switching breaks and mode-specific outputs fail.

## Mode structure

Modes are stored in `$value` as an object keyed by mode name.

Example:

```json
{
  "color": {
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

## Mode names

Mode names are strings that identify the variant.

Rules:

- Mode names MUST be strings
- Mode names SHOULD be lowercase
- Mode names SHOULD be descriptive (`light`, `dark`, `mobile`, `desktop`)
- Mode names MUST be consistent within collections

## Mode consistency

All variables in a collection that use modes MUST use the same mode keys.

Example of consistent modes:

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
      "$type": "color",
      "$value": {
        "light": "#000000",
        "dark": "#ffffff"
      }
    }
  }
}
```

Both variables use `light` and `dark` modes.

Example of inconsistent modes (invalid):

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff"
      }
    },
    "text": {
      "$type": "color",
      "$value": {
        "light": "#000000",
        "dark": "#ffffff"
      }
    }
  }
}
```

`color.surface` is missing `dark` mode.

## Mode values

Mode values can be literal values or references.

### Literal mode values

Mode values can be literal values:

```json
{
  "color": {
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

### Reference mode values

Mode values can reference other variables:

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

## Mode resolution

Mode resolution follows these steps:

1. Select mode key (example: `light`)
2. Get mode value from `$value` object
3. If mode value is a reference, resolve the reference
4. If referenced variable has modes, resolve the mode value for the selected mode
5. Continue until literal value is found

Example resolution chain:

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

Resolution for `light` mode:
1. `color.text.primary` → `{color.gray.900}` (reference)
2. `color.gray.900` → resolve `light` mode → `#1a1a1a`
3. Final value: `#1a1a1a`

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

The `$extensions.modes` documents the expected modes but does not enforce them. Validation should check mode consistency.

## Mode limitations

Rules:

- Keep modes limited (example: `light`, `dark`)
- Avoid mode explosion (do not create modes for every variation)
- Use modes for intentional variants, not for every possible value

## Examples

### Light/dark theme

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

### Mobile/desktop breakpoints

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
      }
    }
  }
}
```

### Brand variants

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": {
        "brand-a": "#0066cc",
        "brand-b": "#ff0066"
      }
    }
  }
}
```

## Failure modes

If modes are inconsistent:

- Theme switching breaks
- Mode-specific outputs fail
- Reference resolution fails for missing modes
- Build pipelines cannot generate mode-specific files

## Validation checklist

Modes are valid if:

- Mode keys are strings
- Mode keys are consistent within collections
- Mode values are valid for the variable type
- Mode references resolve correctly
- All variables in a collection use the same mode keys (if they use modes)

## Out of scope

- Runtime mode switching (handle in consumption layer)
- Mode transformation (handle in adapters)
- Mode-specific build outputs (handle in build tools)

