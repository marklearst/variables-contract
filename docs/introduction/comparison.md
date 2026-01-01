---
title: Comparison
---

# Variable Contract vs Other Standards

How Variable Contract compares to other variable/token standards and why it wins.

## Comparison matrix

| Feature | Variable Contract | DTCG 2025.10 | Style Dictionary | Material Design | Adobe Spectrum |
|---------|------------------|--------------|------------------|-----------------|----------------|
| Format | DTCG 2025.10 | DTCG 2025.10 | Legacy + DTCG | Custom JSON | Custom JSON |
| Governance | Yes | No | No | Partial | Partial |
| Naming rules | Yes | No | No | Yes | Yes |
| Validation | Yes | Format only | Format only | Partial | Partial |
| Versioning | Yes | No | No | Yes | Yes |
| Adapters | Yes | No | Tool-specific | No | No |
| Tool-agnostic | Yes | Yes | No | No | No |
| Designer-focused | Yes | No | No | Yes | Yes |
| Developer-focused | Yes | No | Yes | Partial | Partial |

## Variable Contract vs DTCG 2025.10

### What DTCG provides

DTCG 2025.10 defines:

- JSON structure for variables
- Type system
- Reference syntax
- Composite types
- Group extension

### What Variable Contract adds

Variable Contract adds governance:

- Naming convention rules
- Change control process
- Validation requirements
- Versioning strategy
- Adapter patterns

DTCG is a format. Variable Contract is governance on that format.

## Variable Contract vs Style Dictionary

### Style Dictionary is a tool

Style Dictionary:

- Consumes variable JSON
- Generates platform outputs (CSS, TypeScript, etc.)
- Has its own format (legacy) and supports DTCG format
- Focuses on build pipeline

### Variable Contract is governance

Variable Contract:

- Defines the contract (format + rules)
- Works with Style Dictionary (as an output adapter)
- Focuses on version control and validation
- Tool-agnostic

They work together: Variable Contract defines the contract, Style Dictionary generates outputs.

## Variable Contract vs Material Design

### Material Design is opinionated

Material Design:

- Defines specific naming patterns
- Includes brand-specific decisions
- Tied to Material Design system
- Less flexible for other brands

### Variable Contract is flexible

Variable Contract:

- Defines structure and rules, not specific names
- Works for any brand or system
- Focuses on governance, not design decisions
- Adaptable to any design system

Material Design is a design system. Variable Contract is a governance standard.

## Variable Contract vs Adobe Spectrum

### Adobe Spectrum is complex

Adobe Spectrum:

- Complex taxonomy (namespace, domain, object, base, modifiers)
- Many naming segments
- Brand-specific structure
- Over-engineered for most use cases

### Variable Contract is simple

Variable Contract:

- Simple dot-separated paths
- Minimal required segments
- Flexible structure
- Practical and testable

Adobe Spectrum solves Adobe's problems. Variable Contract solves everyone's problems.

## Why Variable Contract wins

### 1. Simplicity

- Variables are variables, not special "tokens"
- Simple naming (dot-separated paths)
- Clear structure
- Easy to understand

### 2. Governance

- Clear rules (not opinions)
- Testable requirements
- Versioning strategy
- Change control process

### 3. Tool-agnostic

- Works with any tool
- Adapter pattern for tool integration
- Not tied to specific tools
- Flexible consumption

### 4. Designer + Developer

- Works for both audiences
- Clear handoff process
- Shared understanding
- No separation

### 5. Production-ready

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

## When to use Variable Contract

Use Variable Contract when:

- You need governance for variables
- You want DTCG compliance
- You work with designers and developers
- You need validation and versioning
- You want tool-agnostic approach
- You need migration paths

Do not use Variable Contract when:

- You only need format (use DTCG directly)
- You only need build tool (use Style Dictionary)
- You want brand-specific decisions (use Material Design)
- You want Adobe-specific structure (use Adobe Spectrum)

## Migration from other standards

Variable Contract supports migration from:

- DTCG (add governance)
- Style Dictionary format (migrate to DTCG format)
- Material Design (extract variables, apply governance)
- Adobe Spectrum (simplify structure, apply governance)
- Custom formats (normalize to Variable Contract)

See [Migration Strategy](/variables-contract/introduction/adoption/migration-strategy) for details.

## Out of scope

- Replacing DTCG (we build on it)
- Replacing Style Dictionary (we work with it)
- Replacing design systems (we govern variables)
- Tool-specific features (we're tool-agnostic)

