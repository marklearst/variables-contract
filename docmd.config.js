// docmd.config.js: basic config for docmd
// basePath is "/variables-contract" for GitHub Pages
// Vercel deploys from gh-pages branch (same build) and uses rewrites
const basePath = "/variables-contract";
const siteUrl = "https://marklearst.github.io/variables-contract";

module.exports = {
  siteTitle: "Variables Contract",
  srcDir: "docs",
  outputDir: "site",
  basePath,
  siteUrl,
  search: true,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
  theme: {
    name: "default",
    defaultMode: "dark",
    enableModeToggle: true,
    positionMode: "top",
  },
  autoTitleFromH1: true,
  copyCode: true,
  navigation: [
    { title: "Home", path: ".", icon: "home" },
    {
      title: "Introduction",
      icon: "book",
      collapsible: true,
      children: [
        {
          title: "Why Variables",
          path: "introduction/why-variables",
          icon: "help-circle",
        },
        {
          title: "Comparison",
          path: "introduction/comparison",
          icon: "git-compare",
        },
        {
          title: "Positioning",
          path: "introduction/positioning",
          icon: "target",
        },
      ],
    },
    {
      title: "Contract",
      icon: "file-text",
      collapsible: true,
      children: [
        {
          title: "Variable Contract",
          path: "contract/variable-contract",
          icon: "file-text",
        },
        {
          title: "DTCG Alignment",
          path: "contract/dtcg-alignment",
          icon: "link",
        },
        { title: "Groups", path: "contract/groups", icon: "folder" },
        {
          title: "References",
          path: "contract/references",
          icon: "arrow-right",
        },
        { title: "Modes", path: "contract/modes", icon: "toggle-left" },
        { title: "Types", path: "contract/types", icon: "type" },
        {
          title: "Composite Types",
          path: "contract/composite-types",
          icon: "layers",
        },
        { title: "Naming", path: "contract/naming", icon: "tag" },
        { title: "Anatomy", path: "contract/anatomy", icon: "layers" },
      ],
    },
    {
      title: "Adoption",
      icon: "rocket",
      collapsible: true,
      children: [
        {
          title: "Getting Started",
          path: "adoption/getting-started",
          icon: "flag",
        },
        {
          title: "Implementation Checklist",
          path: "adoption/implementation-checklist",
          icon: "check-square",
        },
        {
          title: "Migration Strategy",
          path: "adoption/migration-strategy",
          icon: "arrow-right",
        },
      ],
    },
    {
      title: "Governance",
      icon: "shield",
      collapsible: true,
      children: [
        { title: "Governance Index", path: "governance", icon: "list" },
        { title: "Overview", path: "governance/overview", icon: "book-open" },
        {
          title: "Getting Started",
          path: "governance/getting-started",
          icon: "flag",
        },
        {
          title: "Accessibility",
          path: "governance/accessibility",
          icon: "eye",
        },
        {
          title: "Change Control",
          path: "governance/change-control",
          icon: "git-branch",
        },
        {
          title: "Validation",
          path: "governance/validation",
          icon: "check-circle",
        },
        {
          title: "Versioning",
          path: "governance/versioning",
          icon: "tag",
        },
        {
          title: "Migration",
          path: "governance/migration",
          icon: "arrow-right",
        },
        {
          title: "Troubleshooting",
          path: "governance/troubleshooting",
          icon: "help-circle",
        },
        {
          title: "Roles",
          icon: "users",
          collapsible: true,
          children: [
            {
              title: "Designer",
              path: "governance/roles/designer",
              icon: "pen-tool",
            },
            {
              title: "Design Engineer",
              path: "governance/roles/design-engineer",
              icon: "user",
            },
            {
              title: "Frontend Developer",
              path: "governance/roles/frontend-developer",
              icon: "code",
            },
          ],
        },
      ],
    },
    {
      title: "Scenarios",
      icon: "layers",
      collapsible: true,
      children: [
        {
          title: "Multi-Brand",
          path: "scenarios/multi-brand",
          icon: "palette",
        },
        {
          title: "Multi-Theme",
          path: "scenarios/multi-theme",
          icon: "toggle-left",
        },
        { title: "Large Sets", path: "scenarios/large-sets", icon: "database" },
        {
          title: "Component Integration",
          path: "scenarios/component-integration",
          icon: "package",
        },
      ],
    },
    {
      title: "Tooling",
      icon: "wrench",
      collapsible: true,
      children: [
        { title: "Ecosystem", path: "tooling/ecosystem", icon: "grid" },
        { title: "CI/CD", path: "tooling/ci-cd", icon: "git-branch" },
        {
          title: "Build Pipelines",
          path: "tooling/build-pipelines",
          icon: "settings",
        },
        { title: "Figma", path: "adapters/figma", icon: "pen-tool" },
        {
          title: "Tokens Studio",
          path: "adapters/tokens-studio",
          icon: "sliders",
        },
        {
          title: "Style Dictionary",
          path: "adapters/style-dictionary",
          icon: "code",
        },
      ],
    },
    {
      title: "Consumption",
      icon: "code",
      collapsible: true,
      children: [
        { title: "CSS", path: "consumption/css", icon: "file-code" },
        { title: "TypeScript", path: "consumption/typescript", icon: "type" },
        { title: "Frameworks", path: "consumption/frameworks", icon: "layers" },
      ],
    },
    {
      title: "Design",
      icon: "pen-tool",
      collapsible: true,
      children: [
        { title: "Figma Naming", path: "design/figma-naming", icon: "tag" },
        {
          title: "Figma Workflow",
          path: "design/figma-workflow",
          icon: "workflow",
        },
        {
          title: "Component Variables",
          path: "design/component-variables",
          icon: "package",
        },
      ],
    },
    {
      title: "Testing",
      icon: "check-circle",
      collapsible: true,
      children: [
        {
          title: "Validation",
          path: "testing/validation",
          icon: "check-square",
        },
        {
          title: "Visual Regression",
          path: "testing/visual-regression",
          icon: "image",
        },
        {
          title: "Consumption Tests",
          path: "testing/consumption-tests",
          icon: "test-tube",
        },
      ],
    },
    {
      title: "Patterns",
      icon: "layers",
      collapsible: true,
      children: [
        {
          title: "Multi-Brand Architecture",
          path: "patterns/multi-brand-architecture",
          icon: "palette",
        },
        {
          title: "Theme Composition",
          path: "patterns/theme-composition",
          icon: "toggle-left",
        },
        { title: "Performance", path: "patterns/performance", icon: "zap" },
      ],
    },
    {
      title: "Adapters",
      icon: "wrench",
      collapsible: true,
      children: [
        { title: "Adapters Overview", path: "adapters", icon: "list" },
        { title: "Figma", path: "adapters/figma", icon: "pen-tool" },
        {
          title: "Tokens Studio",
          path: "adapters/tokens-studio",
          icon: "sliders",
        },
        {
          title: "Style Dictionary",
          path: "adapters/style-dictionary",
          icon: "code",
        },
        {
          title: "Tailwind",
          path: "adapters/tailwind",
          icon: "wind",
        },
      ],
    },
    {
      title: "Examples",
      icon: "code",
      collapsible: true,
      children: [
        {
          title: "Figma Export JSON",
          path: "examples/figma-export",
          icon: "file-code",
        },
        {
          title: "DTCG Compliant Example",
          path: "examples/dtcg-compliant",
          icon: "file-code",
        },
        {
          title: "Adapter Pipeline",
          path: "examples/adapter-pipeline",
          icon: "arrow-right",
        },
      ],
    },
    {
      title: "Reference",
      icon: "book",
      collapsible: true,
      children: [
        { title: "Glossary", path: "reference/glossary", icon: "book-open" },
        {
          title: "Quick Reference",
          path: "reference/quick-reference",
          icon: "zap",
        },
        {
          title: "Conformance",
          path: "reference/conformance",
          icon: "check-circle",
        },
      ],
    },
    {
      title: "FAQ",
      icon: "help-circle",
      path: "faq",
    },
  ],
};
