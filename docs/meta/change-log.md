---
title: Change Log
---

# Variable Design Standard (VDS) Change Log

Version history and release notes for Variable Design Standard (VDS).

## Version 0.4.0 (Current)

**Status:** Draft
**Date:** January 26, 2026

Documentation hardening and DTCG 2025.10 compliance improvements.

### Changes

#### DTCG 2025.10 Compliance Improvements

- **Clarified modes as Variable Design Standard (VDS) extension**: Modes in `$value` objects are NOT part of DTCG 2025.10 specification. This is a Variable Design Standard (VDS) extension inspired by Figma's modes concept.
- **Updated group extension syntax**: Changed from `$ref` to `$extends` with curly brace syntax (`"$extends": "{group.path}"`) to align with DTCG 2025.10.
- **Fixed format documentation**: Updated Color, Dimension, and Duration type documentation to show DTCG object format as canonical, with Variable Design Standard (VDS) string shortcuts as convenience formats.
- **Corrected DTCG feature claims**: Removed "Mode support" from DTCG features list; added modes, string shortcuts, and hex color shorthand to Variable Design Standard (VDS) extensions.

#### Figma Documentation Improvements

- **Clarified export formats**: Distinguished plugin-generated format from REST API format.
- **Fixed REST API access claim**: Corrected to "Enterprise plan only" (not Enterprise/Organization).
- **Clarified export prefixes**: Documented that `@` and `$` prefixes are added by export plugins, not typed in Figma UI.
- **Added comprehensive Figma links**: Added Designer Resources and Developer Resources sections to LINKS.md.

#### Documentation Hardening

- **Version consistency**: Updated all version references from 0.3.7 to 0.4.0.
- **Fixed incorrect version claims**: Corrected FAQ claim that 1.0.0 is stable.
- **Updated examples**: Fixed `dtcg-compliant.json` to use strict DTCG object formats.
- **Improved accuracy**: Ensured all DTCG compliance claims are accurate and verifiable.

### Files Updated

- `package.json` - Version bump to 0.4.0
- `README.md` - Version update and DTCG claims correction
- `docs/index.md` - Version update
- `docs/faq.md` - Fixed version claim
- `docs/contract/dtcg-alignment.md` - Clarified VDS extensions
- `docs/contract/modes.md` - Added DTCG disclaimer
- `docs/contract/types.md` - Updated to show object format as canonical
- `docs/contract/groups.md` - Updated to use `$extends`
- `docs/contract/references.md` - Clarified modes are VDS extension
- `docs/contract/variable-contract.md` - Updated group extension syntax
- `docs/examples/dtcg-compliant.md` - Updated to match corrected JSON
- `docs/examples/figma-export.md` - Fixed REST API claims
- `docs/adapters/figma.md` - Clarified plugin vs REST API formats
- `docs/design/figma-naming.md` - Clarified export prefixes
- `assets/schema/dtcg-compliant.json` - Fixed to strict DTCG format
- `LINKS.md` - Added Figma documentation links

## Version 0.3.7

Previous version with initial documentation structure.

## Future versions

- **v0.5.0**: Reference validator CLI and test fixtures
- **v0.6.0**: Reference adapters as code (Figma, Tokens Studio)
- **v0.7.0**: Reference output generators (CSS, TypeScript, Tailwind v4)
- **v1.0.0**: Formal Status of this Document (SOTD), conformance registry, stabilized schema

See [Versioning](governance/versioning) for versioning strategy and breaking change definitions.
