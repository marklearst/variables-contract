---
title: Positioning
---

# Variable Contract Positioning

What Variable Contract is, what it is not, and how it fits into the larger UMP system.

## What Variable Contract is

Variable Contract is:

- A governance layer on DTCG 2025.10 format
- Rules for naming, validation, and versioning
- Adapter patterns for tool integration
- A standard for managing variables in version control

Variable Contract provides:

- Structure (DTCG-compliant JSON)
- Governance (naming rules, change control)
- Validation (what to check)
- Adapters (how to convert tool outputs)

## What Variable Contract is NOT

Variable Contract is NOT:

- A new format (uses DTCG 2025.10)
- A tool (works with existing tools)
- A design system (governs variables, not design decisions)
- A runtime library (use DTCG-compliant validators)
- A build tool (use Style Dictionary or similar)

## UMP context

Variable Contract is part of UMP (UI Mapping Protocol), a larger system for mapping design and development artifacts.

UMP components:

- Variable Contract (this spec) - variables/tokens
- Component Contract (future) - component mapping
- Pattern Contract (future) - pattern mapping
- Design-Dev Mapping (future) - artifact relationships

Variable Contract is the first piece of UMP, focusing on variables.

## Target audience

### Designers

Designers use Variable Contract to:

- Create variables in Figma
- Follow naming conventions
- Export variables correctly
- Understand governance rules

### Developers

Developers use Variable Contract to:

- Consume variables in code
- Validate variable changes
- Generate CSS/TypeScript outputs
- Understand variable structure

### Design Engineers

Design Engineers use Variable Contract to:

- Maintain variable contract
- Review variable changes
- Set up validation
- Manage versioning
- Bridge design and development

## Problem it solves

Variable Contract solves:

1. **Naming confusion**: Everyone calls them something different
2. **No governance**: Variables change without rules
3. **Tool lock-in**: Variables tied to specific tools
4. **Handoff breaks**: Design and code don't align
5. **No validation**: Invalid variables ship to production
6. **Versioning chaos**: Breaking changes without notice

## How it works

Variable Contract works by:

1. Defining structure (DTCG 2025.10 format)
2. Adding governance (naming, validation, versioning)
3. Providing adapters (tool integration)
4. Enabling validation (CI checks)
5. Supporting migration (from any format)

## Success criteria

Variable Contract succeeds when:

- Teams adopt it without confusion
- Variables are validated automatically
- Design and code stay aligned
- Migration is straightforward
- Tools work together via DTCG format and adapters

## Out of scope

- UMP full system (separate project)
- Runtime libraries (use existing tools)
- UI tools (use existing tools)
- Design decisions (govern structure, not values)

