---
title: Scenarios - Multi-Brand
---

# Multi-Brand Architecture

How to structure variables for multiple brands using Variable Contract.

If brands share variables incorrectly, you get duplication, maintenance burden, and inconsistent branding.

## Architecture patterns

### Pattern 1: Shared base + brand-specific

Shared base variables with brand-specific overrides.

Structure:

```
tokens/
  base/
    color.json          # Shared base colors
    spacing.json        # Shared spacing scale
    typography.json     # Shared typography
  brand-a/
    color.json          # Brand A specific colors
    typography.json     # Brand A specific typography
  brand-b/
    color.json          # Brand B specific colors
    typography.json     # Brand B specific typography
```

Example:

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

// tokens/brand-a/color.json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#0066cc" },
      "secondary": { "$type": "color", "$value": "#666666" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "{color.gray.1000}" }
    }
  }
}

// tokens/brand-b/color.json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#ff0066" },
      "secondary": { "$type": "color", "$value": "#00ff66" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "{color.gray.1000}" }
    }
  }
}
```

### Pattern 2: Brand composition

Brands compose shared and brand-specific variables.

Structure:

```json
// tokens/brand-a.json
{
  "color": {
    "$ref": "#/base/color",
    "brand": {
      "primary": { "$type": "color", "$value": "#0066cc" }
    }
  }
}
```

Use group extension (`$ref`) to compose brands.

### Pattern 3: Mode-based brands

Use modes to represent different brands.

Structure:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": {
          "brand-a": "#0066cc",
          "brand-b": "#ff0066"
        }
      }
    }
  }
}
```

Use when brands share structure but differ in values.

## Implementation guide

### Step 1: Identify shared variables

Identify variables shared across brands:

- Base scales (spacing, typography)
- Common patterns (shadows, borders)
- Shared semantic meanings

### Step 2: Create base structure

Create base variable files:

```
tokens/
  base/
    color.json
    spacing.json
    typography.json
```

### Step 3: Create brand-specific variables

Create brand-specific variable files:

```
tokens/
  brand-a/
    color.json
    typography.json
  brand-b/
    color.json
    typography.json
```

### Step 4: Reference base variables

Brand-specific variables reference base variables:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.1000}"
      }
    }
  }
}
```

### Step 5: Generate brand-specific outputs

Configure build to generate brand-specific outputs:

```json
{
  "source": ["tokens/base/**/*.json", "tokens/brand-a/**/*.json"],
  "platforms": {
    "css": {
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

## Examples

### Example: Two brands sharing base

Brand A and Brand B share spacing and typography but have different colors.

Base (`tokens/base/spacing.json`):

```json
{
  "spacing": {
    "scale": {
      "xs": { "$type": "dimension", "$value": "4px" },
      "sm": { "$type": "dimension", "$value": "8px" },
      "md": { "$type": "dimension", "$value": "16px" },
      "lg": { "$type": "dimension", "$value": "24px" }
    }
  }
}
```

Brand A (`tokens/brand-a/color.json`):

```json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#0066cc" },
      "secondary": { "$type": "color", "$value": "#666666" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "#000000" }
    }
  }
}
```

Brand B (`tokens/brand-b/color.json`):

```json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#ff0066" },
      "secondary": { "$type": "color", "$value": "#00ff66" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "#000000" }
    }
  }
}
```

### Example: Brand composition with group extension

Brands extend base groups:

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

// tokens/brand-a/color.json
{
  "color": {
    "$ref": "#/base/color",
    "brand": {
      "primary": { "$type": "color", "$value": "#0066cc" }
    }
  }
}
```

## Implementation rules

1. Share base scales (spacing, typography)
2. Keep brand-specific variables minimal
3. Reference base variables in brand variables
4. Use consistent naming across brands
5. Document brand differences

## Failure modes

If multi-brand structure is wrong:

- Duplication of shared variables
- Inconsistent branding
- Maintenance burden
- Build complexity

## Out of scope

- Brand-specific design decisions (focus on structure)
- Brand management tools (use existing tools)
- Brand switching at runtime (handle in consumption layer)
