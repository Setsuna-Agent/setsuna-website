import type { Messages } from "./zh-CN";

export const en: Messages = {
  metadata: {
    title: "Setsuna Desktop — Open-source AI coding assistant",
    description:
      "Setsuna is an open-source desktop AI coding assistant. Bring AI conversations, code changes, pull requests, and development tools into one workspace on macOS and Windows.",
    openGraphDescription:
      "An open-source desktop AI coding assistant for macOS and Windows.",
  },
  common: {
    home: "Setsuna home",
    skipToContent: "Skip to main content",
  },
  header: {
    navigation: "Main navigation",
    features: "Features",
    workspace: "Workspace",
    download: "Download",
    source: "View source on GitHub",
  },
  hero: {
    description: "Your open-source desktop AI coding assistant.",
    download: "Download Setsuna",
    explore: "Explore the app",
  },
  features: {
    title: "Features",
    items: {
      conversation: {
        title: "Project chat",
        description:
          "Work on code and terminal tasks with your project in context.",
      },
      files: {
        title: "File management",
        description:
          "Browse, search, edit, and preview files. Manage your project folders.",
      },
      browser: {
        title: "Browser & CDP",
        description:
          "Read pages, click, type, and capture screenshots in the built-in browser via CDP.",
      },
      localTools: {
        title: "Local tools",
        description:
          "Read and write files, apply patches, and run shell commands on your machine.",
      },
      review: {
        title: "Code review",
        description: "Inspect code diffs and manage pull requests.",
      },
      models: {
        title: "Model selection",
        description: "Connect and switch between the model providers you use.",
      },
      proxy: {
        title: "Proxy servers",
        description:
          "Manage proxies with separate routes for models, browsing, and backups.",
      },
      webdav: {
        title: "WebDAV backups",
        description:
          "Encrypt and back up chats, memories, and settings to WebDAV. Restore when needed.",
      },
      extensions: {
        title: "Extensions",
        description: "Add tools through plugins, Skills, and MCP.",
      },
    },
  },
  workspace: {
    title: "Workspace",
    tabsLabel: "App previews",
    items: {
      conversation: {
        label: "Chat",
        alt: "Setsuna project sidebar, AI code review conversation, and developer tools panel",
      },
      changes: {
        label: "Changes",
        alt: "AI conversation, code diff, and Git commit panel side by side in Setsuna",
      },
      review: {
        label: "Pull Request",
        alt: "Setsuna pull request workspace with a PR list, file diffs, and check results",
      },
    },
  },
  download: {
    title: "Download Setsuna Desktop",
    action: "Download",
    checksums: "SHA256 checksums",
    allFiles: "All downloads",
  },
  footer: {
    navigation: "Footer navigation",
    docs: "Docs",
    feedback: "Feedback",
    backToTop: "Back to top ↑",
  },
};
