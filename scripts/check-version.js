#!/usr/bin/env node

/**
 * Version Check Script
 * 
 * Validates that version numbers in documentation files match package.json version.
 * Exits with error code 1 if mismatches are found (for CI).
 */

const fs = require('fs');
const path = require('path');

// Read version from package.json
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const expectedVersion = pkg.version;

if (!expectedVersion) {
  console.error('Error: No version found in package.json');
  process.exit(1);
}

console.log(`Checking version consistency (expected: ${expectedVersion})...\n`);

// Define files and their patterns to check
const files = [
  {
    path: path.join(__dirname, '..', 'README.md'),
    patterns: [
      {
        regex: /\*\*Version:\*\* (\d+\.\d+\.\d+)/,
        name: 'Version field'
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'index.md'),
    patterns: [
      {
        regex: /\| \*\*Version\*\*    \| (\d+\.\d+\.\d+)/,
        name: 'Version field'
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'faq.md'),
    patterns: [
      {
        regex: /Version (\d+\.\d+\.\d+) is in Draft status/,
        name: 'Production-ready answer'
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'meta', 'change-log.md'),
    patterns: [
      {
        regex: /## Version (\d+\.\d+\.\d+) \(Current\)/,
        name: 'Current version header'
      }
    ]
  }
];

let hasMismatches = false;

// Check each file
files.forEach(({ path: filePath, patterns }) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);

  patterns.forEach(({ regex, name }) => {
    const match = content.match(regex);
    if (match) {
      const foundVersion = match[1];
      if (foundVersion !== expectedVersion) {
        console.error(`✗ ${relativePath} (${name}): Found ${foundVersion}, expected ${expectedVersion}`);
        hasMismatches = true;
      } else {
        console.log(`✓ ${relativePath} (${name}): ${foundVersion}`);
      }
    } else {
      console.warn(`⚠ ${relativePath} (${name}): Pattern not found`);
    }
  });
});

console.log('');

if (hasMismatches) {
  console.error('Version mismatch detected! Run "pnpm run version:sync" to fix.');
  process.exit(1);
} else {
  console.log('All version numbers are in sync.');
  process.exit(0);
}
