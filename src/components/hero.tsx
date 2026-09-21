import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroSculpture } from "@/components/hero-sculpture";
import type { Messages } from "@/lib/i18n/messages";

export function Hero({ messages }: { messages: Messages["hero"] }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="page-container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            Setsuna
            <br />
            <span>Desktop</span>
          </h1>
          <p className="hero-description">{messages.description}</p>
          <div className="hero-actions">
            <a href="#download" className="button button-primary">
              {messages.download} <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a href="#workspace" className="text-link">
              {messages.explore} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <HeroSculpture />
      </div>
    </section>
  );
}
