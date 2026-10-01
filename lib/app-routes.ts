import type { Metadata } from "next";
import { getApp, storeApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

/** One static page per app on the store. */
export const appParams = () => storeApps.map((a) => ({ slug: a.slug }));

type Kind = "page" | "privacy" | "terms";

export const appMetadata =
  (locale: Locale, kind: Kind) =>
  async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
    const { slug } = await params;
    const app = getApp(slug, locale);
    if (!app) return {};
    const t = getDictionary(locale).appPage;
    const suffix = kind === "page" ? "" : `${kind}/`;
    const title = kind === "page" ? app.name : `${kind === "privacy" ? t.privacy : t.terms} — ${app.name}`;
    return pageMetadata(locale, `/apps/${slug}/${suffix}`, { title, description: app.summary });
  };
