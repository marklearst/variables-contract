#!/usr/bin/env node

/**
 * Version Synchronization Script
 * 
 * Reads version from package.json and updates version numbers in:
 * - README.md
 * - docs/index.md
 * - docs/faq.md
 * - docs/meta/change-log.md
 */

const fs = require('fs');
const path = require('path');

// Read version from package.json
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

if (!version) {
  console.error('Error: No version found in package.json');
  process.exit(1);
}

console.log(`Syncing version ${version} across documentation files...\n`);

// Define files and their patterns
const files = [
  {
    path: path.join(__dirname, '..', 'README.md'),
    patterns: [
      {
        regex: /\*\*Version:\*\* \d+\.\d+\.\d+/,
        replacement: `**Version:** ${version}`
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'index.md'),
    patterns: [
      {
        regex: /\| \*\*Version\*\*    \| \d+\.\d+\.\d+/,
        replacement: `| **Version**    | ${version}`
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'faq.md'),
    patterns: [
      {
        regex: /Version \d+\.\d+\.\d+ is in Draft status/,
        replacement: `Version ${version} is in Draft status`
      }
    ]
  },
  {
    path: path.join(__dirname, '..', 'docs', 'meta', 'change-log.md'),
    patterns: [
      {
        regex: /## Version \d+\.\d+\.\d+ \(Current\)/,
        replacement: `## Version ${version} (Current)`
      }
    ]
  }
];

let updatedCount = 0;

// Process each file
files.forEach(({ path: filePath, patterns }) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileUpdated = false;

  patterns.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      fileUpdated = true;
    }
  });

  if (fileUpdated) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`✓ Updated ${relativePath}`);
    updatedCount++;
  } else {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`- No changes needed in ${relativePath}`);
  }
});

console.log(`\nSync complete. Updated ${updatedCount} file(s).`);
