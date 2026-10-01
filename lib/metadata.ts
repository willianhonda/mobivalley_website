import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { alternates, localePath, ogLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Page metadata with canonical, hreflang and Open Graph for the given locale. */
export function pageMetadata(
  locale: Locale,
  path: string,
  { title, description }: { title?: string; description?: string } = {},
): Metadata {
  const t = getDictionary(locale);
  const fullTitle = title ? `${title} — Mobivalley` : t.meta.title;
  const desc = description ?? t.meta.description;
  return {
    ...(title ? { title } : {}),
    description: desc,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      url: localePath(locale, path),
      title: fullTitle,
      description: desc,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: ["/og.png"] },
  };
}

/** Metadata shared by every page of a locale (set on its root layout). */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s — Mobivalley" },
    applicationName: site.name,
    formatDetection: { telephone: false },
    ...pageMetadata(locale, "/"),
  };
}

export const viewport = { themeColor: "#0b0d12", colorScheme: "dark" } as const;
