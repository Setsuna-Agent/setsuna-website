import { withBasePath } from "@/lib/paths";

export const locales = ["zh-CN", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh-CN";
export const localeCookieName = "setsuna-language";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export function resolveLocale(segments?: string[]): Locale | undefined {
  if (!segments?.length) return defaultLocale;
  return segments.length === 1 && isLocale(segments[0])
    ? segments[0]
    : undefined;
}

export function localePath(locale: Locale) {
  return withBasePath(`/${locale}/`);
}
