---
title: Consumption - Frameworks
---

# Framework Integration

How to integrate Variable Contract variables with React, Vue, and other frameworks.

## React integration

### CSS variables

Use CSS variables in React:

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
}
```

### Inline styles with TypeScript

Use generated TypeScript types:

```tsx
import { color, spacing } from './tokens';

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        backgroundColor: color.surface.brand,
        color: color.text.primary,
        padding: spacing.component.button.padding
      }}
    >
      {children}
    </button>
  );
}
```

### CSS-in-JS

Use with styled-components:

```jsx
import styled from 'styled-components';
import { color, spacing } from './tokens';

const Button = styled.button`
  background-color: ${color.surface.brand};
  color: ${color.text.primary};
  padding: ${spacing.component.button.padding};
`;
```

Use with emotion:

```jsx
import { css } from '@emotion/react';
import { color, spacing } from './tokens';

const buttonStyle = css`
  background-color: ${color.surface.brand};
  color: ${color.text.primary};
  padding: ${spacing.component.button.padding};
`;

function Button({ children }) {
  return <button css={buttonStyle}>{children}</button>;
}
```

### Theme context

Use theme context for mode switching:

```jsx
import { createContext, useContext, useState } from 'react';
import { color } from './tokens';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  colors: color
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const colors = {
    surface: color.surface[theme],
    text: color.text[theme]
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

## Vue integration

### CSS variables

Use CSS variables in Vue:

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
}
</style>
```

### Style binding

Use style binding:

```vue
<template>
  <button :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<script setup>
import { color, spacing } from './tokens';

const buttonStyle = {
  backgroundColor: color.surface.brand,
  color: color.text.primary,
  padding: spacing.component.button.padding
};
</script>
```

### Provide/inject

Use provide/inject for theme:

```vue
<script setup>
import { provide, inject, ref } from 'vue';
import { color } from './tokens';

const theme = ref('light');

provide('theme', theme);
provide('colors', {
  surface: color.surface[theme.value],
  text: color.text[theme.value]
});
</script>
```

## Angular integration

### CSS variables

Use CSS variables in Angular:

```typescript
@Component({
  selector: 'app-button',
  template: '<button class="button"><ng-content></ng-content></button>',
  styles: [`
    .button {
      background-color: var(--color-surface-brand);
      color: var(--color-text-primary);
    }
  `]
})
export class ButtonComponent {}
```

### Style binding

Use style binding:

```typescript
import { Component } from '@angular/core';
import { color, spacing } from './tokens';

@Component({
  selector: 'app-button',
  template: '<button [style]="buttonStyle"><ng-content></ng-content></button>'
})
export class ButtonComponent {
  buttonStyle = {
    'background-color': color.surface.brand,
    'color': color.text.primary,
    'padding': spacing.component.button.padding
  };
}
```

## Examples

### React button component

Complete React button:

```jsx
import { useTheme } from './ThemeContext';

function Button({ children, variant = 'primary' }) {
  const { colors } = useTheme();

  const backgroundColor = variant === 'primary'
    ? colors.surface.brand
    : colors.surface.secondary;

  return (
    <button
      style={{
        backgroundColor,
        color: colors.text.primary,
        padding: '12px 24px'
      }}
    >
      {children}
    </button>
  );
}
```

### Vue button component

Complete Vue button:

```vue
<template>
  <button
    :class="['button', `button--${variant}`]"
    :style="buttonStyle"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { inject } from 'vue';
import { color, spacing } from './tokens';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
});

const theme = inject('theme', 'light');
const colors = computed(() => ({
  surface: color.surface[theme],
  text: color.text[theme]
}));

const buttonStyle = computed(() => ({
  backgroundColor: props.variant === 'primary'
    ? colors.value.surface.brand
    : colors.value.surface.secondary,
  color: colors.value.text.primary,
  padding: spacing.component.button.padding
}));
</script>
```

## Implementation rules

1. Use CSS variables when possible
2. Use TypeScript types for type safety
3. Create theme context/hooks for mode switching
4. Document framework integration
5. Test framework consumption

## Failure modes

If framework integration is wrong:

- Hardcoded values
- No type safety
- Broken mode switching
- Inconsistent styling

## Out of scope

- Framework-specific features (see framework docs)
- State management (separate concern)
- Component architecture (separate concern)

