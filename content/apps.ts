// Hand-written copy and legal facts for each app, keyed by slug.
// Store facts (name, rating, version, screenshots, privacy labels) come from
// data/apps.json, which scripts/sync-apps.mjs keeps up to date. An app that
// appears on the App Store without an entry here is still listed, using its
// store description as a fallback.

import type { Locale } from "@/lib/i18n";

export type Purchases = "subscription" | "one-time" | "none" | "unknown";
export type ThirdParty = "apple-maps" | "google-street-view" | "game-center" | "youtube" | "ads" | "whatsapp";
export type Permission = "camera" | "microphone" | "photos" | "location" | "faceid";

type Copy = {
  /** One or two sentences for cards. */
  summary: string;
  /** Short list for the app page. */
  features: string[];
};

export type CuratedApp = {
  /** Display name when the store name is long (e.g. "Place Guesser: Street View Geo"). */
  name?: Partial<Record<Locale, string>>;
  tint: string;
  /** Screenshot (0-based, App Store order) shown on the portfolio card. */
  cardScreen: number;
  copy: Record<Locale, Copy>;
  legal: {
    purchases: Purchases;
    purchaseName?: string;
    thirdParties: ThirdParty[];
    permissions: Permission[];
    /** The app's core processing happens on the device (stated in its listing). */
    onDevice?: boolean;
    /** The app works without an account (stated in its listing). */
    noAccount?: boolean;
    family?: boolean;
    /** Finance app: terms state it is not investment advice. */
    financial?: boolean;
    /** Users bring their own images or text (terms cover content rights). */
    userContent?: boolean;
  };
};

/** Portfolio order. Apps not listed here come after, newest first. */
export const order = [
  "place-guesser",
  "aeroexplorer",
  "sticker-maker",
  "unsaid",
  "speakscroll",
  "gallery-optimizer",
  "offchat-ai",
  "littletube",
  "work-hour-manager",
  "travel-budget",
  "editais",
  "buttonboard",
  "price-action",
  "stock-calc",
];

export const featuredSlug = "place-guesser";

export const curated: Record<string, CuratedApp> = {
  "place-guesser": {
    name: { pt: "Place Guesser", en: "Place Guesser" },
    tint: "#F7EDB8",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Um jogo de geografia com imagens reais de rua: você olha em volta, marca um ponto no mapa e descobre o quanto chegou perto. Tem Desafio Diário com ranking global, multiplayer em tempo real, desafios assíncronos entre amigos e um Passaporte com todos os países visitados.",
        features: [
          "Imagens do Apple Look Around e do Google Street View",
          "Multiplayer em tempo real e rankings no Game Center",
          "Desafio Diário, Country Streak, Guess The Spot e Modo Infinito",
          "Widgets, apps para Apple Watch e Apple TV e cards de resultado",
        ],
      },
      en: {
        summary:
          "A geography game built on real street-level imagery: look around, drop a pin on the map and see how close you got. It has a Daily Challenge with a global leaderboard, real-time multiplayer, async challenges with friends and a Passport of every country you've visited.",
        features: [
          "Imagery from Apple Look Around and Google Street View",
          "Real-time multiplayer and Game Center leaderboards",
          "Daily Challenge, Country Streak, Guess The Spot and Infinite Mode",
          "Widgets, Apple Watch and Apple TV apps, and shareable result cards",
        ],
      },
    },
    legal: {
      purchases: "subscription",
      purchaseName: "Place Guesser Pro",
      thirdParties: ["apple-maps", "google-street-view", "game-center"],
      permissions: [],
    },
  },
  aeroexplorer: {
    tint: "#DCE8D6",
    cardScreen: 3,
    copy: {
      pt: {
        summary:
          "Mapas interativos com Flyover em 3D: sobrevoe cidades e marcos, salte para um ponto aleatório do planeta e alterne entre os estilos padrão, satélite e híbrido.",
        features: [
          "Flyover em 3D de grandes cidades e marcos",
          "Salto para um lugar aleatório do planeta",
          "Mapas padrão, satélite e híbrido, no modo claro ou escuro",
          "Sua localização no mapa para explorar os arredores",
        ],
      },
      en: {
        summary:
          "Interactive maps with 3D Flyover: soar over cities and landmarks, jump to a random spot on Earth and switch between standard, satellite and hybrid styles.",
        features: [
          "3D Flyover of major cities and landmarks",
          "Jump to a random place on the planet",
          "Standard, satellite and hybrid maps, in light or dark mode",
          "Your location on the map to explore your surroundings",
        ],
      },
    },
    legal: { purchases: "one-time", thirdParties: ["apple-maps"], permissions: ["location"] },
  },
  "sticker-maker": {
    name: { pt: "Sticker Maker", en: "Sticker Maker" },
    tint: "#FBDCD6",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Transforma fotos em figurinhas em segundos, com recorte automático do fundo, figurinhas animadas e envio para o WhatsApp, o Telegram e o iMessage. Tudo é feito no aparelho, sem conta.",
        features: [
          "Recorte automático, com toque para escolher quem fica na foto",
          "Figurinhas animadas a partir de Live Photos, vídeos e GIFs",
          "Legendas de meme, texto com contorno, emoji e acabamentos",
          "Envio para WhatsApp, Telegram e iMessage, e backup dos pacotes",
        ],
      },
      en: {
        summary:
          "Turns photos into stickers in seconds, with automatic background removal, animated stickers and one-tap sending to WhatsApp, Telegram and iMessage. Everything is made on the device, with no account.",
        features: [
          "Automatic cutout, with a tap to choose who stays in the photo",
          "Animated stickers from Live Photos, videos and GIFs",
          "Meme captions, outlined text, emoji and finishes",
          "Send to WhatsApp, Telegram and iMessage, and back up your packs",
        ],
      },
    },
    legal: {
      purchases: "unknown",
      thirdParties: ["ads", "whatsapp"],
      permissions: ["photos", "camera"],
      onDevice: true,
      noAccount: true,
      userContent: true,
    },
  },
  unsaid: {
    tint: "#EBDDF8",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Um jogo de palavras para festas: descreva a palavra da carta para o seu time adivinhar sem dizer nenhuma das palavras proibidas. De 2 a 4 times, passando o celular, totalmente offline.",
        features: [
          "De 2 a 4 times, com rodízio automático de quem explica",
          "Seis modos de jogo, do Clássico à Morte Súbita",
          "6.600 cartas em seis idiomas e decks criados por você",
          "Funciona offline, sem conta, sem anúncios e sem rastreamento",
        ],
      },
      en: {
        summary:
          "A party word game: describe the word on the card so your team guesses it, without saying any of the forbidden words. Two to four teams pass the phone, fully offline.",
        features: [
          "Two to four teams, with automatic rotation of who explains",
          "Six game modes, from Classic to Sudden Death",
          "6,600 cards in six languages, plus decks you build yourself",
          "Works offline, with no account, no ads and no tracking",
        ],
      },
    },
    legal: { purchases: "one-time", purchaseName: "Unsaid Plus", thirdParties: [], permissions: [], noAccount: true, family: true },
  },
  speakscroll: {
    tint: "#FAD3C8",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Teleprompter e câmera no mesmo app: o roteiro rola sobre a câmera enquanto você fala olhando para a lente, e pode acompanhar a sua voz. O reconhecimento de fala roda no próprio iPhone.",
        features: [
          "Roteiro rolando sobre a câmera, na altura dos seus olhos",
          "Rolagem por voz, com reconhecimento de fala no aparelho",
          "Gravação com contagem regressiva, salva direto na galeria",
          "Biblioteca de roteiros e controle por teclado ou controle Bluetooth",
        ],
      },
      en: {
        summary:
          "Teleprompter and camera in one app: your script scrolls over the camera while you look straight at the lens, and it can follow your voice. Speech recognition runs on the iPhone itself.",
        features: [
          "Script scrolling over the camera, right at eye level",
          "Voice scroll, with on-device speech recognition",
          "One-tap recording with a countdown, saved straight to Photos",
          "Script library, plus keyboard and Bluetooth remote control",
        ],
      },
    },
    legal: {
      purchases: "unknown",
      thirdParties: [],
      permissions: ["camera", "microphone", "photos"],
      onDevice: true,
      noAccount: true,
      userContent: true,
    },
  },
  "gallery-optimizer": {
    tint: "#D6E2FB",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Encontra fotos duplicadas, parecidas e desfocadas, capturas de tela e vídeos grandes. Toda a análise acontece no iPhone, sem enviar nenhuma foto para a nuvem.",
        features: [
          "Duplicatas, fotos parecidas e sequências em rajada",
          "Fotos desfocadas, capturas de tela e vídeos grandes",
          "Itens agrupados, ordenados por tamanho e pré-selecionados",
          "Análise e revisão grátis; limpeza ilimitada no Photo Cleanup Pro",
        ],
      },
      en: {
        summary:
          "Finds duplicate, similar and blurry photos, screenshots and large videos. All the analysis happens on your iPhone; no photo is ever uploaded.",
        features: [
          "Duplicates, similar shots and burst sequences",
          "Blurry photos, screenshots and large videos",
          "Results grouped, sorted by size and pre-selected",
          "Free scanning and review; unlimited cleanup with Photo Cleanup Pro",
        ],
      },
    },
    legal: { purchases: "unknown", thirdParties: [], permissions: ["photos"], onDevice: true, noAccount: true },
  },
  "offchat-ai": {
    tint: "#E3E7EF",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Um assistente de viagem com IA que continua funcionando sem internet. Prepare a viagem online e, no avião ou sem roaming, consulte voos e hospedagem, converta preços e mostre frases no idioma local.",
        features: [
          "Respostas geradas no aparelho, com Apple Intelligence ou modelo offline próprio",
          "Destino, voos, hospedagem e anotações salvos na viagem",
          "Conversor de moedas, tradução e frases essenciais offline",
          "Checklist \"Pronto para voar\", widget, Siri e Atalhos",
        ],
      },
      en: {
        summary:
          "An AI travel assistant that keeps working without internet. Prepare your trip online, then on the plane or without roaming check flights and hotels, convert prices and show phrases in the local language.",
        features: [
          "Answers generated on the device, with Apple Intelligence or its own offline model",
          "Destination, flights, accommodation and notes saved to your trip",
          "Offline currency converter, translation and essential phrases",
          "\"Ready to fly\" checklist, widget, Siri and Shortcuts",
        ],
      },
    },
    legal: { purchases: "unknown", thirdParties: ["apple-maps"], permissions: [], onDevice: true },
  },
  littletube: {
    tint: "#D3E6FB",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Um player de vídeos para crianças que só toca o que os pais escolheram: sem feed, sem Shorts e sem algoritmo decidindo o próximo vídeo. Links protegidos por Face ID.",
        features: [
          "Só toca os vídeos que você adicionou",
          "Ao fim de um vídeo, aparecem só os outros que você aprovou",
          "Adicione vídeos do YouTube ou do Safari com um toque",
          "LittleTube Pro: perfis por criança e limite diário de tempo",
        ],
      },
      en: {
        summary:
          "A video player for kids that only plays what parents picked: no feed, no Shorts and no algorithm choosing what comes next. Links are locked behind Face ID.",
        features: [
          "Plays only the videos you added",
          "When a video ends, only your other approved videos appear",
          "Add videos from YouTube or Safari in one tap",
          "LittleTube Pro: a profile per child and daily watch time limits",
        ],
      },
    },
    legal: {
      purchases: "subscription",
      purchaseName: "LittleTube Pro",
      thirdParties: ["youtube"],
      permissions: ["faceid"],
      noAccount: true,
      family: true,
    },
  },
  "work-hour-manager": {
    tint: "#D3EFD9",
    cardScreen: 1,
    copy: {
      pt: {
        summary:
          "Registro de horas e ganhos para freelancers, autônomos e quem trabalha por hora: um toque para iniciar o turno e o valor ganho cresce em tempo real. Sem cadastro e sem configuração.",
        features: [
          "Um toque para registrar entrada e saída",
          "Ganhos ao vivo com base no valor por hora, em qualquer moeda",
          "Live Activity, Dynamic Island, widgets, Siri e Atalhos",
          "Relatórios por semana, mês e ano, com exportação em CSV e PDF no Pro",
        ],
      },
      en: {
        summary:
          "Time and pay tracking for freelancers, contractors and hourly workers: one tap starts your shift and your earnings grow in real time. No account, no setup.",
        features: [
          "One tap to clock in and out",
          "Live earnings from your hourly rate, in any currency",
          "Live Activity, Dynamic Island, widgets, Siri and Shortcuts",
          "Weekly, monthly and yearly reports, with CSV and PDF export in Pro",
        ],
      },
    },
    legal: { purchases: "one-time", purchaseName: "Work Hour Manager Pro", thirdParties: [], permissions: [], noAccount: true },
  },
  "travel-budget": {
    tint: "#D7EDCB",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Saiba quanto dinheiro ainda sobra na viagem: anote cada gasto em segundos, em qualquer moeda, e veja o saldo atualizado na hora. Funciona sem internet e sem cadastro.",
        features: [
          "Gastos e entradas em qualquer moeda, separados por dia",
          "Saldo, total gasto e entradas sempre no topo",
          "Funciona offline, sem cadastro e sem anúncios",
          "Premium: viagens ilimitadas, fotos, localização e exportação CSV",
        ],
      },
      en: {
        summary:
          "Know how much money is left on your trip: add each expense in seconds, in any currency, and see your balance update as you go. Works offline, with no account.",
        features: [
          "Expenses and money in, in any currency, grouped by day",
          "Balance, total spent and money in always at the top",
          "Works offline, with no account and no ads",
          "Premium: unlimited trips, photos, locations and CSV export",
        ],
      },
    },
    legal: { purchases: "one-time", thirdParties: [], permissions: ["location", "camera", "photos"], noAccount: true },
  },
  editais: {
    tint: "#CFE6DF",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Reúne os concursos públicos e processos seletivos com inscrições abertas numa lista só. Todos os dias, o app lê os diários oficiais das prefeituras e o Diário Oficial da União.",
        features: [
          "Busca por órgão, cidade ou cargo, com filtros por estado e salário",
          "Período de inscrição, salário, vagas e link para o edital",
          "Lembretes antes do fim das inscrições e alertas de novos concursos",
          "Grátis para consultar; acompanhamento ilimitado no Radar Premium",
        ],
      },
      en: {
        summary:
          "Gathers Brazilian public-sector exams and selection processes open for registration in a single list. Every day, the app reads municipal official gazettes and the federal Diário Oficial da União.",
        features: [
          "Search by agency, city or job title, with state and salary filters",
          "Registration period, salary, openings and a link to the notice",
          "Reminders before registration closes and new-exam alerts",
          "Free to browse; unlimited follows with Radar Premium",
        ],
      },
    },
    legal: { purchases: "subscription", purchaseName: "Radar Premium", thirdParties: [], permissions: [] },
  },
  buttonboard: {
    tint: "#DED8F6",
    cardScreen: 1,
    copy: {
      pt: {
        summary:
          "Mais de 9 mil sons de memes, virais, jogos, filmes e efeitos sonoros: aperte o botão e o som toca na hora. Salve os favoritos e mande os sons para os amigos.",
        features: [
          "Mais de 9 mil sons organizados por categoria",
          "Busca em todas as categorias, sem se preocupar com acentos",
          "Favoritos a um toque, no topo do app",
          "Compartilhe qualquer som como arquivo de áudio",
        ],
      },
      en: {
        summary:
          "Over 9,000 meme, viral, game, movie and sound effect clips: tap a button and the sound plays instantly. Save your favorites and send sounds to your friends.",
        features: [
          "Over 9,000 sounds organized into categories",
          "Search every category at once, accents and all",
          "Favorites one tap away, at the top of the app",
          "Share any sound as an audio file",
        ],
      },
    },
    legal: { purchases: "none", thirdParties: ["ads"], permissions: [] },
  },
  "price-action": {
    name: { pt: "Price Action", en: "Price Action" },
    tint: "#D9DBE0",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Planejador e diário de trades: registre ativo, entrada, alvo e stop, e o app calcula o risco:retorno e o tamanho da posição. Ao fechar a operação, veja o resultado em R e em dinheiro.",
        features: [
          "Risco:retorno, % até o alvo e o stop e calculadora de posição",
          "Status, tags, print do gráfico e lembretes de revisão",
          "Taxa de acerto, fator de lucro e curva de capital em R",
          "Sem conta: as operações ficam no aparelho, com bloqueio por Face ID",
        ],
      },
      en: {
        summary:
          "A trade planner and journal: enter the asset, entry, target and stop, and the app calculates risk:reward and position size. When the trade closes, see the result in R and in money.",
        features: [
          "Risk:reward, % to target and stop, and a position size calculator",
          "Statuses, tags, chart screenshots and review reminders",
          "Win rate, profit factor and an equity curve in R",
          "No account: trades stay on your device, with Face ID lock",
        ],
      },
    },
    legal: {
      purchases: "subscription",
      purchaseName: "Price Action Premium",
      thirdParties: ["ads"],
      permissions: ["faceid"],
      noAccount: true,
      financial: true,
    },
  },
  "stock-calc": {
    name: { pt: "Stock Calc", en: "Stock Calc" },
    tint: "#CDEAE6",
    cardScreen: 0,
    copy: {
      pt: {
        summary:
          "Calcula o preço médio de cada ação, FII, ETF e BDR da carteira, com corretagem e emolumentos incluídos, e simula quanto comprar para chegar ao preço médio desejado.",
        features: [
          "Preço médio ponderado, com custos da operação incluídos",
          "Simulação de compras antes de operar",
          "Proventos, alocação da carteira e total investido por moeda",
          "Sem cadastro, com Face ID, backup e importação de planilhas",
        ],
      },
      en: {
        summary:
          "Calculates the average cost of every stock, REIT, ETF and BDR in your portfolio, fees included, and simulates how much to buy to reach a target average price.",
        features: [
          "Weighted average cost, with trading fees included",
          "Simulate purchases before you trade",
          "Dividends, allocation and total invested per currency",
          "No sign-up, with Face ID, backups and spreadsheet import",
        ],
      },
    },
    legal: { purchases: "unknown", thirdParties: ["ads"], permissions: ["faceid"], noAccount: true, financial: true },
  },
};
