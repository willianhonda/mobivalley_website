// Portfolio data. Everything here comes from the public App Store listings of
// the Mobivalley developer account (id1701006912). Images are fetched and
// optimized by scripts/fetch-app-assets.mjs.

export type App = {
  id: number;
  slug: string;
  name: string;
  category: string;
  year: number;
  summary: string;
  /** Pastel tone sampled from the app icon, used behind the screenshot. */
  tint: string;
  screens: { src: string; alt: string }[];
};

export const appStoreUrl = (id: number) => `https://apps.apple.com/br/app/id${id}`;
export const iconSrc = (slug: string) => `/apps/${slug}/icon.webp`;

export const featured = {
  id: 6447742368,
  slug: "place-guesser",
  name: "Place Guesser",
  fullName: "Place Guesser: Street View Geo",
  category: "Jogos · Viagens · Trívia",
  year: 2023,
  summary:
    "Um jogo de geografia com imagens reais de rua: você olha em volta, marca um ponto no mapa e descobre o quanto chegou perto. Tem Desafio Diário com ranking global, multiplayer em tempo real, desafios assíncronos entre amigos e um Passaporte com todos os países visitados.",
  facts: [
    { value: "4,7", label: "nota na App Store dos EUA, com 700+ avaliações" },
    { value: "9", label: "idiomas, do português ao japonês" },
    { value: "4", label: "plataformas: iPhone, iPad, Apple Watch e Apple TV" },
  ],
  features: [
    "Imagens do Apple Look Around e do Google Street View",
    "Multiplayer em tempo real e rankings no Game Center",
    "Widgets, sequências diárias e cards de resultado",
  ],
  screens: [
    { src: "/apps/place-guesser/screen-1.webp", alt: "Place Guesser: rodada com imagem de rua e mapa para marcar o palpite" },
    { src: "/apps/place-guesser/screen-2.webp", alt: "Place Guesser: tela inicial com os modos de jogo" },
    { src: "/apps/place-guesser/screen-3.webp", alt: "Place Guesser: resultado da rodada com a distância no mapa" },
  ],
} as const;

export const apps: App[] = [
  {
    id: 6752722065,
    slug: "aeroexplorer",
    name: "AeroExplorer",
    category: "Navegação · Viagens",
    year: 2025,
    summary:
      "Mapas interativos com Flyover em 3D: sobrevoe cidades e marcos, salte para um ponto aleatório do planeta e alterne entre os estilos padrão, satélite e híbrido.",
    tint: "#DCE8D6",
    screens: [{ src: "/apps/aeroexplorer/screen-1.webp", alt: "AeroExplorer: vista 3D de Nova York em modo Flyover" }],
  },
  {
    id: 1452023223,
    slug: "sticker-maker",
    name: "Sticker Maker",
    category: "Foto e vídeo",
    year: 2019,
    summary:
      "Transforma fotos em figurinhas e pacotes personalizados, com remoção automática de fundo, texto com contorno e exportação direta para o WhatsApp e o iMessage.",
    tint: "#FBDCD6",
    screens: [{ src: "/apps/sticker-maker/screen-1.webp", alt: "Sticker Maker: fotos viram figurinhas em segundos" }],
  },
  {
    id: 6772647088,
    slug: "speakscroll",
    name: "SpeakScroll",
    category: "Foto e vídeo · Produtividade",
    year: 2026,
    summary:
      "Teleprompter e câmera no mesmo app: o roteiro rola sobre a câmera enquanto você fala olhando para a lente, e o vídeo sai limpo, sem sobreposições.",
    tint: "#FAD3C8",
    screens: [{ src: "/apps/speakscroll/screen-1.webp", alt: "SpeakScroll: roteiro rolando sobre a gravação de vídeo" }],
  },
  {
    id: 6772645489,
    slug: "gallery-optimizer",
    name: "Gallery Optimizer",
    category: "Foto e vídeo · Utilidades",
    year: 2026,
    summary:
      "Encontra fotos duplicadas, parecidas e desfocadas, capturas de tela e vídeos grandes. Toda a análise acontece no iPhone, sem enviar nenhuma foto para a nuvem.",
    tint: "#D6E2FB",
    screens: [{ src: "/apps/gallery-optimizer/screen-1.webp", alt: "Gallery Optimizer: espaço recuperável na galeria de fotos" }],
  },
  {
    id: 6759080666,
    slug: "offchat-ai",
    name: "OffChat AI",
    category: "Produtividade",
    year: 2026,
    summary:
      "Um assistente de IA que funciona offline. As respostas são geradas no próprio aparelho, então as conversas não saem do iPhone ou do iPad.",
    tint: "#E3E7EF",
    screens: [{ src: "/apps/offchat-ai/screen-1.webp", alt: "OffChat AI: conversa com o assistente rodando offline" }],
  },
  {
    id: 6752260529,
    slug: "littletube",
    name: "LittleTube",
    category: "Entretenimento · Educação",
    year: 2025,
    summary:
      "Um player de vídeos em que só toca o que você escolheu: sem recomendações nem surpresas. Pensado para famílias, com perfis e proteção por Face ID.",
    tint: "#D3E6FB",
    screens: [{ src: "/apps/littletube/screen-1.webp", alt: "LittleTube: lista de vídeos escolhidos pela família" }],
  },
  {
    id: 1547922378,
    slug: "price-action",
    name: "Price Action",
    category: "Finanças",
    year: 2021,
    summary:
      "Registro de operações no mercado financeiro, organizadas por status (abertas, com ganho, com perda ou aguardando), com busca por ativo e filtros por data.",
    tint: "#D9DBE0",
    screens: [{ src: "/apps/price-action/screen-1.webp", alt: "Price Action: lista de operações com ganhos e perdas" }],
  },
  {
    id: 1515394611,
    slug: "stock-calc",
    name: "Stock Calc",
    category: "Negócios",
    year: 2020,
    summary:
      "Carteira de ações, fundos e títulos com cálculo automático de preço médio, quantidade e valor total a cada operação registrada.",
    tint: "#CDEAE6",
    screens: [{ src: "/apps/stock-calc/screen-1.webp", alt: "Stock Calc: preço médio de um ativo calculado a partir das operações" }],
  },
  {
    id: 1425516744,
    slug: "travel-budget",
    name: "Despesas da Viagem",
    category: "Finanças · Viagens",
    year: 2018,
    summary:
      "Controle de gastos de viagem em qualquer moeda, com localização e foto em cada registro e exportação das despesas por e-mail.",
    tint: "#D7EDCB",
    screens: [{ src: "/apps/travel-budget/screen-1.webp", alt: "Despesas da Viagem: gastos registrados durante uma viagem" }],
  },
];

export const allApps = [
  { id: featured.id, slug: featured.slug, name: featured.name, category: featured.category },
  ...apps,
];
