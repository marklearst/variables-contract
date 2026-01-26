---
title: References
---

# Variable Contract References

External standards and specifications referenced by Variable Contract.

## Primary references

### DTCG 2025.10 Format Specification

**Title:** Design Tokens Format Module
**Version:** 2025.10
**URL:** https://www.designtokens.org/tr/2025.10/format/
**Status:** W3C Community Group Specification

Variable Contract is built on DTCG 2025.10 format. Any Variable Contract JSON is valid DTCG 2025.10 format.

## Related standards

### Semantic Versioning

**Title:** Semantic Versioning 2.0.0
**URL:** https://semver.org/
**Usage:** Variable Contract uses semantic versioning for variable releases (MAJOR.MINOR.PATCH)

### JSON Pointer

**Title:** JSON Pointer (RFC 6901)
**URL:** https://datatracker.ietf.org/doc/html/rfc6901
**Usage:** DTCG requires JSON Pointer syntax for references (`#/path/to/variable`)

## Tools referenced

### Style Dictionary

**URL:** https://styledictionary.com/
**Usage:** Output generation tool. Consumes DTCG format, generates CSS/TypeScript/etc.

### Figma Variables

**URL:** https://help.figma.com/hc/en-us/sections/14506605769879-Variables
**Usage:** Design tool for authoring variables. Variable Contract provides adapter for normalization.

### Tokens Studio

**URL:** https://tokens.studio/
**Usage:** Design tool plugin for managing variables. Variable Contract provides adapter for normalization.

## Standards alignment

Variable Contract aligns with:

- W3C standards practices (normative keywords, conformance requirements)
- ECMAScript specification structure (editor attribution, versioning)
- Industry patterns (semantic versioning, validation, governance)

## Out of scope

Variable Contract does not reference:

- Runtime libraries (validation is build-time)
- UI frameworks (tool-agnostic)
- Design system decisions (governs structure, not values)

