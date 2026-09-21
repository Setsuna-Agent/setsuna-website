# Setsuna Website

Setsuna Desktop 的响应式产品官网。Next.js App Router、TypeScript、Tailwind CSS 和 Three.js，主要内容使用服务端组件，3D 展示与截图切换使用客户端组件。

## 运行

需要 Node.js 22.19+、pnpm 7.33.7。

```sh
pnpm install
pnpm dev
```

打开 http://127.0.0.1:3001。开发预览和生产服务默认使用 3001 端口。

```sh
pnpm lint       # ESLint
pnpm typecheck  # TypeScript
pnpm build         # 静态导出至 out/
pnpm check:export  # 验证页面、子路径和资源链接
pnpm start         # 在 3001 预览 out/（需先构建）
```

## 内容与样式

- `src/app/[[...locale]]/page.tsx`：首页与中英文页面分区组合。
- `src/app/[[...locale]]/layout.tsx`：语言属性、字体和各语言的页面元信息。
- `src/lib/i18n/messages/`：中英文文案；英文词典使用中文词典推导出的类型，缺少字段会在类型检查时报告。
- `src/app/globals.css`：配色、排版、响应式布局和原生 CSS 动效；Tailwind 主题变量也在此定义。
- `src/components/`：Hero、3D 雕塑、功能介绍、截图展示、下载和页脚。
- `src/lib/site.ts`：产品仓库、文档、下载等官方链接。
- `src/lib/downloads.ts`：已核实版本的各平台安装包、ZIP 与校验文件直链；发布新版本时统一更新其中的 `version`。
- `public/images/`：用户提供的三张真实截图和产品图标。

字体本地打包，不依赖 Google Fonts 网络请求。Three.js 按需加载，离开首屏或切换后台时停止渲染；尊重系统减少动态效果设置，WebGL 不可用时显示静态轨道。截图选项支持方向键、Home 和 End。

中文地址为 `/zh-CN/`，英文地址为 `/en/`。根地址 `/` 在浏览器端跳转中文，或读取语言切换器保存的一年期 Cookie；显式语言地址优先于已保存的偏好。禁用 JavaScript 时首页仍显示完整中文内容。切换保留当前页面锚点与查询参数。文案在构建时按语言生成静态 HTML，客户端截图组件只接收当前语言所需的文案；产品截图保留原图。

首屏下载按钮跳转到下载区，按操作系统和芯片架构选择安装包。各下载文件固定到同一 GitHub Release。页面不依赖 API Key 或运行时服务器。

## GitHub Actions 与 Pages

`.github/workflows/ci.yml` 在 Pull Request 和 `main` 推送时执行依赖安装、ESLint、类型检查、静态构建和导出检查。只有 `main` 检查通过后才会部署到 GitHub Pages，也支持手动运行工作流。

仓库的 **Settings → Pages → Build and deployment → Source** 使用 **GitHub Actions**。工作流使用仓库提供的 `GITHUB_TOKEN` 和 OIDC，无需额外部署密钥。

默认托管地址为 https://setsuna-agent.github.io/setsuna-website/ 。工作流从 Pages 配置读取 `base_path`，传入 `NEXT_PUBLIC_BASE_PATH`，以适配项目子路径或自定义域名。修改 Pages 域名设置后重新运行工作流即可。

本地开发不设置 `NEXT_PUBLIC_BASE_PATH`，仍通过 3001 的根路径访问。验证与 Pages 相同的子路径导出：

```sh
NEXT_PUBLIC_BASE_PATH=/setsuna-website pnpm build
NEXT_PUBLIC_BASE_PATH=/setsuna-website pnpm check:export
```

`out/` 是部署产物，不提交到 Git。Pages 直接分发图片文件，不使用需要服务器的 Next.js 图片优化接口。
