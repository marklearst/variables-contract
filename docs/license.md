---
title: License
---

# License

The Variables Contract Specification is dual-licensed:

1. **CC BY-ND 4.0** — Legally recognized base license
2. **Standards Integrity Addendum** — Additional terms for public use

## Part I: Base License (CC BY-ND 4.0)

This Specification is licensed under [Creative Commons Attribution-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nd/4.0/).

**You are free to:**

- **Share** — Copy and redistribute in any medium or format
- **Implement** — Build software that conforms to the Specification

**Under these terms:**

- **Attribution** — You must give appropriate credit and link to the license
- **NoDerivatives** — You may not distribute modified versions of the Specification as an alternative standard

## Part II: Standards Integrity Addendum

Additional terms apply to public-facing uses. These prevent ecosystem fragmentation.

### Conformance Tiers

**Variables Contract Conformant** requires:

- Full Variable Anatomy (Base, Alias, Component)
- Mode resolution and inheritance
- Reference syntax and resolution
- Valid DTCG-aligned JSON with references (not flattened values)
- Naming convention enforcement

**Variables Contract Compatible** requires:

- Data format that does not corrupt Specification-compliant data
- Attribution to the Canonical Source

### Attribution

Public-facing tooling must include:

```text
Built on the Variables Contract Specification
https://variables-contract.vercel.app
```

JSON files should include:

```json
{
  "$schema": "https://variables-contract.vercel.app/assets/schema/v1.json"
}
```

### Prohibited Acts

**AI Laundering (Synthetic Derivatives)**

You may NOT use the Specification as AI input to:

- Generate competing standards
- Produce "original" content replicating the Specification without attribution
- Create AI training data for standards-related content

PERMITTED: Using AI to write code implementing the Specification.
PROHIBITED: Using AI to rewrite or obscure the Specification's origin.

**False Compatibility Claims**

You may NOT claim compatibility if your tool:

- Omits required structural elements (Anatomy, Modes, References)
- Outputs non-conformant data (flattened hex values instead of references)
- Contradicts governance principles

**Name Misappropriation**

"Variables Contract" and "VCSL" may only be used for truthful conformance statements.

### Enforcement

**Automatic Termination** occurs upon:

- Creating/distributing Synthetic Derivatives
- Publishing Competing Standards without permission/attribution
- Making false conformance claims
- Misappropriating the name

**Upon termination:**

- All rights cease immediately
- Continued use = copyright infringement
- Reinstatement requires written permission

**Reserved Rights:**

- Publicly identify non-conformant implementations
- Issue takedown requests
- Pursue legal remedies
- Request evidence of independent development

## Why This Structure?

**CC BY-ND 4.0** is legally recognized and court-tested. It prevents forks of the specification text.

**The Addendum** adds specific protections against:

- AI-assisted plagiarism ("laundering")
- False compatibility claims from "vibe tools"
- Name/brand confusion

## Full License

The complete license is in the repository [LICENSE](https://github.com/marklearst/variables-contract/blob/main/LICENSE) file.

## Contact

For licensing inquiries, conformance certification, or permission requests:
https://variables-contract.vercel.app/license
