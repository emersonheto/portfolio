import "../../globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "use-intl";
import { Spotlight } from "@/components/site/spotlight";
import enMessages from "@/i18n/locales/en.json";

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink-900 bg-[radial-gradient(1200px_600px_at_0%_0%,#12343B_0%,#0B1517_55%)] bg-fixed leading-relaxed text-haze-400 antialiased selection:bg-mint-400 selection:text-ink-950">
        <NextIntlClientProvider
          messages={enMessages as unknown as AbstractIntlMessages}
          locale="en"
        >
          <Spotlight />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
