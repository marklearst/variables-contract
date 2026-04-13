---
title: "Tooling: Variable Design Standard (VDS)"
---

# Specification Overview

|                |                                    |
| -------------- | ---------------------------------- |
| **Status**     | Draft                              |
| **Version**    | 0.5.0                              |
| **Editor**     | Mark Learst                        |
| **Compliance** | DTCG 2025.10                       |
| **Schema**     | [v1.json](assets/schema/v1.json)   |
| **License**    | [CC BY-ND 4.0 + Addendum](license) |

A testable protocol for design-to-code variable governance. JSON shape, naming, references, modes, and change control.

This specification is protected under the [Variable Design Standard License](license). Usage for AI-generated derivative standards, false compatibility claims, or ecosystem fragmentation is prohibited.

## Abstract

Variable Design Standard (VDS) defines how variables are named, structured, reviewed, and shipped across design and code. It adds governance, validation, and role boundaries to the DTCG 2025.10 format so handoff holds as teams and products grow. JSON-as-API means file paths and names are the interface.

## Status of This Document

This specification is Draft. The table above lists the current version, license, and schema.

## Conformance

Conformance requires DTCG 2025.10 format compliance, Variable Design Standard (VDS) naming rules, reference syntax, validation, and versioning. See [Conformance](reference/conformance).

## Start here

- [Why Variables](introduction/why-variables): Why we call them variables, not design tokens
- [Variable Design Standard (VDS)](contract/variable-contract): JSON shape and structure
- [Variables Governance](governance/overview): Governance principles and workflow
- [DTCG Alignment](contract/dtcg-alignment): DTCG 2025.10 compliance
- [Getting Started](adoption/getting-started): Team adoption guide

## Introduction

- [Why Variables](introduction/why-variables): Why "variables" not "design tokens"
- [Comparison](introduction/comparison): Variable Design Standard vs other standards
- [Positioning](introduction/positioning): What Variable Design Standard is and is not

## Contract reference

- [Variable Design Standard (VDS)](contract/variable-contract): JSON shape and structure
- [Groups](contract/groups): Group structure and extension
- [References](contract/references): Reference syntax and resolution
- [Modes](contract/modes): Mode structure and resolution
- [Types](contract/types): Type system reference
- [Composite Types](contract/composite-types): Border, Transition, Shadow, Gradient, Typography
- [Naming](contract/naming): Naming convention
- [Anatomy](contract/anatomy): Base, alias, and component variables

## Adoption

- [Getting Started](adoption/getting-started): Team adoption guide and implementation
- [Implementation Checklist](adoption/implementation-checklist): Pre/post implementation checklists
- [Migration Strategy](adoption/migration-strategy): Phased migration approaches

## Governance

- [Governance Overview](governance): Governance principles and workflow
- [Getting Started](governance/getting-started): Checklist for variable changes
- [Change Control](governance/change-control): Review and release process
- [Validation](governance/validation): Validation tools and CI setup
- [Versioning](governance/versioning): Semantic versioning and breaking changes
- [Migration](governance/migration): Migrating from other formats
- [Troubleshooting](governance/troubleshooting): Common issues and solutions
- [Accessibility](governance/accessibility): Accessibility constraints
- [Roles](governance/roles): Role definitions
  - [Designer](governance/roles/designer): Creates variables in Figma
  - [Design Engineer](governance/roles/design-engineer): Bridges design and development, owns contract
  - [Frontend Engineer](governance/roles/frontend-engineer): Consumes variables in code

## Scenarios

- [Multi-Brand](scenarios/multi-brand): Multi-brand architecture patterns
- [Multi-Theme](scenarios/multi-theme): Theme composition and mode inheritance
- [Large Sets](scenarios/large-sets): Performance considerations and limits
- [Component Integration](scenarios/component-integration): Component library integration patterns

## Tooling

- [Ecosystem](tooling/ecosystem): Tools that support Variable Design Standard
- [CI/CD](tooling/ci-cd): CI/CD integration patterns and examples
- [Build Pipelines](tooling/build-pipelines): Complete build pipeline examples
- [Figma](adapters/figma): Figma export normalization and workflow
- [Tokens Studio](adapters/tokens-studio): Tokens Studio export normalization and workflow
- [Style Dictionary](adapters/style-dictionary): CSS/TypeScript output generation

## Consumption

- [CSS](consumption/css): CSS variable consumption patterns
- [TypeScript](consumption/typescript): TypeScript type generation and usage
- [UI Libraries](consumption/frameworks): React/Vue integration patterns

## Design

- [Figma Naming](design/figma-naming): How to name variables in Figma UI
- [Figma Workflow](design/figma-workflow): Designer workflow tuning
- [Component Variables](design/component-variables): Using variables in Figma components

## Testing

- [Validation](testing/validation): Testing variable changes and reference validation
- [Visual Regression](testing/visual-regression): Visual regression testing strategies
- [Consumption Tests](testing/consumption-tests): Testing generated outputs

## Patterns

- [Multi-Brand Architecture](patterns/multi-brand-architecture): Complete multi-brand example
- [Theme Composition](patterns/theme-composition): Theme composition patterns and examples
- [Performance](patterns/performance): Performance strategies

## Adapters

- [Adapters Overview](adapters): Adapter pattern and responsibilities
- [Figma Adapter](adapters/figma): Figma export normalization and workflow
- [Tokens Studio Adapter](adapters/tokens-studio): Tokens Studio export normalization and workflow
- [Style Dictionary Adapter](adapters/style-dictionary): CSS/TypeScript output generation
- [Tailwind Adapter](adapters/tailwind): Tailwind theme configuration generation

## Examples

- [Figma Export JSON](examples/figma-export): Example Figma export
- [DTCG Compliant Example](examples/dtcg-compliant): Complete DTCG 2025.10 example
- [Adapter Pipeline](examples/adapter-pipeline): Export-to-contract conversion example

## Reference

- [Glossary](reference/glossary): Terminology definitions
- [Quick Reference](reference/quick-reference): Cheat sheet for common tasks
- [Conformance](reference/conformance): How to claim compliance

## Meta

- [Status of this Document](meta/status-of-this-document): Publication status, editors, acknowledgments
- [Specification Status](meta/status): Status taxonomy and definitions
- [Change Log](meta/change-log): Version history and release notes
- [Contributors](meta/contributors): People who have contributed
- [References](meta/references): External standards and specifications

## FAQ

- [FAQ](faq): Common questions and answers
