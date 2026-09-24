import type { CSSProperties } from "react";
import Image from "next/image";
import { Star, Cpu } from "lucide-react";
import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Accent } from "@/components/Section";
import { allApps, iconSrc } from "@/lib/apps";

const stats = [
  { value: "10", label: "apps publicados na App Store" },
  { value: "2018", label: "ano do primeiro app lançado" },
  { value: "4", label: "plataformas Apple em um só produto" },
  { value: "9", label: "idiomas no Place Guesser" },
];

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const stack = allApps.slice(0, 6);

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
              Portfólio
            </span>
            10 apps publicados na App Store
          </a>

          <h1
            id="hero-title"
            className="intro text-balance mt-8 text-[2.85rem] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]"
            style={delay(1)}
          >
            Transformamos ideias em <Accent>produtos digitais</Accent>
            <span className="text-mint">.</span>
          </h1>

          <p
            className="intro mt-7 max-w-xl text-lg leading-relaxed text-pretty text-fog sm:text-xl"
            style={delay(2)}
          >
            A Mobivalley projeta, desenvolve e evolui aplicativos e produtos digitais, de jogos com
            multiplayer em tempo real a IA que roda direto no aparelho.
          </p>

          <div
            className="intro mt-10 flex flex-col gap-3 sm:flex-row"
            style={delay(3)}
          >
            <Button href="#produtos" size="lg">
              Conheça nossos produtos
            </Button>
            <Button href="#contato" size="lg" variant="secondary" icon="none">
              Fale conosco
            </Button>
          </div>

          <div
            className="intro mt-12 flex items-center gap-4"
            style={delay(4)}
          >
            <ul className="flex -space-x-2.5" aria-label="Alguns apps da Mobivalley">
              {stack.map((app) => (
                <li key={app.slug} className="shrink-0">
                  <Image
                    src={iconSrc(app.slug)}
                    alt={app.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-[26%] ring-2 ring-ink"
                  />
                </li>
              ))}
            </ul>
            <p className="text-sm leading-snug text-fog">
              Jogos, IA, foto e vídeo,
              <br className="hidden sm:block" /> mapas, família e finanças.
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
              <PhoneFrame
                src="/apps/aeroexplorer/screen-2.webp"
                alt="AeroExplorer mostrando a Estátua da Liberdade em 3D"
                sizes="(min-width: 1024px) 304px, 60vw"
                priority
              />
            </div>

            <div
              className="intro absolute top-[14%] -left-[22%] sm:-left-[34%]"
              style={delay(5)}
            >
              <div className="motion-safe:animate-float flex items-center gap-3 rounded-2xl bg-ink-800/80 p-2.5 pr-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <Image
                  src={iconSrc("place-guesser")}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-[26%]"
                />
                <div>
                  <p className="text-sm font-medium">Place Guesser</p>
                  <p className="flex items-center gap-1 text-xs text-fog">
                    <Star aria-hidden className="size-3 fill-mint text-mint" /> 4,7 na App Store
                  </p>
                </div>
              </div>
            </div>

            <div
              className="intro absolute -right-[18%] bottom-[16%] sm:-right-[30%]"
              style={delay(6)}
            >
              <div className="motion-safe:animate-float flex items-center gap-3 rounded-2xl bg-ink-800/80 p-2.5 pr-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md [animation-delay:-4s]">
                <span className="flex size-10 items-center justify-center rounded-[26%] bg-mint/15 text-mint">
                  <Cpu aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">IA no dispositivo</p>
                  <p className="text-xs text-fog">OffChat AI · offline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:mt-28">
        <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
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
