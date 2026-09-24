import type { Metadata } from "next";

export const site = {
  name: "Mobivalley",
  url: "https://mobivalley.com.br",
  title: "Mobivalley — Desenvolvimento de Apps e Produtos Digitais",
  description:
    "A Mobivalley projeta, desenvolve e evolui aplicativos e produtos digitais. Dez apps publicados na App Store, de jogos com multiplayer em tempo real a IA que roda no próprio aparelho.",
  tagline: "Apps, produtos digitais e tecnologia.",
  email: "mobivalleytech@gmail.com",
  appStoreUrl: "https://apps.apple.com/br/developer/mobivalley/id1701006912",
} as const;

/** Open Graph defaults. Pages that set `openGraph` must spread this, since Next replaces the whole object. */
export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "pt_BR",
  siteName: site.name,
  images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mobivalley — Transformamos ideias em produtos digitais." }],
};

export const mailto = (subject = "Quero conversar sobre um projeto") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
] as const;
