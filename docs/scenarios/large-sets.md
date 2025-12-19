---
title: Scenarios - Large Variable Sets
---

# Large Variable Sets

How to handle large variable sets (100+ variables) with performance considerations.

If large sets are not organized correctly, you get slow builds, memory issues, and maintenance burden.

## Performance considerations

### Build time

Large variable sets can slow down:

- JSON parsing
- Reference resolution
- Output generation
- Validation

### Memory usage

Large variable sets consume:

- JSON parsing memory
- Reference resolution cache
- Output generation memory

### File organization

Poor file organization causes:

- Slow file discovery
- Difficult maintenance
- Merge conflicts

## File organization strategies

### Strategy 1: Category-based organization

Organize by variable category:

```
tokens/
  base/
    color.json
    spacing.json
    typography.json
    shadow.json
  semantic/
    color.json
    spacing.json
    typography.json
  component/
    button.json
    input.json
    card.json
```

Pros:

- Clear organization
- Easy to find variables
- Minimal merge conflicts

Cons:

- Some files may be large
- Cross-category references

### Strategy 2: Granular file organization

Split into smaller files:

```
tokens/
  base/
    color/
      gray.json
      brand.json
      semantic.json
    spacing/
      scale.json
      semantic.json
    typography/
      font-family.json
      font-size.json
      font-weight.json
```

Pros:

- Small files
- Fast parsing
- Minimal merge conflicts

Cons:

- More files to manage
- More complex structure

### Strategy 3: Component-based organization

Organize by component:

```
tokens/
  base/
    color.json
    spacing.json
  semantic/
    color.json
    spacing.json
  component/
    button/
      color.json
      spacing.json
      typography.json
    input/
      color.json
      spacing.json
      typography.json
```

Pros:

- Component-scoped organization
- Easy component updates

Cons:

- Potential duplication
- Cross-component references

## Reference resolution optimization

### Cache resolved references

Cache resolved references to avoid re-resolution:

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

### Lazy resolution

Resolve references only when needed:

```javascript
function resolveReferences(variables, mode) {
  // Only resolve references for requested mode
  return resolveMode(variables, mode);
}
```

### Parallel resolution

Resolve references in parallel:

```javascript
async function resolveReferencesParallel(variables) {
  const promises = variables.map((v) => resolveVariable(v));
  return Promise.all(promises);
}
```

## Build time optimization

### Incremental builds

Only rebuild changed files:

```javascript
function buildIncremental(changedFiles) {
  // Only process changed files
  return changedFiles.map((file) => processFile(file));
}
```

### Caching builds

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

### Parallel builds

Build outputs in parallel:

```javascript
async function buildParallel(platforms) {
  const promises = platforms.map((platform) => buildPlatform(platform));
  return Promise.all(promises);
}
```

## File size limits

### Recommended limits

- Single file: < 1000 variables
- Total variables: < 5000 variables
- File size: < 1MB JSON

### When to split

Split files when:

- Single file > 1000 variables
- File size > 1MB
- Build time > 10 seconds
- Memory usage > 100MB

## Examples

### Large color system

Organize large color system:

```
tokens/
  base/
    color/
      gray.json          # Gray scale (0-1000)
      brand.json         # Brand colors
      semantic.json      # Semantic colors
      status.json        # Status colors
  semantic/
    color/
      text.json          # Text colors
      surface.json       # Surface colors
      border.json        # Border colors
```

### Large spacing system

Organize large spacing system:

```
tokens/
  base/
    spacing/
      scale.json         # Base scale (xs-xl)
      semantic.json       # Semantic spacing
  semantic/
    spacing/
      layout.json        # Layout spacing
      component.json     # Component spacing
```

## Implementation rules

1. Organize by category or component
2. Keep files under 1000 variables
3. Use consistent naming
4. Cache resolved references
5. Reduce build time (parallelize, cache)

## Failure modes

If large set rules are not followed:

- Slow builds (> 30 seconds)
- High memory usage (> 500MB)
- Difficult maintenance
- Merge conflicts

## Out of scope

- Runtime performance (handle in consumption layer)
- Database storage (use version control)
- Variable management UI (use existing tools)
