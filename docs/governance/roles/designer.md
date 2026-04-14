---
title: "Governance > Roles: Designer"
---

# Variable Governance: Designer Role

Creates variables in Figma. Does not own the contract. Does not approve changes.

## Scope

Designers (UX/Product/UI) author variables in Figma. They do not own the Variable Design Standard (VDS). They do not make contract decisions. They do not approve variable changes for consumption.

Design Engineer reviews and approves all variable changes before they enter the contract.

## Responsibilities

- Create variables in Figma following naming convention (see [Naming](/contract/naming.md)).
- Define semantic intent for variables (what they represent, not just values).
- Define mode values (light/dark, mobile/desktop) when needed.
- Use variables in Figma components (see [Component Variables](/design/component-variables.md)).
- Export variables for normalization (see [Figma Workflow](/design/figma-workflow.md)).
- Submit variable changes for review by Design Engineer.

## Ownership

- Owns variable authoring in design tools
- Owns export quality for adapter input

## Boundaries

Designer MUST NOT:

- Approve variable changes without Design Engineer review.
- Modify the Variable Design Standard (VDS) JSON directly.
- Define consumption patterns (how variables map to CSS, TypeScript, React).
- Override naming convention decisions.
- Push variables to version control without Design Engineer approval.
- Make breaking changes (renames, removals) without Design Engineer review.

These boundaries exist because variable changes affect production code. A rename in Figma can break components. A bad reference can break builds. Design Engineer validates consumption before approval.

## What success looks like

- Variables follow naming convention (dot-separated paths, lowercase).
- No duplicate values when a base variable exists.
- Semantic variables reference base variables (not raw values).
- Mode values use one mode key set within each collection.
- Variables are used in Figma components (not hardcoded values).
- All variable changes are reviewed by Design Engineer before entering the contract.

## Interfaces

- **Design Engineer**: Reviews all variable changes. Validates contract compliance (naming, structure, references). Tests consumption feasibility in React. Approves changes before they enter version control.
- **Frontend Engineer**: Consumes variables in code. Designer creates variables. Design Engineer validates. Frontend Engineer consumes generated outputs.

## Workflow

1. Create variables in Figma following naming convention.
2. Use semantic variables in components (not raw palette values).
3. Export variables for normalization.
4. Submit export to Design Engineer for review.
5. Design Engineer reviews and normalizes to contract.
6. Design Engineer tests consumption in React/Storybook.
7. Design Engineer approves and commits to version control.
8. Variables are released.

## Review checklist

All variable changes go through Design Engineer review. No exceptions.

Design Engineer checks:

- Naming convention compliance
- Reference validity
- Mode key set match within collections
- Consumption feasibility
- Breaking change assessment

If Design Engineer rejects, Designer revises and resubmits.

## Common mistakes

- Creating variables with platform names (example: `color.ios.primary`).
- Duplicating values instead of referencing base variables.
- Mixing naming styles within the same collection.
- Hardcoding values in components instead of using variables.
- Pushing variables without Design Engineer review.
- Making renames without understanding the downstream impact.

## Failure modes

If Designer bypasses Design Engineer review:

- Broken references ship to production.
- Naming convention violations break code generation.
- Breaking changes ship without migration notes.
- Frontend Engineer consumes invalid variables.
- Component styling breaks.

## Out of scope

- Maintaining the Variable Design Standard (VDS) (Design Engineer owns this).
- Writing code or build pipelines (Frontend Engineer owns this).
- Defining consumption patterns (Design Engineer owns this).
- Approving variable changes (Design Engineer owns this).
- Making contract decisions (Design Engineer owns this).

## Links

- [Naming](/contract/naming.md)
- [Change Control](../change-control)
- [Validation](../validation)
