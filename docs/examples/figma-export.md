---
title: Figma Export JSON
---

# Figma Export JSON

This is an example input file shape from a Figma Variables export.

- Raw file: `figma-export.json`

This export format includes Figma-specific metadata and reference syntax. Use the [Figma Adapter](/variables-contract/adapters/figma) to normalize it into the canonical contract format defined in [Variable Contract](/variables-contract/contract/variable-contract).

## Normalization required

Figma exports need normalization before use:

1. Extract `$collection_metadata` to `$extensions`
2. Extract `$variable_metadata` to `$extensions`
3. Normalize collection names (remove `@` prefix)
4. Convert reference syntax (`{@collection.token}` → `{collection.token}`)
5. Move mode values from metadata to `$value` objects

See [Figma Adapter](/variables-contract/examples/adapters/figma) for complete normalization steps.
