---
title: Governance - Getting Started
---

# Governance - Getting Started

Use this checklist when you're adding or changing a variable.

## What you should know first

- Variable names are an API. Avoid renames.
- Components should consume semantic aliases, not raw palette values.
- Variables live in version control as Design Tokens JSON.

## Where to start

1. Read:
   - [Variable Governance](/variables-contract/governance/overview)
   - [Naming](/variables-contract/contract/naming)
   - [Tokens Studio](/variables-contract/adapters/tokens-studio)
   - [Change Control](/variables-contract/governance/change-control)
2. Identify which variable category you are working in:
   - base
   - alias (semantic)
   - component

## When to create a variable

Create a new variable only when:

- an existing semantic token cannot express the intent
- multiple components need the same decision
- you can name it in a way you won't want to rename later

## How to propose a variable change

Before you open a change:

1. Identify impacted components and states.
2. Confirm naming matches the naming convention.
3. Prefer references (aliases) over duplicating values.
4. Add a description if the intent is not obvious.
5. Decide whether the change is breaking.

## Review requirements

Reviews need:

- Design Engineer (contract owner, reviews naming, structure, references)
- Frontend Developer (validates consumption feasibility)

## Release expectations

- Use semantic versioning.
- Renames and removals are breaking changes.
- Publish release notes with migration steps when applicable.
