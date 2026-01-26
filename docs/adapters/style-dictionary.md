---
title: Style Dictionary Adapter
---

# Style Dictionary Adapter

Style Dictionary consumes Variable Contract (DTCG) format and generates platform outputs like CSS variables, TypeScript types, and Tailwind CSS v4 custom properties.

## Role

Style Dictionary is an output adapter. It reads Variable Contract JSON and produces files for consumption in code.

## DTCG format support

Style Dictionary supports DTCG format natively. Use Variable Contract JSON files directly as Style Dictionary source files.

## Configuration

Example Style Dictionary configuration:

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
    },
    "typescript": {
      "transformGroup": "js",
      "buildPath": "dist/",
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

## Output formats

Style Dictionary can generate:

- CSS variables (`css/variables`)
- SCSS variables (`scss/variables`)
- Less variables (`less/variables`)
- JavaScript/TypeScript (`javascript/es6`, `typescript/es6-declarations`)
- JSON (`json/nested`, `json/flat`)
- Tailwind CSS v4 (`css/variables` for `@theme` directive)
- Android resources (`android/resources`)
- iOS plist (`ios/plist`)
- And more

## Format differences

Style Dictionary has its own format (legacy), but supports DTCG format:

Legacy Style Dictionary format:

```json
{
  "color": {
    "primary": {
      "value": "#0066cc",
      "type": "color"
    }
  }
}
```

DTCG format (Variable Contract):

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

Style Dictionary handles both formats. Use DTCG format for Variable Contract compliance.

## Transform groups

Transform groups apply multiple transforms:

- `css` - CSS variable transforms
- `js` - JavaScript/TypeScript transforms
- `scss` - SCSS variable transforms
- `android` - Android resource transforms
- `ios` - iOS plist transforms

## Custom transforms

You can create custom transforms for:

- Naming conventions (camelCase, kebab-case, etc.)
- Value transformations (unit conversion, color format)
- Filtering (exclude certain variables)

Example custom transform:

```javascript
module.exports = {
  name: 'name/kebab',
  type: 'name',
  transform: function(prop, options) {
    return prop.path.join('-');
  }
};
```

## Reference resolution

Style Dictionary resolves references automatically. Variables that reference other variables are resolved to their final values in output files.

Example input:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.primary}"
      }
    }
  }
}
```

CSS output:

```css
:root {
  --color-primary: #0066cc;
  --color-text-primary: #0066cc;
}
```

## Mode handling

Style Dictionary can generate separate files for each mode or combine modes into a single file with mode selectors.

Example with modes:

```json
{
  "color": {
    "surface": {
      "$type": "color",
      "$value": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    }
  }
}
```

CSS output (separate files):

`variables-light.css`:

```css
:root {
  --color-surface: #ffffff;
}
```

`variables-dark.css`:

```css
:root {
  --color-surface: #000000;
}
```

## Build workflow

Typical workflow:

1. Store Variable Contract JSON in `tokens/` directory
2. Configure Style Dictionary to read from `tokens/`
3. Run Style Dictionary build
4. Generated files appear in `dist/`
5. Import generated files in your code

## Failure modes

If Style Dictionary configuration is wrong:

- Missing source files cause empty outputs
- Invalid transforms break value conversion
- Reference resolution failures cause undefined values
- Mode handling errors produce incorrect outputs

## Validation

Style Dictionary validates:

- JSON syntax
- Reference resolution
- Type correctness (for transforms that check types)

Variable Contract validation should happen before Style Dictionary build (in CI or pre-commit hooks).

## Examples

### Basic CSS variables

Input (`tokens/color.json`):

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}
```

Output (`dist/variables.css`):

```css
:root {
  --color-primary: #0066cc;
}
```

### TypeScript types

Input (same as above)

Output (`dist/tokens.ts`):

```typescript
export const color = {
  primary: '#0066cc'
};
```

### Tailwind CSS v4

Input (same as above)

Output (`dist/theme.css`):

```css
@import "tailwindcss";

@theme {
  --color-primary: #0066cc;
}
```

Note: Tailwind CSS v4 uses CSS-first configuration. Generate CSS custom properties, not JavaScript config files. See [Tailwind Adapter](adapters/tailwind) for details.

## Links

- [Style Dictionary Documentation](https://styledictionary.com/)
- [Style Dictionary Transforms](https://styledictionary.com/transforms/)
- [Style Dictionary Formats](https://styledictionary.com/formats/)

## Out of scope

- Style Dictionary installation and setup (see Style Dictionary docs)
- Custom transform implementation details
- Platform-specific build configurations

