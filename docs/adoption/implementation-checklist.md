---
title: Adoption - Implementation Checklist
---

# Implementation Checklist

Pre-implementation, implementation, and post-implementation checklists for Variable Contract adoption.

## Pre-implementation checklist

Before starting implementation, verify:

### Team readiness

- [ ] Design Systems Engineer role assigned
- [ ] Designers available for training
- [ ] Developers available for integration
- [ ] Team understands Variable Contract concept
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
- [ ] Install validation tool
- [ ] Configure CI validation
- [ ] Set up pre-commit hooks
- [ ] Create initial Variable Contract JSON structure
- [ ] Document team-specific guidelines

### Phase 2: Initial variables

- [ ] Export variables from Figma
- [ ] Run adapter to normalize export
- [ ] Validate normalized JSON
- [ ] Fix any validation errors
- [ ] Commit Variable Contract JSON to version control
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
- [ ] Variable Contract JSON is documented
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
- Team not trained (inconsistent usage)
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

