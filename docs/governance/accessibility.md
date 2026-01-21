---
title: Governance - Accessibility
---

# Variable Governance - Accessibility

Accessibility is a constraint on variables, not an afterthought. Variables should make accessible defaults easier to ship, not easier to bypass.

## What variables should encode

1. Color and contrast: Semantic color variables should be chosen so common UI combinations can meet contrast requirements.
2. Focus visibility: Variables for focus rings (color, width, offset) should exist and be used consistently.
3. Motion: Duration and easing variables should support reduced motion modes.
4. Typography: Font sizes and line heights should avoid unreadable defaults.

## Review expectations

When a variable changes:

1. Identify impacted UI states (default, hover, active, disabled, focus).
2. Verify contrast for intended pairings (text on surface, icon on surface, borders).
3. Confirm focus variables remain visible across themes/modes.
4. If the change affects motion variables, confirm reduced motion behavior.
