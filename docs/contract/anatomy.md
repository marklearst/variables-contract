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
