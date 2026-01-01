---
title: Adapters
---

# Adapters

Adapters normalize tool outputs into Variable Contract format and transform Variable Contract format into tool inputs.

## Why adapters exist

Design tools export variables in formats that include tool-specific metadata and syntax. Variable Contract defines a canonical format for version control. Adapters bridge the gap between tool formats and the contract.

## Adapter responsibilities

Adapters MUST:

1. Normalize naming to match Variable Contract naming convention
2. Convert reference syntax to canonical format (`{path.to.token}`)
3. Move tool metadata to `$extensions`
4. Validate that output conforms to Variable Contract rules

Adapters MAY:

- Preserve tool metadata in `$extensions` for round-trip workflows
- Transform types if tool uses different type names
- Handle mode differences between tools

## Adapter types

### Input adapters

Input adapters convert tool exports into Variable Contract format.

Examples:

- Figma Variables export → Variable Contract
- Tokens Studio export → Variable Contract

### Output adapters

Output adapters convert Variable Contract format into tool or platform formats.

Examples:

- Variable Contract → Style Dictionary → CSS variables
- Variable Contract → TypeScript types
- Variable Contract → Tailwind CSS v4 (`@theme` directive)

## Adapter pattern

A typical adapter workflow:

1. Read tool export JSON
2. Extract tool-specific metadata
3. Normalize naming (if needed)
4. Convert references to canonical format
5. Move metadata to `$extensions`
6. Validate output against Variable Contract
7. Write normalized JSON

## Failure modes

If adapters fail:

- Tool metadata leaks into contract properties
- Invalid references break resolution
- Naming violations cause validation failures
- Type mismatches break consumption

## Adapter documentation

- [Figma Adapter](figma) - Figma Variables export normalization
- [Tokens Studio Adapter](tokens-studio) - Tokens Studio export normalization
- [Style Dictionary Adapter](style-dictionary) - Variable Contract to CSS/TypeScript/etc.
- [Tailwind Adapter](tailwind) - Tailwind theme configuration generation

## Out of scope

- Runtime adapter libraries (implement adapters as needed)
- Adapter testing frameworks
- Cross-tool synchronization (handle via version control)
