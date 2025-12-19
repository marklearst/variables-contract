---
title: Design - Component Variables
---

# Using Variables in Figma Components

How to use variables in Figma components for consistent styling.

## Applying variables to components

### Color variables

Apply color variables to component fills and strokes:

1. Select component layer
2. Open fill/stroke panel
3. Click variable icon
4. Select color variable
5. Verify variable applies correctly

### Spacing variables

Apply spacing variables to component padding and gaps:

1. Select component frame
2. Open auto layout settings
3. Set padding using spacing variable
4. Set gap using spacing variable
5. Verify spacing applies correctly

### Typography variables

Apply typography variables to text layers:

1. Select text layer
2. Open text style settings
3. Set font family using typography variable
4. Set font size using typography variable
5. Set font weight using typography variable

## Component variable patterns

### Pattern 1: Direct variable usage

Use semantic variables directly in components:

- Button background: `color/surface/brand`
- Button text: `color/text/on-brand`
- Button padding: `spacing/component/button/padding`

### Pattern 2: Component-specific variables

Use component-specific variables:

- Button background: `component/button/color/background/default`
- Button text: `component/button/color/text/default`
- Button padding: `component/button/spacing/padding`

### Pattern 3: Variable overrides

Allow variable overrides for component variants:

- Default: `component/button/color/background/default`
- Hover: `component/button/color/background/hover`
- Disabled: `component/button/color/background/disabled`

## Examples

### Button component

Button component using variables:

- Background: `color/surface/brand`
- Text: `color/text/on-brand`
- Padding: `spacing/component/button/padding`
- Border radius: `radius/component/button`

### Input component

Input component using variables:

- Border: `color/border/default`
- Border focus: `color/border/focus`
- Padding: `spacing/component/input/padding`
- Text: `color/text/primary`

### Card component

Card component using variables:

- Background: `color/surface/default`
- Border: `color/border/default`
- Padding: `spacing/component/card/padding`
- Shadow: `shadow/card`

## Best practices

1. Use semantic variables in components
2. Create component-specific variables when needed
3. Use variable overrides for variants
4. Document variable usage
5. Test variable changes

## Failure modes

If component variables are wrong:

- Hardcoded values in components
- Inconsistent styling
- Maintenance burden
- No customization options

## Out of scope

- Component creation (see Figma docs)
- Variable creation (see workflow docs)
- Component library structure (separate concern)

