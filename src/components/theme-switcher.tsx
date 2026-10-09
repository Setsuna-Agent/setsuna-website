"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { Moon, Sun } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";
import {
  defaultTheme,
  getTheme,
  revealTheme,
  subscribeTheme,
} from "@/lib/theme";

export function ThemeSwitcher({ messages }: { messages: Messages["header"] }) {
  const switchingRef = useRef(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    getTheme,
    () => defaultTheme,
  );
  const nextTheme = theme === "light" ? "dark" : "light";
  const label = nextTheme === "dark" ? messages.darkMode : messages.lightMode;
  const Icon = nextTheme === "dark" ? Moon : Sun;

  async function onToggle(event: MouseEvent<HTMLButtonElement>) {
    if (switchingRef.current) return;
    switchingRef.current = true;

    // Keyboard clicks have no pointer position; reveal from the button center.
    const bounds = event.currentTarget.getBoundingClientRect();
    const origin =
      event.detail === 0
        ? {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
          }
        : { x: event.clientX, y: event.clientY };

    try {
      await revealTheme(getTheme() === "light" ? "dark" : "light", origin);
    } finally {
      switchingRef.current = false;
    }
  }

  useEffect(() => {
    // Keep browser chrome in sync with the palette, including restored choices.
    const background = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-background")
      .trim();
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", background);
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-switch"
      aria-label={label}
      title={label}
      onClick={onToggle}
    >
      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
