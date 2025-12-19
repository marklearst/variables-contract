---
title: Governance - Validation
---

# Variable Contract Validation

Validation catches contract violations before they break components or build pipelines.

If validation is missing, invalid references, type mismatches, and naming violations ship to production.

## What to validate

Validation MUST check:

1. JSON syntax (valid JSON structure)
2. Variable structure (`$type` and `$value` present on all variables)
3. Naming convention (dot-separated paths, lowercase, no platform prefixes)
4. Reference resolution (all references point to existing variables)
5. Circular references (no reference cycles)
6. Type correctness (`$value` matches `$type` format)
7. Mode consistency (mode keys shared within collections)
8. Group extension (`$ref` targets exist, no circular group references)

## Validation tools

### DTCG-compliant validators

Use DTCG-compliant validators for format validation:

- [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms) - Style Dictionary transforms with DTCG support
- [style-dictionary](https://github.com/style-dictionary/style-dictionary) - Built-in DTCG format validation
- Custom validators using DTCG JSON Schema

### Custom validation scripts

Create custom scripts to check Variable Contract-specific rules:

- Naming convention enforcement
- Reference resolution
- Circular reference detection
- Mode consistency checks

Example validation script structure:

```javascript
// Validate Variable Contract JSON
function validateVariableContract(json) {
  const errors = [];

  // Check JSON syntax
  // Check variable structure
  // Check naming convention
  // Check references resolve
  // Check for circular references
  // Check type correctness
  // Check mode consistency

  return errors;
}
```

## CI validation

Set up CI validation to block invalid changes.

### GitHub Actions example

```yaml
name: Validate Variables

on:
  pull_request:
    paths:
      - "tokens/**/*.json"

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm install
      - name: Validate variables
        run: npm run validate:tokens
```

### Pre-commit hooks

Use pre-commit hooks to catch validation errors before commit:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: validate-variables
        name: Validate Variable Contract
        entry: npm run validate:tokens
        language: system
        files: 'tokens/.*\.json$'
```

## Validation checklist

A Variable Contract JSON file is valid if:

### Structure validation

- JSON parses without syntax errors
- Root is an object
- All variables have `$type` property
- All variables have `$value` property
- Groups do not have `$type` or `$value`

### Naming validation

- All variable paths use dot-separated segments
- All segments are lowercase
- No platform prefixes (no `web-`, `ios-`, `android-`)
- No duplicate paths (same variable defined twice)

### Reference validation

- All references use canonical format (`{path.to.token}`)
- All referenced variables exist
- No circular references detected
- Property-level references target valid properties

### Type validation

- `$type` values match supported types
- `$value` format matches `$type` requirements
- Composite types have all required properties
- Dimension values include units
- Color values are valid formats

### Mode validation

- Mode keys are strings
- Mode keys are consistent within collections
- Mode values are valid for the variable type
- Mode references resolve correctly

### Group validation

- Group `$ref` targets exist
- No circular group references
- Group properties (`$deprecated`, `$extensions`) are valid types

## Validation errors

Common validation errors and fixes:

### Missing `$type`

Error: Variable `color.primary` missing `$type`

Fix: Add `$type` property:

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

### Invalid reference

Error: Reference `{color.primary}` points to non-existent variable

Fix: Create the referenced variable or fix the reference path.

### Circular reference

Error: Circular reference detected: `color.a` → `color.b` → `color.a`

Fix: Break the cycle by making one variable reference a literal value.

### Naming violation

Error: Variable name `color/web-primary` includes platform prefix

Fix: Remove platform prefix: `color/primary`

### Type mismatch

Error: Variable `spacing.base` has `$type: "color"` but `$value: "16px"`

Fix: Change `$type` to `"dimension"` or change `$value` to a color.

## Validation in adapters

Adapters MUST validate output after normalization:

- Figma adapter validates normalized JSON
- Tokens Studio adapter validates export JSON
- Style Dictionary validates before build

See adapter documentation for adapter-specific validation.

## Failure modes

If validation is skipped:

- Invalid references break component styling
- Type mismatches cause runtime errors
- Circular references cause infinite loops
- Naming violations break code generation
- Mode mismatches break theme switching

## Out of scope

- Runtime validation libraries (use DTCG-compliant validators)
- Validation UI tools (use existing tools or build custom)
- Performance optimization for large token sets (handle separately)
