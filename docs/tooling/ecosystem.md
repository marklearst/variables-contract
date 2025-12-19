---
title: Tooling - Ecosystem
---

# Variable Contract Tooling Ecosystem

Tools that support Variable Contract (DTCG 2025.10 format).

## Validation tools

### DTCG-compliant validators

- **@dtcg/validator** - Official DTCG validator
- **style-dictionary** - Built-in DTCG format validation
- **Custom validators** - Build using DTCG JSON Schema

### Variable Contract validators

- **Custom validation scripts** - Check naming, references, modes
- **CI validation** - GitHub Actions, GitLab CI, etc.
- **Pre-commit hooks** - Husky, pre-commit framework

## Build tools

### Style Dictionary

- **Purpose**: Generate platform outputs (CSS, TypeScript, etc.)
- **DTCG support**: Yes (v5+)
- **Usage**: Output adapter for Variable Contract
- **Link**: [Style Dictionary](https://styledictionary.com/)

### Custom build tools

- **Purpose**: Generate custom outputs
- **DTCG support**: Use DTCG-compliant parsers
- **Usage**: Build custom formats from Variable Contract JSON

## Adapter tools

### Figma adapters

- **Figma REST API** - Export variables from Figma
- **Figma Dev Mode plugin** - Export variables
- **Custom adapters** - Normalize Figma exports to Variable Contract

### Tokens Studio adapters

- **Tokens Studio plugin** - Export from Figma
- **Custom adapters** - Normalize Tokens Studio exports

### Other adapters

- **Material Design** - Convert Material tokens to Variable Contract
- **Adobe Spectrum** - Convert Spectrum tokens to Variable Contract
- **Custom formats** - Build adapters for any format

## Editor integrations

### VS Code

- **Design Tokens extension** - Syntax highlighting for DTCG format
- **JSON Schema validation** - Validate Variable Contract JSON
- **Custom extensions** - Build Variable Contract-specific features

### Other editors

- **WebStorm** - JSON Schema validation
- **Sublime Text** - JSON syntax highlighting
- **Vim** - JSON syntax highlighting

## CI/CD tools

### GitHub Actions

- **Validation workflows** - Validate Variable Contract JSON
- **Build workflows** - Generate outputs
- **Release workflows** - Version and release variables

### GitLab CI

- **Validation pipelines** - Validate Variable Contract JSON
- **Build pipelines** - Generate outputs

### Other CI/CD

- **Jenkins** - Custom pipelines
- **CircleCI** - Custom workflows
- **Azure DevOps** - Custom pipelines

## Design tools

### Figma

- **Variables panel** - Create and manage variables
- **Dev Mode** - Export variables
- **Tokens Studio plugin** - Enhanced variable management

### Other design tools

- **Sketch** - Variable support (limited)
- **Adobe XD** - Variable support (limited)

## Consumption tools

### CSS

- **CSS custom properties** - Native browser support
- **PostCSS** - Process CSS variables
- **CSS-in-JS** - Use variables in JavaScript

### TypeScript

- **Type generation** - Generate TypeScript types from variables
- **Type-safe access** - Type-safe variable access

### Frameworks

- **React** - Use CSS variables or generated types
- **Vue** - Use CSS variables or generated types
- **Angular** - Use CSS variables or generated types

## Tool compatibility matrix

| Tool | DTCG Support | Variable Contract Support | Notes |
|------|--------------|---------------------------|-------|
| Style Dictionary | Yes (v5+) | Yes (via DTCG) | Output adapter |
| Figma | Partial | Yes (via adapter) | Export and normalize |
| Tokens Studio | Yes | Yes (via adapter) | Export and normalize |
| @dtcg/validator | Yes | Yes (format only) | Add custom validation |
| GitHub Actions | N/A | Yes (custom workflows) | CI integration |

## Choosing tools

### For validation

- Use DTCG-compliant validators for format validation
- Add custom validation for Variable Contract rules
- Set up CI validation for automated checks

### For building

- Use Style Dictionary for standard outputs (CSS, TypeScript)
- Build custom tools for specialized outputs
- Use DTCG-compliant parsers

### For adapters

- Use existing adapters (Figma, Tokens Studio)
- Build custom adapters for other formats
- Follow adapter pattern documentation

## Out of scope

- Tool-specific features (see tool documentation)
- Runtime libraries (use existing DTCG validators)
- UI tools (use existing tools)

