---
title: "Consumption: CSS"
---

# CSS Variable Consumption

Scope: CSS consumption of Variable Design Standard (VDS) outputs.

Failure if ignored: CSS imports and layers select the wrong brand output.

## Basic usage

### CSS custom properties

Use CSS custom properties (variables) generated from Variable Design Standard (VDS):

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
document.documentElement.setAttribute("data-theme", "dark");

// Switch to light theme
document.documentElement.setAttribute("data-theme", "light");
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
  background-color: var(
    --color-surface-brand,
    var(--color-surface-default, #ffffff)
  );
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
  padding: var(--component-button-spacing-padding-vertical)
    var(--component-button-spacing-padding-horizontal);
}
```

## CSS boundary

CSS handles scope, layout, motion, and interactivity. Variables carry values and intent. Do not encode layout variants as token layers.

JSON-as-API means the JSON file set defines the interface, and CSS selects the output by import order.

## Advanced patterns

### Cascade layers and brand selection

Guidance:

- Use cascade layers to keep base and brand output ordered.
- Select the brand by which file is imported, not by a mapped token layer.
- If you use Tailwind or another utility CSS system, keep its output in a separate layer.
- Keep layout and component logic in CSS, not in token indirection.
- Do not dump all brands into one `:root` file.
- The JSON folder selects the brand output. CSS selects which output to load.

Example:

```css
@layer base, brand, utilities;
@import "variables-base.css" layer(base);
@import "variables-brand-a.css" layer(brand);
@import "tailwind.css" layer(utilities);
```

### Modern at rules

Guidance:

- `@layer` controls override order without selector wars.
- `@import` with `layer()` and `supports()` gates optional CSS by capability.
- `@scope` limits selectors to a subtree without overspecific selectors.
- `@container` lets components respond to their container, not the viewport.
- `@starting-style` defines entry values for first render transitions.
- `@view-transition` allows document level transitions where supported.
- `@property` registers typed custom properties.
- `@position-try` defines fallback positions for anchored UI.
- `@font-palette-values` defines palette values for color fonts.
- Use these for behavior and layout. Do not encode layout variants as token layers.
- Use `@view-transition` and `@position-try` only when supported and provide a fallback.

Why this matters:

- These rules handle scope, layout, and motion in CSS.
- Tokens stay focused on values and intent.

MDN references:

- [`@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer)
- [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import)
- [`@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope)
- [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/@container)
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)
- [`@view-transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition)
- [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property)
- [`@position-try`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@position-try)
- [`@font-palette-values`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-palette-values)

Examples:

```css
@import "cards.css" layer(components) supports(display: grid);
@import "cards-container.css" layer(components)
  supports(container-type: inline-size);

@scope (.card) to (.card__content) {
  .title {
    color: var(--color-text-primary);
  }
}

@container (min-width: 32rem) {
  .card {
    grid-template-columns: 1fr 2fr;
  }
}
```

```css
@property --progress {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@starting-style {
  .toast {
    opacity: 0;
    transform: translateY(8px);
  }
}

.toast {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 160ms,
    transform 160ms;
}
```

```css
@view-transition {
  navigation: auto;
}

@position-try --below {
  inset-block-start: anchor(bottom);
  inset-inline-start: anchor(left);
}

@font-palette-values --brand {
  font-family: "Noto Color Emoji";
  override-colors: 0 #ff3b3b;
}
```

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
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--grid-item-min-width), 1fr)
  );
  gap: var(--spacing-layout-gutter);
}
```

## Checklist

- [ ] Base and brand CSS are separated by `@layer`.
- [ ] Brand selection happens by file choice, not token mapping.
- [ ] Optional CSS is gated with `@import` and `supports()` where needed.
- [ ] Component styles use `@scope` or `@container` where it fits.

## Examples

### Button component

Complete button component:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-on-brand);
  padding: var(--spacing-component-button-padding-vertical)
    var(--spacing-component-button-padding-horizontal);
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
- Components mix base values and semantic values

## Out of scope

- CSS-in-JS toolchains (not covered in this spec)
- PostCSS setup for legacy pipelines (see build pipeline docs)
- Tailwind or other CSS utility tools (see `docs/adapters/tailwind`)
