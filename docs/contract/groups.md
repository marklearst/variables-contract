---
title: Groups
---

# Groups

Groups organize variables into nested structures. Groups can extend other groups to inherit their structure.

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

## Group extension with `$ref`

Groups can extend other groups using JSON Schema `$ref` syntax. This allows inheritance and composition.

Rules:

- `$ref` MUST use JSON Pointer syntax: `#/path/to/group`
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
        "$value": "#0066cc"
      },
      "secondary": {
        "$type": "color",
        "$value": "#666666"
      }
    },
    "brand": {
      "$ref": "#/color/base",
      "primary": {
        "$type": "color",
        "$value": "#ff0066"
      },
      "accent": {
        "$type": "color",
        "$value": "#00ff66"
      }
    }
  }
}
```

After resolution, `color.brand` contains:
- `color.brand.primary` (overridden, value is `#ff0066`)
- `color.brand.secondary` (inherited from `color.base.secondary`)
- `color.brand.accent` (new variable)

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

## Circular reference prevention

Groups MUST NOT create circular references through `$ref`. If group A extends group B, group B MUST NOT extend group A (directly or indirectly).

Example of invalid circular reference:

```json
{
  "color": {
    "a": {
      "$ref": "#/color/b"
    },
    "b": {
      "$ref": "#/color/a"
    }
  }
}
```

This MUST be rejected during validation.

## Reference resolution and evaluation

Group extension is resolved before variable reference resolution. The resolution order is:

1. Resolve all `$ref` in groups
2. Resolve all variable references (`{path}` or `#/path`)

## Examples

### Basic group structure

```json
{
  "spacing": {
    "small": {
      "$type": "dimension",
      "$value": "8px"
    },
    "medium": {
      "$type": "dimension",
      "$value": "16px"
    },
    "large": {
      "$type": "dimension",
      "$value": "24px"
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
        "$value": "8px"
      },
      "medium": {
        "$type": "dimension",
        "$value": "16px"
      }
    },
    "mobile": {
      "$ref": "#/spacing/base",
      "small": {
        "$type": "dimension",
        "$value": "4px"
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
          "$value": "#f5f5f5"
        },
        "900": {
          "$type": "color",
          "$value": "#1a1a1a"
        }
      }
    },
    "semantic": {
      "$ref": "#/color/palette",
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

## Validation checklist

A group is valid if:

- It contains variables, nested groups, or both
- If it uses `$ref`, the target exists and is not circular
- If it uses `$deprecated`, it is a boolean
- If it uses `$extensions`, it is an object

## Out of scope

- Runtime group resolution algorithms (use DTCG-compliant resolvers)
- Group merging strategies beyond override semantics
- Group versioning (handle at variable level)

