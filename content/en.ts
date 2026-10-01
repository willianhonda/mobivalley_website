import type { Dictionary } from "./pt";

const en: Dictionary = {
  meta: {
    title: "Mobivalley — App Development and Digital Products",
    description:
      "Mobivalley designs, builds and evolves apps and digital products. Apps published on the App Store, from games with real-time multiplayer to AI that runs on the device itself.",
    ogAlt: "Mobivalley — We turn ideas into digital products.",
    tagline: "Apps, digital products and technology.",
    mailSubject: "I'd like to talk about a project",
  },

  nav: {
    items: [
      { id: "servicos", label: "Services" },
      { id: "produtos", label: "Products" },
      { id: "sobre", label: "About" },
      { id: "contato", label: "Contact" },
    ],
    cta: "Let's talk",
    home: "Mobivalley — home",
    main: "Main",
    mobile: "Mobile menu",
    open: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
    switchTo: "Português",
    switchToShort: "PT",
    switchLabel: "Ler esta página em português",
    opensNewTab: "(opens in a new tab)",
  },

  hero: {
    pillTag: "Portfolio",
    pill: (n: number) => `${n} apps published on the App Store`,
    titleBefore: "We turn ideas into ",
    titleAccent: "digital products",
    lead: "Mobivalley designs, builds and evolves apps and digital products, from games with real-time multiplayer to AI that runs right on the device.",
    ctaProducts: "See our products",
    ctaContact: "Get in touch",
    stackLabel: "Some Mobivalley apps",
    stackCaption: ["Games, AI, photo and video,", "maps, family and finance."],
    phoneAlt: "AeroExplorer showing the Statue of Liberty in 3D",
    ratingCard: (rating: string) => `${rating} on the App Store`,
    aiCardTitle: "On-device AI",
    aiCardSub: "OffChat · offline",
    stats: (s: { count: number; firstYear: number; languages: number }) => [
      { value: String(s.count), label: "apps published on the App Store" },
      { value: String(s.firstYear), label: "year our first app launched" },
      { value: "4", label: "Apple platforms in a single product" },
      { value: String(s.languages), label: "languages in Place Guesser" },
    ],
  },

  services: {
    eyebrow: "Services",
    title: { before: "From the first sketch to the ", accent: "next release", after: "." },
    lead: "We take care of a digital product's whole lifecycle: the people who design the solution also write the code, ship it to the stores and keep improving it after launch.",
    items: [
      {
        title: "App development",
        text: "Native apps for iPhone, iPad, Apple Watch and Apple TV, with the performance and polish people expect from an App Store app.",
        items: ["Native, accessible interfaces", "Widgets, extensions and Game Center", "Subscriptions and in-app purchases"],
      },
      {
        title: "Digital products",
        text: "From idea to complete product: scope, interface design, backend and everything a product needs to work with real users.",
        items: ["Discovery and MVP definition", "Interface design and prototypes", "APIs, data and real-time features"],
      },
      {
        title: "Technology consulting",
        text: "Technical guidance for decisions that are expensive to get wrong: architecture, stack choices, privacy and the path to launch.",
        items: ["Architecture and technical review", "App Store launch planning", "Privacy and on-device processing"],
      },
      {
        title: "Evolution and maintenance",
        text: "Launch is only the beginning. We track metrics and reviews, fix, optimize and ship new features in short cycles.",
        items: ["Updates for every new iOS release", "Improvements driven by data and feedback", "New features, shipped often"],
      },
    ],
  },

  products: {
    eyebrow: "Products",
    title: { before: "We don't just build apps. ", accent: "We publish our own.", after: "" },
    lead: (n: number) =>
      `${n} apps on the App Store, created, launched and maintained by Mobivalley. Each one solves a different problem, and all of them went the same way: idea, product, launch and evolution.`,
    viewAll: "See all on the App Store",
    featured: "Featured",
    since: (year: number) => `since ${year}`,
    facts: (f: { rating: string; ratingCount: string; languages: number }) => [
      { value: f.rating, label: `rating on the US App Store, from ${f.ratingCount}+ reviews` },
      { value: String(f.languages), label: "languages, from Portuguese to Japanese" },
      { value: "4", label: "platforms: iPhone, iPad, Apple Watch and Apple TV" },
    ],
    download: "Download on the App Store",
    details: "About the app",
    swipe: "Swipe to see more apps",
    count: (n: number) => `${n} apps →`,
    listLabel: "More Mobivalley apps",
    viewOnStore: "See details",
  },

  process: {
    eyebrow: "How we work",
    title: { before: "A clear path, ", accent: "from idea to product", after: "." },
    lead: "Every product crosses a valley between the idea and the launch. Our process exists to cross it with method, frequent releases and evidence-based decisions.",
    steps: [
      {
        title: "Discovery",
        text: "We learn the problem, the business goal and who will use the product. Before any screen, we define what has to go right.",
      },
      {
        title: "Strategy",
        text: "We set scope, architecture and priorities. The result is a lean plan, with an MVP that reaches users early.",
      },
      {
        title: "Development",
        text: "Design and code move together, in short cycles, with testable builds from the first weeks.",
      },
      {
        title: "Launch",
        text: "We prepare the release: store page, screenshots, Apple review, subscriptions and monitoring.",
      },
      {
        title: "Evolution",
        text: "We measure, read the reviews and improve. That's how Place Guesser reached version {version}.",
      },
    ],
  },

  about: {
    eyebrow: "About Mobivalley",
    title: { before: "A technology company that ", accent: "builds its own products", after: "." },
    paragraphs: [
      (year: number) =>
        `Mobivalley is a technology company focused on app development, digital products and consulting. Our first app reached the App Store in ${year}, and we keep looking after each one long after launch.`,
      () =>
        "That changes how we work with clients. We know what comes after the code: Apple's review, the first ratings, the metric that won't move, the urgent update for a new iOS version. When we take on a project, that experience comes with it.",
    ],
    principles: [
      { title: "Product before code", text: "Technology is a means. We start with the problem, the people who will use it and what needs to be measured." },
      {
        title: "Native where it matters",
        text: "3D maps, camera, Apple Watch, widgets: we use the best of each platform, with no shortcuts users can feel.",
      },
      { title: "Private by default", text: "Whenever possible, data stays on the device, as in OffChat and Photo Cleanup." },
      { title: "Launch is the start", text: "Products get better with real use. Evolution is part of the plan from day one, not an afterthought." },
    ],
  },

  technology: {
    eyebrow: "Technology",
    title: { before: "Technical depth, ", accent: "proven in production", after: "." },
    lead: "Every capability below ships in at least one published app. We pick technology for what the product needs, not for fashion.",
    capabilities: [
      {
        title: "Apple platforms",
        text: "iPhone, iPad, Apple Watch and Apple TV, with widgets, share extensions and Game Center.",
        apps: ["place-guesser", "littletube"],
      },
      {
        title: "Maps and the real world",
        text: "3D Flyover, Look Around and Street View, geolocation and distance between points.",
        apps: ["aeroexplorer", "place-guesser"],
      },
      {
        title: "On-device AI",
        text: "A language assistant that works offline and photo analysis that never uploads anything.",
        apps: ["offchat-ai", "gallery-optimizer"],
      },
      {
        title: "Camera, photo and video",
        text: "Recording with a teleprompter overlay, automatic background removal and image editing.",
        apps: ["speakscroll", "sticker-maker"],
      },
      {
        title: "Real time and backend",
        text: "Live multiplayer, daily challenges with a global leaderboard and async challenges between friends.",
        apps: ["place-guesser"],
      },
      {
        title: "Monetization",
        text: "Subscriptions, free trials and premium plans built on App Store purchases.",
        apps: ["littletube", "price-action"],
      },
    ],
    usedIn: (names: string[]) => `In ${names.join(" and ")}`,
    toolsLabel: "Everyday tools",
    toolsAria: "Technologies",
    tools: ["Swift", "SwiftUI", "WidgetKit", "MapKit", "GameKit", "StoreKit", "AVFoundation", "PhotoKit", "On-device AI", "APIs and cloud", "TypeScript", "React", "Next.js"],
  },

  cta: {
    title: "Have an idea?",
    accentBefore: "Let's ",
    accentNowrap: "turn it",
    accentAfter: " into a product.",
    lead: "Tell us what you want to build. Mobivalley helps from strategy and product design to development, launch and the releases that follow.",
    button: "Talk to Mobivalley",
    copy: "Copy e-mail",
    copied: "E-mail copied",
  },

  footer: {
    nav: "Navigation",
    navLabel: "Footer",
    apps: "Apps",
    contact: "Contact",
    privacy: "Privacy policy",
    brand: "Brand identity",
    rights: "All rights reserved.",
    made: "Made in Brazil.",
  },

  notFound: {
    title: "Page not found",
    heading: { before: "This page ", accent: "got lost in the valley", after: "." },
    text: "The address may have changed or never existed. Shall we go back to the start?",
    button: "Back to home",
  },

  appPage: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumb: "Products",
    rating: (value: string, count: string) => `${value} · ${count} ratings in the US`,
    badgeAlt: "Download on the App Store",
    screenshots: "Screenshots",
    highlights: "Highlights",
    info: "Information",
    infoLabels: {
      version: "Version",
      updated: "Updated",
      requires: "Requires",
      size: "Size",
      languages: "Languages",
      category: "Category",
      price: "Price",
      released: "Released",
    },
    requires: (v: string) => `iOS ${v} or later`,
    free: "Free",
    moreLanguages: (n: number) => `and ${n} more`,
    support: {
      eyebrow: "Support",
      title: "Need help?",
      text: "E-mail us. Tell us which device and iOS version you use and, if you can, attach a screenshot of the problem.",
      button: "E-mail support",
      subject: (app: string) => `${app} support`,
      faqTitle: "Frequently asked questions",
      faq: {
        restore: {
          q: "I paid, but the feature wasn't unlocked. What should I do?",
          a: "Open the app and use the restore purchases option, signed in with the Apple ID you used to buy. If that doesn't work, e-mail support with the purchase date.",
        },
        cancel: {
          q: "How do I cancel my subscription?",
          a: "Subscriptions are managed by Apple: open Settings, tap your name, then Subscriptions. Cancel at least 24 hours before the renewal date.",
        },
        refund: {
          q: "How do I request a refund?",
          a: "Refunds for App Store purchases are handled by Apple. You can request one at reportaproblem.apple.com.",
        },
        bug: {
          q: "I found a bug. How do I report it?",
          a: "E-mail support with your device model, iOS version, app version and the steps to reproduce the problem.",
        },
        data: {
          q: "How do I request access to or deletion of my data?",
          a: "E-mail support and tell us which app. The privacy policy lists what data the app collects.",
        },
      },
    },
    legal: "Documents",
    privacy: "Privacy policy",
    terms: "Terms of use",
    moreApps: "More Mobivalley apps",
  },

  brand: {
    metaTitle: "Brand identity",
    metaDescription: "Mobivalley's logo, symbol, colors and typography, with files to download.",
    eyebrow: "Brand identity",
    title: { before: "One M, ", accent: "one bit in the valley", after: "." },
    paragraphs: [
      "The symbol is the M in Mobivalley, drawn only with straight lines and 45° angles. Its diagonals cut a valley, and in it rests a diamond: a bit, a network node, the idea that found its place, and the product ready to move forward.",
      "It is a simple geometric shape, built to work at 16 pixels in a browser tab and at 1024 pixels as an app icon.",
    ],
    versions: "Logo versions",
    logos: {
      horizontalDark: "Horizontal · dark background",
      horizontalLight: "Horizontal · light background",
      stackedDark: "Primary · dark background",
      stackedLight: "Primary · light background",
      symbolDark: "Symbol · dark background",
      symbolLight: "Symbol · light background",
      appIcon: "App icon",
      favicon: "Favicon",
    },
    logoAlt: (label: string) => `Mobivalley logo: ${label}`,
    appIconAlt: "Mobivalley app icon",
    colors: "Colors",
    colorsText:
      "A warm, restrained neutral base with a single accent. Mint shows up rarely and always with a job: the diamond in the symbol, an action, a highlight.",
    palette: {
      ink: "Main background, text on light",
      graphite: "Dark surfaces and cards",
      paper: "Light background, text on dark",
      mint: "Accent: the diamond in the symbol, CTAs",
      mintDeep: "Accent on light backgrounds",
    },
    type: "Typography",
    typeRoles: { sans: "Headings, text and wordmark", serif: "Highlighted words", mono: "Labels, numbers and steps" },
    typeSamples: { sans: "Ideas become products.", serif: "digital products", mono: "01 — DISCOVERY" },
    usage: "Usage",
    usageItems: [
      { title: "Clear space", text: "Keep free space around the logo equal to the width of one leg of the M in the symbol." },
      { title: "Minimum size", text: "Symbol from 16 px. Horizontal logo from 96 px wide." },
      { title: "Contrast", text: "Use the dark-background version on Ink and the light-background version on Paper or white." },
    ],
  },

  legalPage: {
    updated: (date: string) => `Last updated: ${date}`,
    eyebrow: "App document",
    siteEyebrow: "Legal",
    seeAlso: "See also",
  },

  consent: {
    text: "We use Google Analytics cookies to understand, in aggregate, how the site is used. Do you accept?",
    accept: "Accept",
    decline: "Decline",
    policy: "Privacy policy",
    label: "Cookie notice",
  },
};

export default en;
