---
title: Role - Design Engineer
---

# Variable Governance - Design Engineer Role

True hybrid role. Masters both design and frontend. Owns the Variable Contract. Approves all variable changes.

## The standard

Design Engineer is THE bridge role. Fluent in design AND fluent in frontend. This role bridges the gap that has separated design and development for decades.

## The problem this solves

Design and development speak different languages. Designers create variables. Developers consume variables. The handoff breaks.

Teams say "we need someone to bridge the gap." Design Engineer is that role. The bridge must be solid on both ends.

## Required skills

Design Engineer MUST demonstrate proficiency in:

### Design side

- **Figma**: Component libraries, variables, design systems, auto-layout, variants. Can build and maintain production component libraries.
- **Design systems**: Naming conventions, variable structure, governance, semantic layering. Can architect the system.
- **Design fluency**: Can critique design decisions, understand design intent, translate visual language.

### Frontend side

- **React**: Component libraries, hooks, TypeScript, component architecture. Can build and maintain production component libraries.
- **Storybook**: Component documentation, stories, visual regression. Can write stories and MDX documentation without assistance.
- **CSS**: Fluent in CSS. Understands custom properties, cascade, specificity, layout. Can debug styling issues.
- **Tailwind CSS v4**: CSS-first configuration, `@theme` directive, utility patterns. Understands CSS custom properties.
- **JavaScript ecosystem**: Understands modern frameworks (Next.js, Remix, Vite) and build tooling. Can maintain pipelines.
- **Frontend fluency**: Can write production-quality code, debug issues, review pull requests.

### Bridge skills

- **Component libraries**: Can build component libraries in Figma AND React. Maintains parity between them.
- **Documentation**: Can write clear documentation for both designers and developers.
- **Translation**: Can translate design intent to code and code constraints to design.

## Skill verification

These skills can be verified:

| Skill | Verification |
|-------|--------------|
| Figma component libraries | Show a component library you built. Walk through the structure. |
| Storybook | Write a story file and MDX doc for a component. Explain the patterns. |
| CSS | Debug a styling issue without dev tools hints. Explain the cascade. |
| React | Build a component with TypeScript. Explain the architecture decisions. |
| Design systems | Explain your naming convention. Walk through base/alias/component layers. |
| Translation | Given a Figma component, explain how you would structure it in React. Given a React constraint, explain how you would communicate it to design. |

If a candidate cannot demonstrate these skills, they are not ready for this role.

## Responsibilities

### Contract owner responsibilities

- Own the Variable Contract ([Variable Contract](/variables-contract/contract/variable-contract)).
- Approve all variable changes before they enter version control.
- Maintain naming rules and category boundaries (base, alias, component).
- Review variable changes for contract correctness, references, and mode strategy.
- Define consumption patterns (CSS variables, TypeScript, Tailwind CSS v4).
- Maintain adapter inputs and outputs (Figma exports in, build artifacts out).
- Publish release notes and migrations for breaking changes.
- Treat variable changes like API changes (reviewed, versioned, documented).

### Bridge responsibilities

- Translate design intent to variables. Map design decisions to variable structure.
- Verify consumption feasibility. Test variables in React/Storybook before approving.
- Work between Designer and Frontend Developer. Communicate in both languages.
- Build component libraries in both Figma and React. Maintain parity.
- Resolve design/development tensions.

### Review gate responsibilities

Design Engineer reviews ALL variable changes. No exceptions.

Review checklist:

- [ ] Naming convention compliance (dot-separated, lowercase, no platform prefixes)
- [ ] Reference validity (all references resolve, no circular references)
- [ ] Mode consistency (mode keys match within collections)
- [ ] Type correctness (`$value` matches `$type`)
- [ ] Consumption feasibility (tested in React/Storybook)
- [ ] Breaking change assessment (is this a rename? removal? type change?)
- [ ] Migration notes (if breaking, document migration path)

If review fails, Designer revises and resubmits.

## What success looks like

- Design intent maps to variables via naming convention and semantic aliases. Developers consume without asking "what does this mean?"
- All variable changes are reviewed and approved before entering version control.
- Renames and reference changes are handled like API changes (reviewed, versioned, documented).
- Designers author variables. Design Engineer validates.
- Engineers consume variables with zero manual wiring.
- Component libraries in Figma match component libraries in React.
- Storybook documentation is complete and accurate.
- Releases include migration notes when something breaks.

## Interfaces

- **Designer**: Creates variables in Figma. Design Engineer reviews ALL changes for contract compliance and tests consumption feasibility.
- **Frontend Developer**: Consumes variables in code. Design Engineer structures variables so consumption requires zero manual work.
- **Product**: Agrees on change priorities and release timing.

## Failure modes

If Design Engineer lacks design fluency:

- Cannot understand design intent.
- Variables don't map to design decisions correctly.
- Designers lose trust in the bridge.

If Design Engineer lacks frontend fluency:

- Cannot test consumption feasibility.
- Variables don't work in code.
- Developers lose trust in the bridge.

If Design Engineer skips review:

- Invalid variables ship to production.
- Breaking changes ship without migration notes.
- Naming convention violations break code generation.

## Out of scope

- Owning product feature delivery (focus on design system infrastructure).
- Encoding tool-specific metadata as required contract fields.
- Writing production application code (focus on component libraries and design system).

## Role context

Design Engineer bridges design and development. This requires demonstrated proficiency on both sides.

In smaller teams, one person fills this role. In larger teams, multiple Design Engineers may work together, with one serving as the primary contract owner.

The Variable Contract depends on this role being held to a clear standard. The skills are specific and verifiable.
