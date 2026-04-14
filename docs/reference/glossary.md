---
title: "Reference: Glossary"
description: "Terminology used in Variable Design Standard (VDS) specification and governance. Base variable: A variable that stores a raw value (color hex, dimension, etc.). Alias variable: A semantic variable that references another variable. Component variable: A component-scoped alias that references semantic variables. File selection rule: A file selection model where the folder path and file name select the active brand or mode. JSON-as-API: Treat the JSON file set as the API surface. Paths and names are the interface. File selection chooses brand and mode. Variable Design Standard (VDS): A governance layer on DTCG 2025.10 format. Rules for naming, validation, and versioning. Adapter patterns for tool integration. A standard for managing variables in version control."
---

# Variable Design Standard (VDS) Glossary

Terminology used in Variable Design Standard (VDS) specification and governance.

## Base variable

A variable that stores a raw value (color hex, dimension, etc.). Base variables form the foundation of the variable system.

Example: `color.gray.900` with `$value: "#1a1a1a"`

## Alias variable

A semantic variable that references another variable. Alias variables provide meaning and intent.

Example: `color.text.primary` with `$value: "{color.gray.900}"`

## Component variable

A component-scoped alias that references semantic variables. Component variables are specific to UI components.

Example: `component.button.color.background.default` with `$value: "{color.surface.brand}"`

## File selection rule

A file selection model where the folder path and file name select the active brand or mode. The JSON file set is the contract input.

## JSON-as-API

Treat the JSON file set as the API surface. Paths and names are the interface. File selection chooses brand and mode.

## Variable Design Standard (VDS)

The governance standard for design variables. Defines JSON structure, naming rules, validation requirements, and versioning strategy.

## DTCG

Design Tokens Community Group. W3C community group that defines the format specification for design tokens.

## DTCG 2025.10

The October 2025 version of the DTCG format specification. Variable Design Standard (VDS) is built on this format.

## Reference

A `$value` that points to another variable by name. References use curly brace syntax `{path.to.variable}` or JSON Pointer syntax `#/path/to/variable`.

## Mode

Named variants of a variable. Modes are stored as object keys in `$value`.

Example: `$value: { "light": "#ffffff", "dark": "#000000" }`

## Group

An object that contains nested groups and/or variables. Groups organize variables but do not have `$type` or `$value`.

## Group extension

A group that extends another group using `$extends` with curly brace syntax. Allows inheritance of group structure.

## Adapter

A tool or script that normalizes tool-specific exports (Figma, Tokens Studio) into Variable Design Standard (VDS) format.

## Normalization

The process of converting tool-specific exports into canonical Variable Design Standard (VDS) format. Includes extracting metadata, normalizing references, and validating naming.

## Breaking change

A change that requires consumers to update their code. Includes renames, removals, and type changes.

## Semantic versioning

Version numbering scheme: MAJOR.MINOR.PATCH. MAJOR for breaking changes, MINOR for additions, PATCH for fixes.

## Validation

Checking variables for correctness: structure, naming, references, types, modes. Validation runs in CI to catch errors before production.

## Consumption

Using variables in code. Includes CSS variables, TypeScript types, theme objects, and other platform formats.

## Designer

Role: Creates variables in Figma following naming conventions.

## Design Engineer

Role: Bridges design and development. Owns Variable Design Standard (VDS), maintains naming rules, reviews changes. Understands both Figma and React component libraries.

## Frontend Engineer

Role: Consumes variables in code. Maintains build pipelines and component integration.
