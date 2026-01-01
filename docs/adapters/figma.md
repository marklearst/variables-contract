---
title: Figma Adapter
---

# Figma Adapter

Figma Variables exports include tool-specific metadata and reference syntax. This adapter normalizes Figma exports into Variable Contract format.

## Input format

Figma exports include:

- `$collection_metadata` at collection level
- `$variable_metadata` on each variable
- Reference syntax: `{@collection.token}` (with `@` prefix)
- Mode values in `$variable_metadata.modes`

Example Figma export:

```json
{
  "@primitives": {
    "$collection_metadata": {
      "name": "Primitives",
      "figmaId": "VariableCollectionId:502:189",
      "modes": [
        { "key": "light", "name": "Light" },
        { "key": "dark", "name": "Dark" }
      ]
    },
    "$color": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc",
        "$variable_metadata": {
          "name": "color/primary",
          "figmaId": "VariableID:502:227",
          "modes": {
            "light": "#0066cc",
            "dark": "#004499"
          }
        }
      }
    }
  }
}
```

## Normalization steps

### Step 1: Extract collection metadata

Move `$collection_metadata` to `$extensions` on the collection group.

Before:

```json
{
  "@primitives": {
    "$collection_metadata": {
      "name": "Primitives",
      "figmaId": "VariableCollectionId:502:189"
    }
  }
}
```

After:

```json
{
  "primitives": {
    "$extensions": {
      "figma": {
        "collectionId": "VariableCollectionId:502:189",
        "name": "Primitives"
      }
    }
  }
}
```

### Step 2: Normalize collection names

Remove `@` prefix from collection names. Figma uses `@collection` but Variable Contract uses `collection`.

Before: `"@primitives"`

After: `"primitives"`

### Step 3: Extract variable metadata

Move `$variable_metadata` to `$extensions` on each variable.

Before:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc",
      "$variable_metadata": {
        "name": "color/primary",
        "figmaId": "VariableID:502:227"
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
      "$value": "#0066cc",
      "$extensions": {
        "figma": {
          "variableId": "VariableID:502:227",
          "name": "color/primary"
        }
      }
    }
  }
}
```

### Step 4: Normalize reference syntax

Convert Figma reference syntax to canonical format.

Figma uses: `{@collection.token}`

Variable Contract uses: `{collection.token}`

Before:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{@primitives.$color.primary}"
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
        "$value": "{primitives.color.primary}"
      }
    }
  }
}
```

### Step 5: Handle modes

If `$variable_metadata.modes` exists, move mode values to `$value` object.

Before:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": "#ffffff",
      "$variable_metadata": {
        "modes": {
          "light": "#ffffff",
          "dark": "#000000"
        }
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
      },
      "$extensions": {
        "figma": {
          "variableId": "VariableID:502:227"
        }
      }
    }
  }
}
```

### Step 6: Validate naming

Check that normalized names follow Variable Contract naming convention (see [Naming](/variables-contract/adapters/contract/naming)).

- Names MUST use dot-separated paths
- Names MUST be lowercase
- Names MUST NOT include platform prefixes

## Complete transformation example

Figma export:

```json
{
  "@primitives": {
    "$collection_metadata": {
      "name": "Primitives",
      "figmaId": "VariableCollectionId:502:189"
    },
    "$color": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc",
        "$variable_metadata": {
          "name": "color/primary",
          "figmaId": "VariableID:502:227",
          "modes": {
            "light": "#0066cc",
            "dark": "#004499"
          }
        }
      }
    }
  },
  "@tokens": {
    "$color": {
      "text": {
        "primary": {
          "$type": "color",
          "$value": "{@primitives.$color.primary}",
          "$variable_metadata": {
            "name": "color/text/primary",
            "figmaId": "VariableID:502:228"
          }
        }
      }
    }
  }
}
```

Normalized Variable Contract:

```json
{
  "primitives": {
    "$extensions": {
      "figma": {
        "collectionId": "VariableCollectionId:502:189",
        "name": "Primitives"
      }
    },
    "color": {
      "primary": {
        "$type": "color",
        "$value": {
          "light": "#0066cc",
          "dark": "#004499"
        },
        "$extensions": {
          "figma": {
            "variableId": "VariableID:502:227",
            "name": "color/primary"
          }
        }
      }
    }
  },
  "tokens": {
    "color": {
      "text": {
        "primary": {
          "$type": "color",
          "$value": {
            "light": "{primitives.color.primary}",
            "dark": "{primitives.color.primary}"
          },
          "$extensions": {
            "figma": {
              "variableId": "VariableID:502:228",
              "name": "color/text/primary"
            }
          }
        }
      }
    }
  }
}
```

## Round-trip considerations

If you need to sync changes back to Figma:

- Preserve Figma IDs in `$extensions.figma.variableId` and `$extensions.figma.collectionId`
- Keep mode keys consistent with Figma mode keys
- Maintain reference paths that Figma can resolve

## Failure modes

If normalization fails:

- Missing `$variable_metadata` breaks Figma ID preservation
- Invalid reference syntax causes resolution failures
- Mode mismatches break mode-based workflows
- Naming violations cause validation failures

## Validation checklist

After normalization, verify:

- All `$collection_metadata` moved to `$extensions`
- All `$variable_metadata` moved to `$extensions`
- All `@` prefixes removed from collection names
- All references use canonical format (`{path}`)
- Mode values moved to `$value` object
- Names follow Variable Contract naming convention

## Workflow

Designers author variables in Figma. Changes flow through export, normalization, review, and release.

### Who does what

- Designer: authors variables in Figma, exports JSON
- Design Engineer: runs adapter, opens PR, reviews changes
- CI: validates normalized JSON

### Workflow steps

1. Designer exports variables from Figma (Dev Mode plugin or REST API).
2. Design Engineer runs Figma adapter to normalize export JSON.
3. Design Engineer commits normalized JSON to version control.
4. Design Engineer opens PR for review.
5. Reviewers check naming, types, references (see [Change Control](/variables-contract/adapters/governance/change-control)).
6. After merge, CI generates build outputs.

### What gets reviewed

- Variable names follow naming convention ([Naming](/variables-contract/adapters/contract/naming))
- References resolve correctly
- Modes are limited (`light`, `dark`)
- No duplicate values when base tokens exist
- Breaking changes are documented

### Authoring checklist

Before exporting from Figma:

- Use semantic alias tokens for UI intent, not raw palette values
- Keep modes limited (example: `light`, `dark`)
- Follow naming convention (dot-separated paths, lowercase)
- Use references instead of duplicating values

### Artifacts that change

- Figma export JSON (input, not committed)
- Normalized Variable Contract JSON (committed, reviewed)
- Generated CSS/TypeScript files (output, not committed)

## Out of scope

- Figma API integration (use Figma REST API or plugins)
- Real-time sync (handle via version control)
- Conflict resolution (handle via PR review)
