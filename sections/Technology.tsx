import Image from "next/image";
import { Camera, Cpu, CreditCard, Globe2, Radio, Smartphone, type LucideIcon } from "lucide-react";
import { Accent, Section, SectionHeader } from "@/components/Section";
import { allApps, iconSrc } from "@/lib/apps";

type Capability = { icon: LucideIcon; title: string; text: string; apps: string[] };

const capabilities: Capability[] = [
  {
    icon: Smartphone,
    title: "Plataformas Apple",
    text: "iPhone, iPad, Apple Watch e Apple TV, com widgets, extensões de compartilhamento e Game Center.",
    apps: ["place-guesser", "littletube"],
  },
  {
    icon: Globe2,
    title: "Mapas e o mundo real",
    text: "Flyover em 3D, Look Around e Street View, geolocalização e cálculo de distância entre pontos.",
    apps: ["aeroexplorer", "place-guesser"],
  },
  {
    icon: Cpu,
    title: "IA no dispositivo",
    text: "Assistente de linguagem que funciona offline e análise de fotos sem enviar nada para a nuvem.",
    apps: ["offchat-ai", "gallery-optimizer"],
  },
  {
    icon: Camera,
    title: "Câmera, foto e vídeo",
    text: "Gravação com teleprompter sobreposto, remoção automática de fundo e edição de imagens.",
    apps: ["speakscroll", "sticker-maker"],
  },
  {
    icon: Radio,
    title: "Tempo real e backend",
    text: "Multiplayer ao vivo, desafios diários com ranking global e desafios assíncronos entre amigos.",
    apps: ["place-guesser"],
  },
  {
    icon: CreditCard,
    title: "Monetização",
    text: "Assinaturas, períodos de teste e planos premium integrados às compras da App Store.",
    apps: ["littletube", "price-action"],
  },
];

const stack = [
  "Swift",
  "SwiftUI",
  "WidgetKit",
  "MapKit",
  "GameKit",
  "StoreKit",
  "AVFoundation",
  "PhotoKit",
  "IA on-device",
  "APIs e cloud",
  "TypeScript",
  "React",
  "Next.js",
];

const names = Object.fromEntries(allApps.map((a) => [a.slug, a.name]));

export function Technology() {
  return (
    <Section id="tecnologia" tone="light" labelledBy="tecnologia-title" className="border-t border-ink/10">
        <SectionHeader
          id="tecnologia-title"
          tone="light"
          eyebrow="Tecnologia"
          title={
            <>
              Capacidade técnica <Accent>provada em produção</Accent>.
            </>
          }
          lead="Cada capacidade abaixo está em pelo menos um app publicado. Escolhemos a tecnologia pelo que o produto precisa, não por moda."
        />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, text, apps }) => (
          <li
            key={title}
            className="reveal group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/[0.06] transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(11_13_18/0.35)]"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-paper transition-colors duration-500 group-hover:bg-mint group-hover:text-ink">
              <Icon aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-slate">{text}</p>
            <p className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-5 text-sm text-slate-2">
              <span className="flex -space-x-1.5">
                {apps.map((slug) => (
                  <Image
                    key={slug}
                    src={iconSrc(slug)}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 rounded-[26%] ring-2 ring-white"
                  />
                ))}
              </span>
              <span>Em {apps.map((s) => names[s]).join(" e ")}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="reveal mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-slate-2 uppercase">Ferramentas do dia a dia</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
          {stack.map((t) => (
            <li
              key={t}
              className="rounded-full bg-white px-3.5 py-1.5 text-sm text-slate ring-1 ring-ink/10"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
