import Image from "next/image";
import { Camera, Cpu, CreditCard, Globe2, Radio, Smartphone } from "lucide-react";
import { Section, SectionHeader, Titled } from "@/components/Section";
import { getApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const icons = [Smartphone, Globe2, Cpu, Camera, Radio, CreditCard];

export function Technology({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).technology;
  const bySlug = Object.fromEntries(getApps(locale).map((a) => [a.slug, a]));

  return (
    <Section id="tecnologia" tone="light" labelledBy="tecnologia-title" className="border-t border-ink/10">
      <SectionHeader
        id="tecnologia-title"
        tone="light"
        eyebrow={t.eyebrow}
        title={<Titled t={t.title} />}
        lead={t.lead}
      />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.capabilities.map(({ title, text, apps }, i) => {
          const Icon = icons[i % icons.length];
          const used = apps.map((s) => bySlug[s]).filter(Boolean);
          return (
            <li
              key={title}
              className="reveal group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/[0.06] transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(11_13_18/0.35)]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-paper transition-colors duration-500 group-hover:bg-mint group-hover:text-ink">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-slate">{text}</p>
              {used.length > 0 && (
                <p className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-5 text-sm text-slate-2">
                  <span className="flex shrink-0 -space-x-1.5">
                    {used.map((app) => (
                      <Image
                        key={app.slug}
                        src={app.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 rounded-[26%] ring-2 ring-white"
                      />
                    ))}
                  </span>
                  <span>{t.usedIn(used.map((a) => a.name))}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="reveal mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-slate-2 uppercase">{t.toolsLabel}</p>
        <ul className="flex flex-wrap gap-2" aria-label={t.toolsAria}>
          {t.tools.map((tool) => (
            <li key={tool} className="rounded-full bg-white px-3.5 py-1.5 text-sm text-slate ring-1 ring-ink/10">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
