---
title: Governance - Change Control
---

# Governance - Design and Development Workflow

This document defines the day-to-day workflow for design, tokens, and implementation. The goal is to reduce handoff ambiguity and keep design and code aligned through a shared token contract.

## Roles

- Design: defines intent and usage, proposes new tokens or changes.
- Engineering: validates feasibility, implements token consumption, and owns release and compatibility.

## Workflow overview

1. Design proposes a change.
2. Token change is evaluated and reviewed.
3. Tokens are updated via the token source of truth.
4. Component implementation consumes semantic tokens.
5. Changes are released with versioning and notes.

## Change types

- New token (usually non-breaking)
- Token value change (may be breaking)
- Token rename or removal (breaking)
- Alias reference change (usually non-breaking if intent is unchanged)

## Design to engineering handoff requirements

Design handoffs should include:

- Component or pattern name
- States (default, hover, focus, active, disabled)
- Token usage (semantic tokens preferred)
- Layout rules (spacing, sizing, typography)
- Accessibility constraints (contrast targets, focus visibility, reduced motion)

## Token change request checklist

Before creating or changing tokens:

1. Confirm the change cannot be expressed by an existing semantic token.
2. Confirm naming follows the token naming convention.
3. Prefer aliases over duplicating raw values.
4. Document intent when it is not obvious.
5. Identify impacted components and surfaces.

## Review and approval

All token changes should be reviewed by at least:

- one design system maintainer
- one engineer responsible for consumption and releases

Reviews should verify:

- naming and structure
- correct token types
- references resolve correctly
- change type (breaking or non-breaking)
- migration notes when required

## Implementation guidelines

- Components should consume semantic tokens.
- Do not consume base palette tokens directly in components unless explicitly allowed.
- Prefer a single source of truth for tokens, then generate platform outputs.

## Release and communication

- Use semantic versioning for token changes.
- Publish release notes that include:
  - what changed
  - who is impacted
  - migration steps when applicable
