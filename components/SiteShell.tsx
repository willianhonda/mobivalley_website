import type { ReactNode } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/dictionary";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";
import "@/styles/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const fontClasses = `${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`;

/** The <html> document shared by the Portuguese and English root layouts. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={htmlLang[locale]} className={fontClasses}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-mint px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t.nav.skip}
        </a>
        <Header locale={locale} t={t.nav} contactHref={mailto(t.meta.mailSubject)} email={site.email} />
        <main id="conteudo">{children}</main>
        <Footer locale={locale} />
        {site.gaMeasurementId && (
          <Analytics
            measurementId={site.gaMeasurementId}
            privacyHref={localePath(locale, "/privacypolicy/")}
            t={t.consent}
          />
        )}
      </body>
    </html>
  );
}
