import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const origin = "https://static-export.invalid";
const checkedPaths = new Set();

// Check the deployment contract: every local URL in the exported documents must
// stay under the Pages base path and resolve to an actual file, without Next.js.
for (const [route, locale] of [
  ["", "zh-CN"],
  ["zh-CN", "zh-CN"],
  ["en", "en"],
]) {
  const html = await readFile(path.join(output, route, "index.html"), "utf8");
  assert.ok(
    html.includes(`<html lang="${locale}"`),
    `Wrong language at /${route}`,
  );
  assert.ok(
    !html.includes("/_next/image?"),
    "Static hosting cannot optimize images at request time",
  );
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (value.startsWith("#")) continue;
    const url = new URL(
      value,
      `${origin}${basePath}/${route ? `${route}/` : ""}`,
    );
    if (url.origin !== origin) continue;

    assert.ok(
      url.pathname.startsWith(`${basePath}/`),
      `Missing base path: ${url.pathname}`,
    );
    const relativePath = decodeURIComponent(
      url.pathname.slice(basePath.length),
    );
    const file = path.join(
      output,
      relativePath,
      relativePath.endsWith("/") ? "index.html" : "",
    );
    if (checkedPaths.has(file)) continue;
    await access(file);
    checkedPaths.add(file);
  }
}

await access(path.join(output, "404.html"));
console.log(
  `Static export verified: 3 pages and ${checkedPaths.size} local URLs under ${basePath || "/"}.`,
);
