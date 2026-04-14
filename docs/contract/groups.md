---
title: "Contract: Groups"
description: "Groups organize variables into nested structures. Groups can extend other groups to inherit their structure."
---

# Groups

Groups organize variables into nested structures. Groups can extend other groups to inherit their structure.

## Requirements

- Groups MUST be objects that contain groups and/or variables.
- Groups MUST NOT include `$type` or `$value`.
- `$extends` is allowed only on groups.

## Group structure

A group is an object that contains nested groups and/or variables. Groups do not have `$type` or `$value` properties.

Example:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "#000000"
      },
      "secondary": {
        "$type": "color",
        "$value": "#666666"
      }
    }
  }
}
```

In this example, `color` and `color.text` are groups. `color.text.primary` and `color.text.secondary` are variables.

## Group extension with `$extends`

Groups can extend other groups using DTCG 2025.10 `$extends` syntax. This allows inheritance and composition.

Rules:

- `$extends` MUST use curly brace syntax: `"{group.path}"`
- The referenced group MUST exist
- Extending groups inherit all variables and nested groups from the referenced group
- Extending groups can override inherited variables
- Extending groups can add new variables

Example:

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
      },
      "secondary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.4, 0.4, 0.4],
          "hex": "#666666"
        }
      }
    },
    "brand": {
      "$extends": "{color.base}",
      "primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 0.4],
          "hex": "#ff0066"
        }
      },
      "accent": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 1, 0.4],
          "hex": "#00ff66"
        }
      }
    }
  }
}
```

After resolution, `color.brand` contains:

- `color.brand.primary` (overridden, value is `#ff0066`)
- `color.brand.secondary` (inherited from `color.base.secondary`)
- `color.brand.accent` (new variable)

**Note**: DTCG 2025.10 also supports JSON Pointer syntax (`$ref` with `#/path/to/group`) for compatibility with JSON Schema tooling. Variable Design Standard (VDS) recommends `$extends` with curly brace syntax to align with variable references.

## Group properties

Groups can have properties that apply to the group:

- `$deprecated`: marks the group and all nested variables as deprecated
- `$extensions`: stores non-standard metadata for the group

Example:

```json
{
  "color": {
    "$deprecated": true,
    "$extensions": {
      "tool": {
        "id": "collection-123"
      }
    },
    "old": {
      "$type": "color",
      "$value": "#000000"
    }
  }
}
```

## Empty groups

Groups can be empty (contain no variables or nested groups). Empty groups are allowed but SHOULD be removed if they serve no purpose.

## Inheritance semantics

When a group extends another group:

1. All variables from the referenced group are copied into the extending group
2. All nested groups from the referenced group are copied into the extending group
3. Variables in the extending group override inherited variables with the same name
4. Nested groups in the extending group merge with inherited nested groups

## Merge precedence rules

Group extension follows explicit precedence rules:

### Rule 1: Local definitions override inherited

Variables and nested groups defined in the extending group take precedence over inherited definitions with the same name.

Example:

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
      "$extends": "{color.base}",
      "primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 0.4],
          "hex": "#ff0066"
        }
      }
    }
  }
}
```

After resolution, `color.brand.primary` uses the local definition (`#ff0066`), not the inherited one (`#0066cc`).

### Rule 2: Nested groups merge (don't replace)

When both the extending group and the referenced group have a nested group with the same name, the nested groups merge rather than replace.

Example:

```json
{
  "color": {
    "base": {
      "gray": {
        "100": {
          "$type": "color",
          "$value": {
            "colorSpace": "srgb",
            "components": [0.96, 0.96, 0.96],
            "hex": "#f5f5f5"
          }
        }
      }
    },
    "brand": {
      "$extends": "{color.base}",
      "gray": {
        "200": {
          "$type": "color",
          "$value": {
            "colorSpace": "srgb",
            "components": [0.9, 0.9, 0.9],
            "hex": "#e6e6e6"
          }
        }
      }
    }
  }
}
```

After resolution, `color.brand.gray` contains both `gray.100` (inherited) and `gray.200` (local).

### Rule 3: Variables override inherited variables

If a variable exists in both the referenced group and the extending group with the same name, the extending group's variable completely replaces the inherited variable (no merging of variable properties).

## Conflict resolution

### Variable name conflicts

When the extending group defines a variable with the same name as an inherited variable:

- **Resolution**: The extending group's variable takes precedence
- **Behavior**: The inherited variable is completely replaced (not merged)
- **Validation**: This is allowed and expected behavior

Example:

```json
{
  "spacing": {
    "base": {
      "medium": {
        "$type": "dimension",
        "$value": { "value": 16, "unit": "px" }
      }
    },
    "mobile": {
      "$extends": "{spacing.base}",
      "medium": {
        "$type": "dimension",
        "$value": { "value": 12, "unit": "px" }
      }
    }
  }
}
```

After resolution, `spacing.mobile.medium` is `12px` (local), not `16px` (inherited).

### Nested group name conflicts

When both groups have a nested group with the same name:

- **Resolution**: Nested groups merge (variables from both are included)
- **Behavior**: Variables in the local nested group override inherited variables with the same name
- **Validation**: This is allowed and expected behavior

## Explicit prohibitions

Groups with `$extends` MUST follow these rules:

### Prohibition 1: No `$type` or `$value` at group level

A group that uses `$extends` MUST NOT have `$type` or `$value` properties at the same level.

**Invalid**:

```json
{
  "color": {
    "brand": {
      "$extends": "{color.base}",
      "$type": "color", // PROHIBITED
      "$value": "#0066cc" // PROHIBITED
    }
  }
}
```

**Valid**:

```json
{
  "color": {
    "brand": {
      "$extends": "{color.base}",
      "primary": {
        "$type": "color", // Allowed - this is a variable, not the group
        "$value": "#0066cc"
      }
    }
  }
}
```

### Prohibition 2: No circular references

Groups MUST NOT create circular references through `$extends`. See [Circular reference prevention](#circular-reference-prevention) for details.

### Prohibition 3: `$extends` target must exist

The group referenced by `$extends` MUST exist. Validation MUST reject groups that extend non-existent groups.

## Circular reference prevention

Groups MUST NOT create circular references through `$extends`. If group A extends group B, group B MUST NOT extend group A (directly or indirectly).

Example of invalid circular reference:

```json
{
  "color": {
    "a": {
      "$extends": "{color.b}"
    },
    "b": {
      "$extends": "{color.a}"
    }
  }
}
```

This MUST be rejected during validation.

## Reference resolution and evaluation

Group extension is resolved before variable reference resolution. The resolution order is:

1. Resolve all `$extends` in groups
2. Resolve all variable references (`{path}` or `#/path`)

## Examples

### Basic group structure

```json
{
  "spacing": {
    "small": {
      "$type": "dimension",
      "$value": { "value": 8, "unit": "px" }
    },
    "medium": {
      "$type": "dimension",
      "$value": { "value": 16, "unit": "px" }
    },
    "large": {
      "$type": "dimension",
      "$value": { "value": 24, "unit": "px" }
    }
  }
}
```

### Group extension with override

```json
{
  "spacing": {
    "base": {
      "small": {
        "$type": "dimension",
        "$value": { "value": 8, "unit": "px" }
      },
      "medium": {
        "$type": "dimension",
        "$value": { "value": 16, "unit": "px" }
      }
    },
    "mobile": {
      "$extends": "{spacing.base}",
      "small": {
        "$type": "dimension",
        "$value": { "value": 4, "unit": "px" }
      }
    }
  }
}
```

After resolution, `spacing.mobile` contains:

- `spacing.mobile.small` (overridden, value is `4px`)
- `spacing.mobile.medium` (inherited, value is `16px`)

### Complex hierarchical structure

```json
{
  "color": {
    "palette": {
      "gray": {
        "100": {
          "$type": "color",
          "$value": {
            "colorSpace": "srgb",
            "components": [0.96, 0.96, 0.96],
            "hex": "#f5f5f5"
          }
        },
        "900": {
          "$type": "color",
          "$value": {
            "colorSpace": "srgb",
            "components": [0.1, 0.1, 0.1],
            "hex": "#1a1a1a"
          }
        }
      }
    },
    "semantic": {
      "$extends": "{color.palette}",
      "text": {
        "primary": {
          "$type": "color",
          "$value": "{color.palette.gray.900}"
        },
        "secondary": {
          "$type": "color",
          "$value": "{color.palette.gray.100}"
        }
      }
    }
  }
}
```

## Failure modes

If you ignore group rules:

- Circular references cause infinite resolution loops
- Missing `$ref` targets break resolution
- Overriding variables incorrectly can break component styling
- Empty groups add noise without value

## Validation Checklist

A group is valid if:

- It contains variables, nested groups, or both
- If it uses `$extends`, the target exists and is not circular
- If it uses `$deprecated`, it is a boolean
- If it uses `$extensions`, it is an object

## Out of scope

- Runtime group resolution algorithms (use DTCG-compliant resolvers)
- Group merging strategies beyond override semantics
- Group versioning (handle at variable level)
