---
title: "Adoption: Implementation Checklist"
description: "Pre-implementation, implementation, and post-implementation checklists for Variable Design Standard (VDS) adoption."
---

# Implementation Checklist

Pre-implementation, implementation, and post-implementation checklists for Variable Design Standard (VDS) adoption.

## Pre-implementation checklist

Before starting implementation, verify:

### Team readiness

- [ ] Design Engineer role assigned
- [ ] Designers available for training
- [ ] Developers available for integration
- [ ] Team understands Variable Design Standard (VDS) concept
- [ ] Stakeholders approve adoption

### Technical readiness

- [ ] Version control (Git) set up
- [ ] CI/CD pipeline available (or can be set up)
- [ ] Design tool (Figma) available
- [ ] Node.js/npm available for tooling
- [ ] Repository structure planned

### Tooling readiness

- [ ] Validation tool selected
- [ ] Build tool selected (Style Dictionary or similar)
- [ ] Adapter tools identified (Figma, Tokens Studio)
- [ ] CI integration planned

## Implementation checklist

During implementation, complete:

### Phase 1: Foundation

- [ ] Create `tokens/` directory structure
- [ ] Set up base/semantic/component folders
- [ ] Define brand and mode folders (file selection rule)
- [ ] Install validation tool
- [ ] Configure CI validation
- [ ] Set up pre-commit hooks
- [ ] Create initial Variable Design Standard (VDS) JSON structure
- [ ] Document team-specific guidelines

### Phase 2: Initial variables

- [ ] Export variables from Figma
- [ ] Run adapter to normalize export
- [ ] Validate normalized JSON
- [ ] Fix any validation errors
- [ ] Commit Variable Design Standard (VDS) JSON to version control
- [ ] Configure build tool (Style Dictionary)
- [ ] Generate initial outputs (CSS, TypeScript)
- [ ] Verify outputs are correct

### Phase 3: Integration

- [ ] Update components to use CSS variables
- [ ] Update TypeScript to use generated types
- [ ] Test variable consumption in components
- [ ] Verify mode switching works (if applicable)
- [ ] Document consumption patterns
- [ ] Update component documentation

### Phase 4: Workflow

- [ ] Train designers on naming convention
- [ ] Train designers on export process
- [ ] Train developers on variable consumption
- [ ] Set up review process
- [ ] Document change workflow
- [ ] Create PR template for variable changes
- [ ] Set up release process

## Conformance checklist

To claim Variable Design Standard (VDS) compliance, verify:

### Format compliance

- [ ] DTCG 2025.10 format used for all variable JSON
- [ ] All variables have `$type` and `$value`
- [ ] Valid DTCG types used (color, dimension, etc.)
- [ ] Group structure used correctly
- [ ] No mapped layer in the contract graph

### Naming compliance

- [ ] Dot-separated paths used (example: `color.text.primary`)
- [ ] Lowercase segments used
- [ ] No platform names in variable names
- [ ] Semantic aliases used for UI consumption

### Reference compliance

- [ ] Canonical reference syntax used (`{path.to.variable}`)
- [ ] All references resolve correctly
- [ ] No circular references detected
- [ ] JSON Pointer syntax supported (if needed for DTCG compliance)

### Validation compliance

- [ ] Structure validation implemented
- [ ] Naming validation implemented
- [ ] Reference validation implemented
- [ ] Circular reference detection implemented
- [ ] CI validation configured
- [ ] Validation blocks invalid changes

### Versioning compliance

- [ ] Semantic versioning used (MAJOR.MINOR.PATCH)
- [ ] Breaking changes documented
- [ ] Migration paths provided
- [ ] Deprecated variables marked before removal

### Governance compliance

- [ ] Change control process defined
- [ ] Roles assigned (Designer, Design Engineer, Frontend Engineer)
- [ ] Review process documented
- [ ] Release process documented
- [ ] File selection rule documented (brand and mode folders)
- [ ] Contract review gate defined

See [Conformance](../reference/conformance) for complete conformance requirements.

## Post-implementation validation

After implementation, verify:

### Validation

- [ ] CI validation catches invalid JSON
- [ ] CI validation catches naming violations
- [ ] CI validation catches reference errors
- [ ] CI validation catches circular references
- [ ] Pre-commit hooks prevent invalid commits

### Workflow

- [ ] Designers can create variables correctly
- [ ] Designers can export variables correctly
- [ ] Developers can consume variables easily
- [ ] Review process works smoothly
- [ ] Release process works correctly

### Integration

- [ ] CSS variables work in components
- [ ] TypeScript types work correctly
- [ ] Mode switching works (if applicable)
- [ ] Generated outputs are correct
- [ ] Build pipeline runs successfully

### Documentation

- [ ] Team documentation is complete
- [ ] Variable Design Standard (VDS) JSON is documented
- [ ] Consumption patterns are documented
- [ ] Workflow is documented
- [ ] Troubleshooting guide is available

## Success criteria

Implementation is successful when:

- All pre-implementation items checked
- All implementation items checked
- All post-implementation items checked
- Team can work independently
- Validation catches errors automatically
- Workflow is smooth

## Failure modes

If implementation fails:

- Validation not set up (invalid variables ship)
- Team not trained (base values used in components instead of alias variables)
- Review process missing (breaking changes)
- Documentation missing (confusion)
- Integration incomplete (variables not used)

## Next steps

After successful implementation:

- Monitor validation in CI
- Iterate on workflow
- Document team-specific patterns
- Share learnings with other teams

## Out of scope

- Tool-specific implementation (see adapter docs)
- Design system creation (focus on variables)
- Component library setup (separate concern)
