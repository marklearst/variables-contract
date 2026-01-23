---
title: Patterns - Multi-Brand Architecture
---

# Multi-Brand Architecture

Complete example of multi-brand variable architecture using Variable Contract.

## Architecture overview

### Structure

```
tokens/
  base/              # Shared base variables
    color.json
    spacing.json
    typography.json
  brand-a/          # Brand A specific
    color.json
    typography.json
  brand-b/          # Brand B specific
    color.json
    typography.json
```

### Shared base

All brands share base scales:

```json
// tokens/base/color.json
{
  "color": {
    "gray": {
      "0": { "$type": "color", "$value": "#ffffff" },
      "100": { "$type": "color", "$value": "#f5f5f5" },
      "200": { "$type": "color", "$value": "#e0e0e0" },
      "900": { "$type": "color", "$value": "#1a1a1a" },
      "1000": { "$type": "color", "$value": "#000000" }
    }
  }
}
```

### Brand-specific

Each brand has specific variables:

```json
// tokens/brand-a/color.json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#0066cc" },
      "secondary": { "$type": "color", "$value": "#666666" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "{color.gray.1000}" },
      "secondary": { "$type": "color", "$value": "{color.gray.900}" }
    },
    "surface": {
      "default": { "$type": "color", "$value": "{color.gray.0}" },
      "brand": { "$type": "color", "$value": "{color.brand.primary}" }
    }
  }
}
```

```json
// tokens/brand-b/color.json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#ff0066" },
      "secondary": { "$type": "color", "$value": "#00ff66" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "{color.gray.1000}" },
      "secondary": { "$type": "color", "$value": "{color.gray.900}" }
    },
    "surface": {
      "default": { "$type": "color", "$value": "{color.gray.0}" },
      "brand": { "$type": "color", "$value": "{color.brand.primary}" }
    }
  }
}
```

## Build configuration

### Brand A build

```json
{
  "source": [
    "tokens/base/**/*.json",
    "tokens/brand-a/**/*.json"
  ],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/brand-a/",
      "files": [
        {
          "destination": "variables.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

### Brand B build

```json
{
  "source": [
    "tokens/base/**/*.json",
    "tokens/brand-b/**/*.json"
  ],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/brand-b/",
      "files": [
        {
          "destination": "variables.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

## Implementation guide

### Step 1: Create base variables

Create shared base variables:

1. Create `tokens/base/` directory
2. Create base variable files
3. Define shared scales (color, spacing, typography)

### Step 2: Create brand-specific variables

Create brand-specific variables:

1. Create `tokens/brand-a/` and `tokens/brand-b/` directories
2. Create brand-specific variable files
3. Reference base variables where possible

### Step 3: Configure builds

Configure brand-specific builds:

1. Create build configs for each brand
2. Include base + brand-specific sources
3. Generate brand-specific outputs

### Step 4: Consume brand variables

Consume brand-specific variables:

1. Import brand-specific CSS
2. Use brand-specific variables in components
3. Test brand-specific styling

## Best practices

1. Share base scales across brands
2. Keep brand-specific variables minimal
3. Reference base variables in brand variables
4. Use consistent naming across brands
5. Document brand differences

## Failure modes

If multi-brand architecture is wrong:

- Duplication of shared variables
- Inconsistent branding
- Maintenance burden
- Build complexity

## Out of scope

- Brand management tools (use existing tools)
- Brand switching at runtime (handle in consumption layer)
- Brand-specific design decisions (focus on structure)

