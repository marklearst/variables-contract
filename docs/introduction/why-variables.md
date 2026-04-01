---
title: Why Variables
---

# Why Variables

::: callout info Part of the Variables Contract Specification
This page is part of the [Variables Contract](../contract/variable-contract) governed specification. See [License](../license) for usage terms.
:::

Variables are variables. CSS variables, JavaScript variables, Figma variables. They're all variables.

If you call them "design tokens" or "style properties" or "design constants," you create confusion. Developers know variables. Designers know variables. Variable Contract uses the term everyone understands.

## The naming problem

Everyone calls them something different:

- Design tokens (DTCG, Material Design)
- Style properties (Style Dictionary)
- Design constants (some teams)
- Variables (CSS, JavaScript, Figma)
- Tokens (Tokens Studio, Adobe)

This creates confusion. A developer sees "design token" and thinks "what's that?" A designer sees "CSS variable" and thinks "is that different?"

## Variables are variables

Variables exist in:

- CSS: `--color-primary: #0066cc`
- JavaScript: `const colorPrimary = '#0066cc'`
- Figma: Variables panel
- TypeScript: `export const color = { primary: '#0066cc' }`

They're all variables. They store values. They can be referenced. They can be changed.

## Why Variable Contract uses "variables"

1. Developers understand variables (CSS variables, JS variables)
2. Designers understand variables (Figma variables)
3. No new terminology to learn
4. Maps directly to code concepts
5. Clear and unambiguous

## What Variable Contract standardizes

Variable Contract standardizes:

- JSON structure (DTCG 2025.10 format)
- Naming convention (dot-separated paths)
- Reference syntax (`{path.to.variable}`)
- Governance rules (validation, versioning, change control)

Variable Contract does NOT standardize:

- What you call them (call them variables)
- What tools you use (use any tool)
- How you consume them (CSS, JS, whatever works)

## The "design token" problem

"Design token" implies:

- Special category separate from code
- Design-only concept
- Something designers own exclusively
- Marketing terminology

This creates separation between design and code. Variables bridge that gap.

## Variable Contract's approach

Variables are:

- Shared between design and code
- Stored in version control
- Validated in CI
- Consumed by both designers and developers
- Just variables

Variable Contract provides:

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
