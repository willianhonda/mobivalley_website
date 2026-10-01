import type { ReactNode } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Titled } from "@/components/Section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

function DownloadLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-ink"
    >
      <Download aria-hidden className="size-4" /> {children}
    </a>
  );
}

export function BrandView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).brand;
  const logos = [
    { file: "mobivalley-logo-horizontal-dark-bg.svg", label: t.logos.horizontalDark, dark: true, wide: true },
    { file: "mobivalley-logo-horizontal-light-bg.svg", label: t.logos.horizontalLight, dark: false, wide: true },
    { file: "mobivalley-logo-stacked-dark-bg.svg", label: t.logos.stackedDark, dark: true },
    { file: "mobivalley-logo-stacked-light-bg.svg", label: t.logos.stackedLight, dark: false },
    { file: "mobivalley-symbol-dark-bg.svg", label: t.logos.symbolDark, dark: true },
    { file: "mobivalley-symbol-light-bg.svg", label: t.logos.symbolLight, dark: false },
  ];
  const palette = [
    { name: "Ink", hex: "#0B0D12", use: t.palette.ink, swatch: "bg-ink ring-1 ring-white/10", text: "text-paper" },
    { name: "Graphite", hex: "#161A22", use: t.palette.graphite, swatch: "bg-ink-800 ring-1 ring-white/10", text: "text-paper" },
    { name: "Paper", hex: "#F4F4F0", use: t.palette.paper, swatch: "bg-paper ring-1 ring-ink/15", text: "text-ink" },
    { name: "Mint", hex: "#34E0A1", use: t.palette.mint, swatch: "bg-mint", text: "text-ink" },
    { name: "Mint Deep", hex: "#0E9F6E", use: t.palette.mintDeep, swatch: "bg-[#0E9F6E]", text: "text-ink" },
  ];
  const type = [
    { name: "Geist", role: t.typeRoles.sans, sample: t.typeSamples.sans, className: "font-sans font-semibold tracking-[-0.04em]" },
    { name: "Instrument Serif Italic", role: t.typeRoles.serif, sample: t.typeSamples.serif, className: "font-serif italic" },
    { name: "Geist Mono", role: t.typeRoles.mono, sample: t.typeSamples.mono, className: "font-mono text-[0.8em] tracking-[0.1em]" },
  ];

  return (
    <>
      <section className="bg-ink pt-36 pb-20 text-paper sm:pt-44 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-mint">{t.eyebrow}</p>
            <h1 className="text-balance mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
              <Titled t={t.title} />
            </h1>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-fog">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-20 flex max-w-7xl items-center justify-center rounded-[2rem] bg-ink-900 px-5 py-24 ring-1 ring-white/10 sm:px-8">
          <Logo className="h-14 w-auto text-paper sm:h-20" />
        </div>
      </section>

      <div className="on-light bg-paper py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-8">
          <section aria-labelledby="versoes">
            <h2 id="versoes" className="text-3xl font-semibold tracking-[-0.03em]">
              {t.versions}
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {logos.map((logo) => (
                <li key={logo.file} className={logo.wide ? "sm:col-span-2" : ""}>
                  <div
                    className={`flex h-56 items-center justify-center rounded-3xl p-10 ${
                      logo.dark ? "bg-ink" : "bg-white ring-1 ring-ink/10"
                    }`}
                  >
                    <Image
                      src={`/brand/${logo.file}`}
                      alt={t.logoAlt(logo.label)}
                      width={320}
                      height={120}
                      className={logo.wide ? "h-12 w-auto" : "h-24 w-auto"}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1">
                    <p className="text-sm text-slate-2">{logo.label}</p>
                    <DownloadLink href={`/brand/${logo.file}`}>SVG</DownloadLink>
                  </div>
                </li>
              ))}
              <li>
                <div className="flex h-56 items-center justify-center rounded-3xl bg-white p-10 ring-1 ring-ink/10">
                  <Image
                    src="/brand/mobivalley-app-icon-512.png"
                    alt={t.appIconAlt}
                    width={112}
                    height={112}
                    className="size-28 rounded-[22.5%] shadow-xl"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-sm text-slate-2">{t.logos.appIcon}</p>
                  <span className="flex gap-3">
                    <DownloadLink href="/brand/mobivalley-app-icon.svg">SVG</DownloadLink>
                    <DownloadLink href="/brand/mobivalley-app-icon-1024.png">PNG</DownloadLink>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex h-56 items-end justify-center gap-6 rounded-3xl bg-white p-10 ring-1 ring-ink/10">
                  {[64, 32, 16].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-3">
                      <Image src="/icon.svg" alt="" width={s} height={s} style={{ width: s, height: s }} />
                      <span className="font-mono text-xs text-slate-2">{s}px</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-sm text-slate-2">{t.logos.favicon}</p>
                  <DownloadLink href="/icon.svg">SVG</DownloadLink>
                </div>
              </li>
            </ul>
          </section>

          <section aria-labelledby="cores">
            <h2 id="cores" className="text-3xl font-semibold tracking-[-0.03em]">
              {t.colors}
            </h2>
            <p className="mt-3 max-w-2xl text-slate">{t.colorsText}</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {palette.map((c) => (
                <li key={c.name}>
                  <div className={`flex h-40 flex-col justify-end rounded-3xl p-5 ${c.swatch} ${c.text}`}>
                    <p className="font-semibold">{c.name}</p>
                    <p className="font-mono text-sm">{c.hex}</p>
                  </div>
                  <p className="mt-3 px-1 text-sm text-slate-2">{c.use}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tipografia">
            <h2 id="tipografia" className="text-3xl font-semibold tracking-[-0.03em]">
              {t.type}
            </h2>
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {type.map((t) => (
                <li key={t.name} className="grid gap-2 py-8 md:grid-cols-[16rem_1fr] md:items-center">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-slate-2">{t.role}</p>
                  </div>
                  <p className={`text-4xl sm:text-5xl ${t.className}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="uso">
            <h2 id="uso" className="text-3xl font-semibold tracking-[-0.03em]">
              {t.usage}
            </h2>
            <ul className="mt-8 grid gap-6 text-slate sm:grid-cols-3">
              {t.usageItems.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-2">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
