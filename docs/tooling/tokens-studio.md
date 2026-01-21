---
title: Tooling - Tokens Studio
---

# Governance - Tokens Studio in Figma

This document defines how to use Tokens Studio as part of a token governance workflow.

## Principles

- Tokens Studio is an authoring tool, not the source of truth.
- Token names and structure must remain stable to support automation.
- Prefer aliases (semantic tokens) for UI usage, and base tokens for scales.

## Source of truth

- Store tokens in version control as Design Tokens JSON.
- Treat the token JSON as the contract between design and code.

## Token organization in Tokens Studio

- Maintain separate token sets for base tokens, semantic aliases, and component tokens.
- Keep modes limited and intentional (example: `light`, `dark`).
- Use references (aliases) instead of duplicating values.

## Required authoring rules

1. Naming follows the token naming convention document.
2. New tokens must include a description when the intent is not obvious.
3. Prefer references for semantic tokens.
   - Example: `color.text.primary` references `color.gray.1000`.
4. Do not create component tokens until the semantic layer is stable.

## Change control

- Token changes must go through review in version control.
- Token renames are breaking changes.
- Adding a new token is generally non-breaking.
- Changing a base token value may be breaking depending on usage.

## Export and build workflow

- Export tokens from Figma via Tokens Studio into the repo token JSON.
- Validate token JSON on every change (naming, types, references).
- Generate platform outputs (CSS variables, TypeScript, etc) from the token JSON.

## Links

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Guides & Resources](https://tokens.studio/learning-resources)
- [Changelog](https://tokens.studio/changelog)
