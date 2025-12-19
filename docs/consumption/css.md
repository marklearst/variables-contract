---
title: Consumption - CSS
---

# CSS Variable Consumption

How to consume Variable Contract variables in CSS.

## Basic usage

### CSS custom properties

Use CSS custom properties (variables) generated from Variable Contract:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-primary);
  padding: var(--spacing-component-button-padding);
}
```

### Generated CSS

Style Dictionary generates CSS like:

```css
:root {
  --color-surface-brand: #0066cc;
  --color-text-primary: #000000;
  --spacing-component-button-padding: 16px;
}
```

## Mode switching

### Mode-specific CSS

Generate mode-specific CSS files:

```css
/* variables-light.css */
:root {
  --color-surface: #ffffff;
  --color-text-primary: #000000;
}

/* variables-dark.css */
:root[data-theme="dark"] {
  --color-surface: #000000;
  --color-text-primary: #ffffff;
}
```

### Switching modes

Switch themes using data attribute:

```css
:root[data-theme="dark"] {
  /* Dark theme variables */
}
```

Or using class:

```css
.theme-dark {
  /* Dark theme variables */
}
```

### JavaScript switching

```javascript
// Switch to dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Switch to light theme
document.documentElement.setAttribute('data-theme', 'light');
```

## Fallback strategies

### Default fallbacks

Provide fallback values:

```css
.button {
  background-color: var(--color-surface-brand, #0066cc);
  color: var(--color-text-primary, #000000);
}
```

### Multiple fallbacks

Chain fallbacks:

```css
.button {
  background-color: var(--color-surface-brand, var(--color-surface-default, #ffffff));
}
```

## Component usage

### Semantic variables

Use semantic variables in components:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-on-brand);
  padding: var(--spacing-component-button-padding);
}

.button:hover {
  background-color: var(--color-surface-brand-hover);
}
```

### Component-specific variables

Use component-specific variables:

```css
.button {
  background-color: var(--component-button-color-background-default);
  color: var(--component-button-color-text-default);
  padding: var(--component-button-spacing-padding-vertical) var(--component-button-spacing-padding-horizontal);
}
```

## Advanced patterns

### CSS calc with variables

Use variables in calculations:

```css
.card {
  width: calc(100% - var(--spacing-layout-gutter) * 2);
  margin: var(--spacing-layout-gutter);
}
```

### Media queries with variables

Use variables in media queries (requires CSS custom properties in media queries support):

```css
@media (min-width: var(--breakpoint-desktop)) {
  .container {
    max-width: var(--layout-max-width);
  }
}
```

### CSS Grid with variables

Use variables in grid:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-item-min-width), 1fr));
  gap: var(--spacing-layout-gutter);
}
```

## Examples

### Button component

Complete button component:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-on-brand);
  padding: var(--spacing-component-button-padding-vertical) var(--spacing-component-button-padding-horizontal);
  border-radius: var(--radius-component-button);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--duration-fast) var(--easing-default);
}

.button:hover {
  background-color: var(--color-surface-brand-hover);
}

.button:focus {
  outline: var(--border-width-focus) solid var(--color-border-focus);
  outline-offset: var(--spacing-focus-offset);
}

.button:disabled {
  background-color: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

### Card component

Card component example:

```css
.card {
  background-color: var(--color-surface-default);
  border: var(--border-width-default) solid var(--color-border-default);
  border-radius: var(--radius-card);
  padding: var(--spacing-card-padding);
  box-shadow: var(--shadow-card);
}

.card-header {
  margin-bottom: var(--spacing-card-header-margin);
  color: var(--color-text-heading);
  font-size: var(--font-size-heading);
  font-weight: var(--font-weight-bold);
}
```

## Implementation rules

1. Use semantic variables in components
2. Provide fallbacks for critical values
3. Use component-specific variables when needed
4. Document variable usage
5. Test mode switching

## Failure modes

If CSS consumption is wrong:

- Hardcoded values instead of variables
- Missing fallbacks
- Broken mode switching
- Inconsistent styling

## Out of scope

- CSS-in-JS (see framework docs)
- PostCSS processing (see build pipeline docs)
- CSS framework integration (see framework docs)

