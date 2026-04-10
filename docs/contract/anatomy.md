---
title: Contract - Anatomy
---

# Contract - Anatomy

These are the three layers we use so components do not depend on raw palette values.

## 1. Base variables

Base variables hold raw scales and palettes. They are the only place raw values live.

Examples:

- `color.gray.0`
- `color.gray.1000`
- `space.4`
- `radius.2`

Rules:

- Base variables are reused broadly.
- Components SHOULD NOT consume base variables directly unless explicitly allowed.

## 2. Alias (semantic) variables

Alias variables represent intent and reference base variables.

Examples:

- `color.text.primary` -> `{color.gray.1000}`
- `color.surface.default` -> `{color.gray.0}`
- `space.layout.gutter` -> `{space.6}`

Rules:

- UI components SHOULD consume semantic aliases.
- Semantic names SHOULD describe usage, not hue or numeric scale.

## 3. Component variables

Component variables are component-scoped aliases for fine-grained control. They SHOULD reference semantic aliases.

Examples:

- `component.button.color.background.default` -> `{color.surface.brand}`
- `component.button.color.text.disabled` -> `{color.text.muted}`

Rules:

- Create component variables only when multiple surfaces need per-component control.
- Avoid creating component variables as a first move when semantic variables are missing.

## Consumption summary

- Base variables: for building scales and palettes.
- Alias variables: for usage in UI.
- Component variables: for controlled overrides when needed.

## Formal Invariants

These invariants MUST be maintained for Variable Design Standard (VDS) conformance. Violations are non-conformant.

### Base Variables

**Invariant 1**: Base variables MUST contain literal values only.

- Base variables MUST NOT reference other base variables
- Base variables MAY be referenced by alias or component variables
- Base variables MUST NOT be consumed directly by components (unless explicitly allowed)

**Example (conformant)**:
```json
{
  "color": {
    "gray": {
      "900": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.1, 0.1, 0.1],
          "hex": "#1a1a1a"
        }
      }
    }
  }
}
```

**Example (non-conformant)**:
```json
{
  "color": {
    "gray": {
      "900": {
        "$type": "color",
        "$value": "{color.gray.800}"  // Base variable referencing another base variable
      }
    }
  }
}
```

### Alias Variables

**Invariant 2**: Alias variables SHOULD reference base variables or other alias variables.

- Alias variables MUST NOT reference component variables
- Alias variables SHOULD describe semantic intent, not implementation
- Alias variables form the semantic abstraction layer

**Example (conformant)**:
```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.gray.900}"  // References base variable
      }
    }
  }
}
```

**Example (non-conformant)**:
```json
{
  "color": {
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{component.button.color.text}"  // Alias referencing component variable
      }
    }
  }
}
```

### Component Variables

**Invariant 3**: Component variables SHOULD reference alias variables (not base variables directly).

- Component variables MUST NOT reference other component variables
- Component variables MUST be component-scoped
- Component variables provide fine-grained control when needed

**Example (conformant)**:
```json
{
  "component": {
    "button": {
      "color": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{color.surface.brand}"  // References alias variable
          }
        }
      }
    }
  }
}
```

**Example (non-conformant)**:
```json
{
  "component": {
    "button": {
      "color": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{color.gray.900}"  // Component variable referencing base directly
          }
        }
      }
    }
  }
}
```

### Reference Chain Preservation

**Invariant 4**: Flattening references to literal values is non-conformant.

- Reference chains MUST be preserved in output
- Tools MUST NOT flatten `{color.text.primary}` to `#1a1a1a` in the contract format
- Flattening destroys the dependency graph and breaks theme switching

**Example (conformant output)**:
```json
{
  "color.text.primary": "{color.gray.900}"
}
```

**Example (non-conformant output)**:
```json
{
  "color.text.primary": "#1a1a1a"  // Flattened - reference chain lost
}
```

**Why this matters**: When `color.gray.900` changes, `color.text.primary` should update automatically. Flattening breaks this dependency.

## Validation checklist

- [ ] Base variables contain only raw values (no references to other base variables)
- [ ] Alias variables reference base variables or other alias variables
- [ ] Component variables reference alias variables (not base variables directly)
- [ ] Components do not consume base variables directly (unless explicitly allowed)

## Failure modes

If anatomy rules are ignored:

- Components depend on raw palette values (theme switching breaks)
- Semantic intent is lost (developers guess meaning from value)
- Component variables reference base variables (tight coupling, hard to refactor)
- Alias layer is skipped (no semantic abstraction)

## Out of scope

- Specific variable values (anatomy governs structure, not content)
- Number of variables per category (depends on design system size)
- Naming within categories (see [Naming Convention](naming))
