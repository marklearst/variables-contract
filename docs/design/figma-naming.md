---
title: Design - Figma Naming
---

# Naming Variables in Figma

How to name variables in Figma UI to match Variable Contract naming convention.

If variables are named incorrectly in Figma, adapter normalization fails and naming violations occur.

## Figma variable naming

Figma uses collection names and variable names. Variable Contract uses dot-separated paths.

### Collection names

Figma collections map to Variable Contract groups.

Good collection names:

- `primitives` (becomes `primitives` group)
- `tokens` (becomes `tokens` group)
- `base` (becomes `base` group)

Bad collection names:

- `@primitives` (adapter removes `@` prefix)
- `Primitives` (should be lowercase)
- `primitives-colors` (use separate collections)

### Variable names

Figma variable names map to Variable Contract paths.

Good variable names:

- `color/primary` (becomes `color.primary`)
- `spacing/base/small` (becomes `spacing.base.small`)
- `typography/font-family/base` (becomes `typography.fontFamily.base`)

Bad variable names:

- `colorPrimary` (should use `/` separator)
- `Color/Primary` (should be lowercase)
- `color-primary` (use `/` not `-`)

## Naming convention in Figma

### Use forward slashes

Figma uses forward slashes (`/`) to separate path segments. Adapter converts to dots (`.`).

Example:

- Figma: `color/text/primary`
- Variable Contract: `color.text.primary`

### Use lowercase

All variable names should be lowercase.

Good:

- `color/primary`
- `spacing/base/small`
- `typography/font-family/base`

Bad:

- `Color/Primary`
- `SPACING/BASE/SMALL`
- `Typography/FontFamily/Base`

### Use descriptive names

Variable names should describe usage, not implementation.

Good:

- `color/text/primary` (describes usage)
- `spacing/layout/gutter` (describes usage)
- `typography/heading/level-1` (describes usage)

Bad:

- `color/gray/900` (implementation detail, use in base)
- `spacing/16px` (implementation detail)
- `typography/24px` (implementation detail)

## Collection organization

### Base collections

Create collections for base variables:

- `primitives` - Raw scales and palettes
- `base` - Base variables

Example:

```
primitives/
  color/
    gray/0
    gray/1000
  spacing/
    scale/4
    scale/8
```

### Semantic collections

Create collections for semantic variables:

- `tokens` - Semantic aliases
- `semantic` - Semantic variables

Example:

```
tokens/
  color/
    text/primary
    surface/default
  spacing/
    layout/gutter
    component/button/padding
```

### Component collections

Create collections for component variables:

- `components` - Component-specific variables
- `component` - Component variables

Example:

```
components/
  button/
    color/background/default
    spacing/padding
```

## Mode naming in Figma

### Mode names

Figma mode names should match Variable Contract mode names.

Good mode names:

- `light` (becomes `light` mode)
- `dark` (becomes `dark` mode)
- `mobile` (becomes `mobile` mode)

Bad mode names:

- `Light` (should be lowercase)
- `DARK` (should be lowercase)
- `light-mode` (use simple names)

### Mode consistency

All variables in a collection should use the same modes.

Good:

- Collection `color` has modes: `light`, `dark`
- All variables in `color` collection use `light` and `dark`

Bad:

- Some variables use `light`, `dark`
- Other variables use `Light`, `Dark`
- Some variables missing `dark` mode

## Examples

### Color variables

Figma structure:

```
primitives/
  color/
    gray/0
    gray/1000
    brand/primary
    brand/secondary

tokens/
  color/
    text/primary -> {primitives.color.gray.1000}
    surface/default -> {primitives.color.gray.0}
    surface/brand -> {primitives.color.brand.primary}
```

### Spacing variables

Figma structure:

```
primitives/
  spacing/
    scale/4
    scale/8
    scale/16

tokens/
  spacing/
    layout/gutter -> {primitives.spacing.scale.16}
    component/button/padding -> {primitives.spacing.scale.8}
```

### Typography variables

Figma structure:

```
primitives/
  typography/
    font-family/base
    font-size/base
    font-weight/medium

tokens/
  typography/
    heading/level-1
      font-family -> {primitives.typography.fontFamily.base}
      font-size -> {primitives.typography.fontSize.heading1}
      font-weight -> {primitives.typography.fontWeight.bold}
```

## Implementation rules

1. Use forward slashes in Figma (`/`)
2. Use lowercase for all names
3. Use descriptive names (usage, not implementation)
4. Organize by collections (base, semantic, component)
5. Keep mode names consistent

## Failure modes

If Figma naming is wrong:

- Adapter normalization fails
- Naming violations occur
- Variables don't match contract
- Validation fails

## Out of scope

- Figma UI features (see Figma docs)
- Variable creation process (see workflow docs)
- Export process (see adapter docs)

