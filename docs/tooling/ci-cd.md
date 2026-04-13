---
title: Tooling: CI/CD Integration
---

# CI/CD Integration

Scope: CI/CD integration for Variable Design Standard (VDS) validation and builds.

Failure if ignored: invalid variables ship and breaking changes go unnoticed.

## Workflow

1. Validate token JSON on every PR.
2. Build outputs after validation.
3. Deploy outputs only after validation and build succeed.

## CI/CD patterns

### Pattern 1: Validation only

Validate Variable Design Standard (VDS) JSON on every PR.

Use when:

- Variables are consumed manually
- Build happens separately
- Focus on validation

### Pattern 2: Validation + build

Validate and build outputs on every PR.

Use when:

- Outputs are generated automatically
- Outputs are committed to repo
- Focus on complete pipeline

### Pattern 3: Validation + build + deploy

Validate, build, and deploy outputs.

Use when:

- Outputs are published automatically
- Outputs are consumed from CDN/NPM
- Focus on automation

## GitHub Actions

### Basic validation workflow

```yaml
name: Validate Variables

on:
  pull_request:
    paths:
      - "tokens/**/*.json"

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm install
      - name: Validate variables
        run: npm run validate:tokens
```

### Validation + build workflow

```yaml
name: Validate and Build Variables

on:
  pull_request:
    paths:
      - "tokens/**/*.json"

jobs:
  validate-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm install
      - name: Validate variables
        run: npm run validate:tokens
      - name: Build outputs
        run: npm run build:tokens
      - name: Check for changes
        run: |
          git diff --exit-code dist/ || (echo "Output files changed" && exit 1)
```

### Validation + build + deploy workflow

```yaml
name: Validate, Build, and Deploy Variables

on:
  push:
    branches: [main]
    paths:
      - "tokens/**/*.json"

jobs:
  validate-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm install
      - name: Validate variables
        run: npm run validate:tokens
      - name: Build outputs
        run: npm run build:tokens
      - name: Deploy to NPM
        run: |
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## GitLab CI

### Basic validation pipeline

```yaml
validate-variables:
  stage: validate
  script:
    - npm install
    - npm run validate:tokens
  only:
    changes:
      - tokens/**/*.json
```

### Validation + build pipeline

```yaml
validate-and-build:
  stage: build
  script:
    - npm install
    - npm run validate:tokens
    - npm run build:tokens
  artifacts:
    paths:
      - dist/
  only:
    changes:
      - tokens/**/*.json
```

## Pre-commit hooks

### Husky setup

Install Husky:

```bash
npm install --save-dev husky
npx husky install
```

Create pre-commit hook:

```bash
npx husky add .husky/pre-commit "npm run validate:tokens"
```

### Pre-commit config

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: local
    hooks:
      - id: validate-variables
        name: Validate Variable Design Standard (VDS)
        entry: npm run validate:tokens
        language: system
        files: 'tokens/.*\.json$'
```

Install:

```bash
pip install pre-commit
pre-commit install
```

## Validation script

Create `scripts/validate.js`:

```javascript
const fs = require("fs");
const path = require("path");
const { validate } = require("@dtcg/validator");

const tokensDir = path.join(__dirname, "../tokens");
const files = getAllJsonFiles(tokensDir);

let hasErrors = false;

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(file, "utf8"));
  const errors = validate(content);

  if (errors.length > 0) {
    console.error(`Errors in ${file}:`);
    errors.forEach((error) => console.error(`  - ${error.message}`));
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exit(1);
}

function getAllJsonFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "validate:tokens": "node scripts/validate.js"
  }
}
```

## Build script

Create `scripts/build.js`:

```javascript
const StyleDictionary = require("style-dictionary");

const sd = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    typescript: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
  },
});

sd.buildAllPlatforms();
```

Add to `package.json`:

```json
{
  "scripts": {
    "build:tokens": "node scripts/build.js"
  }
}
```

## Implementation rules

1. Validate on every PR
2. Build outputs automatically
3. Fail fast on validation errors
4. Cache dependencies in CI
5. Run validation before build

## Review checklist

- [ ] Validation runs on every PR
- [ ] Builds run only after validation passes
- [ ] Outputs are checked for changes

## Failure modes

If CI/CD is not set up:

- Invalid variables ship to production
- Breaking changes go unnoticed
- Outputs are out of sync
- No validation history

## Out of scope

- Tool-specific CI/CD setup (see tool docs)
- Deployment strategies (focus on validation/build)
- Monitoring and alerting (separate concern)

## Ownership

- Frontend Engineer: owns CI configuration
- Design Engineer: defines validation rules

## Links

- [Validation](../governance/validation)
- [Build Pipelines](build-pipelines)
