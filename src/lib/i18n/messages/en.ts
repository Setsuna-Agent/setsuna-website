import type { Messages } from "./zh-CN";

export const en: Messages = {
  metadata: {
    title: "Setsuna Desktop — Open-source AI coding assistant",
    description:
      "Setsuna is an open-source desktop AI coding assistant for macOS and Windows. Code, review pull requests, schedule local tasks, control desktop apps, and build sidebar apps in one workspace.",
    openGraphDescription:
      "An open-source desktop AI coding assistant with code review, local automations, and an app builder.",
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
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
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
          "Code with project context. Search or fork chats and continue in a separate window or Git worktree.",
      },
      files: {
        title: "File management",
        description:
          "Browse, search, and edit project files. Preview Markdown and images, and manage folders.",
      },
      browser: {
        title: "Built-in browser",
        description:
          "Control pages via CDP, annotate elements, and autofill passwords. Install or import compatible Chrome extensions.",
      },
      computerControl: {
        title: "Computer control",
        description:
          "Enable screenshots, clicks, typing, and scrolling to let AI operate macOS or Windows apps.",
      },
      automations: {
        title: "Local automations",
        description:
          "Schedule local tasks from chat or a form. Run while Setsuna is open and revisit execution history.",
      },
      appBuilder: {
        title: "App builder",
        description:
          "Turn a template or idea into a sidebar app. Refine it in chat and reference it with @.",
      },
      localTools: {
        title: "Local tools",
        description:
          "Read and write files, apply patches, and run shell commands on your machine.",
      },
      review: {
        title: "Code review",
        description:
          "Inspect code diffs and Markdown previews. Manage pull requests and check results.",
      },
      models: {
        title: "Model selection",
        description:
          "Connect model providers, switch models, and adjust reasoning effort.",
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
        description:
          "Extend tasks with plugins, Skills, MCP, and Hooks. View their execution records in chat.",
      },
    },
  },
  workspace: {
    title: "Workspace",
    preview: {
      open: "Enlarge",
      close: "Close preview",
      previous: "Previous image",
      next: "Next image",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      fit: "Fit to window",
      rotateLeft: "Rotate left",
      rotateRight: "Rotate right",
    },
    items: {
      home: {
        title: "New chat",
        alt: "Setsuna Desktop new chat screen with projects, workspace selection, and model selection",
      },
      conversation: {
        title: "Coding workspace",
        alt: "Setsuna Desktop coding workspace with an AI conversation, code review, and integrated terminal side by side",
      },
      review: {
        title: "Pull Request",
        alt: "Setsuna Desktop pull request workspace with a PR list, file diffs, and check results",
      },
      automations: {
        title: "Automations",
        alt: "Setsuna Desktop automations page with a scheduled task composer and execution history sidebar",
      },
      plugins: {
        title: "Plugins",
        alt: "Setsuna Desktop plugin catalog with installed and featured plugins, plus Skills and MCP navigation",
      },
      appBuilder: {
        title: "App builder",
        alt: "Setsuna Desktop app creation dialog with table, data collection, ECharts, and custom idea templates",
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
