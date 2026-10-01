import { ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import { Section, Titled } from "@/components/Section";
import { portfolioStats } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const icons = [Target, Sparkles, ShieldCheck, TrendingUp];

export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;
  const { firstYear } = portfolioStats();

  return (
    <Section id="sobre" tone="light" labelledBy="sobre-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-6">
          <p className="eyebrow text-mint-deep">{t.eyebrow}</p>
          <h2
            id="sobre-title"
            className="text-balance mt-5 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
          >
            <Titled t={t.title} />
          </h2>
        </div>
        <div className="reveal space-y-6 text-lg leading-relaxed text-slate lg:col-span-5 lg:col-start-8 lg:pt-12">
          {t.paragraphs.map((p, i) => (
            <p key={i}>{p(firstYear)}</p>
          ))}
        </div>
      </div>

      <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
        {t.principles.map(({ title, text }, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={title} className="reveal bg-paper p-7 sm:p-8">
              <Icon aria-hidden className="size-6 text-mint-deep" strokeWidth={1.75} />
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
