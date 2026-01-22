---
title: Tooling - Tokens Studio
---

# Governance - Tokens Studio in Figma

Use Tokens Studio for authoring. Treat the repo JSON as the contract.

## Principles

- Tokens Studio is an authoring tool, not the contract.
- Token names are an API. Renames are breaking changes.
- Prefer aliases (semantic tokens) for UI usage, and base tokens for scales.

## Contract location

- Store tokens in version control as Design Tokens JSON.
- Treat the token JSON as the contract between design and code.

## Token organization in Tokens Studio

- Maintain separate token sets for base tokens, semantic aliases, and component tokens.
- Keep modes limited (example: `light`, `dark`).
- Use references (aliases) instead of duplicating values.

## Required authoring rules

1. Naming follows the token naming convention document.
2. New tokens must include a description when the intent is not obvious.
3. Prefer references for semantic tokens.
   - Example: `color.text.primary` references `color.gray.1000`.
4. Do not create component tokens until the semantic layer is in place.

## Change control

- Token changes must go through review in version control.
- Token renames are breaking changes.
- Adding a new token is generally non-breaking.
- Changing a base token value may be breaking depending on usage.

## Export and build workflow

- Export from Figma via Tokens Studio, commit the JSON, and open a PR.
- CI validates the JSON (naming, types, references).
- Build outputs from the same JSON (CSS variables, TypeScript, etc.).

## Links

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Guides & Resources](https://tokens.studio/learning-resources)
- [Changelog](https://tokens.studio/changelog)
