---
title: Governance - Getting Started
---

# Governance - Getting Started

This checklist is the fastest way to get productive in a variable-governed design system.

## What you should know first

- Variable names are an API. Avoid renames.
- Components should consume semantic aliases, not raw palette values.
- Variables live in version control as Design Tokens JSON.

## Where to start

1. Read:
   - [Variable Governance](overview)
   - [Naming](../contract/naming)
   - [Tokens Studio](../tooling/tokens-studio)
   - [Change Control](change-control)
2. Identify which variable category you are working in:
   - base
   - alias (semantic)
   - component

## When to create a variable

Create a new variable only when:

- an existing semantic token cannot express the intent
- multiple components need the same decision
- you can name it in a way that will remain stable

## How to propose a variable change

Before you open a change:

1. Identify impacted components and states.
2. Confirm naming matches the naming convention.
3. Prefer references (aliases) over duplicating values.
4. Add a description if the intent is not obvious.
5. Decide whether the change is breaking.

## Review requirements

Variable changes should be reviewed by:

- one design system maintainer
- one engineer responsible for consumption and releases

## Release expectations

- Use semantic versioning.
- Renames and removals are breaking changes.
- Publish release notes with migration steps when applicable.
