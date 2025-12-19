---
title: Quick Reference
---

# Variable Contract Quick Reference

Cheat sheet for common Variable Contract tasks.

## Naming convention

Format: `{category}.{system}.{role}.{state}.{scale}`

Rules:
- Lowercase
- Dot-separated segments
- No platform names
- Semantic aliases for UI usage

Examples:
- `color.gray.900` (base)
- `color.text.primary` (alias)
- `component.button.color.background.default` (component)

## Variable structure

```json
{
  "variable": {
    "$type": "color",
    "$value": "#0066cc",
    "$description": "Primary brand color",
    "$extensions": {},
    "$deprecated": false
  }
}
```

Required: `$type`, `$value`
Optional: `$description`, `$extensions`, `$deprecated`

## Reference syntax

Canonical: `{path.to.variable}`
DTCG required: `#/path/to/variable`

Example:
```json
{
  "$value": "{color.primary}"
}
```

## Modes

```json
{
  "$value": {
    "light": "#ffffff",
    "dark": "#000000"
  }
}
```

## Validation checklist

- [ ] Names follow naming convention
- [ ] Every variable has `$type` and `$value`
- [ ] References resolve (no broken references)
- [ ] No circular references
- [ ] Mode keys match within collections (enforced by validation)
- [ ] Breaking changes versioned

## Common workflows

### Create new variable

1. Designer creates in Figma
2. Export from Figma
3. Design Engineer normalizes with adapter
4. Commit to version control
5. Review and merge
6. CI generates outputs

### Rename variable

1. Mark old variable as deprecated
2. Create new variable with new name
3. Update all references
4. Bump MAJOR version
5. Document migration path
6. Remove deprecated variable in next major version

### Add mode

1. Add mode key to `$value` object
2. Update all variables in collection to use same mode keys (validation checks this)
3. Update all variables in collection
4. Bump MINOR version
5. Document mode addition

## Role responsibilities

**Designer:**
- Create variables in Figma
- Follow naming convention
- Use variables in components

**Design Engineer:**
- Review variable changes
- Maintain contract
- Run adapters
- Publish releases

**Frontend Developer:**
- Consume variables in code
- Maintain build pipelines
- Test consumption

## File organization

```
tokens/
  ├── base/
  │   ├── color.json
  │   ├── spacing.json
  │   └── typography.json
  ├── semantic/
  │   ├── color.json
  │   └── spacing.json
  └── component/
      └── button.json
```

## Versioning

- MAJOR: breaking changes (renames, removals, type changes)
- MINOR: new variables, new modes, additions
- PATCH: bug fixes, documentation

## Links

- [Naming Convention](contract/naming)
- [Variable Contract](contract/variable-contract)
- [Roles](governance/roles)
- [Change Control](governance/change-control)

