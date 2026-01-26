---
title: Tailwind Adapter
---

# Tailwind Adapter

Tailwind CSS v4 integration patterns for Variable Contract. Generate CSS custom properties from Variable Contract JSON using Tailwind CSS v4's CSS-first approach.

## Role

Tailwind adapter generates CSS custom properties from Variable Contract JSON. Variables map to Tailwind CSS v4's `@theme` directive. No JavaScript config files. Pure CSS.

## Why Tailwind CSS v4

Tailwind CSS v4 is pure CSS. No JavaScript config. Design Engineers MUST master Tailwind CSS v4. Variable Contract variables map directly to CSS custom properties that Tailwind CSS v4 consumes.

## Tailwind CSS v4 approach

Tailwind CSS v4 uses CSS-first configuration:

- Define theme in CSS using `@theme` directive
- Use CSS custom properties (CSS theme variables)
- No `tailwind.config.js` file needed
- Aligns with native web standards
- Dynamic utility values (spacing scale accepts any value)
- Automatic content detection (no `content` array needed)
- Built-in import support (no `postcss-import` needed)

See [Tailwind CSS v4 documentation](https://tailwindcss.com/docs) for complete details.

## Integration patterns

### Pattern 1: CSS custom properties

Generate CSS custom properties from Variable Contract JSON. Tailwind CSS v4 reads CSS variables directly.

**Style Dictionary config:**

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "theme.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

**Generated output (`dist/theme.css`):**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary-500: #0066cc;
  --color-primary-50: #e6f2ff;
  --color-primary-900: #003366;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-surface-brand: var(--color-primary-500);

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}
```

**Component usage:**

```tsx
<button className="bg-surface-brand text-white px-4 py-2">
  Click me
</button>
```

### Pattern 2: Direct CSS generation

Transform Variable Contract JSON directly to CSS custom properties.

**Variable Contract:**

```json
{
  "color": {
    "primary": {
      "500": {
        "$type": "color",
        "$value": "#0066cc"
      }
    },
    "surface": {
      "brand": {
        "$type": "color",
        "$value": "{color.primary.500}"
      }
    }
  },
  "spacing": {
    "md": {
      "$type": "dimension",
      "$value": "1rem"
    }
  }
}
```

**Generated CSS:**

```css
@import "tailwindcss";

@theme {
  --color-primary-500: #0066cc;
  --color-surface-brand: var(--color-primary-500);
  --spacing-md: 1rem;
}
```

## Variable mapping

### Colors

Variable Contract: `color.primary.500`
CSS: `--color-primary-500: #0066cc`
Tailwind: `bg-primary-500` or `text-primary-500`

### Spacing

Variable Contract: `spacing.md`
CSS: `--spacing-md: 1rem`
Tailwind: `p-md` or `m-md`

Tailwind CSS v4 uses a dynamic spacing scale. The `--spacing` variable defines the base unit, and utilities like `px-8`, `mt-17`, `w-29` are generated dynamically using `calc(var(--spacing) * N)`.

### Typography

Variable Contract: `typography.fontFamily.sans`
CSS: `--font-family-sans: "Inter", sans-serif`
Tailwind: `font-sans`

## Modes support

Tailwind CSS v4 handles modes via CSS custom properties. Generate mode-specific CSS or use CSS variable overrides.

**Variable Contract with modes:**

```json
{
  "color": {
    "surface": {
      "background": {
        "$type": "color",
        "$value": {
          "light": "#ffffff",
          "dark": "#000000"
        }
      }
    }
  }
}
```

**Generated CSS:**

```css
@theme {
  --color-surface-background: #ffffff; /* default: light */
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-surface-background: #000000; /* dark mode */
  }
}
```

## Design Engineer requirements

Design Engineer MUST:

- Master Tailwind CSS v4 CSS-first approach
- Understand CSS custom properties and `@theme` directive
- Map Variable Contract structure to CSS custom properties
- Test variables in Tailwind components before approval
- Maintain CSS generation pipeline (no JavaScript config)

## Workflow

1. Designer creates variables in Figma
2. Export from Figma
3. Design Engineer normalizes with adapter
4. Design Engineer generates CSS custom properties from Variable Contract JSON
5. Design Engineer tests variables in Tailwind CSS v4 components
6. Commit Variable Contract JSON and generated CSS
7. Frontend Developer consumes Tailwind utilities in components

## Example component

**Variable Contract:**

```json
{
  "color": {
    "surface": {
      "brand": {
        "$type": "color",
        "$value": "{color.primary.500}"
      }
    }
  }
}
```

**Generated CSS:**

```css
@import "tailwindcss";

@theme {
  --color-primary-500: #0066cc;
  --color-surface-brand: var(--color-primary-500);
}
```

**Component usage:**

```tsx
<button className="bg-surface-brand text-white px-4 py-2">
  Click me
</button>
```

Tailwind CSS v4 generates: `background-color: var(--color-surface-brand)`

## Validation

Tailwind adapter MUST:

- Generate valid CSS custom properties syntax
- Map all Variable Contract variables to CSS custom properties
- Preserve variable references (use CSS `var()` syntax)
- Handle modes (generate mode-specific CSS or CSS variable overrides)
- Follow Tailwind CSS v4 naming conventions (`--color-*`, `--spacing-*`, `--font-*`)

## Failure modes

If Tailwind adapter fails:

- Variables don't map to CSS custom properties (wrong structure)
- CSS syntax errors (invalid custom property names)
- Missing variables in CSS (generation incomplete)
- Mode values not handled (light/dark themes broken)
- Wrong naming convention (Tailwind CSS v4 doesn't recognize variables)

## Installation

Tailwind CSS v4 installation:

1. Install Tailwind CSS:
   ```bash
   npm i tailwindcss @tailwindcss/postcss
   ```

2. Add PostCSS plugin:
   ```js
   export default {
     plugins: ["@tailwindcss/postcss"],
   };
   ```

3. Import Tailwind in CSS:
   ```css
   @import "tailwindcss";
   ```

For Vite projects, use `@tailwindcss/vite` plugin instead. See [Tailwind CSS v4 installation guide](https://tailwindcss.com/docs/installation/using-vite) for details.

## Out of scope

- Tailwind utility class generation (use Tailwind's built-in utilities)
- Custom Tailwind plugins (separate concern)
- JavaScript config files (Tailwind CSS v4 doesn't use them)
- Vite/PostCSS setup details (see Tailwind CSS v4 docs)

