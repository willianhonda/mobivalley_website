import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { ProductCard } from "@/components/ProductCard";
import { Accent, Section, SectionHeader } from "@/components/Section";
import { appStoreUrl, apps, featured, iconSrc } from "@/lib/apps";
import { site } from "@/lib/site";

function FeaturedProduct() {
  return (
    <article
      aria-labelledby="featured-title"
      className="reveal relative isolate mt-16 overflow-hidden rounded-[2rem] bg-ink text-paper sm:mt-20 sm:rounded-[2.5rem]"
    >
      <Contours className="-z-10 text-paper opacity-70" lines={12} />
      <div
        aria-hidden
        className="absolute -right-40 -bottom-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(247_228_139/0.16),transparent)]"
      />

      <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-2 lg:gap-6 lg:p-16">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Image
              src={iconSrc(featured.slug)}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-[26%] ring-1 ring-white/10"
            />
            <div>
              <p className="eyebrow text-mint">Em destaque</p>
              <p className="mt-1 text-sm text-fog">
                {featured.category} · desde {featured.year}
              </p>
            </div>
          </div>

          <h3 id="featured-title" className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {featured.name}
          </h3>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-fog">{featured.summary}</p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
            {featured.facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="mt-1.5 text-xs leading-snug text-fog sm:text-sm">{f.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{f.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-3">
            {featured.features.map((item) => (
              <li key={item} className="flex gap-3 text-paper/90">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" strokeWidth={2.25} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href={appStoreUrl(featured.id)} icon="external" variant="light">
              Baixar na App Store
            </Button>
          </div>
        </div>

        {/* three real App Store screenshots, fanned out */}
        <div className="relative flex min-h-[22rem] items-center justify-center sm:min-h-[30rem]">
          {featured.screens.map((screen, i) => {
            const pos = [
              "z-10 -rotate-[7deg] -translate-x-[62%] translate-y-4",
              "z-20 scale-105",
              "z-10 rotate-[7deg] translate-x-[62%] translate-y-4",
            ][i];
            return (
              <div
                key={screen.src}
                className={`absolute w-[38%] max-w-[15rem] overflow-hidden rounded-[1.4rem] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-(--ease-out-expo) ${pos}`}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={640}
                  height={1138}
                  sizes="(min-width: 1024px) 240px, 38vw"
                  className="h-auto w-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <Section id="produtos" tone="light" labelledBy="produtos-title">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="produtos-title"
          tone="light"
          eyebrow="Produtos"
          title={
            <>
              Não só desenvolvemos apps. <Accent>Publicamos os nossos.</Accent>
            </>
          }
          lead="Dez aplicativos na App Store, criados, lançados e mantidos pela Mobivalley. Cada um resolve um problema diferente, e todos percorreram o mesmo caminho: ideia, produto, publicação e evolução."
        />
        <div className="reveal shrink-0">
          <Button href={site.appStoreUrl} variant="outline-dark" icon="external">
            Ver todos na App Store
          </Button>
        </div>
      </div>

      <FeaturedProduct />

      <div className="mt-6 flex items-center justify-between md:hidden">
        <p className="text-sm text-slate-2">Deslize para ver mais apps</p>
        <span aria-hidden className="font-mono text-xs text-slate-2">
          {apps.length} apps →
        </span>
      </div>
      <ul
        aria-label="Outros apps da Mobivalley"
        className="reveal -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-2 pb-6 [scrollbar-width:none] md:mx-0 md:mt-6 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {apps.map((app) => (
          <li key={app.id} className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto">
            <ProductCard app={app} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
