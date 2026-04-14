---
title: "Introduction: Why Variables"
description: "Terminology. VDS uses “variables” because it matches the language used in code and design tools. Failure if ignored: teams split vocabulary and handoff breaks."
---

# Why Variables

::: callout info Part of the Variable Design Standard (VDS) Specification
This page is part of the [Variable Design Standard (VDS)](/contract/variable-contract) governed specification. See [License](/license) for usage terms.
:::

Scope: terminology. VDS uses “variables” because it matches the language used in code and design tools.

Failure if ignored: teams split vocabulary and handoff breaks.

## The naming problem

Everyone calls them something different:

- Design tokens (DTCG, Material Design)
- Style properties (Style Dictionary)
- Design constants (some teams)
- Variables (CSS, JavaScript, Figma)
- Tokens (Tokens Studio, Adobe)

This splits vocabulary across roles and makes handoff less precise.

## Variables are shared primitives

Variables exist in:

- CSS: `--color-primary: #0066cc`
- JavaScript: `const colorPrimary = '#0066cc'`
- Figma: Variables panel
- TypeScript: `export const color = { primary: '#0066cc' }`

They store values, can be referenced, and can be changed.

## Why Variable Design Standard (VDS) uses "variables"

1. Developers understand variables (CSS variables, JS variables)
2. Designers understand variables (Figma variables)
3. No new terminology to learn
4. Maps directly to code concepts
5. Clear and unambiguous

## What Variable Design Standard (VDS) standardizes

Variable Design Standard (VDS) standardizes:

- JSON structure (DTCG 2025.10 format)
- Naming convention (dot-separated paths)
- Reference syntax (`{path.to.variable}`)
- Governance rules (validation, versioning, change control)

Variable Design Standard (VDS) does NOT standardize:

- What you call them (call them variables)
- What tools you use (use any tool)
- How you consume them (CSS, JS, whatever works)

## The term "design token"

The term "design token" implies:

- Special category separate from code
- Design-only concept
- Something designers own exclusively
- Marketing terminology

This separates design from code. Variables keep the same term across both.

## Variable Design Standard (VDS)'s approach

Variables are:

- Shared between design and code
- Stored in version control
- Validated in CI
- Consumed by both designers and developers
- Just variables

Variable Design Standard (VDS) provides:

- Structure (how to store variables)
- Governance (how to manage variables)
- Adapters (how to convert between tools)
- Validation (how to check variables)

## Failure modes

If you use confusing terminology:

- Developers ignore "design tokens" as designer-only
- Designers think variables are code-only
- Teams create separate "token" systems
- Handoff breaks down
- Duplication happens

## Out of scope

- Changing industry terminology (we use "variables" internally)
- Convincing others to use "variables" (they can call them what they want)
- Tool naming (tools can use their own terms)
