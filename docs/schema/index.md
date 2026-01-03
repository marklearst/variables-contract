---
title: Schema
---

# Variables Contract JSON Schema

The Variables Contract provides a JSON Schema for validating design variable files. This schema enforces DTCG 2025.10 alignment and Variables Contract conformance requirements.

## Schema URL

```
https://variables-contract.vercel.app/assets/schema/v1.json
```

## Usage

Add the `$schema` property to your Variables Contract JSON files to enable validation:

```json
{
  "$schema": "https://variables-contract.vercel.app/assets/schema/v1.json",
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

## What the Schema Validates

### Variable Structure

Every variable must have:

- `$type` - One of the supported types
- `$value` - A literal value, reference, or mode object

Optional properties:

- `$description` - Human-readable description
- `$deprecated` - Boolean deprecation marker
- `$extensions` - Non-standard metadata

### Supported Types

**Primitive Types:**

| Type          | Description         | Example Value                                   |
| ------------- | ------------------- | ----------------------------------------------- |
| `color`       | Color value         | `"#0066cc"` or `{ "r": 0, "g": 102, "b": 204 }` |
| `dimension`   | Length with unit    | `"16px"` or `{ "value": 16, "unit": "px" }`     |
| `fontFamily`  | Font family name(s) | `"Roboto"` or `["Roboto", "sans-serif"]`        |
| `fontWeight`  | Font weight         | `400` or `"bold"`                               |
| `duration`    | Time duration       | `"200ms"` or `500`                              |
| `cubicBezier` | Timing function     | `[0.25, 0.1, 0.25, 1]`                          |
| `number`      | Numeric value       | `0.5`                                           |

**Composite Types:**

| Type         | Description       | Required Properties                                  |
| ------------ | ----------------- | ---------------------------------------------------- |
| `border`     | Border definition | `width`, `color`, `style`                            |
| `transition` | CSS transition    | `duration`, `timingFunction`                         |
| `shadow`     | Box shadow        | `color`, `offsetX`, `offsetY`, `blur`                |
| `gradient`   | Color gradient    | Array of `{ color, position }` stops                 |
| `typography` | Text style        | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` |

### Reference Syntax

The schema validates both reference formats:

**Curly Brace (Canonical):**

```json
{
  "$type": "color",
  "$value": "{color.primary}"
}
```

**JSON Pointer (DTCG):**

```json
{
  "$type": "color",
  "$value": "#/color/primary"
}
```

### Mode Objects

Values can be mode-aware:

```json
{
  "$type": "color",
  "$value": {
    "light": "#ffffff",
    "dark": "#000000"
  }
}
```

Mode names must be lowercase alphanumeric with optional hyphens.

### Group Structure

Groups organize variables and can extend other groups:

```json
{
  "color": {
    "$description": "Color variables",
    "brand": {
      "$ref": "#/color/base",
      "primary": {
        "$type": "color",
        "$value": "#ff0066"
      }
    }
  }
}
```

Groups cannot have `$type` or `$value` properties.

## Validation Tools

### IDE Integration

Most modern IDEs support JSON Schema validation. Add the `$schema` property to enable:

- **VS Code** - Automatic validation with IntelliSense
- **JetBrains IDEs** - Built-in JSON Schema support
- **Sublime Text** - With LSP plugin

### CLI Validation

Use any JSON Schema validator:

```bash
# Using ajv-cli
npx ajv-cli validate -s schema/v1.json -d tokens.json

# Using jsonschema (Python)
jsonschema -i tokens.json schema/v1.json
```

### CI/CD Integration

Add schema validation to your pipeline:

```yaml
# GitHub Actions example
- name: Validate tokens
  run: npx ajv-cli validate -s node_modules/@variables-contract/schema/v1.json -d tokens/*.json
```

## Schema Versioning

| Version | Status  | DTCG Alignment |
| ------- | ------- | -------------- |
| v1      | Current | DTCG 2025.10   |

Future versions will be published at `/schema/v2`, `/schema/v3`, etc. The schema follows semantic versioning principles:

- **Patch** - Bug fixes, clarifications (backward compatible)
- **Minor** - New optional features (backward compatible)
- **Major** - Breaking changes to validation rules

## Limitations

The JSON Schema validates structure but cannot check:

- **Reference resolution** - Whether referenced variables exist
- **Circular references** - Cycles in reference chains
- **Mode consistency** - Whether all variables in a collection use the same modes
- **Naming conventions** - Variables Contract naming rules

Use additional validation tooling for complete conformance checking.

## Download

The schema is available at:

- **URL:** [/assets/schema/v1.json](/assets/schema/v1.json)
- **Raw:** [GitHub](https://github.com/marklearst/variables-contract/blob/main/docs/schema/v1.json)

## Conformance

Using this schema for validation is one component of Variables Contract conformance. See [Conformance](/reference/conformance) for complete requirements.
