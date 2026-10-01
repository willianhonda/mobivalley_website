import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, FileText, Mail, ShieldCheck, Star } from "lucide-react";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { Contours } from "@/components/Contours";
import { getApp, getApps, hasRating, type App } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { formatBytes, formatDate, formatNumber, htmlLang, languageName, localePath, type Locale } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";

function faqFor(app: App, t: ReturnType<typeof getDictionary>["appPage"]["support"]["faq"]) {
  const items = [];
  if (app.legal.purchases !== "none") items.push(t.restore);
  if (app.legal.purchases === "subscription" || app.legal.purchases === "unknown") items.push(t.cancel);
  if (app.legal.purchases !== "none") items.push(t.refund);
  items.push(t.bug, t.data);
  return items;
}

export function AppView({ locale, slug }: { locale: Locale; slug: string }) {
  const app = getApp(slug, locale);
  if (!app) notFound();
  const d = getDictionary(locale);
  const t = d.appPage;
  const s = app.store;
  const base = localePath(locale, `/apps/${app.slug}/`);
  const languages = s.languages.map((c) => languageName(locale, c));
  const others = getApps(locale).filter((a) => a.slug !== app.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: s.name,
    operatingSystem: `iOS ${s.minimumOsVersion}`,
    applicationCategory: app.genres[0],
    url: `${site.url}${base}`,
    installUrl: app.url,
    image: `${site.url}${app.icon}`,
    screenshot: app.screens.slice(0, 3).map((x) => `${site.url}${x.src}`),
    softwareVersion: s.version,
    datePublished: s.releaseDate.slice(0, 10),
    inLanguage: htmlLang[locale],
    offers: { "@type": "Offer", price: s.price, priceCurrency: "USD" },
    author: { "@type": "Organization", name: site.name, url: site.url },
    ...(hasRating(app)
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating.value.toFixed(1), ratingCount: s.rating.count } }
      : {}),
  };

  const info = [
    { label: t.infoLabels.category, value: app.genres.join(", ") },
    { label: t.infoLabels.version, value: s.version },
    { label: t.infoLabels.updated, value: formatDate(locale, s.updatedAt) },
    { label: t.infoLabels.released, value: formatDate(locale, s.releaseDate) },
    { label: t.infoLabels.requires, value: t.requires(s.minimumOsVersion) },
    { label: t.infoLabels.size, value: formatBytes(locale, s.fileSizeBytes) },
    {
      label: t.infoLabels.languages,
      value: languages.length > 4 ? `${languages.slice(0, 4).join(", ")} ${t.moreLanguages(languages.length - 4)}` : languages.join(", "),
    },
    { label: t.infoLabels.price, value: s.price === 0 ? t.free : formatNumber(locale, s.price, 2) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* hero */}
      <section className="relative isolate overflow-hidden bg-ink pt-32 pb-16 text-paper sm:pt-40 sm:pb-24">
        <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
        <div
          aria-hidden
          className="absolute top-[-30%] right-[-10%] -z-10 size-[50rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${app.tint}33, transparent)` }}
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label={t.breadcrumbLabel} className="text-sm text-fog">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link prefetch={false} href={`${localePath(locale, "/")}#produtos`} className="hover:text-paper">
                  {t.breadcrumb}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-paper">
                {app.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Image
                src={app.icon}
                alt=""
                width={112}
                height={112}
                priority
                className="size-24 rounded-[22.5%] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.7)] ring-1 ring-white/10 sm:size-28"
              />
              <h1 className="text-balance mt-8 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">{app.name}</h1>
              <p className="mt-3 text-fog">
                {app.genres.slice(0, 3).join(" · ")} · {app.year}
              </p>
              {hasRating(app) && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-fog">
                  <Star aria-hidden className="size-4 fill-mint text-mint" />
                  {t.rating(formatNumber(locale, s.rating.value, 1), formatNumber(locale, s.rating.count))}
                </p>
              )}
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-fog sm:text-xl">{app.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
              <AppStoreBadge href={app.url} alt={t.badgeAlt} newTabLabel={d.nav.opensNewTab} className="h-14" />
            </div>
          </div>
        </div>
      </section>

      {/* screenshots */}
      {app.screens.length > 0 && (
        <section aria-label={t.screenshots} className="bg-ink pb-20 text-paper sm:pb-28">
          <ul
            tabIndex={0}
            aria-label={t.screenshots}
            className="mx-auto flex max-w-7xl snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:scroll-px-8 sm:gap-5 sm:px-8"
          >
            {app.screens.map((screen, i) => (
              <li
                key={screen.src}
                className="w-[62%] shrink-0 snap-start overflow-hidden rounded-[1.6rem] ring-1 ring-white/10 sm:w-[16rem]"
              >
                <Image
                  src={screen.src}
                  alt={`${app.name} — ${t.screenshots.toLowerCase()} ${i + 1}`}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 640px) 256px, 62vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* highlights + info */}
      <section className="on-light bg-paper py-20 text-ink sm:py-28" aria-labelledby="destaques">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="destaques" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {t.highlights}
            </h2>
            {app.features.length > 0 ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {app.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/[0.06]">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-mint-deep" strokeWidth={2.25} />
                    <span className="leading-relaxed text-slate">{f}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 leading-relaxed whitespace-pre-line text-slate">{s.description[locale].slice(0, 900)}</p>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{t.info}</h2>
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {info.map((row) => (
                <div key={row.label} className="flex justify-between gap-6 py-3.5 text-sm">
                  <dt className="shrink-0 text-slate-2">{row.label}</dt>
                  <dd className="text-right text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* support */}
      <section id="suporte" aria-labelledby="suporte-title" className="on-light border-t border-ink/10 bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow text-mint-deep">{t.support.eyebrow}</p>
            <h2 id="suporte-title" className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {t.support.title}
            </h2>
            <p className="mt-5 leading-relaxed text-slate">{t.support.text}</p>
            <a
              href={mailto(t.support.subject(app.name))}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-ink-800"
            >
              <Mail aria-hidden className="size-4" /> {t.support.button}
            </a>
            <p className="mt-4 text-sm text-slate-2">{site.email}</p>

            <h3 className="mt-12 font-mono text-xs tracking-[0.14em] text-slate-2 uppercase">{t.legal}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link prefetch={false} href={`${base}privacy/`} className="inline-flex items-center gap-2 font-medium hover:text-mint-deep">
                  <ShieldCheck aria-hidden className="size-4 text-mint-deep" /> {t.privacy}
                </Link>
              </li>
              <li>
                <Link prefetch={false} href={`${base}terms/`} className="inline-flex items-center gap-2 font-medium hover:text-mint-deep">
                  <FileText aria-hidden className="size-4 text-mint-deep" /> {t.terms}
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{t.support.faqTitle}</h3>
            <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {faqFor(app, t.support.faq).map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0 text-slate-2 transition-transform duration-300 group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* more apps */}
      <section aria-labelledby="mais-apps" className="bg-ink py-20 text-paper sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="mais-apps" className="text-2xl font-semibold tracking-[-0.03em]">
            {t.moreApps}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  prefetch={false}
                  href={localePath(locale, `/apps/${o.slug}/`)}
                  className="group flex items-center gap-3 rounded-2xl p-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.04] hover:ring-white/20"
                >
                  <Image src={o.icon} alt="" width={40} height={40} className="size-10 shrink-0 rounded-[26%]" />
                  <span className="min-w-0 truncate text-sm font-medium">{o.name}</span>
                  <ArrowRight
                    aria-hidden
                    className="ml-auto size-4 shrink-0 text-fog opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
