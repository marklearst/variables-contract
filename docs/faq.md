---
title: FAQ
---

# Frequently Asked Questions

Common questions about Variable Contract.

## What is Variable Contract?

Variable Contract is a governance standard for design variables. It defines JSON structure, naming rules, validation requirements, and versioning strategy. Built on DTCG 2025.10 format.

## Why "variables" not "design tokens"?

Variables are variables. CSS variables, JavaScript variables, Figma variables. Everyone understands "variables." "Design tokens" creates confusion and separation between design and code.

## Is Variable Contract a new format?

No. Variable Contract uses DTCG 2025.10 format. It adds governance (naming rules, validation, versioning) on top of the format.

## Do I need to change my existing variables?

Not immediately. Variable Contract provides migration paths from existing formats (Style Dictionary, custom formats, older DTCG). See [Migration Strategy](adoption/migration-strategy).

## What tools do I need?

Any DTCG-compliant tool works. Variable Contract is tool-agnostic. Common tools:

- Figma (authoring)
- Style Dictionary (output generation)
- DTCG validators (validation)

## Who owns variables?

**Designer** creates variables in Figma. **Design Engineer** owns the Variable Contract (maintains naming rules, reviews changes). **Frontend Developer** consumes variables in code.

## What's the difference between Designer and Design Engineer?

**Designer** creates variables in Figma. **Design Engineer** bridges design and development, owns the contract, understands both Figma and React component libraries.

## Do I need all three roles?

In smaller teams, one person (Design Engineer) may fill multiple roles. But responsibilities remain distinct: authoring (Designer), contract ownership (Design Engineer), consumption (Frontend Developer).

## How do I handle breaking changes?

1. Mark old variable as deprecated
2. Create new variable with new name
3. Update all references
4. Bump MAJOR version
5. Document migration path
6. Remove deprecated variable in next major version

See [Versioning](governance/versioning) for details.

## Can I use platform names in variable names?

No. Variable names MUST NOT include platform names (ios, android, web, etc.). Platform mapping belongs in translation layers (adapters, build tools).

## What if my tool uses different reference syntax?

Use an adapter to normalize tool-specific syntax to Variable Contract format. See [Adapters](adapters) for examples.

## How do I validate variables?

Run validation in CI:

1. Validate JSON structure
2. Validate naming convention
3. Validate reference resolution
4. Detect circular references
5. Validate types

See [Validation](governance/validation) for tools and setup.

## Can I use modes?

Yes. Modes are supported. Mode keys must match within collections (validation enforces this). Common modes: light/dark, mobile/desktop.

See [Modes](contract/modes) for details.

## What's the difference between base, alias, and component variables?

- **Base variables**: Raw values (color.gray.900)
- **Alias variables**: Semantic names that reference base variables (color.text.primary)
- **Component variables**: Component-scoped aliases (component.button.color.background.default)

See [Anatomy](contract/anatomy) for details.

## How do I get started?

1. Read [Getting Started](adoption/getting-started)
2. Set up repository structure
3. Install validation tools
4. Configure CI validation
5. Export variables from Figma
6. Run adapter to normalize
7. Commit normalized JSON
8. Generate outputs

## Can I contribute?

Yes. Variable Contract is open source. Contributions welcome. See [Contributors](meta/contributors) for details.

## Is Variable Contract production-ready?

Yes. Version 1.0.0 is stable and production-ready. Used by teams in production.

## How do I claim conformance?

See [Conformance](reference/conformance) for conformance requirements and report template.

## What if I find a bug?

Report issues via GitHub issues. Include:

- Variable Contract version
- Steps to reproduce
- Expected behavior
- Actual behavior

## Can I use Variable Contract with my design system?

Yes. Variable Contract is design-system agnostic. It governs variable structure and governance, not design decisions (values, colors, spacing).
