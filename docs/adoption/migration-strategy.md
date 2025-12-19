---
title: Adoption - Migration Strategy
---

# Phased Migration Strategy

How to migrate existing variable systems to Variable Contract using a phased approach.

If you migrate everything at once, you risk breaking production, losing references, and confusing the team.

## Migration approaches

### Big bang migration

Migrate everything at once.

Pros:
- Clean break from old system
- No dual-system maintenance
- Faster completion

Cons:
- High risk of breaking production
- Difficult to test thoroughly
- Team confusion during transition

Use when:
- Small variable set (< 50 variables)
- Low production usage
- Team can handle disruption

### Phased migration

Migrate incrementally over time.

Pros:
- Lower risk
- Easier to test
- Team can adapt gradually
- Can rollback if issues

Cons:
- Longer timeline
- Dual-system maintenance
- More coordination needed

Use when:
- Large variable set (> 50 variables)
- High production usage
- Team needs gradual transition

## Phased migration plan

### Phase 1: Foundation (Week 1-2)

**Goal**: Set up Variable Contract alongside existing system

1. Set up Variable Contract structure
   - Create `tokens/` directory
   - Set up validation
   - Configure CI

2. Create adapter for existing format
   - Write adapter to convert existing format
   - Test adapter output
   - Validate converted JSON

3. Run adapter on existing variables
   - Convert all variables
   - Validate converted JSON
   - Commit to version control

**Deliverables**:
- Variable Contract structure set up
- Adapter working
- All variables converted (not yet consumed)

### Phase 2: Parallel run (Week 3-6)

**Goal**: Run both systems in parallel

1. Generate outputs from Variable Contract
   - Configure Style Dictionary
   - Generate CSS/TypeScript
   - Verify outputs match existing

2. Update components to use Variable Contract outputs
   - Start with new components
   - Gradually migrate existing components
   - Test each migration

3. Monitor both systems
   - Track usage of old vs new
   - Fix any issues
   - Document learnings

**Deliverables**:
- Variable Contract outputs generated
- Some components using new variables
- Both systems running in parallel

### Phase 3: Gradual migration (Week 7-12)

**Goal**: Migrate components incrementally

1. Migrate component by component
   - Start with low-risk components
   - Test each migration
   - Document changes

2. Update design workflow
   - Train designers on Variable Contract
   - Update Figma workflow
   - Export to Variable Contract format

3. Deprecate old system
   - Mark old variables as deprecated
   - Update documentation
   - Plan removal timeline

**Deliverables**:
- Most components migrated
- Design workflow updated
- Old system deprecated

### Phase 4: Cleanup (Week 13-14)

**Goal**: Remove old system

1. Verify all components migrated
   - Audit component usage
   - Confirm no old variables used
   - Test production

2. Remove old system
   - Delete old variable files
   - Remove old build configs
   - Update documentation

3. Finalize Variable Contract
   - Complete migration documentation
   - Train team on new system
   - Celebrate success

**Deliverables**:
- Old system removed
- Variable Contract fully adopted
- Team trained

## Migration by format

### From Style Dictionary format

**Phase 1**: Convert format
- Rename `value` → `$value`
- Rename `type` → `$type`
- Update reference syntax

**Phase 2**: Apply governance
- Normalize naming
- Add validation
- Set up versioning

**Phase 3**: Migrate consumption
- Update build configs
- Migrate components
- Remove old format

### From Material Design tokens

**Phase 1**: Extract variables
- Extract Material-specific variables
- Map to Variable Contract structure
- Normalize naming

**Phase 2**: Create adapters
- Create adapter for Material format
- Convert existing tokens
- Validate output

**Phase 3**: Migrate consumption
- Update components
- Remove Material-specific code
- Use Variable Contract outputs

### From custom formats

**Phase 1**: Audit existing system
- Document current structure
- Identify variable types
- Map references

**Phase 2**: Create adapter
- Write adapter for custom format
- Convert all variables
- Validate output

**Phase 3**: Migrate consumption
- Update components
- Remove old system
- Use Variable Contract

## Migration checklist

### Pre-migration

- [ ] Audit existing variables
- [ ] Document current format
- [ ] Identify migration approach
- [ ] Set up Variable Contract structure
- [ ] Create adapter (if needed)
- [ ] Test adapter output

### During migration

- [ ] Convert variables to Variable Contract
- [ ] Validate converted JSON
- [ ] Generate outputs
- [ ] Test outputs match existing
- [ ] Migrate components incrementally
- [ ] Monitor for issues
- [ ] Document changes

### Post-migration

- [ ] Verify all components migrated
- [ ] Remove old system
- [ ] Update documentation
- [ ] Train team
- [ ] Celebrate success

## Risk mitigation

### Risk: Breaking production

Mitigation:
- Run parallel systems
- Migrate incrementally
- Test thoroughly
- Have rollback plan

### Risk: Lost references

Mitigation:
- Validate references during conversion
- Test reference resolution
- Document reference mapping

### Risk: Team confusion

Mitigation:
- Train team early
- Document migration process
- Provide support
- Communicate clearly

## Success metrics

Migration is successful when:

- All variables converted
- All components migrated
- Validation passing
- Team trained
- Old system removed
- No production issues

## Timeline

Typical phased migration:

- Week 1-2: Foundation
- Week 3-6: Parallel run
- Week 7-12: Gradual migration
- Week 13-14: Cleanup

Adjust based on:
- Variable set size
- Component count
- Team size
- Risk tolerance

## Out of scope

- Automated migration tools (build custom scripts)
- Tool-specific migration (see adapter docs)
- Design system migration (focus on variables)

