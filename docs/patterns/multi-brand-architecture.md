---
title: Patterns: Multi-Brand Architecture
---

# Multi-Brand Architecture

This pattern specifies a multi-brand architecture that keeps one semantic name set across brands.

Failure if ignored: brand values leak across outputs or require a mapped layer to resolve.

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

## File structure is the API

Semantic names are the API. Consumers request `color.surface.brand`. The build selects the brand folder that defines that name.

This replaces a mapped collection with file selection.

JSON files are the contract input. The folder path is the selector. The semantic names stay the same across brands.

Rules:

- The semantic name set MUST match across brand folders.
- Build config MUST select exactly one brand folder at a time.
- Mapped variables MUST NOT exist in the contract graph.

## File selection rule

File selection rule is shorthand for this model.

- The files are the contract input.
- The folder path and file name are the selector.
- The build or import list is the switch.

JSON-as-API: the file set is the interface and the selector.

This keeps brand choice out of a mapped layer and out of tool panels.

This is a file selection rule. It is not a hosted service.

Example selector:

```
tokens/brand-a/color.json
tokens/brand-b/color.json
```

Pick one folder. The semantic names stay the same. The values change.

If you can select files, you can switch brands. No map required.

Example build selection:

```json
{
  "source": ["tokens/base/**/*.json", "tokens/brand-a/**/*.json"]
}
```

Example CSS selection:

```css
@layer base, brand;
@import "variables-base.css" layer(base);
@import "variables-brand-a.css" layer(brand);
```

## Decision surface

Decisions live in files and build inputs, not in a mapped collection.

- Choose the brand by the source list or by CSS imports.
- Use alias modes in tools for preview. Do not store brand logic in a variables panel.
- Use one decision point. Do not add a second map.

Example preview:

```
Alias collection
  Mode: brand-a
  color.surface.brand -> {color.brand.primary}
  Mode: brand-b
  color.surface.brand -> {color.brand.primary}
```

## Governance note

- The file list is the only switch.
- Changes to brand folders follow the contract review gate.

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
  "source": ["tokens/base/**/*.json", "tokens/brand-a/**/*.json"],
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
  "source": ["tokens/base/**/*.json", "tokens/brand-b/**/*.json"],
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

## Implementation rules

1. Share base scales across brands
2. Keep brand-specific variables minimal
3. Reference base variables in brand variables
4. Use the same semantic name set across brand folders
5. Document brand differences

## Failure modes

If multi-brand architecture is wrong:

- Duplication of shared variables
- Brand A values appear in Brand B output
- Maintenance burden
- Build complexity
- Mapped variables appear as a shadow layer
- Brand selection leaks into token names
- All brands end up in one output bundle

## Out of scope

- Brand management tools (use existing tools)
- Brand switching at runtime (handle in consumption layer)
- Brand-specific design decisions (focus on structure)
