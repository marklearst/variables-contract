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
          title: "Role: Design Systems Engineer",
          path: "governance/roles/design-systems-engineer",
          icon: "user",
        },
      ],
    },
    {
      title: "Tooling",
      icon: "wrench",
      collapsible: true,
      children: [
        { title: "Figma", path: "tooling/figma", icon: "pen-tool" },
        {
          title: "Tokens Studio",
          path: "tooling/tokens-studio",
          icon: "sliders",
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
      ],
    },
  ],
};
