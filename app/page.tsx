import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Products } from "@/sections/Products";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { Technology } from "@/sections/Technology";
import { ContactCta } from "@/sections/ContactCta";
import { apps, appStoreUrl, featured } from "@/lib/apps";
import { site } from "@/lib/site";

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
      description: site.description,
      sameAs: [site.appStoreUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "pt-BR",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "Apps da Mobivalley",
      itemListElement: [featured, ...apps].map((app, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: app.name,
          operatingSystem: "iOS",
          applicationCategory: app.category,
          url: appStoreUrl(app.id),
          image: `${site.url}/apps/${app.slug}/icon.webp`,
          author: { "@id": `${site.url}/#organization` },
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Services />
      <Products />
      <Process />
      <About />
      <Technology />
      <ContactCta />
    </>
  );
}
