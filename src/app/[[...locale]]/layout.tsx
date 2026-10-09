import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { localePath, locales, resolveLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { withBasePath } from "@/lib/paths";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

const geist = localFont({
  src: "../../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale?: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: [] }, ...locales.map((locale) => ({ locale: [locale] }))];
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  if (!locale) notFound();
  const { metadata } = getMessages(locale);

  return {
    title: metadata.title,
    description: metadata.description,
    applicationName: "Setsuna Desktop",
    openGraph: {
      title: metadata.title,
      description: metadata.openGraphDescription,
      locale: locale === "zh-CN" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh-CN" ? "en_US" : "zh_CN",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = resolveLocale((await params).locale);
  if (!locale) notFound();
  const messages = getMessages(locale);

  return (
    <html
      lang={locale}
      className={geist.variable}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {locales.map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={localePath(language)}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={withBasePath("/")} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {messages.common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
