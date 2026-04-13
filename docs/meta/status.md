---
title: Specification Status
---

# Variable Design Standard (VDS) Specification Status

This document defines the status taxonomy for Variable Design Standard (VDS) and what each status means.

## Status Levels

### Draft

**Definition**: Active development, breaking changes possible.

**Characteristics**:
- Specification is under active development
- Breaking changes may occur in any version (major, minor, or patch)
- Features may be added, removed, or changed
- Feedback is actively sought
- Not recommended for production use without careful evaluation

**Current status**: Variable Design Standard (VDS) is currently in **Draft** status.

### Candidate Standard

**Definition**: Feature-complete, seeking feedback, minor changes possible.

**Characteristics**:
- Core specification is feature-complete
- Breaking changes limited to major versions
- Minor changes and clarifications may occur
- Seeking community feedback before stabilization
- Suitable for production use with awareness of potential minor changes

**Transition criteria**: Move from Draft to Candidate Standard when:
- Core features are stable
- Breaking changes are limited to major versions
- Community feedback period begins

### Stable

**Definition**: Production-ready, breaking changes only in major versions.

**Characteristics**:
- Specification is stable and production-ready
- Breaking changes only in major versions (following semantic versioning)
- Minor and patch versions are backward-compatible
- Recommended for production use
- Long-term support commitment

**Transition criteria**: Move from Candidate Standard to Stable when:
- Sufficient community feedback received
- No major issues identified
- Implementation experience validates the specification
- Formal stabilization decision made

### Deprecated

**Definition**: No longer recommended, migration path provided.

**Characteristics**:
- Specification is no longer actively maintained
- Migration path to replacement specification provided
- Security updates may still be provided
- Existing implementations continue to work
- New implementations should use replacement specification

**Transition criteria**: Move to Deprecated when:
- Replacement specification is available
- Migration path is documented
- Deprecation period begins (typically one major version cycle)

## Current Status

**Variable Design Standard (VDS) 0.5.0**: **Draft**

The specification is in active development. While it is production-ready and used by teams, breaking changes may occur as the specification evolves based on feedback and implementation experience.

## Status History

- **0.1.0 - 0.4.0**: Draft
- **0.5.0**: Draft (current)

## Status Indicators

Status is indicated in:
- `docs/index.md` - Status metadata table
- `docs/meta/change-log.md` - Version status field
- `docs/faq.md` - Production-ready answer
- This document - Status definitions

## Compatibility Promises by Status

| Status | Breaking Changes | Minor Changes | Patch Changes |
|--------|-----------------|---------------|---------------|
| Draft | Any version | Any version | Any version |
| Candidate Standard | Major only | Minor allowed | Patch allowed |
| Stable | Major only | Minor allowed | Patch allowed |
| Deprecated | None (maintenance mode) | None | Security only |

## Out of scope

- Tool implementation status (separate from specification status)
- Individual feature status (use versioning for feature lifecycle)
- Adoption status (tracked separately)
