---
title: Recommended Improvements
---

# Recommended Improvements

This document lists high-impact improvements to make Variables Contract feel and function like a mature technical standard (spec + schema + conformance + reference tooling). It is intentionally concrete: what to add, why it matters, and what to do next.

## Executive summary

You already have strong standards signals:

- Deterministic spec language
- Governance sections (change control, versioning, validation)
- Conformance criteria + technical tests
- JSON Schema v1 published as a static artifact (`/assets/schema/v1.json`)
- Standards-style top-of-page metadata
- License posture with explicit conformance and AI laundering restrictions

The main gap is that most of the tooling is described but not shipped. The next step for maximum authority is to publish a small reference toolchain (validator + normalizers + minimal export pipeline) and back it with test vectors.

## P0 (Highest impact)

### 1. Ship a reference validator (CLI + library)

**Goal:** Make conformance enforceable, not just documented.

**What to add:**

- `packages/validator/` (or `src/` if you want to stay single-package)
- `@variables-contract/validator` (library)
- `@variables-contract/cli` (CLI)

**Minimum features (v0):**

- Schema validation with Ajv using `assets/schema/v1.json`
- Canonical reference syntax enforcement (`{path.to.variable}` in contract files)
- Reference resolution across the document
- Circular reference detection
- Mode key consistency checks
- Group `$ref` resolution checks + circular group ref detection

**Why it matters:**

- Hiring managers and standards-minded engineers immediately respect a validator.
- It creates a pass/fail line for “compatibility” claims.
- It turns your conformance tests into executable criteria.

### 2. Add test vectors as a conformance suite

**Goal:** Make conformance testable by third parties.

**What to add:**

- `tests/fixtures/valid/*.json`
- `tests/fixtures/invalid/*.json`
- `tests/fixtures/edge/*.json`

Each fixture should include:

- What it is testing
- Expected errors (for invalid fixtures)

**Why it matters:**

- Standards bodies publish test suites.
- It reduces ambiguity and prevents “vibe interpretations.”

### 3. Remove the duplicate schema source or make it explicit

Right now you have:

- `assets/schema/v1.json` (served)
- `docs/schema/v1.json` (not served, and easy to confuse)

**Recommendation:**

- Keep only one authoritative schema file (served from `assets/`) and remove or clearly label the other.

**Why it matters:**

- Single source of truth prevents downstream ecosystem confusion.

## P1 (High impact)

### 4. Make adapters real code, not only documentation

You already document adapters well (`docs/adapters/*`). Next step is to ship reference implementations.

**What to add:**

- `packages/adapters/figma/` (normalize Figma export JSON)
- `packages/adapters/tokens-studio/` (mostly validate + preserve metadata)
- Minimal shared helpers:
  - reference syntax conversion
  - metadata relocation into `$extensions`
  - naming normalization utilities

**CLI UX suggestion:**

- `variables-contract normalize figma --in figma-export.json --out variables.json`
- `variables-contract normalize tokens-studio --in export.json --out variables.json`

**Why it matters:**

- “Adapters with confidence” means you publish the canonical adapter behavior.
- This is how you stop fragmentation.

### 5. Add more adapters (highest ROI)

If you want to expand the adapter surface area, the best additions are ones that are widely used and generate lots of broken exports:

**Input adapters (normalize into contract):**

- Figma REST API format (separate from “Dev Mode export”) if it differs
- Style Dictionary legacy token formats (many orgs still have these)
- Supernova export format (common in enterprise)

**Output adapters (generate platforms):**

- CSS variables (direct, without Style Dictionary) for a minimal reference output
- TypeScript types + runtime accessors
- Tailwind CSS v4 (`@theme`) generator (already documented; ship generator)

**Why it matters:**

- More inputs increases adoption.
- More outputs makes the spec immediately useful.

### 6. CI: add an actual workflow that runs the validator

You have CI/CD documentation, but there is only a deploy workflow.

**What to add:**

- `.github/workflows/validate.yml`
  - run schema + custom validation on every PR touching `tokens/**/*.json` and `examples/**/*.json`

**Why it matters:**

- “Governed standard” means changes are blocked by automated checks.

## P2 (Standards-body polish)

### 7. Version single source of truth and auto-sync

Right now the version is hardcoded in multiple places:

- `package.json` (`0.3.7`)
- `README.md` (Version: 0.3.7)
- `docs/index.md` (Version row)

**Recommendation:** Keep `package.json` as the single source of truth and add an explicit sync step.

**Best practical approach (no `pnpm version` required):**

- Add `scripts/sync-version.mjs` that:
  - reads `package.json.version`
  - updates:
    - `docs/index.md` version row
    - `README.md` version line
  - optionally validates that they match (fail CI if not)

Add scripts:

- `pnpm run version:sync`
- `pnpm run version:check`

**Why this is better than auto-magic on build:**

- Build steps that mutate tracked files are easy to forget and cause dirty git state.
- Explicit version sync is predictable and standards-friendly.

### 8. Rename “Draft Standard” semantics into a proper status model

Consider a status taxonomy that reads like a spec body:

- Draft
- Candidate Standard
- Stable
- Deprecated

Then define what those mean (change control thresholds, compatibility promises).

### 9. Publish a “Status of this Document” page

W3C-style structure:

- Status of this Document (SOTD)
- Patent policy (if relevant)
- How to file issues
- Editors and acknowledgments

You already have most parts; a single canonical SOTD page consolidates it.

## Spec depth improvements (content)

### 10. Add a formal glossary for “Base / Alias / Component” and show invariants

You already define anatomy, but the standards move is to explicitly state invariants:

- Base variables may be literals
- Alias variables should be references
- Component variables should reference alias layer
- Flattening is non-conformant

### 11. Expand group extension semantics

`docs/contract/groups.md` is good. Next depth add:

- Merge precedence rules (explicit)
- What happens on conflict (variable overrides)
- Prohibit `$ref` + `$type`/`$value` (already implied; can make explicit)

### 12. Add a section for canonical file layout

People will ask “how should I lay out tokens in a repo?”

- Suggested folder layout
- Suggested grouping strategy
- Example multi-brand / multi-theme tree

## Website authority improvements

### 13. Add a conformance registry page

Create `docs/reference/implementations.md`:

- Conformant implementations (with version tested)
- Compatible implementations
- Known non-conformant (optional, if you want to keep it calm)

This is extremely “standards body.”

### 14. Make schema discoverable in multiple places

Already good. Ensure:

- `docs/schema/index.md` links to `/assets/schema/v1.json`
- homepage references the correct URL
- license references the correct URL

## Notes on licensing posture

Your current approach (recognized base license + integrity addendum) is an aggressive standards move.

Two practical recommendations:

- Add a one-paragraph section to `docs/license.md` explaining intended audience:

  - Adoption is welcome
  - Forking the spec text into competing standards is not
  - False compatibility claims are treated as a violation

- If you ever need to harden enforceability, the next real-world step is trademark registration for the name.

## Proposed roadmap

- **v0.3.x:** validator + fixtures + CI validation workflow
- **v0.4.x:** reference adapters (figma + tokens studio) as code
- **v0.5.x:** reference output generators (css + ts + tailwind)
- **v1.0.0:** formal SOTD, conformance registry, stabilized schema

## Specific cleanup tasks

- Remove or clearly label `docs/schema/v1.json` to avoid ambiguity
- Update `docs/schema/index.md` raw GitHub link if you move schema source of truth
- Add a link to the Change Log in homepage or navigation if you want more “spec body” feel

END
