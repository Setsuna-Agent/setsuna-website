"use client";

import { localeCookieName, localePath, type Locale } from "@/lib/i18n/config";
import { withBasePath } from "@/lib/paths";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const targetLocale = locale === "zh-CN" ? "en" : "zh-CN";
  const label = targetLocale === "en" ? "Switch to English" : "切换为中文";

  return (
    <a
      href={localePath(targetLocale)}
      hrefLang={targetLocale}
      lang={targetLocale}
      className="language-switch"
      aria-label={label}
      title={label}
      onClick={(event) => {
        const secure = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${localeCookieName}=${targetLocale}; Path=${withBasePath("/")}; Max-Age=31536000; SameSite=Lax${secure}`;
        // Keep the current section when navigating to the translated document.
        event.currentTarget.search = window.location.search;
        event.currentTarget.hash = window.location.hash;
      }}
    >
      {targetLocale === "en" ? "EN" : "中文"}
    </a>
  );
}
