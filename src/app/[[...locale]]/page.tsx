import { notFound } from "next/navigation";
import { Download } from "@/components/download";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkspaceShowcase } from "@/components/workspace-showcase";
import { LanguageRedirect } from "@/components/language-redirect";
import { resolveLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default async function Home({
  params,
}: {
  params: Promise<{ locale?: string[] }>;
}) {
  const segments = (await params).locale;
  const locale = resolveLocale(segments);
  if (!locale) notFound();
  const messages = getMessages(locale);

  return (
    <>
      {!segments?.length && <LanguageRedirect />}
      <SiteHeader
        locale={locale}
        messages={messages.header}
        homeLabel={messages.common.home}
      />
      <main id="main">
        <Hero messages={messages.hero} />
        <Features messages={messages.features} />
        <WorkspaceShowcase messages={messages.workspace} />
        <Download messages={messages.download} />
      </main>
      <SiteFooter messages={messages.footer} homeLabel={messages.common.home} />
    </>
  );
}
