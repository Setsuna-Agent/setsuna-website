# Setsuna Website

Setsuna Desktop 的中英文官网，基于 Next.js、Tailwind CSS 和 Three.js。

[访问官网](https://setsuna-agent.github.io/setsuna-website/) · [产品仓库](https://github.com/Setsuna-Agent/setsuna-desktop)

## 开发

需要 Node.js 22.19+、pnpm 7.33.7。

```sh
pnpm install
pnpm dev
```

## 常用命令

```sh
pnpm lint          # 代码检查
pnpm typecheck     # 类型检查
pnpm build         # 构建到 out/
pnpm check:export  # 校验静态资源链接
pnpm start         # 预览构建结果
```

## 部署

GitHub Actions 自动检查 Pull Request；`main` 检查通过后发布到 GitHub Pages。配置见 [ci.yml](.github/workflows/ci.yml)。
