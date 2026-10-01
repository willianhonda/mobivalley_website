// Portfolio model: store facts from data/apps.json (kept current by
// scripts/sync-apps.mjs) merged with the hand-written copy in content/apps.ts.

import rawData from "@/data/apps.json";
import { curated, featuredSlug, order, type CuratedApp } from "@/content/apps";
import type { Locale } from "@/lib/i18n";

type LabelCategory = { category: string; dataTypes: string[] };
type LabelPurpose = { purpose: string; categories: LabelCategory[] };

/** App Store privacy labels ("App Privacy" section of the listing). */
export type PrivacyLabels = {
  notCollected: boolean;
  notProvided: boolean;
  tracking: LabelCategory[];
  linked: LabelPurpose[];
  notLinked: LabelPurpose[];
};

/** One entry of data/apps.json (written by scripts/sync-apps.mjs). */
export type StoreApp = {
  id: number;
  slug: string;
  name: string;
  nameBR: string;
  url: string;
  genres: { en: string[]; pt: string[] };
  releaseDate: string;
  updatedAt: string;
  version: string;
  minimumOsVersion: string;
  fileSizeBytes: number;
  price: number;
  languages: string[];
  rating: { value: number; count: number; store: string };
  gameCenter: boolean;
  universal: boolean;
  description: { en: string; pt: string };
  releaseNotes: string;
  icon: string;
  tint: string;
  screens: { src: string; width: number; height: number }[];
  privacy: PrivacyLabels | null;
};

const data = rawData as { developerUrl: string; apps: StoreApp[] };

export type App = {
  id: number;
  slug: string;
  name: string;
  storeName: string;
  category: string;
  genres: string[];
  year: number;
  summary: string;
  features: string[];
  tint: string;
  icon: string;
  url: string;
  screens: StoreApp["screens"];
  cardScreen: StoreApp["screens"][number];
  store: StoreApp;
  legal: CuratedApp["legal"];
};

export const developerUrl = data.developerUrl;
export const storeApps = data.apps;

const clean = (s: string) => s.replace(/\u00AD/g, "");

/** First paragraph of the store description, used when an app has no curated copy. */
function fallbackSummary(text: string) {
  const first = text.split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
  return first.length > 220 ? `${first.slice(0, 217).replace(/\s+\S*$/, "")}…` : first;
}

function build(store: StoreApp, locale: Locale): App {
  const c = curated[store.slug];
  const storeName = locale === "pt" ? store.nameBR : store.name;
  const genres = [...new Set(store.genres[locale].map(clean))];
  return {
    id: store.id,
    slug: store.slug,
    name: c?.name?.[locale] ?? storeName.split(/:\s| - /)[0],
    storeName,
    category: genres.slice(0, 2).join(" · "),
    genres,
    year: new Date(store.releaseDate).getUTCFullYear(),
    summary: c?.copy[locale].summary ?? fallbackSummary(store.description[locale]),
    features: c?.copy[locale].features ?? [],
    tint: c?.tint ?? store.tint,
    icon: store.icon,
    url: store.url,
    screens: store.screens,
    cardScreen: store.screens[c?.cardScreen ?? 0] ?? store.screens[0],
    store,
    legal: c?.legal ?? { purchases: "unknown", thirdParties: [], permissions: [] },
  };
}

const rank = (slug: string) => order.indexOf(slug);

/** Every app on the store, curated order first, then new apps newest first. */
export function getApps(locale: Locale): App[] {
  return data.apps
    .map((a) => build(a, locale))
    .sort((a, b) => {
      const ra = rank(a.slug);
      const rb = rank(b.slug);
      if (ra !== -1 && rb !== -1) return ra - rb;
      if (ra !== -1) return -1;
      if (rb !== -1) return 1;
      return b.store.releaseDate.localeCompare(a.store.releaseDate);
    });
}

export const getApp = (slug: string, locale: Locale) => getApps(locale).find((a) => a.slug === slug);

export const getFeatured = (locale: Locale) => getApp(featuredSlug, locale) ?? getApps(locale)[0];

/** Figures shown in the hero, computed from the store data. */
export function portfolioStats() {
  const years = data.apps.map((a) => new Date(a.releaseDate).getUTCFullYear());
  const featured = data.apps.find((a) => a.slug === featuredSlug) ?? data.apps[0];
  return {
    count: data.apps.length,
    firstYear: Math.min(...years),
    featuredLanguages: featured.languages.length,
  };
}

/** "750" -> "700+", so the number doesn't go stale between syncs. */
export const ratingCountFloor = (n: number) => (n >= 100 ? Math.floor(n / 100) * 100 : n);

export const hasRating = (app: App) => app.store.rating.count >= 20;
