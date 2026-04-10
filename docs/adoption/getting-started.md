---
title: Adoption: Getting Started
---

# Team Adoption Guide

Scope: team adoption steps for Variable Design Standard (VDS).

Failure if ignored: naming rules break and validation fails.

If you skip adoption steps, naming rules break, validation fails, and teams diverge on usage.

## Prerequisites

Before adopting Variable Design Standard (VDS):

- Designers use Figma (or similar design tool)
- Developers use version control (Git)
- Team has CI/CD pipeline (or can set one up)
- Design Engineer role exists (or can be assigned)

## Adoption phases

### Phase 1: Foundation (Week 1-2)

**Goal**: Set up structure and tooling

1. Create variable repository structure

   - Set up `tokens/` directory in version control
   - Create initial Variable Design Standard (VDS) JSON files
   - Set up file organization (base, semantic, component)
   - Define brand and mode folders (file selection rule)

2. Set up validation

   - Install validation tools
   - Configure CI validation
   - Set up pre-commit hooks

3. Document team process
   - Create team-specific guidelines
   - Document roles and responsibilities
   - Set up review process
   - Define the contract review gate

**Deliverables**:

- Variable repository structure
- CI validation running
- Team documentation

### Phase 2: Initial Variables (Week 3-4)

**Goal**: Create first variable set

1. Export existing variables from Figma
2. Run adapter to normalize to Variable Design Standard (VDS) format
3. Validate normalized JSON
4. Commit to version control
5. Generate initial outputs (CSS, TypeScript)

**Deliverables**:

- First Variable Design Standard (VDS) JSON files
- Generated CSS/TypeScript outputs
- Validation passing

### Phase 3: Integration (Week 5-6)

**Goal**: Integrate variables into codebase

1. Update components to use generated CSS variables
2. Update TypeScript to use generated types
3. Test variable consumption
4. Document consumption patterns

**Deliverables**:

- Components using variables
- TypeScript types working
- Consumption documented

### Phase 4: Workflow (Week 7-8)

**Goal**: Establish ongoing workflow

1. Train designers on Variable Design Standard (VDS) naming
2. Train developers on variable consumption
3. Set up review process
4. Document change workflow

**Deliverables**:

- Team trained
- Review process working
- Workflow documented

## Team roles

### Design Engineer

Responsibilities:

- Maintain Variable Design Standard (VDS) JSON
- Review variable changes
- Set up validation and CI
- Manage versioning and releases
- Bridge design and development

### Designer

Responsibilities:

- Create variables in Figma following naming convention
- Export variables correctly
- Review variable changes
- Use variables in components

### Frontend Engineer

Responsibilities:

- Consume variables in code
- Review variable changes
- Test variable consumption
- Report issues

## Step-by-step implementation

### Step 1: Repository setup

Create repository structure following the canonical file layout:

#### Basic structure

```
tokens/
  base/
    color.json
    spacing.json
    typography.json
  semantic/
    color.json
    spacing.json
  component/
    button.json
    input.json
```

#### Grouping strategy

- **base/**: Raw scales and palettes (base variables)
- **semantic/**: Intent-based aliases (alias variables)
- **component/**: Component-specific overrides (component variables)

#### Multi-brand structure

For multi-brand systems:

```
tokens/
  base/
    color.json
    spacing.json
    typography.json
  brands/
    brand-a/
      color.json        # Extends base/color.json
      spacing.json
    brand-b/
      color.json        # Extends base/color.json
      spacing.json
  semantic/
    color.json          # References brand-specific variables
    spacing.json
  component/
    button.json
    input.json
```

#### Multi-theme structure

For systems with multiple themes:

```
tokens/
  base/
    color.json
    spacing.json
  themes/
    light/
      color.json        # Light theme variables
    dark/
      color.json        # Dark theme variables
  semantic/
    color.json          # Uses modes to reference theme variables
    spacing.json
  component/
    button.json
```

#### Combined multi-brand and multi-theme

For complex systems:

```
tokens/
  base/
    color.json
    spacing.json
  brands/
    brand-a/
      themes/
        light/
          color.json
        dark/
          color.json
    brand-b/
      themes/
        light/
          color.json
        dark/
          color.json
  semantic/
    color.json
  component/
    button.json
```

#### File naming conventions

- Use lowercase with hyphens for file names: `color.json`, `spacing-scale.json`
- Group files by category (color, spacing, typography)
- Keep related variables together in the same file
- Split large files when they exceed ~500 variables for maintainability

### Step 2: Install tooling

Install validation and build tools:

```bash
npm install --save-dev @dtcg/validator style-dictionary
```

### Step 3: Configure validation

Set up CI validation (GitHub Actions example):

```yaml
name: Validate Variables

on:
  pull_request:
    paths:
      - "tokens/**/*.json"

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm install
      - name: Validate variables
        run: npm run validate:tokens
```

### Step 4: Create first variables

1. Export from Figma
2. Run adapter to normalize
3. Validate JSON
4. Commit to version control

### Step 5: Generate outputs

Configure Style Dictionary:

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "variables.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

### Step 6: Consume in code

Use generated CSS variables:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-primary);
}
```

## Timeline

Typical adoption timeline:

- Week 1-2: Foundation setup
- Week 3-4: Initial variables
- Week 5-6: Integration
- Week 7-8: Workflow establishment

Adjust timeline based on team size and complexity.

## Success metrics

Adoption is successful when:

- Variables are validated in CI
- Designers create variables correctly
- Developers consume variables easily
- Review process works
- No broken references
- Versioning follows semantic versioning rules

## Common pitfalls

Avoid these mistakes:

1. Skipping validation setup (invalid variables ship)
2. Not training team (base values used in components instead of alias variables)
3. Skipping review process (breaking changes)
4. Not documenting workflow (confusion)
5. Rushing adoption (incomplete setup)

## Next steps

After adoption:

- Review [Implementation Checklist](adoption/implementation-checklist)
- Set up [Migration Strategy](adoption/migration-strategy) if migrating
- Document team-specific patterns
- Iterate on workflow

## Out of scope

- Tool-specific setup (see adapter documentation)
- Design system creation (focus on variables)
- Component library setup (separate concern)
