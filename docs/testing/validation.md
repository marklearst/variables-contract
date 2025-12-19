---
title: Testing - Validation
---

# Testing Variable Changes

How to test variable changes and validate references, types, and modes.

## Reference validation tests

### Test reference resolution

Test that all references resolve:

```javascript
function testReferenceResolution(variables) {
  const errors = [];

  for (const [path, variable] of Object.entries(variables)) {
    if (typeof variable.$value === 'string' && variable.$value.startsWith('{')) {
      const referencedPath = variable.$value.slice(1, -1);
      if (!variables[referencedPath]) {
        errors.push(`Reference ${variable.$value} in ${path} does not resolve`);
      }
    }
  }

  return errors;
}
```

### Test circular references

Test for circular references:

```javascript
function testCircularReferences(variables) {
  const visited = new Set();
  const recursionStack = new Set();
  const errors = [];

  function checkCircular(path, variable) {
    if (recursionStack.has(path)) {
      errors.push(`Circular reference detected: ${path}`);
      return;
    }

    if (visited.has(path)) {
      return;
    }

    visited.add(path);
    recursionStack.add(path);

    if (typeof variable.$value === 'string' && variable.$value.startsWith('{')) {
      const referencedPath = variable.$value.slice(1, -1);
      if (variables[referencedPath]) {
        checkCircular(referencedPath, variables[referencedPath]);
      }
    }

    recursionStack.delete(path);
  }

  for (const [path, variable] of Object.entries(variables)) {
    checkCircular(path, variable);
  }

  return errors;
}
```

## Type validation tests

### Test type correctness

Test that `$value` matches `$type`:

```javascript
function testTypeCorrectness(variables) {
  const errors = [];

  for (const [path, variable] of Object.entries(variables)) {
    const type = variable.$type;
    const value = variable.$value;

    if (type === 'color' && !isValidColor(value)) {
      errors.push(`Invalid color value in ${path}: ${value}`);
    }

    if (type === 'dimension' && !isValidDimension(value)) {
      errors.push(`Invalid dimension value in ${path}: ${value}`);
    }

    // Add more type checks
  }

  return errors;
}

function isValidColor(value) {
  return /^#[0-9A-Fa-f]{6}$/.test(value) ||
         /^rgba?\(/.test(value) ||
         value.startsWith('{');
}

function isValidDimension(value) {
  return /^\d+px$/.test(value) ||
         /^\d+rem$/.test(value) ||
         value.startsWith('{');
}
```

## Mode consistency tests

### Test mode consistency

Test that modes are consistent within collections:

```javascript
function testModeConsistency(variables) {
  const errors = [];
  const collectionModes = new Map();

  // Collect mode keys per collection
  for (const [path, variable] of Object.entries(variables)) {
    const collection = path.split('.')[0];

    if (typeof variable.$value === 'object' && variable.$value !== null) {
      const modeKeys = Object.keys(variable.$value);

      if (!collectionModes.has(collection)) {
        collectionModes.set(collection, modeKeys);
      } else {
        const expectedModes = collectionModes.get(collection);
        if (JSON.stringify(modeKeys.sort()) !== JSON.stringify(expectedModes.sort())) {
          errors.push(`Mode mismatch in ${path}: expected ${expectedModes}, got ${modeKeys}`);
        }
      }
    }
  }

  return errors;
}
```

## Naming validation tests

### Test naming convention

Test that names follow naming convention:

```javascript
function testNamingConvention(variables) {
  const errors = [];

  for (const path of Object.keys(variables)) {
    const segments = path.split('.');

    // Check lowercase
    if (path !== path.toLowerCase()) {
      errors.push(`Path ${path} is not lowercase`);
    }

    // Check dot-separated
    if (path.includes('-') || path.includes('_')) {
      errors.push(`Path ${path} should use dots, not hyphens or underscores`);
    }

    // Check no platform prefixes
    if (segments[0].startsWith('web-') || segments[0].startsWith('ios-')) {
      errors.push(`Path ${path} should not include platform prefix`);
    }
  }

  return errors;
}
```

## Complete test suite

### Test all validations

Run all validation tests:

```javascript
function testVariableContract(variables) {
  const errors = [];

  errors.push(...testReferenceResolution(variables));
  errors.push(...testCircularReferences(variables));
  errors.push(...testTypeCorrectness(variables));
  errors.push(...testModeConsistency(variables));
  errors.push(...testNamingConvention(variables));

  return errors;
}
```

## Best practices

1. Test reference resolution
2. Test circular references
3. Test type correctness
4. Test mode consistency
5. Test naming convention

## Failure modes

If validation tests fail:

- Invalid variables ship
- Breaking changes go unnoticed
- References break
- Types mismatch

## Out of scope

- Visual regression testing (see visual regression docs)
- Consumption testing (see consumption tests docs)
- Performance testing (see performance docs)

