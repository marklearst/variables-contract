---
title: Governance: Troubleshooting
---

# Troubleshooting

Common issues when working with Variable Design Standard (VDS) and how to fix them.

## Workflow

1. Reproduce the error in CI or local validation.
2. Identify the file and variable path from the error output.
3. Fix the cause (type, reference, or mode key set).
4. Re-run validation before merge.

## Circular references

### Problem

Circular reference detected: `color.a` → `color.b` → `color.a`

### Cause

Variable A references variable B, which references variable A (directly or indirectly).

### Solution

Break the cycle by making one variable reference a literal value:

Before:

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

After:

```json
{
  "color": {
    "a": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "b": {
      "$type": "color",
      "$value": "{color.a}"
    }
  }
}
```

### Detection

Validation should detect circular references. Check validation output for cycle warnings.

## Invalid types

### Problem

Variable `spacing.base` has `$type: "color"` but `$value: "16px"`

### Cause

`$type` does not match `$value` format.

### Solution

Fix the type or value:

Option 1: Fix type

```json
{
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "16px"
    }
  }
}
```

Option 2: Fix value

```json
{
  "spacing": {
    "base": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

### Prevention

Run validation before committing. Check type matches value format.

## Review checklist

- [ ] Error reproduced with validation output
- [ ] Variable path and file identified
- [ ] Fix applied and validation passes

## Reference resolution failures

### Problem

Reference `{color.primary}` points to non-existent variable

### Cause

Referenced variable does not exist or path is incorrect.

### Solution

Create the referenced variable or fix the reference path:

Before:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.primary}"
      }
    }
  }
}
```

After:

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

### Prevention

Validate references resolve before committing. Use validation tools.

## Mode mismatches

### Problem

Variable `color.surface` has mode `light` but collection expects `light` and `dark`

### Cause

Mode keys do not match within a collection.

### Solution

Add missing modes or remove mismatched modes:

Before:

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

After:

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

### Prevention

Define mode strategy upfront. Validate mode key sets in CI.

## Naming violations

### Problem

Variable name `color/web-primary` includes platform prefix

### Cause

Variable name violates naming convention (no platform prefixes).

### Solution

Remove platform prefix:

Before:

```json
{
  "color": {
    "web-primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

After:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

### Prevention

Validate naming convention in CI. Use naming linter.

## Missing `$type`

### Problem

Variable `color.primary` missing `$type`

### Cause

Variable object does not have `$type` property.

### Solution

Add `$type` property:

Before:

```json
{
  "color": {
    "primary": {
      "$value": "#0066cc"
    }
  }
}
```

After:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

### Prevention

Validate structure in CI. Check all variables have `$type`.

## Invalid reference syntax

### Problem

Reference uses non-canonical format: `color.primary` instead of `{color.primary}`

### Cause

Reference syntax does not match Variable Design Standard (VDS) format.

### Solution

Convert to canonical format:

Before:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "color.primary"
      }
    }
  }
}
```

After:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.primary}"
      }
    }
  }
}
```

### Prevention

Run adapter normalization. Validate reference syntax in CI.

## Group extension failures

### Problem

Group `color.brand` references non-existent group `{color.base}`

### Cause

Group `$extends` target does not exist.

### Solution

Create the referenced group or fix the reference path:

Before:

```json
{
  "color": {
    "brand": {
      "$extends": "{color.base}"
    }
  }
}
```

After:

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0.4, 0.8],
          "hex": "#0066cc"
        }
      }
    },
    "brand": {
      "$extends": "{color.base}"
    }
  }
}
```

### Prevention

Validate group references resolve. Check `$extends` targets exist.

## Property-level reference errors

### Problem

Property-level reference `{color.primary.r}` targets non-color type

### Cause

Property-level reference used on wrong type.

### Solution

Use property-level references only on compatible types:

Before:

```json
{
  "spacing": {
    "base": {
      "$type": "dimension",
      "$value": "16px"
    },
    "base-r": {
      "$type": "number",
      "$value": "{spacing.base.r}"
    }
  }
}
```

After:

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

### Prevention

Validate property-level references target compatible types.

## Getting help

If issues persist:

1. Check validation output for specific errors
2. Review [Validation](validation) guide
3. Check [Change Control](change-control) for review process
4. Consult [Design Engineer](roles/design-engineer) role

## Out of scope

- Tool-specific issues (see adapter documentation)
- Build pipeline issues (see Style Dictionary documentation)
- Runtime consumption issues (see platform-specific docs)

## Links

- [Validation](validation)
- [Change Control](change-control)
- [Adapters](/adapters)
