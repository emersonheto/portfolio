import "../globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Spotlight } from "@/components/site/spotlight";

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-ink-900 bg-[radial-gradient(1200px_600px_at_0%_0%,#12343B_0%,#0B1517_55%)] bg-fixed leading-relaxed text-haze-400 antialiased selection:bg-mint-400 selection:text-ink-950">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Spotlight />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
