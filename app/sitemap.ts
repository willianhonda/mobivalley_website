import type { MetadataRoute } from "next";
import { storeApps } from "@/lib/apps";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const entry = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap =>
  (["pt", "en"] as const).map((locale) => ({
    url: `${site.url}${localePath(locale, path)}`,
    priority: locale === "pt" ? priority : priority * 0.9,
    ...(lastModified ? { lastModified } : {}),
    alternates: {
      languages: {
        "pt-BR": `${site.url}${localePath("pt", path)}`,
        en: `${site.url}${localePath("en", path)}`,
      },
    },
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("/", 1),
    ...storeApps.flatMap((a) => [
      ...entry(`/apps/${a.slug}/`, 0.8, a.updatedAt),
      ...entry(`/apps/${a.slug}/privacy/`, 0.3),
      ...entry(`/apps/${a.slug}/terms/`, 0.3),
    ]),
    ...entry("/privacypolicy/", 0.3),
    ...entry("/marca/", 0.3),
  ];
}
