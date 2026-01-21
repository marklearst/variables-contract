---
title: Variable Anatomy
---

# Variable Anatomy

This document defines the three layers of tokens used in a governed token system and how they should be consumed.

## 1. Base tokens

Base tokens hold raw scales and palettes. They are the source of truth for value selection.

Examples:

- `color.gray.0`
- `color.gray.1000`
- `space.4`
- `radius.2`

Rules:

- Base tokens are stable and reused broadly.
- Components should not consume base tokens directly unless explicitly allowed.

## 2. Alias (semantic) tokens

Alias tokens represent intent and reference base tokens.

Examples:

- `color.text.primary` -> `{color.gray.1000}`
- `color.surface.default` -> `{color.gray.0}`
- `space.layout.gutter` -> `{space.6}`

Rules:

- UI components should consume semantic aliases.
- Semantic names should describe usage, not hue or numeric scale.

## 3. Component tokens

Component tokens are component-scoped aliases for fine-grained control. They should reference semantic aliases.

Examples:

- `component.button.color.background.default` -> `{color.surface.brand}`
- `component.button.color.text.disabled` -> `{color.text.muted}`

Rules:

- Create component tokens only when multiple surfaces need per-component control.
- Avoid creating component tokens as a first move when semantic tokens are missing.

## Consumption summary

- Base tokens: for building scales and palettes.
- Alias tokens: for usage in UI.
- Component tokens: for controlled overrides when needed.
