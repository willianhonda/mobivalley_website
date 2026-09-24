import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { appStoreUrl, iconSrc, type App } from "@/lib/apps";

/** Portfolio card: a screenshot rising out of a tinted panel, then the facts. */
export function ProductCard({ app }: { app: App }) {
  const screen = app.screens[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/[0.06] transition-[box-shadow,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(11_13_18/0.35)]">
      <div
        className="relative h-64 overflow-hidden sm:h-72"
        style={{ backgroundColor: app.tint }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgb(255_255_255/0.55),transparent_60%)]" />
        <div className="absolute top-8 left-1/2 w-[56%] -translate-x-1/2 transition-transform duration-700 ease-(--ease-out-expo) group-hover:-translate-y-2">
          <div className="relative aspect-[640/1138] overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_50px_-20px_rgb(11_13_18/0.45)] ring-[5px] ring-ink/90">
            <Image
              src={screen.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 60vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3.5">
          <Image
            src={iconSrc(app.slug)}
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-[26%] ring-1 ring-ink/10"
          />
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-[-0.02em]">
              <a
                href={appStoreUrl(app.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-mint-deep"
              >
                {app.name}
                <span className="sr-only"> — ver na App Store (abre em nova aba)</span>
              </a>
            </h3>
            <p className="text-sm text-slate-2">
              {app.category} · {app.year}
            </p>
          </div>
        </div>
        <p className="mt-4 flex-1 leading-relaxed text-slate">{app.summary}</p>
        <p
          aria-hidden
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-mint-deep"
        >
          Ver na App Store
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </article>
  );
}
