import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Accent } from "@/components/Section";
import { openGraphBase } from "@/lib/site";

export const metadata: Metadata = {
  title: "Identidade visual",
  description: "Logo, símbolo, cores e tipografia da Mobivalley, com arquivos para download.",
  alternates: { canonical: "/marca/" },
  openGraph: {
    ...openGraphBase,
    url: "/marca/",
    title: "Identidade visual — Mobivalley",
    description: "Logo, símbolo, cores e tipografia da Mobivalley, com arquivos para download.",
  },
};

const logos = [
  { file: "mobivalley-logo-horizontal-dark-bg.svg", label: "Horizontal · fundo escuro", dark: true, wide: true },
  { file: "mobivalley-logo-horizontal-light-bg.svg", label: "Horizontal · fundo claro", dark: false, wide: true },
  { file: "mobivalley-logo-stacked-dark-bg.svg", label: "Principal · fundo escuro", dark: true },
  { file: "mobivalley-logo-stacked-light-bg.svg", label: "Principal · fundo claro", dark: false },
  { file: "mobivalley-symbol-dark-bg.svg", label: "Símbolo · fundo escuro", dark: true },
  { file: "mobivalley-symbol-light-bg.svg", label: "Símbolo · fundo claro", dark: false },
];

const palette = [
  { name: "Ink", hex: "#0B0D12", use: "Fundo principal, texto sobre claro", swatch: "bg-ink ring-1 ring-white/10", text: "text-paper" },
  { name: "Grafite", hex: "#161A22", use: "Superfícies e cartões escuros", swatch: "bg-ink-800 ring-1 ring-white/10", text: "text-paper" },
  { name: "Paper", hex: "#F4F4F0", use: "Fundo claro, texto sobre escuro", swatch: "bg-paper ring-1 ring-ink/15", text: "text-ink" },
  { name: "Mint", hex: "#34E0A1", use: "Acento: o ponto do símbolo, CTAs", swatch: "bg-mint", text: "text-ink" },
  { name: "Mint Deep", hex: "#0E9F6E", use: "Acento sobre fundos claros", swatch: "bg-[#0E9F6E]", text: "text-ink" },
];

const type = [
  { name: "Geist", role: "Títulos, texto e wordmark", sample: "Ideias viram produtos.", className: "font-sans font-semibold tracking-[-0.04em]" },
  { name: "Instrument Serif Italic", role: "Palavras de destaque", sample: "produtos digitais", className: "font-serif italic" },
  { name: "Geist Mono", role: "Rótulos, números e etapas", sample: "01 — DESCOBERTA", className: "font-mono text-[0.8em] tracking-[0.1em]" },
];

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

export default function BrandPage() {
  return (
    <>
      <section className="bg-ink pt-36 pb-20 text-paper sm:pt-44 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-mint">Identidade visual</p>
            <h1 className="text-balance mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
              Duas colinas, <Accent>um ponto no vale</Accent>.
            </h1>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-fog">
            <p>
              O símbolo desenha as duas colinas de um vale, que juntas formam o M de Mobivalley. No encontro
              entre elas repousa um ponto: a ideia que encontrou seu lugar e o produto pronto para seguir em
              frente.
            </p>
            <p>
              É uma forma geométrica e simples, feita para funcionar em 16 pixels numa aba do navegador e em
              1024 pixels num ícone de app.
            </p>
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
              Versões do logo
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
                      alt={`Logo Mobivalley: ${logo.label}`}
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
                    alt="Ícone de app da Mobivalley"
                    width={112}
                    height={112}
                    className="size-28 rounded-[22.5%] shadow-xl"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-sm text-slate-2">Ícone de app</p>
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
                  <p className="text-sm text-slate-2">Favicon</p>
                  <DownloadLink href="/icon.svg">SVG</DownloadLink>
                </div>
              </li>
            </ul>
          </section>

          <section aria-labelledby="cores">
            <h2 id="cores" className="text-3xl font-semibold tracking-[-0.03em]">
              Cores
            </h2>
            <p className="mt-3 max-w-2xl text-slate">
              Uma base neutra, quente e contida, com um único acento. O verde menta aparece pouco e sempre
              com função: o ponto do símbolo, uma ação, um destaque.
            </p>
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
              Tipografia
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
              Uso
            </h2>
            <ul className="mt-8 grid gap-6 text-slate sm:grid-cols-3">
              <li>
                <p className="font-semibold text-ink">Área de proteção</p>
                <p className="mt-2">Mantenha ao redor do logo um espaço livre igual à altura de uma colina do símbolo.</p>
              </li>
              <li>
                <p className="font-semibold text-ink">Tamanho mínimo</p>
                <p className="mt-2">Símbolo a partir de 16 px. Logo horizontal a partir de 96 px de largura.</p>
              </li>
              <li>
                <p className="font-semibold text-ink">Contraste</p>
                <p className="mt-2">Use a versão para fundo escuro sobre Ink e a versão para fundo claro sobre Paper ou branco.</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
