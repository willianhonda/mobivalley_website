import { About } from "@/sections/About";
import { ContactCta } from "@/sections/ContactCta";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { Products } from "@/sections/Products";
import { Services } from "@/sections/Services";
import { Technology } from "@/sections/Technology";
import { getApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/mobivalley-app-icon-1024.png`,
        email: site.email,
        description: t.meta.description,
        sameAs: [site.appStoreUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}${localePath(locale, "/")}#website`,
        url: `${site.url}${localePath(locale, "/")}`,
        name: site.name,
        inLanguage: htmlLang[locale],
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "ItemList",
        itemListElement: getApps(locale).map((app, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}${localePath(locale, `/apps/${app.slug}/`)}`,
          name: app.name,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero locale={locale} />
      <Services locale={locale} />
      <Products locale={locale} />
      <Process locale={locale} />
      <About locale={locale} />
      <Technology locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
