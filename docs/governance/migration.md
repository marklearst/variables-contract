---
title: Governance - Migration
---

# Migration Guide

How to migrate existing variable formats to Variable Contract format.

If you skip migration steps, you lose reference resolution, break type validation, and create maintenance burden.

## Migration overview

Migration converts existing variable formats to Variable Contract (DTCG 2025.10) format with governance rules applied.

Migration steps:

1. Audit existing variables (identify format, structure, naming)
2. Map to Variable Contract structure (groups, types, references)
3. Normalize naming (apply naming convention)
4. Convert references (update reference syntax)
5. Validate output (run validation checklist)
6. Test consumption (verify generated outputs work)

## From older DTCG formats

If you have variables in DTCG formats before 2025.10:

### Step 1: Update reference syntax

Older formats may use different reference syntax. Convert to curly brace format:

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

### Step 2: Add missing `$type`

Older formats may omit `$type`. Add it:

Before:

```json
{
  "spacing": {
    "base": {
      "value": "16px"
    }
  }
}
```

After:

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

### Step 3: Move tool metadata

Move tool-specific metadata to `$extensions`:

Before:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc",
      "toolId": "123:456"
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
        "tool": {
          "id": "123:456"
        }
      }
    }
  }
}
```

## From Style Dictionary format

Style Dictionary uses `value` and `type` instead of `$value` and `$type`.

### Step 1: Rename properties

Convert `value` → `$value` and `type` → `$type`:

Before:

```json
{
  "color": {
    "primary": {
      "value": "#0066cc",
      "type": "color"
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

### Step 2: Update reference syntax

Style Dictionary may use different reference syntax. Convert to curly braces:

Before:

```json
{
  "color": {
    "text": {
      "primary": {
        "value": "{color.primary}",
        "type": "color"
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

### Step 3: Normalize naming

Style Dictionary naming may not follow Variable Contract convention. Apply naming rules:

Before:

```json
{
  "colorPrimary": {
    "$type": "color",
    "$value": "#0066cc"
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

## From custom formats

If you have variables in custom formats:

### Step 1: Map structure

Identify:
- Variable names and paths
- Variable types
- Variable values
- References between variables
- Modes or variants

### Step 2: Convert to Variable Contract structure

Create groups and variables following Variable Contract structure:

- Base tokens: raw scales and palettes
- Semantic aliases: reference base tokens
- Component tokens: reference semantic aliases

### Step 3: Normalize types

Map custom types to Variable Contract types:

- Custom color formats → `color`
- Custom spacing formats → `dimension`
- Custom font formats → `fontFamily`, `fontWeight`, `dimension`

### Step 4: Convert references

Map custom reference syntax to curly brace format:

- Custom syntax → `{path.to.token}`

## Migration checklist

After migration, verify:

- All variables have `$type` and `$value`
- All references use canonical format (`{path}`)
- Names follow naming convention
- No circular references
- Types match values
- Modes are consistent
- Validation passes

## Testing migration

Test migration by:

1. Running validation on migrated JSON
2. Generating outputs (CSS, TypeScript) from migrated JSON
3. Comparing outputs with original outputs
4. Testing component consumption
5. Verifying mode switching works

## Rollback plan

If migration causes issues:

1. Keep original format files in version control
2. Create migration branch
3. Test migration thoroughly
4. Rollback if validation fails or outputs break

## Failure modes

If migration is incomplete:

- Missing `$type` breaks type validation
- Invalid references break resolution
- Naming violations break code generation
- Type mismatches cause runtime errors
- Lost metadata breaks round-trip workflows

## Out of scope

- Automated migration tools (build custom scripts as needed)
- Cross-format conversion libraries
- Migration UI tools

