---
title: "Adapters: Overview"
---

# Adapters

Adapters normalize tool outputs into Variable Design Standard (VDS) format and transform Variable Design Standard (VDS) format into tool inputs.

## Why adapters exist

Design tools export variables in formats that include tool-specific metadata and syntax. Variable Design Standard (VDS) defines a canonical format for version control. Adapters bridge the gap between tool formats and the contract.

## Adapter responsibilities

Adapters MUST:

1. Normalize naming to match Variable Design Standard (VDS) naming convention
2. Convert reference syntax to canonical format (`{path.to.token}`)
3. Move tool metadata to `$extensions`
4. Validate that output conforms to Variable Design Standard (VDS) rules

Adapters MAY:

- Preserve tool metadata in `$extensions` for round-trip workflows
- Transform types if tool uses different type names
- Handle mode differences between tools

## Adapter types

### Input adapters

Input adapters convert tool exports into Variable Design Standard (VDS) format.

Examples:

- Figma Variables export → Variable Design Standard (VDS)
- Tokens Studio export → Variable Design Standard (VDS)

### Output adapters

Output adapters convert Variable Design Standard (VDS) format into tool or platform formats.

Examples:

- Variable Design Standard (VDS) → Style Dictionary → CSS variables
- Variable Design Standard (VDS) → TypeScript types
- Variable Design Standard (VDS) → Tailwind CSS v4 (`@theme` directive)

## Adapter pattern

A typical adapter workflow:

1. Read tool export JSON
2. Extract tool-specific metadata
3. Normalize naming (if needed)
4. Convert references to canonical format
5. Move metadata to `$extensions`
6. Validate output against Variable Design Standard (VDS)
7. Write normalized JSON

## Failure modes

If adapters fail:

- Tool metadata leaks into contract properties
- Invalid references break resolution
- Naming violations cause validation failures
- Type mismatches break consumption

## Adapter documentation

- [Figma Adapter](figma): Figma Variables export normalization
- [Tokens Studio Adapter](tokens-studio): Tokens Studio export normalization
- [Style Dictionary Adapter](style-dictionary): Variable Design Standard (VDS) to CSS/TypeScript/etc.
- [Tailwind Adapter](tailwind): Tailwind theme configuration generation

## Out of scope

- Runtime adapter libraries (implement adapters as needed)
- Adapter testing frameworks
- Cross-tool synchronization (handle via version control)
