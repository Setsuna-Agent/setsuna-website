import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { Brand } from "@/components/brand";
import { LanguageSwitcher } from "@/components/language-switcher";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

const links = [
  { href: "#features", label: "features" },
  { href: "#workspace", label: "workspace" },
] as const;

export function SiteHeader({
  locale,
  messages,
  homeLabel,
}: {
  locale: Locale;
  messages: Messages["header"];
  homeLabel: string;
}) {
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <Brand label={homeLabel} />
        <nav aria-label={messages.navigation} className="desktop-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {messages[link.label]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            href={site.repository}
            className="icon-link"
            aria-label={messages.source}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <LanguageSwitcher locale={locale} />
          <a href="#download" className="button button-small button-outline">
            {messages.download} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
