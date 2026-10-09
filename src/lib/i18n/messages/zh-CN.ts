export const zhCN = {
  metadata: {
    title: "Setsuna Desktop — 开源的桌面 AI 编程助手",
    description:
      "Setsuna 是开源的桌面 AI 编程助手，支持 macOS 与 Windows。集成项目对话、代码审查、内置浏览器、电脑控制、本地自动化与应用构建。",
    openGraphDescription:
      "集代码审查、本地自动化与应用构建于一体的开源桌面 AI 编程助手。",
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
    lightMode: "切换为日间模式",
    darkMode: "切换为夜间模式",
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
        description:
          "结合项目上下文编程，搜索或分叉对话，在独立窗口和 Git worktree 中继续。",
      },
      files: {
        title: "文件管理",
        description:
          "浏览、搜索与编辑项目文件，预览 Markdown 和图片，管理项目目录。",
      },
      browser: {
        title: "内置浏览器",
        description:
          "CDP 网页操作、批注与密码填充，支持安装或导入兼容的 Chrome 扩展。",
      },
      computerControl: {
        title: "电脑控制",
        description:
          "按需启用截图、点击、输入与滚动，让 AI 操作 macOS 或 Windows 应用。",
      },
      automations: {
        title: "本地自动化",
        description:
          "通过对话或表单创建本机定时任务，在应用运行时执行，并查看运行记录。",
      },
      appBuilder: {
        title: "应用构建",
        description:
          "从模板或想法创建侧栏应用，通过对话持续修改，并用 @ 引用。",
      },
      localTools: {
        title: "本地工具",
        description: "文件读写、补丁修改与 Shell 命令，直接在本机执行。",
      },
      review: {
        title: "代码审查",
        description:
          "查看代码差异与 Markdown 预览，管理 Pull Request 和检查结果。",
      },
      models: {
        title: "模型选择",
        description: "连接模型供应商，切换模型并设置思考强度。",
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
        description:
          "通过插件、Skills、MCP 和 Hook 扩展任务流程，在对话中查看执行记录。",
      },
    },
  },
  workspace: {
    title: "工作空间",
    preview: {
      open: "放大查看",
      close: "关闭预览",
      previous: "上一张",
      next: "下一张",
      zoomIn: "放大",
      zoomOut: "缩小",
      fit: "适应窗口",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
    },
    items: {
      home: {
        title: "新对话",
        alt: "Setsuna Desktop 新对话页面，展示项目列表、工作区选择与模型选择",
      },
      conversation: {
        title: "编程工作区",
        alt: "Setsuna Desktop 编程工作区，并排展示 AI 对话、代码审查与集成终端",
      },
      review: {
        title: "Pull Request",
        alt: "Setsuna Desktop Pull Request 工作区，展示 PR 列表、文件差异和检查结果",
      },
      automations: {
        title: "自动化",
        alt: "Setsuna Desktop 自动化页面，展示定时任务创建输入框与运行记录侧栏",
      },
      plugins: {
        title: "插件",
        alt: "Setsuna Desktop 插件目录，展示已安装插件、推荐插件和 Skills、MCP 入口",
      },
      appBuilder: {
        title: "应用构建",
        alt: "Setsuna Desktop 应用创建窗口，展示表格、数据收集、ECharts 和自定义想法模板",
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
