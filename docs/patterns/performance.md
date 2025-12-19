---
title: Patterns - Performance Optimization
---

# Performance Optimization

How to optimize Variable Contract for large variable sets and fast builds.

## Performance considerations

### Build time

Large variable sets can slow builds:

- JSON parsing
- Reference resolution
- Output generation

### Memory usage

Large sets consume memory:

- JSON parsing
- Reference cache
- Output generation

### File organization

Poor organization causes:

- Slow file discovery
- Merge conflicts
- Maintenance burden

## Optimization strategies

### File organization

Organize files efficiently:

```
tokens/
  base/
    color/
      gray.json        # < 100 variables
      brand.json       # < 50 variables
    spacing/
      scale.json       # < 50 variables
  semantic/
    color.json         # < 100 variables
    spacing.json       # < 50 variables
```

Keep files under 1000 variables each.

### Reference caching

Cache resolved references:

```javascript
const referenceCache = new Map();

function resolveReference(path, variables) {
  if (referenceCache.has(path)) {
    return referenceCache.get(path);
  }

  const resolved = resolve(path, variables);
  referenceCache.set(path, resolved);
  return resolved;
}
```

### Incremental builds

Only rebuild changed files:

```javascript
function buildIncremental(changedFiles) {
  return changedFiles.map(file => processFile(file));
}
```

### Parallel processing

Process files in parallel:

```javascript
async function processFilesParallel(files) {
  const promises = files.map(file => processFile(file));
  return Promise.all(promises);
}
```

## Build optimization

### Caching

Cache build outputs:

```javascript
const buildCache = new Map();

function buildWithCache(variables) {
  const cacheKey = hash(variables);
  if (buildCache.has(cacheKey)) {
    return buildCache.get(cacheKey);
  }

  const output = build(variables);
  buildCache.set(cacheKey, output);
  return output;
}
```

### Lazy resolution

Resolve references only when needed:

```javascript
function resolveMode(variables, mode) {
  // Only resolve for requested mode
  return resolveReferencesForMode(variables, mode);
}
```

## Best practices

1. Organize files efficiently
2. Cache resolved references
3. Use incremental builds
4. Process in parallel
5. Optimize build pipeline

## Failure modes

If performance is not optimized:

- Slow builds (> 30 seconds)
- High memory usage (> 500MB)
- Difficult maintenance
- Poor developer experience

## Out of scope

- Runtime performance (handle in consumption layer)
- Database optimization (use version control)
- Network optimization (separate concern)

