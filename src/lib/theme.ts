export type Theme = "light" | "dark";

export const defaultTheme: Theme = "light";
const themeStorageKey = "setsuna-website-theme";

// Restore the preference before paint without waiting for React hydration.
export const themeInitScript = `
(() => {
  let theme = ${JSON.stringify(defaultTheme)};
  try {
    if (localStorage.getItem(${JSON.stringify(themeStorageKey)}) === "dark") {
      theme = "dark";
    }
  } catch {}
  document.documentElement.dataset.theme = theme;
})();
`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Switching still works when the browser blocks persistent storage.
  }
}

// Adapted from beUI's circle reveal, using the actual pointer position.
// https://beui.dev/components/motion/theme-toggle
export async function revealTheme(
  theme: Theme,
  { x, y }: { x: number; y: number },
) {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof document.startViewTransition !== "function"
  ) {
    setTheme(theme);
    return;
  }

  const root = document.documentElement;
  const radius = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ),
  );
  root.style.setProperty("--theme-reveal-origin", `${x}px ${y}px`);
  root.style.setProperty("--theme-reveal-radius", `${radius}px`);
  root.dataset.themeTransition = "circle";

  try {
    const transition = document.startViewTransition(() => setTheme(theme));
    await transition.finished;
  } catch {
    // Animation failure must not prevent a theme change.
    setTheme(theme);
  } finally {
    delete root.dataset.themeTransition;
    root.style.removeProperty("--theme-reveal-origin");
    root.style.removeProperty("--theme-reveal-radius");
  }
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
