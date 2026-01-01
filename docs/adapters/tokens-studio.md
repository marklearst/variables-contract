---
title: Tokens Studio Adapter
---

# Tokens Studio Adapter

Tokens Studio exports are close to Variable Contract format but may include Tokens Studio-specific metadata. This adapter normalizes Tokens Studio exports.

## Input format

Tokens Studio exports are typically DTCG-compliant but may include:

- Tokens Studio metadata in `$extensions`
- Custom reference syntax (usually standard)
- Mode values in `$value` objects

Example Tokens Studio export:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc",
      "$description": "Primary brand color",
      "$extensions": {
        "studio.tokens": {
          "import": {
            "source": "figma",
            "id": "123:456"
          }
        }
      }
    }
  }
}
```

## Normalization steps

### Step 1: Preserve Tokens Studio metadata

Tokens Studio metadata in `$extensions` is already in the correct location. Keep it for round-trip workflows.

No change needed if metadata is already in `$extensions`.

### Step 2: Validate reference syntax

Tokens Studio typically uses standard reference syntax (`{path.to.token}`). Verify references match canonical format.

If Tokens Studio uses non-standard syntax, convert to canonical format.

### Step 3: Handle modes

Tokens Studio stores modes in `$value` objects, which matches Variable Contract format.

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

This format is already correct. No transformation needed.

### Step 4: Validate naming

Check that names follow Variable Contract naming convention (see [Naming](/variables-contract/adapters/contract/naming)).

- Names MUST use dot-separated paths
- Names MUST be lowercase
- Names MUST NOT include platform prefixes

## Complete transformation example

Tokens Studio export:

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc",
        "$description": "Primary brand color",
        "$extensions": {
          "studio.tokens": {
            "import": {
              "source": "figma",
              "id": "123:456"
            }
          }
        }
      }
    },
    "semantic": {
      "text": {
        "primary": {
          "$type": "color",
          "$value": "{color.base.primary}",
          "$description": "Primary text color"
        }
      }
    }
  }
}
```

Normalized Variable Contract:

```json
{
  "color": {
    "base": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc",
        "$description": "Primary brand color",
        "$extensions": {
          "studio.tokens": {
            "import": {
              "source": "figma",
              "id": "123:456"
            }
          }
        }
      }
    },
    "semantic": {
      "text": {
        "primary": {
          "$type": "color",
          "$value": "{color.base.primary}",
          "$description": "Primary text color"
        }
      }
    }
  }
}
```

In this case, the format is already correct. The adapter mainly validates and preserves metadata.

## Round-trip considerations

Tokens Studio can read Variable Contract format directly. For round-trip workflows:

- Preserve Tokens Studio metadata in `$extensions.studio.tokens`
- Keep reference syntax as curly braces
- Maintain mode structure in `$value` objects

## Failure modes

If normalization fails:

- Invalid reference syntax causes resolution failures
- Missing `$type` breaks type validation
- Naming violations cause validation failures
- Mode structure mismatches break mode-based workflows

## Validation checklist

After normalization, verify:

- All variables have `$type` and `$value`
- References use canonical format (`{path}`)
- Names follow Variable Contract naming convention
- Modes are stored in `$value` objects
- Tokens Studio metadata preserved in `$extensions`

## Differences from Figma adapter

Tokens Studio exports are closer to Variable Contract format than Figma exports:

- No `$collection_metadata` to extract
- No `$variable_metadata` to move
- Reference syntax is usually already canonical
- Modes are already in correct format

The Tokens Studio adapter is primarily a validator, not a transformer.

## Workflow

Designers author variables in Figma using Tokens Studio plugin. The repo JSON is the contract, not Tokens Studio.

### Who does what

- Designer: authors variables in Tokens Studio, exports JSON
- Design Engineer: validates export, opens PR, reviews changes
- CI: validates JSON, generates build outputs

### Workflow steps

1. Designer exports from Figma via Tokens Studio plugin.
2. Design Engineer validates export JSON (run adapter if needed).
3. Design Engineer commits JSON to version control.
4. Design Engineer opens PR for review.
5. Reviewers check naming, types, references (see [Change Control](/variables-contract/adapters/governance/change-control)).
6. After merge, CI validates JSON and generates build outputs.

### What gets reviewed

- Variable names follow naming convention ([Naming](/variables-contract/adapters/contract/naming))
- References resolve correctly
- Token organization (base, semantic, component layers)
- Breaking changes are documented
- Descriptions added when intent is not obvious

### Authoring checklist

Before exporting from Tokens Studio:

- Maintain separate token sets for base tokens, semantic aliases, and component tokens
- Keep modes limited (example: `light`, `dark`)
- Use references instead of duplicating values
- Follow naming convention (dot-separated paths, lowercase)
- Add descriptions when intent is not obvious
- Do not create component tokens until semantic layer exists

### Token organization

- Base tokens: raw scales and palettes
- Semantic aliases: reference base tokens, describe usage
- Component tokens: reference semantic aliases, component-scoped

See [Anatomy](/variables-contract/adapters/contract/anatomy) for details.

### Artifacts that change

- Tokens Studio export JSON (input, may be committed)
- Variable Contract JSON (committed, reviewed)
- Generated CSS/TypeScript files (output, not committed)

## Out of scope

- Tokens Studio plugin configuration
- Tokens Studio sync workflows
- Conflict resolution between Tokens Studio and version control
