"use client";

import { useEffect } from "react";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localePath,
} from "@/lib/i18n/config";

export function LanguageRedirect() {
  useEffect(() => {
    const prefix = `${localeCookieName}=`;
    const preference = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(prefix))
      ?.slice(prefix.length);
    const locale = isLocale(preference) ? preference : defaultLocale;

    // Pages has no request-time server. The root still renders a complete Chinese
    // page when JavaScript is unavailable; explicit language URLs never redirect.
    window.location.replace(
      `${localePath(locale)}${window.location.search}${window.location.hash}`,
    );
  }, []);

  return null;
}
