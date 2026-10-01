export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

/** Prefixes a site path with the locale. Portuguese lives at the root, English under /en. */
export function localePath(locale: Locale, path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return locale === "pt" ? p : `/en${p === "/" ? "/" : p}`;
}

/** The same page in the other language. */
export function switchLocalePath(pathname: string, to: Locale) {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localePath(to, bare);
}

/** `alternates` for page metadata: canonical plus hreflang for both languages. */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      "pt-BR": localePath("pt", path),
      en: localePath("en", path),
      "x-default": localePath("pt", path),
    },
  };
}

const intl: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

export const formatNumber = (locale: Locale, n: number, digits = 0) =>
  new Intl.NumberFormat(intl[locale], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);

export const formatDate = (locale: Locale, iso: string) =>
  new Intl.DateTimeFormat(intl[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

export const formatBytes = (locale: Locale, bytes: number) =>
  `${formatNumber(locale, bytes / 1_000_000, bytes >= 100_000_000 ? 0 : 1)} MB`;

export const languageName = (locale: Locale, code: string) =>
  new Intl.DisplayNames([intl[locale]], { type: "language" }).of(code.toLowerCase()) ?? code;
