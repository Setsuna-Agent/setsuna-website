import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { site } from "@/lib/site";
import type { Messages } from "@/lib/i18n/messages";

export function SiteFooter({
  messages,
  homeLabel,
}: {
  messages: Messages["footer"];
  homeLabel: string;
}) {
  return (
    <footer className="site-footer page-container">
      <div className="footer-top">
        <Brand label={homeLabel} />
        <nav aria-label={messages.navigation}>
          <a href={site.repository} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href={site.docs} target="_blank" rel="noreferrer">
            {messages.docs}
          </a>
          <a
            href={`${site.repository}/issues`}
            target="_blank"
            rel="noreferrer"
          >
            {messages.feedback}
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Setsuna Desktop</p>
        <a href={site.license} target="_blank" rel="noreferrer">
          MIT License
        </a>
        <a href="#" className="back-to-top">
          {messages.backToTop}
        </a>
      </div>
    </footer>
  );
}
