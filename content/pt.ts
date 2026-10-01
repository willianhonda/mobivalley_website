// Portuguese copy. content/en.ts must mirror this shape (it is typed from it).

const pt = {
  meta: {
    title: "Mobivalley — Desenvolvimento de Apps e Produtos Digitais",
    description:
      "A Mobivalley projeta, desenvolve e evolui aplicativos e produtos digitais. Apps publicados na App Store, de jogos com multiplayer em tempo real a IA que roda no próprio aparelho.",
    ogAlt: "Mobivalley — Transformamos ideias em produtos digitais.",
    tagline: "Apps, produtos digitais e tecnologia.",
    mailSubject: "Quero conversar sobre um projeto",
  },

  nav: {
    items: [
      { id: "servicos", label: "Serviços" },
      { id: "produtos", label: "Produtos" },
      { id: "sobre", label: "Sobre" },
      { id: "contato", label: "Contato" },
    ],
    cta: "Vamos conversar",
    home: "Mobivalley — início",
    main: "Principal",
    mobile: "Menu móvel",
    open: "Abrir menu",
    close: "Fechar menu",
    skip: "Pular para o conteúdo",
    switchTo: "English",
    switchToShort: "EN",
    switchLabel: "Read this page in English",
    opensNewTab: "(abre em nova aba)",
  },

  hero: {
    pillTag: "Portfólio",
    pill: (n: number) => `${n} apps publicados na App Store`,
    titleBefore: "Transformamos ideias em ",
    titleAccent: "produtos digitais",
    lead: "A Mobivalley projeta, desenvolve e evolui aplicativos e produtos digitais, de jogos com multiplayer em tempo real a IA que roda direto no aparelho.",
    ctaProducts: "Conheça nossos produtos",
    ctaContact: "Fale conosco",
    stackLabel: "Alguns apps da Mobivalley",
    stackCaption: ["Jogos, IA, foto e vídeo,", "mapas, família e finanças."],
    phoneAlt: "AeroExplorer mostrando a Estátua da Liberdade em 3D",
    ratingCard: (rating: string) => `${rating} na App Store`,
    aiCardTitle: "IA no dispositivo",
    aiCardSub: "OffChat · offline",
    stats: (s: { count: number; firstYear: number; languages: number }) => [
      { value: String(s.count), label: "apps publicados na App Store" },
      { value: String(s.firstYear), label: "ano do primeiro app lançado" },
      { value: "4", label: "plataformas Apple em um só produto" },
      { value: String(s.languages), label: "idiomas no Place Guesser" },
    ],
  },

  services: {
    eyebrow: "Serviços",
    title: { before: "Do primeiro esboço à ", accent: "próxima versão", after: "." },
    lead: "Cuidamos do ciclo completo de um produto digital: quem desenha a solução também escreve o código, publica nas lojas e continua evoluindo o produto depois do lançamento.",
    items: [
      {
        title: "Desenvolvimento de aplicativos",
        text: "Apps nativos para iPhone, iPad, Apple Watch e Apple TV, com a performance e o acabamento que as pessoas esperam de um app na App Store.",
        items: ["Interfaces nativas e acessíveis", "Widgets, extensões e Game Center", "Assinaturas e compras no app"],
      },
      {
        title: "Produtos digitais",
        text: "Da ideia ao produto completo: escopo, design de interface, backend e tudo o que o produto precisa para funcionar com usuários de verdade.",
        items: ["Descoberta e definição do MVP", "Design de interface e protótipos", "APIs, dados e recursos em tempo real"],
      },
      {
        title: "Consultoria em tecnologia",
        text: "Orientação técnica para decisões que custam caro quando tomadas no escuro: arquitetura, escolha de stack, privacidade e o caminho até a publicação.",
        items: ["Arquitetura e revisão técnica", "Planejamento de publicação nas lojas", "Privacidade e processamento no aparelho"],
      },
      {
        title: "Evolução e manutenção",
        text: "O lançamento é só o começo. Acompanhamos métricas e avaliações, corrigimos, otimizamos e entregamos novas funcionalidades em ciclos curtos.",
        items: ["Atualizações a cada nova versão do iOS", "Melhorias guiadas por dados e feedback", "Novas funcionalidades com frequência"],
      },
    ],
  },

  products: {
    eyebrow: "Produtos",
    title: { before: "Não só desenvolvemos apps. ", accent: "Publicamos os nossos.", after: "" },
    lead: (n: number) =>
      `${n} aplicativos na App Store, criados, lançados e mantidos pela Mobivalley. Cada um resolve um problema diferente, e todos percorreram o mesmo caminho: ideia, produto, publicação e evolução.`,
    viewAll: "Ver todos na App Store",
    featured: "Em destaque",
    since: (year: number) => `desde ${year}`,
    facts: (f: { rating: string; ratingCount: string; languages: number }) => [
      { value: f.rating, label: `nota na App Store dos EUA, com ${f.ratingCount}+ avaliações` },
      { value: String(f.languages), label: "idiomas, do português ao japonês" },
      { value: "4", label: "plataformas: iPhone, iPad, Apple Watch e Apple TV" },
    ],
    download: "Baixar na App Store",
    details: "Conheça o app",
    swipe: "Deslize para ver mais apps",
    count: (n: number) => `${n} apps →`,
    listLabel: "Outros apps da Mobivalley",
    viewOnStore: "Ver detalhes",
  },

  process: {
    eyebrow: "Como trabalhamos",
    title: { before: "Um caminho claro, ", accent: "da ideia ao produto", after: "." },
    lead: "Todo produto atravessa um vale entre a ideia e o lançamento. Nosso processo existe para cruzá-lo com método, entregas frequentes e decisões baseadas em evidências.",
    steps: [
      {
        title: "Descoberta",
        text: "Entendemos o problema, o objetivo do negócio e quem vai usar o produto. Antes de qualquer tela, definimos o que precisa dar certo.",
      },
      {
        title: "Estratégia",
        text: "Definimos escopo, arquitetura e prioridades. O resultado é um plano enxuto, com um MVP que chega cedo às mãos dos usuários.",
      },
      {
        title: "Desenvolvimento",
        text: "Design e código andam juntos, em ciclos curtos, com versões testáveis desde as primeiras semanas.",
      },
      {
        title: "Lançamento",
        text: "Preparamos a publicação: página na loja, capturas de tela, revisão da Apple, assinaturas e monitoramento.",
      },
      {
        title: "Evolução",
        // {version} is replaced with Place Guesser's current version.
        text: "Medimos, lemos as avaliações e melhoramos. Foi assim que o Place Guesser chegou à versão {version}.",
      },
    ],
  },

  about: {
    eyebrow: "Sobre a Mobivalley",
    title: { before: "Uma empresa de tecnologia que ", accent: "constrói os próprios produtos", after: "." },
    paragraphs: [
      (year: number) =>
        `A Mobivalley é uma empresa de tecnologia focada em desenvolvimento de aplicativos, produtos digitais e consultoria. Nosso primeiro app chegou à App Store em ${year}, e seguimos cuidando de cada um depois do lançamento.`,
      () =>
        "Isso muda a forma como trabalhamos com clientes. Conhecemos o que vem depois do código: a revisão da Apple, as primeiras avaliações, a métrica que não se mexe, a atualização urgente para a nova versão do iOS. Quando assumimos um projeto, essa experiência vem junto.",
    ],
    principles: [
      { title: "Produto antes de código", text: "Tecnologia é meio. Começamos pelo problema, por quem vai usar e pelo que precisa ser medido." },
      {
        title: "Nativo quando faz diferença",
        text: "Mapas em 3D, câmera, Apple Watch, widgets: usamos o melhor de cada plataforma, sem atalhos que o usuário percebe.",
      },
      { title: "Privacidade por padrão", text: "Sempre que possível, os dados ficam no aparelho, como no OffChat e no Photo Cleanup." },
      { title: "Lançar é o começo", text: "Produtos melhoram com uso real. A evolução entra no plano desde o primeiro dia, não depois." },
    ],
  },

  technology: {
    eyebrow: "Tecnologia",
    title: { before: "Capacidade técnica ", accent: "provada em produção", after: "." },
    lead: "Cada capacidade abaixo está em pelo menos um app publicado. Escolhemos a tecnologia pelo que o produto precisa, não por moda.",
    capabilities: [
      {
        title: "Plataformas Apple",
        text: "iPhone, iPad, Apple Watch e Apple TV, com widgets, extensões de compartilhamento e Game Center.",
        apps: ["place-guesser", "littletube"],
      },
      {
        title: "Mapas e o mundo real",
        text: "Flyover em 3D, Look Around e Street View, geolocalização e cálculo de distância entre pontos.",
        apps: ["aeroexplorer", "place-guesser"],
      },
      {
        title: "IA no dispositivo",
        text: "Assistente de linguagem que funciona offline e análise de fotos sem enviar nada para a nuvem.",
        apps: ["offchat-ai", "gallery-optimizer"],
      },
      {
        title: "Câmera, foto e vídeo",
        text: "Gravação com teleprompter sobreposto, remoção automática de fundo e edição de imagens.",
        apps: ["speakscroll", "sticker-maker"],
      },
      {
        title: "Tempo real e backend",
        text: "Multiplayer ao vivo, desafios diários com ranking global e desafios assíncronos entre amigos.",
        apps: ["place-guesser"],
      },
      {
        title: "Monetização",
        text: "Assinaturas, períodos de teste e planos premium integrados às compras da App Store.",
        apps: ["littletube", "price-action"],
      },
    ],
    usedIn: (names: string[]) => `Em ${names.join(" e ")}`,
    toolsLabel: "Ferramentas do dia a dia",
    toolsAria: "Tecnologias",
    tools: ["Swift", "SwiftUI", "WidgetKit", "MapKit", "GameKit", "StoreKit", "AVFoundation", "PhotoKit", "IA on-device", "APIs e cloud", "TypeScript", "React", "Next.js"],
  },

  cta: {
    title: "Tem uma ideia?",
    accentBefore: "Vamos ",
    accentNowrap: "transformá-la",
    accentAfter: " em produto.",
    lead: "Conte o que você quer construir. A Mobivalley ajuda da estratégia e do desenho do produto ao desenvolvimento, à publicação e às próximas versões.",
    button: "Fale com a Mobivalley",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
  },

  footer: {
    nav: "Navegação",
    navLabel: "Rodapé",
    apps: "Apps",
    contact: "Contato",
    privacy: "Política de privacidade",
    brand: "Identidade visual",
    rights: "Todos os direitos reservados.",
    made: "Feito no Brasil.",
  },

  notFound: {
    title: "Página não encontrada",
    heading: { before: "Esta página ", accent: "se perdeu no vale", after: "." },
    text: "O endereço pode ter mudado ou nunca ter existido. Vamos voltar ao começo?",
    button: "Voltar para o início",
  },

  appPage: {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumb: "Produtos",
    rating: (value: string, count: string) => `${value} · ${count} avaliações nos EUA`,
    badgeAlt: "Baixar na App Store",
    screenshots: "Capturas de tela",
    highlights: "Destaques",
    info: "Informações",
    infoLabels: {
      version: "Versão",
      updated: "Atualizado em",
      requires: "Requer",
      size: "Tamanho",
      languages: "Idiomas",
      category: "Categoria",
      price: "Preço",
      released: "Lançado em",
    },
    requires: (v: string) => `iOS ${v} ou posterior`,
    free: "Grátis",
    moreLanguages: (n: number) => `e mais ${n}`,
    support: {
      eyebrow: "Suporte",
      title: "Precisa de ajuda?",
      text: "Fale com a gente por e-mail. Conte qual aparelho e qual versão do iOS você usa e, se possível, mande uma captura de tela do problema.",
      button: "Enviar e-mail para o suporte",
      subject: (app: string) => `Suporte ${app}`,
      faqTitle: "Perguntas frequentes",
      faq: {
        restore: {
          q: "Comprei, mas o recurso não foi liberado. O que faço?",
          a: "Abra o app e use a opção de restaurar compras, com o mesmo ID Apple usado na compra. Se não resolver, escreva para o suporte com a data da compra.",
        },
        cancel: {
          q: "Como cancelo a assinatura?",
          a: "Assinaturas são gerenciadas pela Apple: abra Ajustes, toque no seu nome e depois em Assinaturas. O cancelamento precisa ser feito até 24 horas antes da renovação.",
        },
        refund: {
          q: "Como peço reembolso?",
          a: "Reembolsos de compras na App Store são decididos pela Apple. Você pode solicitar em reportaproblem.apple.com.",
        },
        bug: {
          q: "Encontrei um erro. Como reporto?",
          a: "Mande um e-mail para o suporte com o modelo do aparelho, a versão do iOS, a versão do app e os passos para reproduzir o problema.",
        },
        data: {
          q: "Como peço acesso ou exclusão dos meus dados?",
          a: "Escreva para o suporte informando o app. Veja na política de privacidade quais dados o app coleta.",
        },
      },
    },
    legal: "Documentos",
    privacy: "Política de privacidade",
    terms: "Termos de uso",
    moreApps: "Outros apps da Mobivalley",
  },

  brand: {
    metaTitle: "Identidade visual",
    metaDescription: "Logo, símbolo, cores e tipografia da Mobivalley, com arquivos para download.",
    eyebrow: "Identidade visual",
    title: { before: "Um M, ", accent: "um bit no vale", after: "." },
    paragraphs: [
      "O símbolo é o M de Mobivalley desenhado só com retas e ângulos de 45°. As diagonais cortam um vale, e nele repousa um losango: um bit, um nó de rede, a ideia que encontrou seu lugar e o produto pronto para seguir em frente.",
      "É uma forma geométrica e simples, feita para funcionar em 16 pixels numa aba do navegador e em 1024 pixels num ícone de app.",
    ],
    versions: "Versões do logo",
    logos: {
      horizontalDark: "Horizontal · fundo escuro",
      horizontalLight: "Horizontal · fundo claro",
      stackedDark: "Principal · fundo escuro",
      stackedLight: "Principal · fundo claro",
      symbolDark: "Símbolo · fundo escuro",
      symbolLight: "Símbolo · fundo claro",
      appIcon: "Ícone de app",
      favicon: "Favicon",
    },
    logoAlt: (label: string) => `Logo Mobivalley: ${label}`,
    appIconAlt: "Ícone de app da Mobivalley",
    colors: "Cores",
    colorsText:
      "Uma base neutra, quente e contida, com um único acento. O verde menta aparece pouco e sempre com função: o losango do símbolo, uma ação, um destaque.",
    palette: {
      ink: "Fundo principal, texto sobre claro",
      graphite: "Superfícies e cartões escuros",
      paper: "Fundo claro, texto sobre escuro",
      mint: "Acento: o losango do símbolo, CTAs",
      mintDeep: "Acento sobre fundos claros",
    },
    type: "Tipografia",
    typeRoles: { sans: "Títulos, texto e wordmark", serif: "Palavras de destaque", mono: "Rótulos, números e etapas" },
    typeSamples: { sans: "Ideias viram produtos.", serif: "produtos digitais", mono: "01 — DESCOBERTA" },
    usage: "Uso",
    usageItems: [
      { title: "Área de proteção", text: "Mantenha ao redor do logo um espaço livre igual à largura de uma perna do M do símbolo." },
      { title: "Tamanho mínimo", text: "Símbolo a partir de 16 px. Logo horizontal a partir de 96 px de largura." },
      { title: "Contraste", text: "Use a versão para fundo escuro sobre Ink e a versão para fundo claro sobre Paper ou branco." },
    ],
  },

  legalPage: {
    updated: (date: string) => `Última atualização: ${date}`,
    eyebrow: "Documento do app",
    siteEyebrow: "Legal",
    seeAlso: "Veja também",
  },

  consent: {
    text: "Usamos cookies do Google Analytics para entender, de forma agregada, como o site é usado. Você aceita?",
    accept: "Aceitar",
    decline: "Recusar",
    policy: "Política de privacidade",
    label: "Aviso de cookies",
  },
};

export default pt;
export type Dictionary = typeof pt;
