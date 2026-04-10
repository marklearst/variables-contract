---
title: Conformance
---

# Variable Design Standard (VDS) Conformance

::: callout warning License Requirement
Claiming conformance without meeting these requirements violates the [Standards Integrity License](../license). False conformance claims result in automatic license termination.
:::

How to claim Variable Design Standard (VDS) compliance and what it means.

## Technical Conformance Tests

The following tests determine whether an implementation is conformant. Tools that fail any MUST test cannot claim "Variable Design Standard (VDS) Conformant" status.

### Test 1: Reference Preservation (MUST)

**Requirement:** Output must preserve reference relationships, not flatten to literal values.

```json
// Input
{
  "color": {
    "primary": { "$type": "color", "$value": "#0066cc" },
    "action": { "$type": "color", "$value": "{color.primary}" }
  }
}

// CONFORMANT output preserves reference
{ "color.action": "{color.primary}" }

// NON-CONFORMANT output flattens to literal
{ "color.action": "#0066cc" }
```

**Why this matters:** Flattening references destroys the dependency graph. When `color.primary` changes, `color.action` won't update. This is the primary failure mode of "vibe tools."

### Test 2: Mode Resolution (MUST)

**Requirement:** Implementation must resolve mode values through reference chains.

```json
// Input
{
  "color": {
    "gray": {
      "900": {
        "$type": "color",
        "$value": { "light": "#1a1a1a", "dark": "#ffffff" }
      }
    },
    "text": {
      "$type": "color",
      "$value": { "light": "{color.gray.900}", "dark": "{color.gray.900}" }
    }
  }
}

// Resolution for "light" mode:
// color.text → {color.gray.900} → light mode → #1a1a1a
```

**Test:** Given mode "light", `color.text` must resolve to `#1a1a1a`, not to `{color.gray.900}` or an error.

### Test 3: Anatomy Layer Separation (MUST)

**Requirement:** Implementation must support three-layer anatomy without collapsing.

| Layer     | Example                       | References       |
| --------- | ----------------------------- | ---------------- |
| Base      | `color.gray.900`              | Raw value        |
| Alias     | `color.text.primary`          | References base  |
| Component | `component.button.color.text` | References alias |

**Test:** Component variables must be able to reference alias variables, which reference base variables. The chain must not be flattened.

### Test 4: Circular Reference Detection (MUST)

**Requirement:** Implementation must detect and reject circular references.

```json
// MUST be rejected
{
  "color": {
    "a": { "$type": "color", "$value": "{color.b}" },
    "b": { "$type": "color", "$value": "{color.a}" }
  }
}
```

**Test:** The above input must produce an error, not infinite loop or silent failure.

### Test 5: Naming Convention Validation (SHOULD)

**Requirement:** Implementation should validate naming conventions.

| Rule          | Valid                | Invalid              |
| ------------- | -------------------- | -------------------- |
| Lowercase     | `color.text.primary` | `Color.Text.Primary` |
| Dot-separated | `color.text.primary` | `color-text-primary` |
| No platform   | `color.text.primary` | `color.ios.text`     |

### Test 6: Schema Validation (SHOULD)

**Requirement:** Implementation should validate against the [JSON Schema](../schema).

```bash
# Validation command
npx ajv-cli validate -s schema/v1.json -d tokens.json
```

## Conformance statement

A Variable Design Standard (VDS) implementation is conformant if it meets all MUST requirements and follows all SHOULD requirements unless justified.

## Conformance requirements

### Format compliance

MUST:

- Use DTCG 2025.10 format for variable JSON
- Include `$type` and `$value` on all variables
- Use valid DTCG types (color, dimension, fontFamily, etc.)
- Support group structure and extension (`$extends`)

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

To claim Variable Design Standard (VDS) compliance:

1. Document your implementation
2. Verify all MUST requirements are met
3. Document any SHOULD requirements not followed (with justification)
4. Provide conformance report

## Conformance report template

```markdown
# Variable Design Standard (VDS) Conformance Report

**Organization:** [Your organization]
**Date:** [Date]
**Version:** [Variable Design Standard (VDS) version]

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

Variable Design Standard (VDS) conformance can be verified using:

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
