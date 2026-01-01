# Variables Contract

Public specification and governance standard for design variables. DTCG 2025.10 compliant format with naming rules, validation requirements, versioning strategy, and adapter patterns.

**Version:** 0.3.7
**Status:** Draft
**Editor:** Mark Learst

Variables are variables. CSS variables, JavaScript variables, Figma variables. Variables Contract standardizes how we name, structure, and govern them. No metaphors. No cute names. Just variables.

If variables are managed without a contract, you get silent renames, broken references, inconsistent naming, tool lock-in, and production failures.

## What this is

Variables Contract defines:

- JSON structure (DTCG 2025.10 format)
- Naming convention (dot-separated paths, lowercase, no platform prefixes)
- Reference syntax (curly brace `{path.to.variable}` and JSON Pointer `#/path/to/variable`)
- Validation requirements (structure, naming, references, types, modes)
- Versioning strategy (semantic versioning, breaking change definitions)
- Adapter patterns (Figma, Tokens Studio, Style Dictionary)

Variables Contract does NOT define:

- Variable values (your design decisions)
- Tools to use (works with any DTCG-compliant tool)
- Consumption patterns (CSS, TypeScript, whatever works)
- Design system decisions (governs structure, not values)

## Why variables, not "design tokens"

Variables are variables. CSS variables, JavaScript variables, Figma variables. They store values, can be referenced, and can be changed.

"Design tokens" creates confusion. Developers know variables. Designers know variables. Variables Contract uses the term everyone understands.

See [Why Variables](docs/introduction/why-variables) for the full argument.

## The problem this solves

### Naming chaos

Everyone calls them something different: design tokens, style properties, design constants, variables, tokens. This creates confusion and separation between design and code.

Variables Contract standardizes on "variables" and provides clear naming rules.

### No governance

Variables change without rules. Renames break components. Invalid references ship to production. Breaking changes go unnoticed.

Variables Contract provides governance: naming rules, validation requirements, versioning strategy, change control process.

### Tool lock-in

Variables are tied to specific tools. Figma exports don't work with Style Dictionary. Tokens Studio format doesn't match DTCG. Migration is painful.

Variables Contract is tool-agnostic. Use any tool. Adapters normalize tool outputs to the contract.

### Handoff breaks

Design and code don't align. Designers create variables in Figma. Developers consume CSS variables. The connection breaks.

Variables Contract bridges the gap. Variables flow from Figma through adapters to version control to generated outputs.

### No validation

Invalid variables ship to production. Broken references break components. Type mismatches cause runtime errors.

Variables Contract requires validation. CI checks catch errors before they ship.

## DTCG 2025.10 compliance

Variables Contract is DTCG 2025.10 compliant. Any JSON file that follows Variables Contract rules is valid DTCG 2025.10 format.

What DTCG provides:

- JSON structure for variables and groups
- Type system (color, dimension, fontFamily, etc.)
- Reference syntax (curly brace and JSON Pointer)
- Composite types (border, transition, shadow, gradient, typography)
- Group extension with `$ref`
- Mode support

What Variables Contract adds:

- Naming convention rules
- Change control process
- Validation requirements beyond format correctness
- Versioning strategy
- Adapter patterns for tool integration

See [DTCG Alignment](docs/contract/dtcg-alignment) for details.

## Quick start

### For teams adopting Variables Contract

1. Read [Getting Started](docs/adoption/getting-started)
2. Set up repository structure (`tokens/` directory)
3. Install validation tools
4. Configure CI validation
5. Export variables from Figma
6. Run adapter to normalize
7. Commit normalized JSON
8. Generate outputs (CSS, TypeScript)

See [Implementation Checklist](docs/adoption/implementation-checklist) for complete setup.

### For designers

1. Read [Figma Naming](docs/design/figma-naming)
2. Create variables in Figma following naming convention
3. Use semantic variables in components
4. Export variables
5. Follow [Figma Workflow](docs/design/figma-workflow)

### For developers

1. Read [CSS Consumption](docs/consumption/css) or [TypeScript Consumption](docs/consumption/typescript)
2. Use generated CSS variables or TypeScript types
3. Follow [Framework Integration](docs/consumption/frameworks) for React/Vue
4. Test variable consumption

### For Design Engineers

1. Read [Variable Contract](docs/contract/variable-contract)
2. Set up [Validation](docs/governance/validation)
3. Configure [CI/CD](docs/tooling/ci-cd)
4. Review [Change Control](docs/governance/change-control)
5. Manage [Versioning](docs/governance/versioning)

## Documentation structure

### Introduction

- [Why Variables](docs/introduction/why-variables) - Why "variables" not "design tokens"
- [Comparison](docs/introduction/comparison) - Variables Contract vs DTCG, Style Dictionary, Material, Adobe
- [Positioning](docs/introduction/positioning) - What Variables Contract is and is not

### Contract reference

- [Variable Contract](docs/contract/variable-contract) - JSON shape and structure
- [Groups](docs/contract/groups) - Group structure and extension
- [References](docs/contract/references) - Reference syntax and resolution
- [Modes](docs/contract/modes) - Mode structure and resolution
- [Types](docs/contract/types) - Type system reference
- [Composite Types](docs/contract/composite-types) - Border, Transition, Shadow, Gradient, Typography
- [Naming](docs/contract/naming) - Naming convention
- [Anatomy](docs/contract/anatomy) - Base, alias, and component tokens

### Adoption

- [Getting Started](docs/adoption/getting-started) - Team adoption guide
- [Implementation Checklist](docs/adoption/implementation-checklist) - Pre/post implementation checklists
- [Migration Strategy](docs/adoption/migration-strategy) - Phased migration approaches

### Governance

- [Governance Overview](docs/governance/overview) - Governance principles and workflow
- [Change Control](docs/governance/change-control) - Review and release process
- [Validation](docs/governance/validation) - Validation tools and CI setup
- [Versioning](docs/governance/versioning) - Semantic versioning and breaking changes
- [Migration](docs/governance/migration) - Migrating from other formats
- [Troubleshooting](docs/governance/troubleshooting) - Common issues and solutions
- [Accessibility](docs/governance/accessibility) - Accessibility constraints

### Scenarios

- [Multi-Brand](docs/scenarios/multi-brand) - Multi-brand architecture patterns
- [Multi-Theme](docs/scenarios/multi-theme) - Theme composition and mode inheritance
- [Large Sets](docs/scenarios/large-sets) - Performance considerations
- [Component Integration](docs/scenarios/component-integration) - Component library integration

### Tooling

- [Ecosystem](docs/tooling/ecosystem) - Tools that support Variables Contract
- [CI/CD](docs/tooling/ci-cd) - CI/CD integration patterns
- [Build Pipelines](docs/tooling/build-pipelines) - Complete build pipeline examples
- [Figma Adapter](docs/adapters/figma) - Figma export normalization
- [Tokens Studio Adapter](docs/adapters/tokens-studio) - Tokens Studio export normalization
- [Style Dictionary Adapter](docs/adapters/style-dictionary) - CSS/TypeScript output generation

### Consumption

- [CSS](docs/consumption/css) - CSS variable consumption patterns
- [TypeScript](docs/consumption/typescript) - TypeScript type generation
- [Frameworks](docs/consumption/frameworks) - React/Vue integration

### Design

- [Figma Naming](docs/design/figma-naming) - How to name variables in Figma
- [Figma Workflow](docs/design/figma-workflow) - Designer workflow
- [Component Variables](docs/design/component-variables) - Using variables in Figma components

### Testing

- [Validation](docs/testing/validation) - Testing variable changes
- [Visual Regression](docs/testing/visual-regression) - Visual regression testing
- [Consumption Tests](docs/testing/consumption-tests) - Testing generated outputs

### Patterns

- [Multi-Brand Architecture](docs/patterns/multi-brand-architecture) - Complete multi-brand example
- [Theme Composition](docs/patterns/theme-composition) - Theme composition patterns
- [Performance](docs/patterns/performance) - Performance optimization

## Requirements

Variables Contract JSON files MUST:

- Use DTCG 2025.10 format
- Follow naming convention (dot-separated paths, lowercase, no platform prefixes)
- Use canonical reference syntax (`{path.to.variable}`)
- Include `$type` and `$value` on all variables
- Resolve all references (no broken references)
- Avoid circular references
- Use consistent mode keys within collections

Variables Contract JSON files SHOULD:

- Include `$description` when intent is not obvious
- Use semantic aliases for UI consumption
- Keep modes limited (`light`, `dark`)
- Organize by category (base, semantic, component)

See [Validation Checklist](docs/governance/validation) for complete requirements.

## Validation

Variables Contract requires validation at multiple points:

1. After adapter normalization (check structure, naming, references)
2. In CI on every PR (block invalid changes)
3. Before build (verify contract compliance)
4. After build (test generated outputs)

Validation checks:

- JSON syntax (valid JSON structure)
- Variable structure (`$type` and `$value` present)
- Naming convention (dot-separated paths, lowercase)
- Reference resolution (all references resolve)
- Circular reference detection (no reference cycles)
- Type correctness (`$value` matches `$type`)
- Mode consistency (mode keys shared within collections)

See [Validation](docs/governance/validation) for validation tools and CI setup.

## Versioning

Variables Contract uses semantic versioning (MAJOR.MINOR.PATCH):

- MAJOR: breaking changes (renames, removals, type changes)
- MINOR: new variables, new modes, non-breaking additions
- PATCH: bug fixes, documentation updates

Breaking changes:

- Variable renames
- Variable removals
- Type changes
- Reference changes that break intent

Non-breaking changes:

- New variables
- New modes
- Value changes (if documented and intentional)

See [Versioning](docs/governance/versioning) for complete versioning strategy.

## Adapters

Adapters normalize tool outputs into Variables Contract format.

### Figma adapter

Normalizes Figma Variables export JSON:

- Extracts `$collection_metadata` to `$extensions`
- Extracts `$variable_metadata` to `$extensions`
- Removes `@` prefix from collection names
- Converts reference syntax `{@collection.token}` to `{collection.token}`
- Moves mode values from metadata to `$value` object

See [Figma Adapter](docs/adapters/figma) for details.

### Tokens Studio adapter

Normalizes Tokens Studio export JSON:

- Validates DTCG format compliance
- Checks naming convention
- Verifies reference syntax
- Preserves Tokens Studio metadata in `$extensions`

See [Tokens Studio Adapter](docs/adapters/tokens-studio) for details.

### Style Dictionary adapter

Generates platform outputs from Variables Contract JSON:

- CSS variables
- TypeScript types
- Tailwind CSS v4 (CSS custom properties)
- SCSS variables
- Other platform formats

See [Style Dictionary Adapter](docs/adapters/style-dictionary) for details.

## Examples

- [Figma Export JSON](docs/examples/figma-export) - Example Figma export
- [DTCG Compliant Example](docs/examples/dtcg-compliant) - Complete DTCG 2025.10 example
- [Adapter Pipeline](docs/examples/adapter-pipeline) - End-to-end transformation example

## UMP context

Variables Contract is part of UMP (UI Mapping Protocol), a larger system for mapping design and development artifacts.

UMP components:

- Variables Contract (this spec) - variables/tokens
- Component Contract (future) - component mapping
- Pattern Contract (future) - pattern mapping
- Design-Dev Mapping (future) - artifact relationships

Variables Contract is the first piece of UMP, focusing on variables.

## Status

Variables Contract is:

- DTCG 2025.10 compliant
- Production-ready
- Tool-agnostic
- Validated in CI
- Used by teams

Variables Contract is NOT:

- A W3C standard (uses DTCG format)
- A tool (works with existing tools)
- A design system (governs structure, not values)
- Complete UMP system (focuses on variables)

## Failure modes

If Variables Contract is not used:

- Silent renames break components
- Broken references cause production failures
- Inconsistent naming creates confusion
- Tool lock-in prevents migration
- No validation allows invalid variables to ship
- Versioning chaos makes upgrades risky

If Variables Contract is used incorrectly:

- Skipping validation allows invalid variables to ship
- Not following naming convention breaks code generation
- Ignoring versioning causes breaking changes without notice
- Skipping adapters leaks tool metadata into contract
- Not testing consumption breaks component styling

## Contributing

Variables Contract is a public specification. Contributions welcome.

Before contributing:

1. Read [WRITING_GUIDE.md](WRITING_GUIDE.md)
2. Follow writing guide rules (no slop words, testable requirements)
3. Include examples for new concepts
4. Document failure modes
5. Add validation checklists

## Local development

Documentation is built with [docmd](https://github.com/mgks/docmd).

### Setup

```sh
pnpm install
```

### Development

```sh
pnpm run docs:dev
```

Starts local development server at `http://localhost:3000`.

### Build

```sh
pnpm run docs:build
```

Generates static site in `site/`.

## Contributors

**Editor:** Mark Learst

Variables Contract is maintained by the editor. Contributions welcome.

## Acknowledgments

Variables Contract builds on:

- [DTCG 2025.10 Format](https://www.designtokens.org/tr/2025.10/format/) - Base format specification
- [Style Dictionary](https://styledictionary.com/) - Output generation tool
- Figma Variables - Design tool integration
- Tokens Studio - Design tool integration

## References

- [DTCG 2025.10 Specification](https://www.designtokens.org/tr/2025.10/format/) - Design Tokens Community Group format
- [Variables Contract Documentation](docs/index.md) - Complete specification and governance
- [DTCG Alignment](docs/contract/dtcg-alignment.md) - Compliance details

## Conformance

To claim Variables Contract compliance:

1. Use DTCG 2025.10 format for variable JSON
2. Follow naming convention (dot-separated paths, lowercase, no platform prefixes)
3. Use canonical reference syntax (`{path.to.variable}`)
4. Validate variables (structure, naming, references, types, modes)
5. Use semantic versioning for variable releases
6. Document breaking changes

See [Conformance](docs/reference/conformance.md) for complete conformance requirements and test suite.

## License

This work is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

See [LICENSE](LICENSE) for full license text.

## Links

- [Documentation](docs/index.md)
- [DTCG 2025.10 Specification](https://www.designtokens.org/tr/2025.10/format/)
- [Style Dictionary](https://styledictionary.com/)
- [Figma Variables](https://help.figma.com/hc/en-us/sections/14506605769879-Variables)
