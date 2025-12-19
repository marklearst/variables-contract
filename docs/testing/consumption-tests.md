---
title: Testing - Consumption Tests
---

# Testing Generated Outputs

How to test CSS variables, TypeScript types, and framework integration.

## CSS variable tests

### Test CSS variable generation

Test that CSS variables are generated correctly:

```javascript
import fs from 'fs';

function testCSSGeneration() {
  const css = fs.readFileSync('dist/variables.css', 'utf8');

  // Test variables exist
  expect(css).toContain('--color-surface-brand');
  expect(css).toContain('--color-text-primary');

  // Test values are correct
  expect(css).toMatch(/--color-surface-brand:\s*#0066cc/);
  expect(css).toMatch(/--color-text-primary:\s*#000000/);
}
```

### Test mode-specific CSS

Test mode-specific CSS generation:

```javascript
function testModeSpecificCSS() {
  const lightCSS = fs.readFileSync('dist/variables-light.css', 'utf8');
  const darkCSS = fs.readFileSync('dist/variables-dark.css', 'utf8');

  // Test light mode
  expect(lightCSS).toMatch(/--color-surface:\s*#ffffff/);

  // Test dark mode
  expect(darkCSS).toMatch(/--color-surface:\s*#000000/);
}
```

## TypeScript type tests

### Test type generation

Test that TypeScript types are generated correctly:

```typescript
import { color, spacing } from './dist/tokens';

// Test types exist
expect(color).toBeDefined();
expect(spacing).toBeDefined();

// Test type structure
expect(color.surface.brand).toBe('#0066cc');
expect(spacing.component.button.padding).toBe('16px');
```

### Test type safety

Test type safety:

```typescript
// This should compile
const brandColor: string = color.surface.brand;

// This should not compile (if types are strict)
// const invalidColor: number = color.surface.brand;
```

## Framework integration tests

### React integration test

Test React component with variables:

```jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('button uses variables', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');

  expect(button).toHaveStyle({
    backgroundColor: 'var(--color-surface-brand)',
    color: 'var(--color-text-primary)'
  });
});
```

### Vue integration test

Test Vue component with variables:

```javascript
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

test('button uses variables', () => {
  const wrapper = mount(Button);
  const button = wrapper.find('button');

  expect(button.element.style.backgroundColor).toBe('var(--color-surface-brand)');
  expect(button.element.style.color).toBe('var(--color-text-primary)');
});
```

## Best practices

1. Test CSS generation
2. Test TypeScript types
3. Test framework integration
4. Test mode-specific outputs
5. Test reference resolution

## Failure modes

If consumption tests fail:

- Generated outputs are wrong
- Types are incorrect
- Framework integration breaks
- Mode switching fails

## Out of scope

- Test framework setup (see tool docs)
- Component testing (separate concern)
- E2E testing (separate concern)

