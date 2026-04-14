---
title: "Examples: Adapter Pipeline"
description: "This example shows the complete conversion from Figma export to CSS variables. It includes the Figma export, Figma adapter normalization, and Style Dictionary build."
---

# Adapter Pipeline Example

This example shows the complete conversion from Figma export to CSS variables.

## Pipeline overview

1. Figma export JSON (input)
2. Figma adapter normalization (Variable Design Standard (VDS))
3. Style Dictionary build (CSS variables output)

## Requirements

- Figma export JSON (plugin output)
- Figma adapter normalization step
- Style Dictionary build config

## Step 1: Figma export (input)

Figma Variables export JSON:

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

## Step 2: Figma adapter normalization

After running the Figma adapter (see [Figma Adapter](adapters/figma)):

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

Changes made:

1. Removed `@` prefix from collection names
2. Moved `$collection_metadata` to `$extensions.figma`
3. Moved `$variable_metadata` to `$extensions.figma`
4. Normalized reference syntax: `{@primitives.$color.primary}` → `{primitives.color.primary}`
5. Moved mode values from `$variable_metadata.modes` to `$value` object

## Step 3: Style Dictionary configuration

Style Dictionary config (`style-dictionary.config.json`):

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "variables-light.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "mode": "light"
            }
          }
        },
        {
          "destination": "variables-dark.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "mode": "dark"
            }
          }
        }
      ]
    }
  }
}
```

## Step 4: Style Dictionary output

After running Style Dictionary build:

`dist/variables-light.css`:

```css
:root {
  --primitives-color-primary: #0066cc;
  --tokens-color-text-primary: #0066cc;
}
```

`dist/variables-dark.css`:

```css
:root {
  --primitives-color-primary: #004499;
  --tokens-color-text-primary: #004499;
}
```

## Complete workflow

1. Designer exports variables from Figma
2. Run Figma adapter to normalize JSON
3. Commit normalized JSON to version control
4. CI runs Style Dictionary build
5. Generated CSS files are deployed
6. Components consume CSS variables

## Before/after comparison

### Before (Figma export)

- Tool-specific metadata in root properties
- Non-standard reference syntax
- Modes stored in metadata
- Collection names with `@` prefix

### After (Variable Design Standard (VDS))

- Metadata moved to `$extensions`
- Canonical reference syntax
- Modes in `$value` objects
- Standard collection names

### After (CSS output)

- CSS variables ready for consumption
- Mode-specific files generated
- References resolved to final values

## Failure modes

If any step fails:

- Invalid Figma export breaks adapter
- Normalization errors cause validation failures
- Style Dictionary config errors produce empty outputs
- Reference resolution failures cause undefined CSS variables

## Validation checklist

Validate at each step:

1. Figma export: JSON syntax, required fields
2. Adapter output: Variable Design Standard (VDS) compliance, naming convention
3. Style Dictionary output: CSS syntax, all references resolved

## Out of scope

- Alternate adapter pipelines (see [Adapters](/adapters))
- Tool-specific deployment steps
