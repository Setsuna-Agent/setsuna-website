"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import RcImage from "@rc-component/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";

const maxScale = 8;

type Screenshot = {
  image: StaticImageData;
  title: string;
  alt: string;
};

function PreviewAction({
  icon: Icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="screenshot-lightbox-action"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}

// The library's close/navigation buttons get their accessible names from icons.
function PreviewIcon({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="screenshot-lightbox-icon" title={label}>
      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function ScreenshotGallery({
  items,
  messages,
}: {
  items: Screenshot[];
  messages: Messages["workspace"]["preview"];
}) {
  const [preview, setPreview] = useState({ open: false, current: 0 });

  return (
    <RcImage.PreviewGroup
      items={items.map(({ image, alt }) => ({ src: image.src, alt }))}
      classNames={{ popup: { root: "screenshot-lightbox" } }}
      icons={{
        close: <PreviewIcon icon={X} label={messages.close} />,
        prev: <PreviewIcon icon={ChevronLeft} label={messages.previous} />,
        next: <PreviewIcon icon={ChevronRight} label={messages.next} />,
      }}
      preview={{
        ...preview,
        alt: items[preview.current].alt,
        minScale: 1,
        maxScale,
        maskClosable: true,
        onOpenChange: (open) => setPreview((current) => ({ ...current, open })),
        onChange: (current) => setPreview((state) => ({ ...state, current })),
        countRender: () => null,
        actionsRender: (_, { actions, transform }) => (
          <div className="screenshot-lightbox-toolbar">
            <PreviewAction
              icon={ZoomOut}
              label={messages.zoomOut}
              onClick={actions.onZoomOut}
              disabled={transform.scale <= 1}
            />
            <PreviewAction
              icon={ZoomIn}
              label={messages.zoomIn}
              onClick={actions.onZoomIn}
              disabled={transform.scale >= maxScale}
            />
            <PreviewAction
              icon={Maximize}
              label={messages.fit}
              onClick={actions.onReset}
            />
            <PreviewAction
              icon={RotateCcw}
              label={messages.rotateLeft}
              onClick={actions.onRotateLeft}
            />
            <PreviewAction
              icon={RotateCw}
              label={messages.rotateRight}
              onClick={actions.onRotateRight}
            />
          </div>
        ),
      }}
    >
      <div className="workspace-stage">
        {items.map(({ image, title, alt }, index) => (
          <figure key={image.src} className="workspace-preview">
            <figcaption>
              <h3>{title}</h3>
            </figcaption>
            <button
              type="button"
              className="screenshot-frame screenshot-trigger"
              aria-label={`${messages.open} ${title}`}
              title={`${messages.open} ${title}`}
              onClick={() => setPreview({ open: true, current: index })}
            >
              <Image
                src={image}
                alt={alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1280px"
                placeholder="blur"
                quality={90}
              />
            </button>
          </figure>
        ))}
      </div>
    </RcImage.PreviewGroup>
  );
}
