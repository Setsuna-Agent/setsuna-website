import { site } from "@/lib/site";

// Keep every package and its checksum on the same verified release.
// Update this version when publishing new desktop downloads on the website.
const version = "0.5.1";
const releaseUrl = `${site.repository}/releases/tag/v${version}`;
const assetRoot = `${site.repository}/releases/download/v${version}`;

export const desktopRelease = {
  version,
  url: releaseUrl,
  checksums: `${assetRoot}/SHA256SUMS`,
  downloads: [
    {
      system: "macos",
      platform: "macOS",
      architecture: "Apple Silicon",
      files: [
        {
          format: "DMG",
          url: `${assetRoot}/Setsuna-Desktop-${version}-mac-arm64.dmg`,
        },
        {
          format: "ZIP",
          url: `${assetRoot}/Setsuna-Desktop-${version}-mac-arm64.zip`,
        },
      ],
    },
    {
      system: "macos",
      platform: "macOS",
      architecture: "Intel",
      files: [
        {
          format: "DMG",
          url: `${assetRoot}/Setsuna-Desktop-${version}-mac-x64.dmg`,
        },
        {
          format: "ZIP",
          url: `${assetRoot}/Setsuna-Desktop-${version}-mac-x64.zip`,
        },
      ],
    },
    {
      system: "windows",
      platform: "Windows",
      architecture: "x64",
      files: [
        {
          format: "EXE",
          url: `${assetRoot}/Setsuna-Desktop-${version}-windows-x64.exe`,
        },
      ],
    },
  ],
} as const;
