// docmd.config.js: basic config for docmd
module.exports = {
  siteTitle: "Variable Contract",
  srcDir: "docs",
  outputDir: "site",
  search: true,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
  theme: {
    name: "sky",
    defaultMode: "light",
    enableModeToggle: true,
    positionMode: "top",
  },
  autoTitleFromH1: true,
  copyCode: true,
  navigation: [
    { title: "Home", path: ".", icon: "home" },
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
        { title: "DTCG Alignment", path: "contract/dtcg-alignment", icon: "link" },
        { title: "Groups", path: "contract/groups", icon: "folder" },
        { title: "References", path: "contract/references", icon: "arrow-right" },
        { title: "Modes", path: "contract/modes", icon: "toggle-left" },
        { title: "Types", path: "contract/types", icon: "type" },
        { title: "Composite Types", path: "contract/composite-types", icon: "layers" },
        { title: "Naming", path: "contract/naming", icon: "tag" },
        { title: "Anatomy", path: "contract/anatomy", icon: "layers" },
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
          title: "Role: Design Systems Engineer",
          path: "governance/roles/design-systems-engineer",
          icon: "user",
        },
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
  ],
};
