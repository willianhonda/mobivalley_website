import Link from "next/link";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/LegalDocument";
import { appPrivacy, appTerms, LEGAL_UPDATED, sitePrivacy } from "@/content/legal";
import { getApp, getApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { formatDate, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function AppLegalView({ locale, slug, kind }: { locale: Locale; slug: string; kind: "privacy" | "terms" }) {
  const app = getApp(slug, locale);
  if (!app) notFound();
  const t = getDictionary(locale);
  const base = localePath(locale, `/apps/${app.slug}/`);
  const doc = kind === "privacy" ? appPrivacy(locale, app, site.email) : appTerms(locale, app, site.email, `${base}privacy/`);
  const other = kind === "privacy" ? { href: `${base}terms/`, label: t.appPage.terms } : { href: `${base}privacy/`, label: t.appPage.privacy };

  return (
    <LegalDocument
      doc={doc}
      eyebrow={app.name}
      icon={app.icon}
      updated={t.legalPage.updated(formatDate(locale, LEGAL_UPDATED))}
      footer={
        <p className="border-t border-ink/10 pt-8 text-sm">
          {t.legalPage.seeAlso}:{" "}
          <Link prefetch={false} href={other.href} className="font-medium text-ink underline decoration-mint-deep/40 underline-offset-4">
            {other.label}
          </Link>
          {" · "}
          <Link prefetch={false} href={base} className="font-medium text-ink underline decoration-mint-deep/40 underline-offset-4">
            {app.name}
          </Link>
        </p>
      }
    />
  );
}

export function SitePrivacyView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const doc = sitePrivacy(locale, {
    email: site.email,
    analytics: !!site.gaMeasurementId,
    apps: getApps(locale).map((a) => ({ name: a.name, href: localePath(locale, `/apps/${a.slug}/privacy/`) })),
  });
  return (
    <LegalDocument doc={doc} eyebrow={t.legalPage.siteEyebrow} updated={t.legalPage.updated(formatDate(locale, LEGAL_UPDATED))} />
  );
}
