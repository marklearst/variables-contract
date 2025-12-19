---
title: Governance - Change Control
---

# Governance - Design and Development Workflow

Use this workflow so a variable change doesn't silently break components.

## Roles

- **Designer**: Proposes intent and usage (states, pairings, constraints). Creates variables in Figma.
- **Design Engineer**: Reviews changes, validates contract compliance, maintains naming rules. Bridges design and development.
- **Frontend Developer**: Validates consumption feasibility, implements variables in code, owns compatibility.

## Workflow overview

1. Design proposes a change.
2. Variable change is reviewed (naming, type, references, modes).
3. Tokens are updated in the repo JSON through a PR.
4. Component implementation consumes semantic tokens.
5. Changes are released with versioning and notes.

## Change types

- New token (usually non-breaking)
- Token value change (may be breaking)
- Token rename or removal (breaking)
- Alias reference change (usually non-breaking if intent is unchanged)

## Design to engineering handoff requirements

Include:

- Component or pattern name
- States (default, hover, focus, active, disabled)
- Token usage (semantic tokens preferred)
- Layout rules (spacing, sizing, typography)
- Accessibility constraints (contrast targets, focus visibility, reduced motion)

## Variable change request checklist

Before creating or changing tokens:

1. Confirm the change cannot be expressed by an existing semantic token.
2. Confirm naming follows the token naming convention.
3. Prefer aliases over duplicating raw values.
4. Document intent when it is not obvious.
5. Identify impacted components and surfaces.

## Review and approval

All variable changes should be reviewed by at least:

- Design Engineer (contract owner, reviews naming, structure, references)
- Frontend Developer (validates consumption feasibility)

Reviews should verify:

- naming and structure
- correct variable types
- references resolve correctly
- change type (breaking or non-breaking)
- migration notes when required

## Implementation guidelines

- Components should consume semantic tokens.
- Do not consume base palette tokens directly in components unless explicitly allowed.
- Generate platform outputs from the repo JSON. Don't hand-edit downstream files.

## Release and communication

- Use semantic versioning for variable changes.
- Publish release notes that include:
  - what changed
  - who needs to update
  - migration steps when applicable
