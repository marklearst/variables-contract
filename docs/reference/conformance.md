---
title: Conformance
---

# Variable Contract Conformance

How to claim Variable Contract compliance and what it means.

## Conformance statement

A Variable Contract implementation is conformant if it meets all MUST requirements and follows all SHOULD requirements unless justified.

## Conformance requirements

### Format compliance

MUST:
- Use DTCG 2025.10 format for variable JSON
- Include `$type` and `$value` on all variables
- Use valid DTCG types (color, dimension, fontFamily, etc.)
- Support group structure and extension (`$ref`)

### Naming compliance

MUST:
- Use dot-separated paths (example: `color.text.primary`)
- Use lowercase for all segments
- Avoid platform names in variable names
- Follow category.system.role.state.scale pattern

SHOULD:
- Use semantic aliases for UI consumption
- Keep base variables descriptive and scale-friendly
- Avoid duplicated meaning in names

### Reference compliance

MUST:
- Use canonical reference syntax (`{path.to.variable}`)
- Validate all references resolve (validation tool checks this)
- Detect and reject circular references
- Support JSON Pointer syntax for DTCG compliance

### Mode compliance

SHOULD:
- Use modes when variants are needed
- Keep mode keys matching within collections (validation enforces this)
- Use explicit mode names (light, dark, mobile, desktop)

### Validation compliance

MUST:
- Validate variable structure (JSON syntax, required properties)
- Validate naming convention
- Validate reference resolution
- Detect circular references
- Validate type correctness

SHOULD:
- Run validation in CI
- Block invalid changes before merge
- Provide clear error messages

### Versioning compliance

MUST:
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Treat renames as breaking changes (MAJOR bump)
- Document breaking changes in release notes
- Provide migration paths for breaking changes

SHOULD:
- Mark deprecated variables before removal
- Keep deprecated variables for at least one release cycle

### Governance compliance

SHOULD:
- Review variable changes before merge
- Follow change control process
- Assign roles (Designer, Design Engineer, Frontend Developer)
- Document team-specific patterns

## Claiming conformance

To claim Variable Contract compliance:

1. Document your implementation
2. Verify all MUST requirements are met
3. Document any SHOULD requirements not followed (with justification)
4. Provide conformance report

## Conformance report template

```markdown
# Variable Contract Conformance Report

**Organization:** [Your organization]
**Date:** [Date]
**Version:** [Variable Contract version]

## Format Compliance
- [ ] DTCG 2025.10 format used
- [ ] All variables have $type and $value
- [ ] Valid DTCG types used

## Naming Compliance
- [ ] Dot-separated paths used
- [ ] Lowercase segments
- [ ] No platform names

## Reference Compliance
- [ ] Canonical syntax used
- [ ] All references resolve
- [ ] No circular references

## Validation Compliance
- [ ] Structure validation implemented
- [ ] Naming validation implemented
- [ ] Reference validation implemented
- [ ] CI validation configured

## Versioning Compliance
- [ ] Semantic versioning used
- [ ] Breaking changes documented
- [ ] Migration paths provided

## Governance Compliance
- [ ] Change control process defined
- [ ] Roles assigned
- [ ] Review process documented
```

## Test suite

Variable Contract conformance can be verified using:

- DTCG validators (format compliance)
- Custom validators (naming, references, modes)
- CI checks (automated validation)

See [Validation](governance/validation) for validation tools and setup.

## Non-conformance

If your implementation does not meet conformance requirements:

- Document deviations with justification
- Plan migration path to full conformance
- Consider partial conformance claims (specify which requirements are met)

## Out of scope

Conformance does not require:

- Specific tools (use any DTCG-compliant tool)
- Specific consumption patterns (CSS, TypeScript, etc.)
- Specific design decisions (values, colors, spacing)
- Runtime libraries (validation can be build-time)

## Failure modes

If conformance is not maintained:

- Invalid variables may ship to production
- Breaking changes may go unnoticed
- References may break silently
- Tool compatibility may be lost

