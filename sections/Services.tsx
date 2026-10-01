import { Compass, Layers, RefreshCcw, Smartphone } from "lucide-react";
import { Section, SectionHeader, Titled } from "@/components/Section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const icons = [Smartphone, Layers, Compass, RefreshCcw];

export function Services({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).services;
  return (
    <Section id="servicos" labelledBy="servicos-title" className="border-t border-white/5">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <SectionHeader
          id="servicos-title"
          eyebrow={t.eyebrow}
          title={<Titled t={t.title} />}
          lead={t.lead}
          className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start"
        />

        <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:col-span-7">
          {t.items.map(({ title, text, items }, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={title}
                className="reveal group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-paper ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-mint group-hover:text-ink group-hover:ring-mint">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-fog-2">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-relaxed text-fog">{text}</p>
                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-fog">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1 rounded-full bg-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
