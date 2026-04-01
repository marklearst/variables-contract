---
title: Variables Contract
---

# Variables Contract

|                |                                    |
| -------------- | ---------------------------------- |
| **Status**     | Draft Standard                     |
| **Version**    | 0.3.7                              |
| **Editor**     | Mark Learst                        |
| **Compliance** | DTCG 2025.10                       |
| **Schema**     | [v1.json](assets/schema/v1.json)   |
| **License**    | [CC BY-ND 4.0 + Addendum](license) |

A deterministic protocol for design-to-code variable governance. JSON shape, naming, references, modes, and change control.

This specification is protected under the [Variables Contract License](license). Usage for AI-generated derivative standards, false compatibility claims, or ecosystem fragmentation is prohibited.

## Start here

- [Why Variables](introduction/why-variables) - Why we call them variables, not design tokens
- [Variables Contract](contract/variable-contract) - JSON shape and structure
- [Variables Governance](governance/overview) - Governance principles and workflow
- [DTCG Alignment](contract/dtcg-alignment) - DTCG 2025.10 compliance
- [Getting Started](adoption/getting-started) - Team adoption guide

## Introduction

- [Why Variables](introduction/why-variables) - Why "variables" not "design tokens"
- [Comparison](introduction/comparison) - Variables Contract vs other standards
- [Positioning](introduction/positioning) - What Variables Contract is and is not

## Contract reference

- [Variables Contract](contract/variable-contract) - JSON shape and structure
- [Groups](contract/groups) - Group structure and extension
- [References](contract/references) - Reference syntax and resolution
- [Modes](contract/modes) - Mode structure and resolution
- [Types](contract/types) - Type system reference
- [Composite Types](contract/composite-types) - Border, Transition, Shadow, Gradient, Typography
- [Naming](contract/naming) - Naming convention
- [Anatomy](contract/anatomy) - Base, alias, and component variables

## Adoption

- [Getting Started](adoption/getting-started) - Team adoption guide and implementation
- [Implementation Checklist](adoption/implementation-checklist) - Pre/post implementation checklists
- [Migration Strategy](adoption/migration-strategy) - Phased migration approaches

## Governance

- [Governance Overview](governance) - Governance principles and workflow
- [Getting Started](governance/getting-started) - Checklist for variable changes
- [Change Control](governance/change-control) - Review and release process
- [Validation](governance/validation) - Validation tools and CI setup
- [Versioning](governance/versioning) - Semantic versioning and breaking changes
- [Migration](governance/migration) - Migrating from other formats
- [Troubleshooting](governance/troubleshooting) - Common issues and solutions
- [Accessibility](governance/accessibility) - Accessibility constraints
- [Roles](governance/roles) - Role definitions
  - [Designer](governance/roles/designer) - Creates variables in Figma
  - [Design Engineer](governance/roles/design-engineer) - Bridges design and development, owns contract
  - [Frontend Developer](governance/roles/frontend-developer) - Consumes variables in code

## Scenarios

- [Multi-Brand](scenarios/multi-brand) - Multi-brand architecture patterns
- [Multi-Theme](scenarios/multi-theme) - Theme composition and mode inheritance
- [Large Sets](scenarios/large-sets) - Performance considerations and optimization
- [Component Integration](scenarios/component-integration) - Component library integration patterns

## Tooling

- [Ecosystem](tooling/ecosystem) - Tools that support Variable Contract
- [CI/CD](tooling/ci-cd) - CI/CD integration patterns and examples
- [Build Pipelines](tooling/build-pipelines) - Complete build pipeline examples
- [Figma](adapters/figma) - Figma export normalization and workflow
- [Tokens Studio](adapters/tokens-studio) - Tokens Studio export normalization and workflow
- [Style Dictionary](adapters/style-dictionary) - CSS/TypeScript output generation

## Consumption

- [CSS](consumption/css) - CSS variable consumption patterns
- [TypeScript](consumption/typescript) - TypeScript type generation and usage
- [Frameworks](consumption/frameworks) - React/Vue integration patterns

## Design

- [Figma Naming](design/figma-naming) - How to name variables in Figma UI
- [Figma Workflow](design/figma-workflow) - Designer workflow optimization
- [Component Variables](design/component-variables) - Using variables in Figma components

## Testing

- [Validation](testing/validation) - Testing variable changes and reference validation
- [Visual Regression](testing/visual-regression) - Visual regression testing strategies
- [Consumption Tests](testing/consumption-tests) - Testing generated outputs

## Patterns

- [Multi-Brand Architecture](patterns/multi-brand-architecture) - Complete multi-brand example
- [Theme Composition](patterns/theme-composition) - Theme composition patterns and examples
- [Performance](patterns/performance) - Performance optimization strategies

## Adapters

- [Adapters Overview](adapters) - Adapter pattern and responsibilities
- [Figma Adapter](adapters/figma) - Figma export normalization and workflow
- [Tokens Studio Adapter](adapters/tokens-studio) - Tokens Studio export normalization and workflow
- [Style Dictionary Adapter](adapters/style-dictionary) - CSS/TypeScript output generation
- [Tailwind Adapter](adapters/tailwind) - Tailwind theme configuration generation

## Examples

- [Figma Export JSON](examples/figma-export) - Example Figma export
- [DTCG Compliant Example](examples/dtcg-compliant) - Complete DTCG 2025.10 example
- [Adapter Pipeline](examples/adapter-pipeline) - End-to-end transformation example

## Reference

- [Glossary](reference/glossary) - Terminology definitions
- [Quick Reference](reference/quick-reference) - Cheat sheet for common tasks
- [Conformance](reference/conformance) - How to claim compliance

## FAQ

- [FAQ](faq) - Common questions and answers
