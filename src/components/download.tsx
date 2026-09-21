import { ArrowDown, Command, Monitor } from "lucide-react";
import { desktopRelease } from "@/lib/downloads";
import type { Messages } from "@/lib/i18n/messages";

export function Download({ messages }: { messages: Messages["download"] }) {
  return (
    <section
      id="download"
      className="download-section"
      aria-labelledby="download-title"
    >
      <div className="page-container download-inner">
        <div className="download-layout">
          <div>
            <h2 id="download-title">{messages.title}</h2>
            <a
              href={desktopRelease.url}
              className="release-version"
              target="_blank"
              rel="noreferrer"
            >
              v{desktopRelease.version}
            </a>
          </div>
          <div className="download-packages">
            <ul className="download-options">
              {desktopRelease.downloads.map(
                ({ system, platform, architecture, files }) => {
                  const Icon = system === "macos" ? Command : Monitor;
                  return (
                    <li
                      className="download-option"
                      key={`${system}-${architecture}`}
                    >
                      <div className="download-platform">
                        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                        <div>
                          <span className="download-platform-name">
                            {platform}
                          </span>
                          <span className="download-architecture">
                            {architecture}
                          </span>
                        </div>
                      </div>
                      <div className="download-files">
                        {files.map(({ format, url }) => (
                          <a
                            key={format}
                            href={url}
                            className={`button button-small ${format === "ZIP" ? "button-outline" : "button-primary"}`}
                            aria-label={`${messages.action} ${platform} ${architecture} (${format})`}
                          >
                            {format}
                            <ArrowDown size={15} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </li>
                  );
                },
              )}
            </ul>
            <div className="download-links">
              <a href={desktopRelease.checksums}>{messages.checksums}</a>
              <a href={desktopRelease.url} target="_blank" rel="noreferrer">
                {messages.allFiles}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
