---
title: Consumption - TypeScript
---

# TypeScript Consumption

How to consume Variable Contract variables in TypeScript with type safety.

## Type generation

### Style Dictionary TypeScript format

Style Dictionary can generate TypeScript types:

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "typescript": {
      "transformGroup": "js",
      "buildPath": "dist/typescript/",
      "files": [
        {
          "destination": "tokens.ts",
          "format": "typescript/es6-declarations"
        }
      ]
    }
  }
}
```

### Generated types

Generated TypeScript file:

```typescript
export const color = {
  surface: {
    brand: '#0066cc',
    default: '#ffffff'
  },
  text: {
    primary: '#000000',
    secondary: '#666666'
  }
};

export const spacing = {
  component: {
    button: {
      padding: '16px'
    }
  }
};
```

## Type-safe access

### Import and use

Import generated types:

```typescript
import { color, spacing } from './tokens';

const buttonStyle = {
  backgroundColor: color.surface.brand,
  color: color.text.primary,
  padding: spacing.component.button.padding
};
```

### Type definitions

Generate type definitions:

```typescript
export type Color = typeof color;
export type Spacing = typeof spacing;

// Usage
const brandColor: Color['surface']['brand'] = color.surface.brand;
```

## React integration

### Style objects

Use in React style objects:

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

### CSS modules

Use with CSS modules:

```tsx
import styles from './Button.module.css';
import { color } from './tokens';

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={styles.button}
      style={{
        '--button-bg': color.surface.brand,
        '--button-color': color.text.primary
      } as React.CSSProperties}
    >
      {children}
    </button>
  );
}
```

## Vue integration

### Style binding

Use in Vue style binding:

```vue
<template>
  <button :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { color, spacing } from './tokens';

const buttonStyle = {
  backgroundColor: color.surface.brand,
  color: color.text.primary,
  padding: spacing.component.button.padding
};
</script>
```

## Mode handling

### Mode-specific types

Generate mode-specific types:

```typescript
export const color = {
  surface: {
    light: '#ffffff',
    dark: '#000000'
  }
};

// Usage with mode
function getSurfaceColor(mode: 'light' | 'dark') {
  return color.surface[mode];
}
```

### Theme context

Use with theme context:

```typescript
import { createContext, useContext } from 'react';
import { color } from './tokens';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('light');

function useTheme() {
  return useContext(ThemeContext);
}

function useColor() {
  const theme = useTheme();
  return {
    surface: color.surface[theme],
    text: color.text[theme]
  };
}
```

## Examples

### Button component

Complete TypeScript button component:

```typescript
import { color, spacing, typography } from './tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, variant = 'primary', disabled }: ButtonProps) {
  const backgroundColor = variant === 'primary'
    ? color.surface.brand
    : color.surface.secondary;

  const textColor = variant === 'primary'
    ? color.text.onBrand
    : color.text.primary;

  return (
    <button
      disabled={disabled}
      style={{
        backgroundColor: disabled ? color.surface.disabled : backgroundColor,
        color: disabled ? color.text.disabled : textColor,
        padding: spacing.component.button.padding,
        fontFamily: typography.fontFamily.base,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium
      }}
    >
      {children}
    </button>
  );
}
```

### Theme hook

Theme hook example:

```typescript
import { useState, createContext, useContext } from 'react';
import { color } from './tokens';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: typeof color;
}>({
  theme: 'light',
  setTheme: () => {},
  colors: color
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

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

## Best practices

1. Generate types from Variable Contract
2. Use type-safe access
3. Document type usage
4. Test type safety
5. Handle modes correctly

## Failure modes

If TypeScript consumption is wrong:

- No type safety
- Runtime errors
- Missing autocomplete
- Broken mode handling

## Out of scope

- Type generation tools (use Style Dictionary)
- Runtime type checking (use TypeScript compiler)
- Type inference (use TypeScript features)

