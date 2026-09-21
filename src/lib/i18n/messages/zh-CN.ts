export const zhCN = {
  metadata: {
    title: "Setsuna Desktop — 开源的桌面 AI 编程助手",
    description:
      "Setsuna 是开源的桌面 AI 编程助手。将 AI 对话、代码变更、Pull Request 与开发工具汇集于一个专注的工作空间，支持 macOS 与 Windows。",
    openGraphDescription: "开源的桌面 AI 编程助手，支持 macOS 与 Windows。",
  },
  common: {
    home: "Setsuna 首页",
    skipToContent: "跳转到主要内容",
  },
  header: {
    navigation: "主导航",
    features: "产品能力",
    workspace: "工作空间",
    download: "下载",
    source: "在 GitHub 查看源码",
  },
  hero: {
    description: "开源的桌面 AI 编程助手。",
    download: "下载 Setsuna",
    explore: "查看界面",
  },
  features: {
    title: "产品能力",
    items: {
      conversation: {
        title: "项目对话",
        description: "结合项目上下文，处理代码与终端任务。",
      },
      files: {
        title: "文件管理",
        description: "浏览、搜索项目文件，直接编辑、预览与管理目录。",
      },
      browser: {
        title: "浏览器 CDP",
        description: "内置浏览器，通过 CDP 读取页面、点击、输入与截图。",
      },
      localTools: {
        title: "本地工具",
        description: "文件读写、补丁修改与 Shell 命令，直接在本机执行。",
      },
      review: {
        title: "代码审查",
        description: "查看代码差异，管理 Pull Request。",
      },
      models: {
        title: "模型选择",
        description: "连接并切换你使用的模型服务。",
      },
      proxy: {
        title: "代理服务器",
        description: "管理代理服务器，为模型、浏览器与同步分别配置路由。",
      },
      webdav: {
        title: "WebDAV 备份",
        description: "加密备份对话、记忆与配置到 WebDAV，按需手动还原。",
      },
      extensions: {
        title: "工具扩展",
        description: "通过插件、Skills 和 MCP 接入工具。",
      },
    },
  },
  workspace: {
    title: "工作空间",
    tabsLabel: "产品界面",
    items: {
      conversation: {
        label: "对话",
        alt: "Setsuna 的项目侧栏、AI 代码审查对话与开发工具面板",
      },
      changes: {
        label: "代码变更",
        alt: "Setsuna 中并排显示的 AI 对话、代码变更 diff 与 Git 提交面板",
      },
      review: {
        label: "Pull Request",
        alt: "Setsuna Pull Request 工作区展示 PR 列表、文件差异和检查结果",
      },
    },
  },
  download: {
    title: "下载 Setsuna Desktop",
    action: "下载",
    checksums: "SHA256 校验文件",
    allFiles: "全部文件",
  },
  footer: {
    navigation: "页脚导航",
    docs: "文档",
    feedback: "反馈",
    backToTop: "回到顶部 ↑",
  },
};

export type Messages = typeof zhCN;
