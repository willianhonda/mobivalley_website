import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { CopyEmail } from "@/components/CopyEmail";
import { Logo } from "@/components/Logo";
import { Accent } from "@/components/Section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { mailto } from "@/lib/site";

export function ContactCta({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.cta;
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative isolate overflow-hidden bg-ink py-28 text-paper sm:py-36 lg:py-44"
    >
      <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" lines={16} />
      <div
        aria-hidden
        className="absolute bottom-[-30rem] left-1/2 -z-10 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(52_224_161/0.2),transparent)]"
      />

      <div className="reveal mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Logo variant="symbol" className="mx-auto h-12 w-auto text-paper" title="" />
        <h2
          id="contato-title"
          className="text-balance mt-10 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
        >
          {t.title}{" "}
          <span className="block">
            <Accent>
              {t.accentBefore}
              <span className="whitespace-nowrap">{t.accentNowrap}</span>
              {t.accentAfter}
            </Accent>
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-pretty text-fog">{t.lead}</p>
        <div className="mt-11 flex flex-col items-center gap-4">
          <Button href={mailto(d.meta.mailSubject)} size="lg">
            {t.button}
          </Button>
          <CopyEmail t={{ copy: t.copy, copied: t.copied }} />
        </div>
      </div>
    </section>
  );
}
