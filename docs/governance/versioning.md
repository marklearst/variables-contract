---
title: "Governance: Versioning"
---

# Variable Design Standard (VDS) Versioning

Versioning communicates breaking changes and migration requirements.

If versioning rules are not followed, consumers cannot plan upgrades and breaking changes ship without notice.

## Semantic versioning

Use semantic versioning (MAJOR.MINOR.PATCH) for variable releases:

- MAJOR: breaking changes (renames, removals, type changes)
- MINOR: new variables, new modes, non-breaking additions
- PATCH: bug fixes, documentation updates

## Breaking changes

Breaking changes require MAJOR version bump.

### Variable renames

Renaming a variable breaks all references to it.

Example:

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

```json
{
  "color": {
    "brand": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

Action: Bump to v2.0.0, document migration path.

### Variable removals

Removing a variable breaks all references to it.

Example:

```json
{
  "color": {
    "primary": { "$type": "color", "$value": "#0066cc" },
    "secondary": { "$type": "color", "$value": "#666666" }
  }
}
```

```json
{
  "color": {
    "primary": { "$type": "color", "$value": "#0066cc" }
  }
}
```

Action: Bump to v2.0.0, mark as deprecated first, then remove in next major version.

### Type changes

Changing a variable's `$type` breaks type validation and consumption.

Example:

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

```json
{
  "spacing": {
    "base": {
      "$type": "number",
      "$value": 16
    }
  }
}
```

Action: Bump to v2.0.0, document migration path.

### Reference changes that break intent

Changing a reference to point to a different variable may break visual output.

Example:

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.900}"
      }
    }
  }
}
```

```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.800}"
      }
    }
  }
}
```

Action: Bump to v2.0.0 if visual output changes, MINOR if intent unchanged.

## Non-breaking changes

Non-breaking changes allow MINOR or PATCH version bump.

### New variables

Adding new variables does not break existing references.

Example:

```json
{
  "color": {
    "primary": { "$type": "color", "$value": "#0066cc" }
  }
}
```

```json
{
  "color": {
    "primary": { "$type": "color", "$value": "#0066cc" },
    "secondary": { "$type": "color", "$value": "#666666" }
  }
}
```

Action: Bump to v1.1.0.

### New modes

Adding new modes does not break existing mode consumers.

Example:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff"
      }
    }
  }
}
```

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

Action: Bump to v1.1.0.

### Value changes (non-breaking)

Changing a variable value may or may not be breaking depending on usage.

If the value change is approved in review and documented, it may be MINOR:

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

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0077dd"
    }
  }
}
```

Action: Bump to v1.1.0 if change is approved in review and documented.

If the value change is accidental or breaks visual output, treat as breaking.

## Deprecation strategy

Deprecate variables before removing them:

1. Mark variable as deprecated: `"$deprecated": true`
2. Document migration path in release notes
3. Keep deprecated variable for at least one release cycle
4. Remove in next major version

Example:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc",
      "$deprecated": true,
      "$description": "Use color.brand.primary instead"
    },
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc"
      }
    }
  }
}
```

```json
{
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#0066cc"
      }
    }
  }
}
```

## Release notes format

Release notes MUST include:

- Version number (MAJOR.MINOR.PATCH)
- Breaking changes (if any)
- Migration steps for breaking changes
- New variables (if any)
- Deprecated variables (if any)
- Bug fixes (if any)

Example release notes:

```markdown
# Variable Design Standard (VDS) v2.0.0

## Breaking Changes

### Renamed Variables

- `color.primary` → `color.brand.primary`
- `spacing.base` → `spacing.scale.base`

Migration: Update all references from old names to new names.

### Removed Variables

- `color.secondary` (deprecated in v1.5.0)

Migration: Use `color.brand.secondary` instead.

## New Variables

- `color.brand.accent`
- `spacing.scale.xl`

## Deprecated Variables

- `color.old` (will be removed in v3.0.0)

Migration: Use `color.new` instead.
```

## Versioning workflow

1. Identify change type (breaking or non-breaking)
2. Determine version bump (MAJOR, MINOR, or PATCH)
3. Update version in package.json or version file
4. Write release notes
5. Tag release in version control
6. Publish release notes

## Review checklist

- [ ] Change type is labeled (breaking or non-breaking)
- [ ] Version bump matches the change type
- [ ] Release notes include breaking changes and migrations

## Failure modes

If versioning rules are not followed:

- Breaking changes ship without notice
- Consumers cannot plan upgrades
- Migration paths are unclear
- Deprecated variables removed too early

## Out of scope

- Automated version bumping (handle manually or with tools)
- Version comparison tools
- Release automation

## Ownership

- Design Engineer: owns versioning decisions
- Frontend Engineer: validates impact in code

## Links

- [Change Control](change-control)
- [Conformance](../reference/conformance)
