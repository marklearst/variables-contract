---
title: "Introduction: Positioning"
---

# Variable Design Standard (VDS) Positioning

What Variable Design Standard (VDS) is, what it is not, and how it fits into the larger UDS system.

## What Variable Design Standard (VDS) is

Variable Design Standard (VDS) is:

- A governance layer on DTCG 2025.10 format
- Rules for naming, validation, and versioning
- Adapter patterns for tool integration
- A standard for managing variables in version control

Variable Design Standard (VDS) provides:

- Structure (DTCG-compliant JSON)
- Governance (naming rules, change control)
- Validation (what to check)
- Adapters (how to convert tool outputs)
- File selection rule (brand and mode selection by file list)

## What Variable Design Standard (VDS) is NOT

Variable Design Standard (VDS) is NOT:

- A new format (uses DTCG 2025.10)
- A tool (works with existing tools)
- A design system (governs variables, not design decisions)
- A runtime library (use DTCG-compliant validators)
- A build tool (use Style Dictionary or similar)

## UDS System

Variable Design Standard is part of UDS (UI Design Standard), a comprehensive standard set for design-to-code governance.

UDS components:

- Variable Design Standard (VDS): this spec
- Integrity Design Standard (IDS): tooling layer (future)
- Component Design Standard (future): component mapping
- Pattern Design Standard (future): pattern mapping
- Design-Dev Mapping (future): artifact relationships

Variable Design Standard is the first standard in UDS, focusing on variables.

## Target audience

### Designers

Designers use Variable Design Standard (VDS) to:

- Create variables in Figma
- Follow naming conventions
- Export variables correctly
- Understand governance rules

### Developers

Developers use Variable Design Standard (VDS) to:

- Consume variables in code
- Validate variable changes
- Generate CSS/TypeScript outputs
- Understand variable structure

### Design Engineers

Design Engineers use Variable Design Standard (VDS) to:

- Maintain Variable Design Standard (VDS)
- Review variable changes
- Set up validation
- Manage versioning
- Bridge design and development

## Problem it solves

Variable Design Standard (VDS) solves:

1. **Naming confusion**: Everyone calls them something different
2. **No governance**: Variables change without rules
3. **Tool lock-in**: Variables tied to specific tools
4. **Handoff breaks**: Design and code don't align
5. **No validation**: Invalid variables ship to production
6. **Versioning chaos**: Breaking changes without notice

## How it works

Variable Design Standard (VDS) works by:

1. Defining structure (DTCG 2025.10 format)
2. Adding governance (naming, validation, versioning)
3. Providing adapters (tool integration)
4. Running validation (CI checks)
5. Supporting migration (from any format)

## JSON-as-API

The JSON file set is the API surface. Paths and names are the contract. Brand and mode selection happens by file list, not by a mapped layer.

## Standard posture

Variable Design Standard (VDS) is a spec and a governance layer.

- The contract is the JSON in version control.
- CI validates structure, naming, references, and modes.
- Contract changes are reviewed before merge.

## Success criteria

Variable Design Standard (VDS) succeeds when:

- Teams adopt it without confusion
- Variables are validated automatically
- Design and code stay aligned
- Migration is straightforward
- Tools work together via DTCG format and adapters

## Out of scope

- UDS full system (separate project)
- Runtime libraries (use existing tools)
- UI tools (use existing tools)
- Design decisions (govern structure, not values)
