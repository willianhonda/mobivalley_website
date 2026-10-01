import type { CSSProperties } from "react";
import Image from "next/image";
import { Cpu, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Accent } from "@/components/Section";
import { getApp, getApps, getFeatured, portfolioStats } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { formatNumber, type Locale } from "@/lib/i18n";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;
  const apps = getApps(locale);
  const stats = portfolioStats();
  const featured = getFeatured(locale);
  const aero = getApp("aeroexplorer", locale);
  const heroScreen = aero?.screens[2] ?? aero?.screens[0] ?? featured.screens[0];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink pt-32 text-paper sm:pt-40 lg:pt-44"
    >
      {/* background: grid, valley contours and a soft mint glow */}
      <div
        aria-hidden
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black,transparent)]"
      />
      <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
      <div
        aria-hidden
        className="absolute top-[-20%] right-[-10%] -z-10 size-[60rem] rounded-full bg-[radial-gradient(circle,rgb(52_224_161/0.14),transparent_60%)]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <a
            href="#produtos"
            className="intro group inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] py-1.5 pr-4 pl-1.5 text-sm text-fog ring-1 ring-white/10 transition-colors hover:text-paper hover:ring-white/20"
            style={delay(0)}
          >
            <span className="rounded-full bg-mint/15 px-2.5 py-0.5 font-mono text-[0.7rem] font-medium tracking-wider text-mint uppercase">
              {t.pillTag}
            </span>
            {t.pill(stats.count)}
          </a>

          <h1
            id="hero-title"
            className="intro text-balance mt-8 text-[2.85rem] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]"
            style={delay(1)}
          >
            {t.titleBefore}
            <Accent>{t.titleAccent}</Accent>
            <span className="text-mint">.</span>
          </h1>

          <p className="intro mt-7 max-w-xl text-lg leading-relaxed text-pretty text-fog sm:text-xl" style={delay(2)}>
            {t.lead}
          </p>

          <div className="intro mt-10 flex flex-col gap-3 sm:flex-row" style={delay(3)}>
            <Button href="#produtos" size="lg">
              {t.ctaProducts}
            </Button>
            <Button href="#contato" size="lg" variant="secondary" icon="none">
              {t.ctaContact}
            </Button>
          </div>

          <div className="intro mt-12 flex items-center gap-4" style={delay(4)}>
            <ul className="flex -space-x-2.5" aria-label={t.stackLabel}>
              {apps.slice(0, 6).map((app) => (
                <li key={app.slug} className="shrink-0">
                  <Image src={app.icon} alt={app.name} width={40} height={40} className="size-10 rounded-[26%] ring-2 ring-ink" />
                </li>
              ))}
            </ul>
            <p className="text-sm leading-snug text-fog">
              {t.stackCaption[0]}
              <br className="hidden sm:block" /> {t.stackCaption[1]}
            </p>
          </div>
        </div>

        {/* visual: a real screen from AeroExplorer, framed, with two floating facts */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-x-[-10%] top-[8%] bottom-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(52_224_161/0.22),transparent)] blur-2xl"
          />
          <div className="intro relative mx-auto w-[74%] max-w-[19rem]" style={delay(2)}>
            <div className="motion-safe:animate-float-slow">
              <PhoneFrame src={heroScreen.src} alt={t.phoneAlt} sizes="(min-width: 1024px) 304px, 60vw" priority />
            </div>

            <div className="intro absolute top-[14%] -left-[22%] sm:-left-[34%]" style={delay(5)}>
              <div className="motion-safe:animate-float flex items-center gap-3 rounded-2xl bg-ink-800/80 p-2.5 pr-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <Image src={featured.icon} alt="" width={40} height={40} className="size-10 rounded-[26%]" />
                <div>
                  <p className="text-sm font-medium">{featured.name}</p>
                  <p className="flex items-center gap-1 text-xs text-fog">
                    <Star aria-hidden className="size-3 fill-mint text-mint" />
                    {t.ratingCard(formatNumber(locale, featured.store.rating.value, 1))}
                  </p>
                </div>
              </div>
            </div>

            <div className="intro absolute -right-[18%] bottom-[16%] sm:-right-[30%]" style={delay(6)}>
              <div className="motion-safe:animate-float flex items-center gap-3 rounded-2xl bg-ink-800/80 p-2.5 pr-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md [animation-delay:-4s]">
                <span className="flex size-10 items-center justify-center rounded-[26%] bg-mint/15 text-mint">
                  <Cpu aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{t.aiCardTitle}</p>
                  <p className="text-xs text-fog">{t.aiCardSub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:mt-28">
        <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {t.stats({ ...stats, languages: stats.featuredLanguages }).map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col py-8 pr-4 lg:py-10 ${i % 2 === 1 ? "pl-5 max-lg:border-l max-lg:border-white/10" : ""} ${
                i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
              } ${i > 1 ? "max-lg:border-t max-lg:border-white/10" : ""}`}
            >
              <dt className="mt-2 text-sm text-fog">{s.label}</dt>
              <dd className="order-first text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
