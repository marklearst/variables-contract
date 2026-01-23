---
title: Scenarios - Component Integration
---

# Component Library Integration

How to integrate Variable Contract with component libraries.

If components don't use variables correctly, you get hardcoded values, inconsistent styling, and maintenance burden.

## Component variable patterns

### Pattern 1: Semantic variables

Components consume semantic variables, not base variables.

Good:

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-primary);
  padding: var(--spacing-component-button-padding);
}
```

Bad:

```css
.button {
  background-color: var(--color-gray-900);
  color: var(--color-gray-0);
  padding: var(--spacing-4);
}
```

### Pattern 2: Component-specific variables

Components use component-scoped variables when needed.

Structure:

```json
{
  "component": {
    "button": {
      "color": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{color.surface.brand}"
          },
          "hover": {
            "$type": "color",
            "$value": "{color.surface.brand-hover}"
          }
        }
      },
      "spacing": {
        "padding": {
          "$type": "dimension",
          "$value": "{spacing.component.button.padding}"
        }
      }
    }
  }
}
```

### Pattern 3: Variable overrides

Components allow variable overrides for customization.

CSS:

```css
.button {
  background-color: var(--component-button-color-background-default, var(--color-surface-brand));
}
```

JavaScript:

```javascript
const buttonStyle = {
  backgroundColor: 'var(--component-button-color-background-default)'
};
```

## Component library integration

### React integration

Use CSS variables in React components:

```jsx
function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}
```

```css
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-primary);
  padding: var(--spacing-component-button-padding);
}
```

### Vue integration

Use CSS variables in Vue components:

```vue
<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  background-color: var(--color-surface-brand);
  color: var(--color-text-primary);
  padding: var(--spacing-component-button-padding);
}
</style>
```

### TypeScript integration

Use generated TypeScript types:

```typescript
import { color, spacing } from './tokens';

const buttonStyle = {
  backgroundColor: color.surface.brand,
  color: color.text.primary,
  padding: spacing.component.button.padding
};
```

## Override strategies

### CSS custom properties

Use CSS custom properties for overrides:

```css
.button {
  background-color: var(--button-bg, var(--color-surface-brand));
  color: var(--button-color, var(--color-text-primary));
}
```

Override:

```css
.custom-button {
  --button-bg: var(--color-surface-accent);
}
```

### Component props

Use component props for overrides:

```jsx
function Button({ bg, color, children }) {
  const style = {
    backgroundColor: bg || 'var(--color-surface-brand)',
    color: color || 'var(--color-text-primary)'
  };

  return <button style={style}>{children}</button>;
}
```

### Theme context

Use theme context for overrides:

```jsx
const ThemeContext = createContext();

function Button({ children }) {
  const theme = useContext(ThemeContext);

  return (
    <button style={{
      backgroundColor: theme.button.bg,
      color: theme.button.color
    }}>
      {children}
    </button>
  );
}
```

## Examples

### Button component

Complete button component example:

Variables (`tokens/component/button.json`):

```json
{
  "component": {
    "button": {
      "color": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{color.surface.brand}"
          },
          "hover": {
            "$type": "color",
            "$value": "{color.surface.brand-hover}"
          }
        },
        "text": {
          "default": {
            "$type": "color",
            "$value": "{color.text.on-brand}"
          }
        }
      },
      "spacing": {
        "padding": {
          "horizontal": {
            "$type": "dimension",
            "$value": "{spacing.component.button.padding-x}"
          },
          "vertical": {
            "$type": "dimension",
            "$value": "{spacing.component.button.padding-y}"
          }
        }
      }
    }
  }
}
```

CSS:

```css
.button {
  background-color: var(--component-button-color-background-default);
  color: var(--component-button-color-text-default);
  padding: var(--component-button-spacing-padding-vertical) var(--component-button-spacing-padding-horizontal);
}

.button:hover {
  background-color: var(--component-button-color-background-hover);
}
```

### Input component

Input component example:

Variables (`tokens/component/input.json`):

```json
{
  "component": {
    "input": {
      "color": {
        "border": {
          "default": {
            "$type": "color",
            "$value": "{color.border.default}"
          },
          "focus": {
            "$type": "color",
            "$value": "{color.border.focus}"
          }
        }
      },
      "spacing": {
        "padding": {
          "$type": "dimension",
          "$value": "{spacing.component.input.padding}"
        }
      }
    }
  }
}
```

CSS:

```css
.input {
  border-color: var(--component-input-color-border-default);
  padding: var(--component-input-spacing-padding);
}

.input:focus {
  border-color: var(--component-input-color-border-focus);
}
```

## Best practices

1. Use semantic variables in components
2. Create component-specific variables when needed
3. Allow variable overrides for customization
4. Document component variable usage
5. Test component variable consumption

## Failure modes

If component integration is wrong:

- Hardcoded values in components
- Inconsistent styling
- Maintenance burden
- No customization options

## Out of scope

- Component library architecture (focus on variables)
- Component API design (separate concern)
- Component testing (separate concern)

