---
title: Testing - Visual Regression
---

# Visual Regression Testing

How to test variable changes with visual regression testing.

## Visual regression testing

### Screenshot comparison

Compare screenshots before and after variable changes:

1. Take screenshot of component with old variables
2. Update variables
3. Take screenshot of component with new variables
4. Compare screenshots
5. Flag differences

### Mode switching tests

Test mode switching visually:

1. Take screenshot in light mode
2. Switch to dark mode
3. Take screenshot in dark mode
4. Compare mode differences
5. Verify mode switching works

## Component testing

### Test individual components

Test components with variable changes:

1. Render component with variables
2. Take screenshot
3. Update variables
4. Re-render component
5. Compare screenshots

### Test component states

Test component states:

1. Default state
2. Hover state
3. Focus state
4. Disabled state
5. Error state

## Tools

### Playwright

Use Playwright for visual regression:

```javascript
import { test, expect } from '@playwright/test';

test('button visual regression', async ({ page }) => {
  await page.goto('/button');
  await expect(page).toHaveScreenshot('button.png');
});
```

### Chromatic

Use Chromatic for component visual testing:

```javascript
import { Button } from './Button';

export default {
  component: Button,
  parameters: {
    chromatic: { viewports: [320, 768, 1024] }
  }
};
```

### Percy

Use Percy for visual testing:

```javascript
import percySnapshot from '@percy/playwright';

test('button visual test', async ({ page }) => {
  await page.goto('/button');
  await percySnapshot(page, 'Button');
});
```

## Best practices

1. Test critical components
2. Test all modes
3. Test all states
4. Use consistent viewports
5. Review differences carefully

## Failure modes

If visual regression testing fails:

- Visual changes go unnoticed
- Mode switching breaks
- Component states break
- Inconsistent styling

## Out of scope

- Test framework setup (see tool docs)
- Component rendering (separate concern)
- Test infrastructure (separate concern)

