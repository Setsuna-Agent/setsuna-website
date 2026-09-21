"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";
import workspaceImage from "../../public/images/workspace.png";
import changesImage from "../../public/images/changes.png";
import pullRequestsImage from "../../public/images/pull-requests.png";

const workspaces = [
  {
    id: "conversation",
    image: workspaceImage,
  },
  {
    id: "changes",
    image: changesImage,
  },
  {
    id: "review",
    image: pullRequestsImage,
  },
] as const;

export function WorkspaceShowcase({
  messages,
}: {
  messages: Messages["workspace"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % workspaces.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + workspaces.length) % workspaces.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = workspaces.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="workspace"
      className="workspace-section section-block"
      aria-labelledby="workspace-title"
    >
      <div className="page-container">
        <div className="section-heading workspace-heading">
          <h2 id="workspace-title">{messages.title}</h2>
          <div
            className="workspace-tabs"
            role="tablist"
            aria-label={messages.tabsLabel}
          >
            {workspaces.map(({ id }, index) => (
              <button
                key={id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-controls={`panel-${id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {messages.items[id].label}
              </button>
            ))}
          </div>
        </div>
        <div className="workspace-stage">
          {workspaces.map(({ id, image }, index) => (
            <div
              key={id}
              id={`panel-${id}`}
              role="tabpanel"
              aria-labelledby={`tab-${id}`}
              hidden={activeIndex !== index}
              tabIndex={0}
            >
              <div className="screenshot-frame">
                <Image
                  src={image}
                  alt={messages.items[id].alt}
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1280px"
                  placeholder="blur"
                  quality={90}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
