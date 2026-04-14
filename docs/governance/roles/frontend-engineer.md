---
title: "Governance > Roles: Frontend Engineer"
---

# Variable Governance: Frontend Engineer Role

Consumes variables in code. Maintains build pipelines. Does not create variables. Does not own the contract.

## Scope

Frontend Engineers consume variables generated from the Variable Design Standard (VDS). They maintain build pipelines. They do not create variables. They do not own the contract.

Design Engineer owns the contract. Designer creates variables. Frontend Engineer consumes outputs.

## Responsibilities

- Consume variables in code (CSS variables, TypeScript types, theme objects).
- Maintain build pipelines that generate outputs from Variable Design Standard (VDS) JSON.
- Integrate variables into component libraries (React, Vue, etc.).
- Test variable consumption (see [Consumption Tests](/testing/consumption-tests.md)).
- Report consumption issues to Design Engineer.

## Ownership

- Owns build pipeline configuration
- Owns integration of generated outputs into code

## Boundaries

Frontend Engineer MUST NOT:

- Create variables in Figma (Designer owns this).
- Modify the Variable Design Standard (VDS) JSON directly without Design Engineer approval.
- Define naming conventions (Design Engineer owns this).
- Approve variable changes (Design Engineer owns this).
- Hand-edit generated outputs (regenerate from Variable Design Standard (VDS) JSON).

These boundaries exist because variable authoring and contract ownership require design fluency. Frontend Engineer consumes. Design Engineer validates. Designer creates.

## What success looks like

- Components use semantic variables (not base palette variables directly).
- Build outputs are generated from Variable Design Standard (VDS) JSON (not hand-edited).
- Variables are type-safe (TypeScript types generated correctly).
- CSS variables are consumed correctly with fallbacks.
- Component styling updates automatically when variables change.
- Consumption issues are reported to Design Engineer promptly.

## Interfaces

- **Design Engineer**: Provides Variable Design Standard (VDS) JSON. Maintains contract. Tests variables in React before approval. Frontend Engineer reports consumption issues. Design Engineer troubleshoots.
- **Designer**: Creates variables in Figma. Frontend Engineer consumes generated outputs. No direct variable creation handoff.

## Workflow

1. Pull the latest generated outputs.
2. Update component usage to semantic variables.
3. Run consumption tests.
4. Report broken references or mode issues.

## Checklist

- [ ] Outputs are generated from contract JSON
- [ ] Components use semantic variables
- [ ] Consumption tests pass

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

Frontend Engineers maintain pipelines that:

1. Read Variable Design Standard (VDS) JSON from version control.
2. Generate CSS variables, TypeScript types, theme objects.
3. Output platform-specific formats.
4. Integrate with component libraries.

See [Build Pipelines](/tooling/build-pipelines.md) for examples.

## Common mistakes

- Consuming base palette variables directly in components (use semantic variables).
- Hand-editing generated outputs (regenerate from Variable Design Standard (VDS) JSON).
- Not testing variable consumption (add consumption tests).
- Ignoring breaking changes (read release notes, update code).
- Trying to fix variable issues by editing code (report to Design Engineer instead).

## Failure modes

If Frontend Engineer bypasses Design Engineer:

- Variable issues are fixed in code while contract JSON stays unchanged.
- Workarounds accumulate (technical debt).
- Contract JSON no longer matches production usage.

If Frontend Engineer hand-edits outputs:

- Next build overwrites changes.
- Variables don't match contract.
- Debugging becomes impossible.

If Frontend Engineer doesn't report consumption issues:

- Design Engineer doesn't know about problems.
- Variables ship with consumption bugs.
- Components break in production.

## Out of scope

- Creating variables in Figma (Designer owns this).
- Maintaining the Variable Design Standard (VDS) (Design Engineer owns this).
- Defining naming conventions (Design Engineer owns this).
- Approving variable changes (Design Engineer owns this).

## Links

- [CSS Consumption](/consumption/css.md)
- [Build Pipelines](/tooling/build-pipelines.md)
- [Change Control](../change-control)
