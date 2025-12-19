---
title: Contract - Naming Convention
---

# Contract - Naming Convention

Naming is an API. If names change casually, every consumer breaks.

These rules are tool-agnostic and map directly to the Design Tokens Community Group (DTCG) file format.

## Goals

- Renames are breaking changes.
- Names communicate intent, not implementation.
- Names support automation, search, and code generation.

## Variable categories

- Base variables: raw values (scale or palette).
- Alias variables: semantic names that reference other variables.
- Component variables: component-scoped aliases for specific UI parts.

## Path format

Use dot notation.

Format:

`{category}.{system}.{role}.{state}.{scale}`

Notes:

- Omit segments that do not apply.
- Prefer fewer segments over placeholder values.
- Keep category and system prefixes the same across the variable set.

## Character rules

- Lowercase.
- Dot-separated segments.
- Use hyphens inside a segment when needed.
- Avoid spaces.
- Avoid punctuation other than `.` and `-`.

## Required naming rules

1. Use semantic aliases for UI usage.
   - Prefer `color.text.primary` over `color.gray.900` in components.
2. Keep base variables descriptive and scale-friendly.
   - Prefer `color.gray.900` or `color.gray.1000` over `color.darkest`.
3. Avoid duplicated meaning.
   - Do not encode both category and role twice (example: `color.color.text`).
4. Do not encode platform in variable names.
   - Platform mapping belongs in translation layers.
5. Prefer nouns for roles.
   - `text`, `surface`, `border`, `icon`, `shadow`, `space`, `radius`.

## Examples

Base variables:

- `color.gray.100`
- `space.4`
- `radius.2`

Alias variables (semantic):

- `color.text.primary` -> `{color.gray.1000}`
- `color.surface.default` -> `{color.gray.0}`
- `space.component.gap.sm` -> `{space.3}`

Component variables:

- `component.button.color.background.default` -> `{color.surface.brand}`
- `component.button.color.text.disabled` -> `{color.text.muted}`

## Units and types

- Use variable types (`$type`) to define validation rules.
- Dimensions should use one unit per scale (example: px, rem).
- Do not mix units within a single scale.

## Versioning impact

- Variable renames are breaking changes.
- Changing a base variable value can be breaking depending on its usage.
- Changing an alias reference is usually non-breaking if intent remains the same.

## Validation checklist

- [ ] Names are lowercase
- [ ] Names use dot-separated segments
- [ ] Names do not contain platform prefixes
- [ ] Names do not duplicate meaning
- [ ] Base variables use scale-friendly names
- [ ] Semantic aliases describe usage, not implementation
- [ ] Component variables reference semantic aliases

## Failure modes

If naming rules are ignored:

- Code generation fails (invalid characters in names)
- Consumers break on rename (no versioning discipline)
- Confusion between base and semantic variables (wrong consumption)
- Platform-specific names leak into contract (tool lock-in)

## Out of scope

- Variable values (naming governs structure, not content)
- Platform-specific output naming (handled by adapters)
- Component naming conventions (separate concern)
