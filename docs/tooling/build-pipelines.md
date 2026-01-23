---
title: Tooling - Build Pipelines
---

# Build Pipeline Examples

Complete build pipeline examples for generating outputs from Variable Contract.

## Basic pipeline

### Input

Variable Contract JSON files:

```
tokens/
  base/
    color.json
    spacing.json
  semantic/
    color.json
```

### Output

CSS variables:

```css
:root {
  --color-gray-0: #ffffff;
  --color-gray-1000: #000000;
  --color-text-primary: #000000;
  --spacing-4: 16px;
}
```

### Configuration

Style Dictionary config:

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

## Multi-platform pipeline

### Outputs

- CSS variables
- TypeScript types
- Tailwind config
- SCSS variables

### Configuration

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/css/",
      "files": [
        {
          "destination": "variables.css",
          "format": "css/variables"
        }
      ]
    },
    "typescript": {
      "transformGroup": "js",
      "buildPath": "dist/typescript/",
      "files": [
        {
          "destination": "tokens.ts",
          "format": "typescript/es6-declarations"
        }
      ]
    },
    "tailwind": {
      "transformGroup": "js",
      "buildPath": "dist/tailwind/",
      "files": [
        {
          "destination": "tailwind.config.js",
          "format": "javascript/module"
        }
      ]
    },
    "scss": {
      "transformGroup": "scss",
      "buildPath": "dist/scss/",
      "files": [
        {
          "destination": "_variables.scss",
          "format": "scss/variables"
        }
      ]
    }
  }
}
```

## Mode-specific pipeline

### Outputs

Generate mode-specific CSS files:

- `variables-light.css`
- `variables-dark.css`

### Configuration

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css-light": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "variables-light.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "mode": "light"
            }
          }
        }
      ]
    },
    "css-dark": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "variables-dark.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "mode": "dark"
            }
          }
        }
      ]
    }
  }
}
```

## Multi-brand pipeline

### Outputs

Generate brand-specific outputs:

- `dist/brand-a/variables.css`
- `dist/brand-b/variables.css`

### Configuration

```json
{
  "source": [
    "tokens/base/**/*.json",
    "tokens/brand-a/**/*.json"
  ],
  "platforms": {
    "css-brand-a": {
      "transformGroup": "css",
      "buildPath": "dist/brand-a/",
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

Create separate config for each brand or use programmatic approach.

## Custom transform pipeline

### Custom transform

Create custom transform for Variable Contract naming:

```javascript
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'variable-contract/name',
  type: 'name',
  transform: (token) => {
    // Convert dot-separated path to CSS variable name
    return token.path.join('-').replace(/\$/g, '');
  }
});
```

### Configuration

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transforms": [
        "variable-contract/name",
        "attribute/cti",
        "name/kebab",
        "color/css"
      ],
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

## Complete pipeline example

### File structure

```
tokens/
  base/
    color.json
    spacing.json
  semantic/
    color.json
scripts/
  build.js
  validate.js
dist/
  css/
    variables.css
  typescript/
    tokens.ts
package.json
style-dictionary.config.json
```

### Build script

`scripts/build.js`:

```javascript
const StyleDictionary = require('style-dictionary');
const fs = require('fs');

// Validate before build
const { validate } = require('@dtcg/validator');
const tokensDir = './tokens';

function validateTokens() {
  const files = getAllJsonFiles(tokensDir);
  let hasErrors = false;
  
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const errors = validate(content);
    
    if (errors.length > 0) {
      console.error(`Errors in ${file}:`);
      errors.forEach(error => console.error(`  - ${error.message}`));
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    process.exit(1);
  }
}

function getAllJsonFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Validate first
validateTokens();

// Then build
const sd = StyleDictionary.extend('./style-dictionary.config.json');
sd.buildAllPlatforms();

console.log('Build complete!');
```

### Package.json scripts

```json
{
  "scripts": {
    "validate:tokens": "node scripts/validate.js",
    "build:tokens": "node scripts/build.js",
    "build": "npm run validate:tokens && npm run build:tokens"
  }
}
```

## Best practices

1. Validate before building
2. Generate all needed outputs
3. Use consistent naming
4. Cache build outputs
5. Document build process

## Failure modes

If build pipeline is wrong:

- Invalid outputs generated
- Missing outputs
- Inconsistent naming
- Slow builds

## Out of scope

- Tool-specific build configs (see tool docs)
- Deployment strategies (focus on build)
- Build optimization (see performance docs)

