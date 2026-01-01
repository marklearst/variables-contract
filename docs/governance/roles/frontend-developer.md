---
title: Role - Frontend Developer
---

# Variable Governance - Frontend Developer Role

Consumes variables in code. Maintains build pipelines. Does not create variables. Does not own the contract.

## Scope

Frontend Developers (UI/Engineer) consume variables generated from the Variable Contract. They maintain build pipelines. They do not create variables. They do not own the contract.

Design Engineer owns the contract. Designer creates variables. Frontend Developer consumes outputs.

## Responsibilities

- Consume variables in code (CSS variables, TypeScript types, theme objects).
- Maintain build pipelines that generate outputs from Variable Contract JSON.
- Integrate variables into component libraries (React, Vue, etc.).
- Test variable consumption (see [Consumption Tests](/variables-contract/testing/consumption-tests)).
- Report consumption issues to Design Engineer.

## Boundaries

Frontend Developer MUST NOT:

- Create variables in Figma (Designer owns this).
- Modify the Variable Contract JSON directly without Design Engineer approval.
- Define naming conventions (Design Engineer owns this).
- Approve variable changes (Design Engineer owns this).
- Hand-edit generated outputs (regenerate from Variable Contract JSON).

These boundaries exist because variable authoring and contract ownership require design fluency. Frontend Developer consumes. Design Engineer validates. Designer creates.

## What success looks like

- Components use semantic variables (not base palette variables directly).
- Build outputs are generated from Variable Contract JSON (not hand-edited).
- Variables are type-safe (TypeScript types generated correctly).
- CSS variables are consumed correctly with fallbacks.
- Component styling updates automatically when variables change.
- Consumption issues are reported to Design Engineer promptly.

## Interfaces

- **Design Engineer**: Provides Variable Contract JSON. Maintains contract. Tests variables in React before approval. Frontend Developer reports consumption issues. Design Engineer troubleshoots.
- **Designer**: Creates variables in Figma. Frontend Developer consumes generated outputs. No direct variable creation handoff.

## Consumption patterns

### CSS variables

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-on-brand);
}
```

### TypeScript

```typescript
import { colors } from "./tokens";

const buttonStyle = {
  backgroundColor: colors.surface.brand,
  color: colors.text.onBrand,
};
```

### React

```tsx
import { useTheme } from "./theme";

function Button() {
  const theme = useTheme();
  return <button style={{ backgroundColor: theme.colors.surface.brand }} />;
}
```

## Build pipeline

Frontend Developers maintain pipelines that:

1. Read Variable Contract JSON from version control.
2. Generate CSS variables, TypeScript types, theme objects.
3. Output platform-specific formats.
4. Integrate with component libraries.

See [Build Pipelines](/variables-contract/tooling/build-pipelines) for examples.

## Common mistakes

- Consuming base palette variables directly in components (use semantic variables).
- Hand-editing generated outputs (regenerate from Variable Contract JSON).
- Not testing variable consumption (add consumption tests).
- Ignoring breaking changes (read release notes, update code).
- Trying to fix variable issues by editing code (report to Design Engineer instead).

## Failure modes

If Frontend Developer bypasses Design Engineer:

- Variable issues are fixed in code, not in contract (drift).
- Workarounds accumulate (technical debt).
- Contract becomes stale (not source of truth).

If Frontend Developer hand-edits outputs:

- Next build overwrites changes.
- Variables don't match contract.
- Debugging becomes impossible.

If Frontend Developer doesn't report consumption issues:

- Design Engineer doesn't know about problems.
- Variables ship with consumption bugs.
- Components break in production.

## Out of scope

- Creating variables in Figma (Designer owns this).
- Maintaining the Variable Contract (Design Engineer owns this).
- Defining naming conventions (Design Engineer owns this).
- Approving variable changes (Design Engineer owns this).
