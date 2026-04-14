---
title: "Introduction: Comparison"
description: "Comparison of Variable Design Standard (VDS) to other variable and token standards. Scope: comparison of Variable Design Standard (VDS) to other variable and token standards. Failure if ignored: teams pick formats without governance and ship incompatible rules."
---

# Variable Design Standard (VDS) vs Other Standards

Scope: comparison of Variable Design Standard (VDS) to other variable and token standards.

Failure if ignored: teams pick formats without governance and ship incompatible rules.

## Comparison matrix

| Feature          | VDS          | DTCG 2025.10 | Style Dictionary | Material Design | Adobe Spectrum |
| ---------------- | ------------ | ------------ | ---------------- | --------------- | -------------- |
| Format           | DTCG 2025.10 | DTCG 2025.10 | Legacy + DTCG    | Custom JSON     | Custom JSON    |
| Governance       | Yes          | No           | No               | Partial         | Partial        |
| Naming rules     | Yes          | No           | No               | Yes             | Yes            |
| Validation       | Yes          | Format only  | Format only      | Partial         | Partial        |
| Versioning       | Yes          | No           | No               | Yes             | Yes            |
| Adapters         | Yes          | No           | Tool-specific    | No              | No             |
| Tool-agnostic    | Yes          | Yes          | No               | No              | No             |
| Designer-focused | Yes          | No           | No               | Yes             | Yes            |
| Engineer-focused | Yes          | No           | Yes              | Partial         | Partial        |

## Variable Design Standard (VDS) vs DTCG 2025.10

### What DTCG provides

DTCG 2025.10 defines:

- JSON structure for variables
- Type system
- Reference syntax
- Composite types
- Group extension

### What Variable Design Standard (VDS) adds

Variable Design Standard (VDS) adds governance:

- Naming convention rules
- Change control process
- Validation requirements
- Versioning strategy
- Adapter patterns

DTCG is a format. Variable Design Standard (VDS) is governance on that format.

## Variable Design Standard (VDS) vs Style Dictionary

### Style Dictionary is a tool

Style Dictionary:

- Consumes variable JSON
- Generates platform outputs (CSS, TypeScript, etc.)
- Has its own format (legacy) and supports DTCG format
- Focuses on build pipeline

### Variable Design Standard (VDS) is governance

Variable Design Standard (VDS):

- Defines the contract (format + rules)
- Works with Style Dictionary (as an output adapter)
- Focuses on version control and validation
- Tool-agnostic

They work together: Variable Design Standard (VDS) defines the contract, Style Dictionary generates outputs.

## Variable Design Standard (VDS) vs Material Design

### Material Design is opinionated

Material Design:

- Defines specific naming patterns
- Includes brand-specific decisions
- Tied to Material Design system
- Less flexible for other brands

### Variable Design Standard (VDS) is flexible

Variable Design Standard (VDS):

- Defines structure and rules, not specific names
- Works for any brand or system
- Focuses on governance, not design decisions
- Adaptable to any design system

Material Design is a design system. Variable Design Standard (VDS) is a governance standard.

## Variable Design Standard (VDS) vs Adobe Spectrum

### Adobe Spectrum is specialized

Adobe Spectrum:

- Complex taxonomy (namespace, domain, object, base, modifiers)
- Many naming segments
- Brand-specific structure
- More detailed taxonomy than most teams need

### Variable Design Standard (VDS) keeps a smaller required surface

Variable Design Standard (VDS):

- Simple dot-separated paths
- Minimal required segments
- Flexible structure
- Practical and testable

Adobe Spectrum solves Adobe-specific constraints. Variable Design Standard (VDS) keeps a smaller required surface for broader use.

## Why teams choose Variable Design Standard (VDS)

### 1. Smaller contract surface

- Variables are variables, not special "tokens"
- Simple naming (dot-separated paths)
- Clear structure
- Easy to understand

### 2. Governance baked in

- Clear rules (not opinions)
- Testable requirements
- Versioning strategy
- Change control process

### 3. Tool-agnostic by design

- Works with any tool
- Adapter pattern for tool integration
- Not tied to specific tools
- Flexible consumption

### 4. Designer and Engineer alignment

- Works for both audiences
- Clear handoff process
- Shared understanding
- No separation

### 5. Stable discipline

- Validation in CI
- Version control integration
- Migration paths documented
- Troubleshooting guides

### 6. DTCG-compliant

- Builds on existing spec
- Not reinventing the wheel
- Compatible with DTCG tools
- Adds governance layer

### 7. No posturing

- Focus on what works
- Practical examples
- Real-world scenarios
- No marketing fluff

## When to use Variable Design Standard (VDS)

Use Variable Design Standard (VDS) when:

- You need governance for variables
- You want DTCG compliance
- You work with designers and engineers
- You need validation and versioning
- You want tool-agnostic approach
- You need migration paths

Do not use Variable Design Standard (VDS) when:

- You only need format (use DTCG directly)
- You only need build tool (use Style Dictionary)
- You want brand-specific decisions (use Material Design)
- You want Adobe-specific structure (use Adobe Spectrum)

## Migration from other standards

Variable Design Standard (VDS) supports migration from:

- DTCG (add governance)
- Style Dictionary format (migrate to DTCG format)
- Material Design (extract variables, apply governance)
- Adobe Spectrum (simplify structure, apply governance)
- Custom formats (normalize to Variable Design Standard (VDS))

See [Migration Strategy](/adoption/migration-strategy) for details.

## Out of scope

- Replacing DTCG (we build on it)
- Replacing Style Dictionary (we work with it)
- Replacing design systems (we govern variables)
- Tool-specific features (we're tool-agnostic)
