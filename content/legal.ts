// Legal documents, generated per app from its facts (content/apps.ts) and the
// privacy labels declared on the App Store (data/apps.json).
// Inline links use [label](href). Review with a lawyer before relying on them.

import type { App, PrivacyLabels } from "@/lib/apps";
import type { Locale } from "@/lib/i18n";
import type { Permission, ThirdParty } from "@/content/apps";

export const LEGAL_UPDATED = "2026-09-24";
export const COMPANY = "Mobivalley Tecnologia da Informação";

export type Block = string | { list: string[] };
export type LegalSection = { title: string; blocks: Block[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

const APPLE_PRIVACY = "https://www.apple.com/legal/privacy/";
const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const YOUTUBE_TERMS = "https://www.youtube.com/t/terms";
const GOOGLE_MAPS_TERMS = "https://maps.google.com/help/terms_maps/";
const WHATSAPP_PRIVACY = "https://www.whatsapp.com/legal/privacy-policy";
const GITHUB_PRIVACY = "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement";
const GOOGLE_ANALYTICS_PRIVACY = "https://business.safety.google/privacy/";

// --- App Store privacy label vocabulary -------------------------------------

const purposeNames: Record<Locale, Record<string, string>> = {
  pt: {
    THIRD_PARTY_ADVERTISING: "publicidade de terceiros",
    DEVELOPERS_ADVERTISING: "publicidade ou marketing do desenvolvedor",
    ANALYTICS: "análise de uso",
    APP_FUNCTIONALITY: "funcionamento do app",
    PRODUCT_PERSONALIZATION: "personalização",
    OTHER_PURPOSES: "outras finalidades",
  },
  en: {
    THIRD_PARTY_ADVERTISING: "third-party advertising",
    DEVELOPERS_ADVERTISING: "developer's advertising or marketing",
    ANALYTICS: "analytics",
    APP_FUNCTIONALITY: "app functionality",
    PRODUCT_PERSONALIZATION: "product personalization",
    OTHER_PURPOSES: "other purposes",
  },
};

const categoryNames: Record<Locale, Record<string, string>> = {
  pt: {
    IDENTIFIERS: "Identificadores",
    LOCATION: "Localização",
    USAGE_DATA: "Dados de uso",
    DIAGNOSTICS: "Diagnóstico",
    PURCHASES: "Compras",
    SEARCH_HISTORY: "Histórico de busca",
    CONTACT_INFO: "Informações de contato",
    USER_CONTENT: "Conteúdo do usuário",
    FINANCIAL_INFO: "Informações financeiras",
    BROWSING_HISTORY: "Histórico de navegação",
    OTHER_DATA: "Outros dados",
  },
  en: {
    IDENTIFIERS: "Identifiers",
    LOCATION: "Location",
    USAGE_DATA: "Usage data",
    DIAGNOSTICS: "Diagnostics",
    PURCHASES: "Purchases",
    SEARCH_HISTORY: "Search history",
    CONTACT_INFO: "Contact info",
    USER_CONTENT: "User content",
    FINANCIAL_INFO: "Financial info",
    BROWSING_HISTORY: "Browsing history",
    OTHER_DATA: "Other data",
  },
};

const dataTypeNames: Record<string, string> = {
  "Device ID": "identificador do dispositivo",
  "User ID": "identificador de usuário",
  "Coarse Location": "localização aproximada",
  "Precise Location": "localização precisa",
  "Product Interaction": "interação com o app",
  "Advertising Data": "dados de anúncios",
  "Other Usage Data": "outros dados de uso",
  "Crash Data": "relatórios de falhas",
  "Performance Data": "dados de desempenho",
  "Other Diagnostic Data": "outros dados de diagnóstico",
  "Purchase History": "histórico de compras",
  "Search History": "histórico de busca",
  "Email Address": "endereço de e-mail",
  Name: "nome",
  "Photos or Videos": "fotos ou vídeos",
  "Audio Data": "dados de áudio",
};

const typeName = (locale: Locale, t: string) => (locale === "pt" ? (dataTypeNames[t] ?? t) : t.toLowerCase());

/** "Diagnóstico (relatórios de falhas): análise de uso e funcionamento do app" */
function describe(locale: Locale, group: PrivacyLabels["linked"]) {
  const byCategory = new Map<string, { types: Set<string>; purposes: Set<string> }>();
  for (const { purpose, categories } of group) {
    for (const { category, dataTypes } of categories) {
      const entry = byCategory.get(category) ?? { types: new Set(), purposes: new Set() };
      dataTypes.forEach((t) => entry.types.add(typeName(locale, t)));
      entry.purposes.add(purposeNames[locale][purpose] ?? purpose.toLowerCase());
      byCategory.set(category, entry);
    }
  }
  const and = locale === "pt" ? " e " : " and ";
  const join = (s: Set<string>) => {
    const a = [...s];
    return a.length > 1 ? `${a.slice(0, -1).join(", ")}${and}${a.at(-1)}` : (a[0] ?? "");
  };
  return [...byCategory].map(([category, { types, purposes }]) => {
    const name = categoryNames[locale][category] ?? category;
    return `${name}${types.size ? ` (${join(types)})` : ""}: ${join(purposes)}.`;
  });
}

const trackingTypes = (locale: Locale, labels: PrivacyLabels) =>
  labels.tracking.flatMap((c) => c.dataTypes.map((t) => typeName(locale, t)));

// --- Shared building blocks ---------------------------------------------------

const permissionText: Record<Locale, Record<Permission, string>> = {
  pt: {
    camera: "Câmera: para tirar fotos ou gravar vídeos dentro do app.",
    microphone: "Microfone: para gravar o áudio dos seus vídeos.",
    photos: "Fotos: para escolher imagens e vídeos da sua biblioteca e salvar o que você cria.",
    location: "Localização: para mostrar onde você está no mapa ou registrar o local de uma entrada.",
    faceid: "Face ID: para proteger áreas do app. A autenticação é feita pelo iOS, e não temos acesso a dados biométricos.",
  },
  en: {
    camera: "Camera: to take photos or record video inside the app.",
    microphone: "Microphone: to record audio for your videos.",
    photos: "Photos: to pick images and videos from your library and save what you create.",
    location: "Location: to show where you are on the map or tag an entry with a place.",
    faceid: "Face ID: to protect areas of the app. Authentication is handled by iOS, and we have no access to biometric data.",
  },
};

const thirdPartyText: Record<Locale, Record<ThirdParty, string>> = {
  pt: {
    "apple-maps": `Apple Maps e Look Around, da Apple, para mapas e imagens. Consulte a [Política de Privacidade da Apple](${APPLE_PRIVACY}).`,
    "google-street-view": `Google Street View, do Google, para imagens de rua. Consulte os [Termos do Google Maps](${GOOGLE_MAPS_TERMS}) e a [Política de Privacidade do Google](${GOOGLE_PRIVACY}).`,
    "game-center": `Game Center, da Apple, para rankings, conquistas e partidas com amigos. O que aparece para outros jogadores depende das suas configurações do Game Center.`,
    youtube: `Serviços de API do YouTube, para reproduzir os vídeos que você adiciona. Ao usar o app você concorda com os [Termos de Serviço do YouTube](${YOUTUBE_TERMS}), e o Google trata dados conforme a [Política de Privacidade do Google](${GOOGLE_PRIVACY}).`,
    ads: "Parceiros de publicidade, que exibem anúncios no app e podem receber o identificador do dispositivo e dados de interação com anúncios para exibi-los e medi-los, conforme as políticas de cada parceiro.",
    whatsapp: `WhatsApp e outros apps de mensagem, quando você decide exportar ou compartilhar suas figurinhas. A partir daí vale a política do app de destino, como a [Política de Privacidade do WhatsApp](${WHATSAPP_PRIVACY}).`,
  },
  en: {
    "apple-maps": `Apple Maps and Look Around, by Apple, for maps and imagery. See [Apple's Privacy Policy](${APPLE_PRIVACY}).`,
    "google-street-view": `Google Street View, by Google, for street-level imagery. See the [Google Maps Terms](${GOOGLE_MAPS_TERMS}) and [Google's Privacy Policy](${GOOGLE_PRIVACY}).`,
    "game-center": "Game Center, by Apple, for leaderboards, achievements and playing with friends. What other players see depends on your Game Center settings.",
    youtube: `YouTube API Services, to play the videos you add. By using the app you agree to the [YouTube Terms of Service](${YOUTUBE_TERMS}), and Google handles data under [Google's Privacy Policy](${GOOGLE_PRIVACY}).`,
    ads: "Advertising partners, which show ads in the app and may receive the device identifier and ad interaction data to serve and measure ads, under each partner's own policies.",
    whatsapp: `WhatsApp and other messaging apps, when you choose to export or share your stickers. From then on, the destination app's policy applies, such as [WhatsApp's Privacy Policy](${WHATSAPP_PRIVACY}).`,
  },
};

// --- App privacy policy ---------------------------------------------------------

export function appPrivacy(locale: Locale, app: App, email: string): LegalDoc {
  const L = app.legal;
  const labels = app.store.privacy;
  const pt = locale === "pt";
  const tracking = labels ? trackingTypes(locale, labels) : [];
  const linked = labels ? describe(locale, labels.linked) : [];
  const notLinked = labels ? describe(locale, labels.notLinked) : [];
  const sections: LegalSection[] = [];

  const summary: string[] = [];
  if (tracking.length)
    summary.push(
      pt
        ? "O app pode usar o identificador do dispositivo para publicidade de terceiros, o que a Apple classifica como rastreamento. Isso depende da sua permissão no aviso de rastreamento do iOS."
        : "The app may use the device identifier for third-party advertising, which Apple classifies as tracking. This depends on your permission in the iOS tracking prompt.",
    );
  if (labels?.notCollected) summary.push(pt ? "O app não coleta dados." : "The app does not collect data.");
  else if (labels && !linked.length && !tracking.length && notLinked.length)
    summary.push(
      pt
        ? "Não coletamos dados que identifiquem você. Os dados coletados são anônimos e não são associados à sua identidade."
        : "We don't collect data that identifies you. The data collected is anonymous and not linked to your identity.",
    );
  if (L.noAccount) summary.push(pt ? "O app funciona sem conta ou login." : "The app works without an account or login.");
  if (L.onDevice)
    summary.push(
      pt
        ? "As funções principais rodam no seu aparelho, e o conteúdo que você cria ou analisa no app não é enviado para servidores da Mobivalley."
        : "Core features run on your device, and the content you create or analyze in the app is not sent to Mobivalley servers.",
    );
  summary.push(pt ? "Não vendemos seus dados pessoais." : "We don't sell your personal data.");
  sections.push({ title: pt ? "Resumo" : "Summary", blocks: [{ list: summary }] });

  // Data collected, straight from the App Store labels.
  const collected: Block[] = [];
  if (!labels || labels.notProvided) {
    collected.push(
      pt
        ? `Os detalhes de privacidade deste app ainda não foram publicados na App Store. Os dados que você registra no app são usados apenas para as funções que você usa. Em caso de dúvida, escreva para ${email}.`
        : `This app's privacy details have not been published on the App Store yet. The data you enter in the app is used only for the features you use. If you have questions, write to ${email}.`,
    );
  } else if (labels.notCollected) {
    collected.push(pt ? "Este app não coleta dados do usuário." : "This app does not collect user data.");
  } else {
    collected.push(
      pt
        ? "A lista abaixo corresponde às informações de privacidade que declaramos na App Store."
        : "The list below matches the privacy information we declared on the App Store.",
    );
    if (tracking.length) {
      collected.push(pt ? "Dados usados para rastrear você:" : "Data used to track you:");
      collected.push({
        list: [
          pt
            ? `${tracking.join(", ")}, usado para exibir e medir anúncios em apps e sites de outras empresas.`
            : `${tracking.join(", ")}, used to show and measure ads across other companies' apps and websites.`,
        ],
      });
    }
    if (linked.length) {
      collected.push(pt ? "Dados associados a você:" : "Data linked to you:");
      collected.push({ list: linked });
    }
    if (notLinked.length) {
      collected.push(pt ? "Dados não associados a você (anônimos):" : "Data not linked to you (anonymous):");
      collected.push({ list: notLinked });
    }
  }
  sections.push({ title: pt ? "Dados que coletamos" : "Data we collect", blocks: collected });

  if (L.permissions.length)
    sections.push({
      title: pt ? "Permissões do aparelho" : "Device permissions",
      blocks: [
        pt
          ? "O app só pede acesso quando você usa a função correspondente. Você pode mudar essas permissões a qualquer momento em Ajustes."
          : "The app only asks for access when you use the related feature. You can change these permissions at any time in Settings.",
        { list: L.permissions.map((p) => permissionText[locale][p]) },
      ],
    });

  if (L.onDevice)
    sections.push({
      title: pt ? "Processamento no aparelho" : "On-device processing",
      blocks: [
        pt
          ? `As funções principais do ${app.name} rodam no seu iPhone ou iPad. Fotos, vídeos, textos ou conversas que você usa no app não são enviados para servidores da Mobivalley.`
          : `${app.name}'s core features run on your iPhone or iPad. The photos, videos, text or conversations you use in the app are not sent to Mobivalley servers.`,
      ],
    });

  const parties = L.thirdParties.map((t) => thirdPartyText[locale][t]);
  parties.push(
    pt
      ? `Apple, que distribui o app pela App Store e processa compras. Consulte a [Política de Privacidade da Apple](${APPLE_PRIVACY}).`
      : `Apple, which distributes the app through the App Store and processes purchases. See [Apple's Privacy Policy](${APPLE_PRIVACY}).`,
  );
  sections.push({
    title: pt ? "Serviços de terceiros" : "Third-party services",
    blocks: [
      pt ? "O app usa os seguintes serviços, cada um com a sua própria política:" : "The app uses the following services, each with its own policy:",
      { list: parties },
    ],
  });

  if (tracking.length)
    sections.push({
      title: pt ? "Publicidade e rastreamento" : "Advertising and tracking",
      blocks: [
        pt
          ? "No iOS, o identificador de publicidade só fica disponível para o app se você permitir no aviso de rastreamento. Para mudar sua escolha, abra Ajustes > Privacidade e Segurança > Rastreamento. Mesmo sem rastreamento, você pode continuar vendo anúncios, mas eles não serão baseados na sua atividade em outros apps e sites."
          : "On iOS, the advertising identifier is only available to the app if you allow it in the tracking prompt. To change your choice, open Settings > Privacy & Security > Tracking. Without tracking you may still see ads, but they won't be based on your activity in other apps and websites.",
      ],
    });

  if (L.purchases !== "none")
    sections.push({
      title: pt ? "Compras e assinaturas" : "Purchases and subscriptions",
      blocks: [
        pt
          ? "Compras e assinaturas são processadas pela Apple. Não recebemos nem armazenamos dados de pagamento. Podemos receber da Apple a confirmação de que uma compra foi feita, para liberar os recursos correspondentes."
          : "Purchases and subscriptions are processed by Apple. We don't receive or store payment details. We may receive confirmation from Apple that a purchase was made, to unlock the related features.",
      ],
    });

  sections.push(
    {
      title: pt ? "Compartilhamento" : "Sharing",
      blocks: [
        pt
          ? "Não vendemos nem alugamos dados pessoais. Dados só são compartilhados com os serviços descritos nesta política ou quando exigido por lei ou ordem judicial."
          : "We don't sell or rent personal data. Data is only shared with the services described in this policy, or when required by law or court order.",
      ],
    },
    {
      title: pt ? "Retenção e segurança" : "Retention and security",
      blocks: [
        pt
          ? "Guardamos dados apenas pelo tempo necessário para as finalidades descritas e adotamos medidas razoáveis para protegê-los. Nenhum método de transmissão ou armazenamento é totalmente seguro, mas trabalhamos para reduzir riscos."
          : "We keep data only as long as needed for the purposes described and take reasonable measures to protect it. No method of transmission or storage is completely secure, but we work to reduce risk.",
      ],
    },
    {
      title: pt ? "Seus direitos" : "Your rights",
      blocks: [
        pt
          ? `Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode pedir confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de informações sobre compartilhamento. Para exercer esses direitos, escreva para ${email}.`
          : `Depending on where you live (for example under Brazil's LGPD or the EU's GDPR), you may have the right to access, correct, port or delete your data, and to object to certain processing. To exercise these rights, write to ${email}.`,
      ],
    },
    {
      title: pt ? "Crianças" : "Children",
      blocks: [
        L.family
          ? pt
            ? `O ${app.name} foi pensado para uso em família, com a supervisão de um responsável. Não coletamos intencionalmente dados pessoais de crianças. Se você acredita que isso aconteceu, fale conosco para que os dados sejam excluídos.`
            : `${app.name} is designed for family use, with a parent or guardian's supervision. We don't knowingly collect personal data from children. If you believe this has happened, contact us and we will delete it.`
          : pt
            ? "Não coletamos intencionalmente dados pessoais de crianças. Se você acredita que isso aconteceu, fale conosco para que os dados sejam excluídos."
            : "We don't knowingly collect personal data from children. If you believe this has happened, contact us and we will delete it.",
      ],
    },
    {
      title: pt ? "Alterações nesta política" : "Changes to this policy",
      blocks: [
        pt
          ? "Podemos atualizar esta política quando o app mudar. A data da última atualização fica no topo desta página."
          : "We may update this policy when the app changes. The date of the last update is shown at the top of this page.",
      ],
    },
    {
      title: pt ? "Contato" : "Contact",
      blocks: [pt ? `${COMPANY}. E-mail: ${email}.` : `${COMPANY}. E-mail: ${email}.`],
    },
  );

  return {
    title: pt ? `Política de privacidade — ${app.name}` : `Privacy policy — ${app.name}`,
    intro: pt
      ? `Esta política explica como o ${app.name}, desenvolvido pela ${COMPANY} ("Mobivalley", "nós"), trata informações quando você usa o app. Ela complementa as informações de privacidade exibidas na página do app na App Store.`
      : `This policy explains how ${app.name}, developed by ${COMPANY} ("Mobivalley", "we"), handles information when you use the app. It complements the privacy information shown on the app's App Store page.`,
    sections,
  };
}

// --- App terms of use -----------------------------------------------------------

export function appTerms(locale: Locale, app: App, email: string, privacyHref: string): LegalDoc {
  const L = app.legal;
  const pt = locale === "pt";
  const sections: LegalSection[] = [];

  sections.push({
    title: pt ? "Aceitação" : "Acceptance",
    blocks: [
      pt
        ? `Ao baixar ou usar o ${app.name}, você concorda com estes termos e com a [política de privacidade](${privacyHref}) do app. Estes termos complementam o [Contrato de Licença de Usuário Final padrão da Apple](${APPLE_EULA}) (EULA), que também se aplica ao uso do app.`
        : `By downloading or using ${app.name}, you agree to these terms and to the app's [privacy policy](${privacyHref}). These terms complement [Apple's Standard Licensed Application End User License Agreement](${APPLE_EULA}) (EULA), which also applies to your use of the app.`,
    ],
  });

  sections.push({
    title: pt ? "Licença de uso" : "License",
    blocks: [
      pt
        ? "Concedemos a você uma licença pessoal, não exclusiva e intransferível para usar o app em aparelhos Apple que você possui ou controla, para fins não comerciais. Não é permitido copiar, modificar, distribuir, revender ou fazer engenharia reversa do app, exceto quando a lei permitir."
        : "We grant you a personal, non-exclusive, non-transferable license to use the app on Apple devices you own or control, for non-commercial purposes. You may not copy, modify, distribute, resell or reverse engineer the app, except where the law allows it.",
      pt
        ? "A marca, o design e o código do app pertencem à Mobivalley e são protegidos por direitos autorais e de propriedade intelectual."
        : "The app's brand, design and code belong to Mobivalley and are protected by copyright and intellectual property law.",
    ],
  });

  const external = L.thirdParties.filter((t) => ["apple-maps", "google-street-view", "youtube", "game-center"].includes(t));
  if (external.length)
    sections.push({
      title: pt ? "Serviços e conteúdo de terceiros" : "Third-party services and content",
      blocks: [
        pt
          ? "Parte do conteúdo exibido no app vem de serviços de terceiros, como mapas, imagens ou vídeos. Esse conteúdo pertence aos seus titulares, e sua disponibilidade depende desses serviços, que podem mudá-lo ou removê-lo sem aviso."
          : "Some content shown in the app comes from third-party services, such as maps, imagery or videos. That content belongs to its owners, and its availability depends on those services, which may change or remove it without notice.",
        ...(L.thirdParties.includes("youtube")
          ? [
              pt
                ? `O app usa os Serviços de API do YouTube e o player oficial do YouTube. Os vídeos são transmitidos diretamente do YouTube, e o app não hospeda nem armazena vídeos. Ao usar o app você concorda com os [Termos de Serviço do YouTube](${YOUTUBE_TERMS}).`
                : `The app uses YouTube API Services and the official YouTube player. Videos stream directly from YouTube; the app does not host or store them. By using the app you agree to the [YouTube Terms of Service](${YOUTUBE_TERMS}).`,
            ]
          : []),
      ],
    });

  if (L.userContent)
    sections.push({
      title: pt ? "Seu conteúdo" : "Your content",
      blocks: [
        pt
          ? "Você é responsável pelas imagens, vídeos e textos que usa no app. Use apenas conteúdo que você possui ou tem direito de usar, e não crie nem compartilhe conteúdo ilegal, ofensivo ou que viole direitos de terceiros."
          : "You are responsible for the images, videos and text you use in the app. Only use content you own or have the right to use, and don't create or share content that is illegal, offensive or infringes others' rights.",
      ],
    });

  if (L.financial)
    sections.push({
      title: pt ? "Não é recomendação de investimento" : "Not investment advice",
      blocks: [
        pt
          ? "O app é uma ferramenta de registro e cálculo. As informações exibidas dependem dos dados que você insere e não constituem recomendação de investimento. Decisões financeiras são de sua responsabilidade."
          : "The app is a tool for logging and calculation. The information shown depends on the data you enter and is not investment advice. Financial decisions are your own responsibility.",
      ],
    });

  const purchaseBlocks: Block[] = [];
  if (L.purchases === "subscription") {
    const name = L.purchaseName ?? (pt ? "a assinatura" : "the subscription");
    purchaseBlocks.push(
      pt
        ? `Alguns recursos exigem uma assinatura (${name}), vendida pela App Store.`
        : `Some features require a subscription (${name}), sold through the App Store.`,
      {
        list: pt
          ? [
              "O pagamento é cobrado na sua conta do ID Apple quando a compra é confirmada.",
              "A assinatura renova automaticamente pelo mesmo período e preço, a menos que seja cancelada pelo menos 24 horas antes do fim do período atual.",
              "Se houver um período de teste gratuito, a cobrança começa ao fim do teste, a menos que você cancele pelo menos 24 horas antes.",
              "Você pode gerenciar ou cancelar a assinatura em Ajustes > [seu nome] > Assinaturas.",
              "Preços e recursos podem mudar, com aviso quando a lei exigir.",
            ]
          : [
              "Payment is charged to your Apple ID account when you confirm the purchase.",
              "The subscription renews automatically for the same period and price unless canceled at least 24 hours before the end of the current period.",
              "If a free trial is offered, billing starts when the trial ends unless you cancel at least 24 hours before.",
              "You can manage or cancel the subscription in Settings > [your name] > Subscriptions.",
              "Prices and features may change, with notice where the law requires it.",
            ],
      },
    );
  } else if (L.purchases === "one-time") {
    purchaseBlocks.push(
      pt
        ? "Alguns recursos são liberados por uma compra única dentro do app, vendida pela App Store. Depois de comprada, ela fica disponível nos aparelhos conectados ao mesmo ID Apple e pode ser restaurada pela opção de restaurar compras do app."
        : "Some features are unlocked by a one-time in-app purchase, sold through the App Store. Once bought, it is available on devices signed in to the same Apple ID and can be restored with the app's restore purchases option.",
    );
  } else if (L.purchases === "unknown") {
    purchaseBlocks.push(
      pt
        ? "Se o app oferecer compras ou assinaturas, elas são vendidas e cobradas pela App Store, nas condições exibidas antes da compra. Assinaturas renovam automaticamente até serem canceladas em Ajustes > [seu nome] > Assinaturas, pelo menos 24 horas antes da renovação."
        : "If the app offers purchases or subscriptions, they are sold and billed through the App Store, on the terms shown before purchase. Subscriptions renew automatically until canceled in Settings > [your name] > Subscriptions, at least 24 hours before renewal.",
    );
  }
  if (purchaseBlocks.length) {
    purchaseBlocks.push(
      pt
        ? "Reembolsos de compras na App Store são decididos pela Apple, conforme as regras dela e a lei aplicável."
        : "Refunds for App Store purchases are decided by Apple, under its rules and applicable law.",
    );
    sections.push({ title: pt ? "Compras e assinaturas" : "Purchases and subscriptions", blocks: purchaseBlocks });
  }

  sections.push(
    {
      title: pt ? "Isenção de garantias" : "Disclaimer",
      blocks: [
        pt
          ? 'O app é fornecido "no estado em que se encontra". Trabalhamos para que funcione bem, mas não garantimos que estará sempre disponível, livre de erros ou que atenderá a todas as suas necessidades.'
          : 'The app is provided "as is". We work to keep it running well, but we don\'t guarantee it will always be available, error-free or meet all your needs.',
      ],
    },
    {
      title: pt ? "Limitação de responsabilidade" : "Limitation of liability",
      blocks: [
        pt
          ? "Na extensão permitida pela lei, a Mobivalley não se responsabiliza por danos indiretos decorrentes do uso ou da impossibilidade de uso do app. Nada nestes termos limita direitos que a legislação de defesa do consumidor garante a você."
          : "To the extent permitted by law, Mobivalley is not liable for indirect damages arising from the use of, or inability to use, the app. Nothing in these terms limits rights you have under consumer protection law.",
      ],
    },
    {
      title: pt ? "Alterações e encerramento" : "Changes and termination",
      blocks: [
        pt
          ? "Podemos alterar, suspender ou descontinuar o app ou alguns recursos, e atualizar estes termos. A data da última atualização fica no topo desta página. Se você continuar usando o app depois de uma alteração, os novos termos passam a valer para você."
          : "We may change, suspend or discontinue the app or some features, and update these terms. The date of the last update is shown at the top of this page. If you keep using the app after a change, the new terms apply to you.",
      ],
    },
    {
      title: pt ? "Lei aplicável" : "Governing law",
      blocks: [
        pt
          ? "Estes termos são regidos pelas leis do Brasil, sem prejuízo dos direitos garantidos pela legislação do país onde você mora."
          : "These terms are governed by the laws of Brazil, without prejudice to the rights granted to you by the laws of the country where you live.",
      ],
    },
    { title: pt ? "Contato" : "Contact", blocks: [`${COMPANY}. E-mail: ${email}.`] },
  );

  return {
    title: pt ? `Termos de uso — ${app.name}` : `Terms of use — ${app.name}`,
    intro: pt
      ? `Estes termos regem o uso do ${app.name}, desenvolvido pela ${COMPANY} ("Mobivalley", "nós").`
      : `These terms govern your use of ${app.name}, developed by ${COMPANY} ("Mobivalley", "we").`,
    sections,
  };
}

// --- Website privacy policy -----------------------------------------------------

export function sitePrivacy(
  locale: Locale,
  opts: { email: string; analytics: boolean; apps: { name: string; href: string }[] },
): LegalDoc {
  const pt = locale === "pt";
  const { email } = opts;
  return {
    title: pt ? "Política de privacidade" : "Privacy policy",
    intro: pt
      ? `Esta política explica como a ${COMPANY} ("Mobivalley", "nós") trata informações de quem visita o site mobivalley.com.br. Cada app da Mobivalley tem a sua própria política, listada no fim desta página.`
      : `This policy explains how ${COMPANY} ("Mobivalley", "we") handles information about visitors to mobivalley.com.br. Each Mobivalley app has its own policy, listed at the end of this page.`,
    sections: [
      {
        title: pt ? "O que este site coleta" : "What this site collects",
        blocks: [
          pt
            ? "O site não tem cadastro, login nem formulários. Você pode navegar sem nos informar nenhum dado pessoal."
            : "The site has no sign-up, login or forms. You can browse without giving us any personal data.",
          pt
            ? `O site é hospedado no GitHub Pages. Como qualquer servidor, o GitHub registra dados técnicos das visitas, como endereço IP e navegador, para operar e proteger o serviço, conforme a [declaração de privacidade do GitHub](${GITHUB_PRIVACY}). Não temos acesso a esses registros.`
            : `The site is hosted on GitHub Pages. Like any server, GitHub logs technical data about visits, such as IP address and browser, to run and protect the service, under [GitHub's privacy statement](${GITHUB_PRIVACY}). We don't have access to those logs.`,
        ],
      },
      {
        title: pt ? "Cookies e estatísticas" : "Cookies and analytics",
        blocks: opts.analytics
          ? [
              pt
                ? `Com a sua permissão, usamos o Google Analytics para entender, de forma agregada, quantas pessoas visitam o site e quais páginas acessam. O Google Analytics usa cookies e só é ativado se você aceitar o aviso exibido no site. Você pode mudar de ideia apagando os cookies do site no seu navegador. Veja como o [Google trata esses dados](${GOOGLE_ANALYTICS_PRIVACY}).`
                : `With your permission, we use Google Analytics to understand, in aggregate, how many people visit the site and which pages they view. Google Analytics uses cookies and is only turned on if you accept the notice shown on the site. You can change your mind by clearing the site's cookies in your browser. See how [Google handles this data](${GOOGLE_ANALYTICS_PRIVACY}).`,
              pt
                ? "Sua escolha sobre cookies fica salva apenas no seu navegador."
                : "Your cookie choice is stored only in your browser.",
            ]
          : [
              pt
                ? "Este site não usa cookies nem ferramentas de estatística ou publicidade."
                : "This site does not use cookies or analytics or advertising tools.",
            ],
      },
      {
        title: pt ? "Contato por e-mail" : "E-mail contact",
        blocks: [
          pt
            ? "Se você nos escrever, usamos seu nome, e-mail e o conteúdo da mensagem apenas para responder e dar continuidade à conversa. Não usamos esses dados para marketing sem o seu consentimento."
            : "If you write to us, we use your name, e-mail and message only to reply and continue the conversation. We don't use this data for marketing without your consent.",
        ],
      },
      {
        title: pt ? "Links externos" : "External links",
        blocks: [
          pt
            ? "O site tem links para a App Store e outros serviços. Ao abri-los, vale a política de privacidade de cada serviço."
            : "The site links to the App Store and other services. When you open them, each service's privacy policy applies.",
        ],
      },
      {
        title: pt ? "Seus direitos" : "Your rights",
        blocks: [
          pt
            ? `Nos termos da LGPD, você pode pedir confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados. Escreva para ${email}.`
            : `Depending on where you live (for example under Brazil's LGPD or the EU's GDPR), you may have the right to access, correct, port or delete your data. Write to ${email}.`,
        ],
      },
      {
        title: pt ? "Alterações" : "Changes",
        blocks: [
          pt
            ? "Podemos atualizar esta política. A data da última atualização fica no topo desta página."
            : "We may update this policy. The date of the last update is shown at the top of this page.",
        ],
      },
      { title: pt ? "Contato" : "Contact", blocks: [`${COMPANY}. E-mail: ${email}.`] },
      {
        title: pt ? "Políticas dos apps" : "App policies",
        blocks: [{ list: opts.apps.map((a) => `[${a.name}](${a.href})`) }],
      },
    ],
  };
}
