---
title: Design - Figma Workflow
---

# Designer Workflow

Optimized workflow for designers creating and managing variables in Figma.

## Variable creation process

### Step 1: Plan variables

Before creating variables:

1. Identify variable category (base, semantic, component)
2. Check if variable already exists
3. Determine variable name following naming convention
4. Identify if variable needs modes

### Step 2: Create collection

Create collection if it doesn't exist:

1. Open Variables panel in Figma
2. Click "+" to create new collection
3. Name collection (lowercase, descriptive)
4. Add modes if needed (`light`, `dark`)

### Step 3: Create variables

Create variables in collection:

1. Click "+" to create new variable
2. Name variable (use `/` separator, lowercase)
3. Set variable type (color, spacing, etc.)
4. Set variable value
5. Set mode values if applicable

### Step 4: Use references

Use references instead of duplicating values:

1. Select variable value field
2. Click reference icon
3. Select referenced variable
4. Verify reference resolves correctly

## Review process

### Before export

Before exporting variables:

1. Verify naming follows convention
2. Check all references resolve
3. Verify modes are consistent
4. Check no duplicate values
5. Verify variable organization

### Export checklist

Before exporting:

- [ ] All variables named correctly
- [ ] All references resolve
- [ ] Modes are consistent
- [ ] No duplicate values
- [ ] Collections organized correctly

## Export process

### Step 1: Export variables

Export variables from Figma:

1. Use Dev Mode plugin or REST API
2. Export all collections
3. Save export JSON

### Step 2: Run adapter

Run Figma adapter to normalize:

1. Run adapter script
2. Check normalization output
3. Fix any normalization errors

### Step 3: Validate

Validate normalized JSON:

1. Run validation script
2. Fix any validation errors
3. Verify naming convention

### Step 4: Commit

Commit normalized JSON:

1. Commit to version control
2. Open PR for review
3. Address review feedback

## Best practices

1. Plan variables before creating
2. Use references instead of duplicating
3. Follow naming convention
4. Keep modes consistent
5. Review before export

## Failure modes

If workflow is wrong:

- Variables created incorrectly
- Naming violations
- Broken references
- Inconsistent modes

## Out of scope

- Figma UI details (see Figma docs)
- Adapter details (see adapter docs)
- Review process (see governance docs)

