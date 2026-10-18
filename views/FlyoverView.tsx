"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import type { Locale } from "@/lib/i18n";

// Tour manifest served by the AeroExplorer tour CDN (public/resources/aeroexplorer/).
const MANIFEST_URL = "/resources/aeroexplorer/tours.json";
const AEROEXPLORER_APP_ID = "6752722065";
const APP_STORE_URL: Record<Locale, string> = {
  pt: `https://apps.apple.com/br/app/id${AEROEXPLORER_APP_ID}`,
  en: `https://apps.apple.com/app/id${AEROEXPLORER_APP_ID}`,
};

type Tour = {
  id: string;
  displayName: string;
  country: string;
  poiCount: number;
  status?: string;
  supersededBy?: string | null;
};

type State = { status: "loading" } | { status: "found"; tour: Tour } | { status: "missing" };

const copy = {
  pt: {
    loading: "Carregando o tour…",
    eyebrow: "Tour no AeroExplorer",
    landmarks: (n: number) => (n === 1 ? "1 marco" : `${n} marcos`),
    missingTitle: "Não encontramos este tour",
    missingText: "O link pode estar incompleto ou o tour saiu do catálogo. No app você encontra todos os tours disponíveis.",
    pitchTitle: "Sobrevoe esta cidade em 3D",
    pitch:
      "O AeroExplorer faz tours aéreos narrados em 3D pelas grandes cidades do mundo, com guia de áudio em 7 idiomas, no iPhone, no iPad e na Apple TV.",
    badgeAlt: "Baixar o AeroExplorer na App Store",
    newTab: "(abre em nova aba)",
  },
  en: {
    loading: "Loading the tour…",
    eyebrow: "Tour on AeroExplorer",
    landmarks: (n: number) => (n === 1 ? "1 landmark" : `${n} landmarks`),
    missingTitle: "We couldn't find this tour",
    missingText: "The link may be incomplete or the tour has left the catalog. The app has every tour available today.",
    pitchTitle: "Fly over this city in 3D",
    pitch:
      "AeroExplorer plays narrated 3D aerial tours of the world's great cities, with an audio guide in 7 languages, on iPhone, iPad and Apple TV.",
    badgeAlt: "Download AeroExplorer on the App Store",
    newTab: "(opens in a new tab)",
  },
} satisfies Record<Locale, unknown>;

const intl: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

function countryName(locale: Locale, code: string) {
  try {
    return new Intl.DisplayNames([intl[locale]], { type: "region" }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

/** The published tour for an id, following `supersededBy` when a tour was retired. */
function resolve(tours: Tour[], id: string): Tour | undefined {
  let tour = tours.find((t) => t.id === id);
  for (let hops = 0; tour && tour.status !== "published" && tour.supersededBy && hops < 5; hops++) {
    const next = tour.supersededBy;
    tour = tours.find((t) => t.id === next);
  }
  return tour?.status === "published" ? tour : undefined;
}

export function FlyoverFallback({ locale }: { locale: Locale }) {
  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-2xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-paper/60">{copy[locale].loading}</p>
    </main>
  );
}

export function FlyoverView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const id = useSearchParams().get("id");
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    // Point the Smart App Banner at this exact link, so "Open" lands on the tour.
    document.querySelector('meta[name="apple-itunes-app"]')?.setAttribute(
      "content",
      `app-id=${AEROEXPLORER_APP_ID}, app-argument=${window.location.href}`,
    );
    if (!id) return;
    fetch(MANIFEST_URL)
      .then((r) => (r.ok ? r.json() : { tours: [] }))
      .then((manifest: { tours?: Tour[] }) => {
        const tour = Array.isArray(manifest.tours) ? resolve(manifest.tours, id) : undefined;
        setState(tour ? { status: "found", tour } : { status: "missing" });
      })
      .catch(() => setState({ status: "missing" }));
  }, [id]);

  if (id && state.status === "loading") return <FlyoverFallback locale={locale} />;

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-2xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-sm font-semibold tracking-wide text-mint uppercase">{t.eyebrow}</p>
      {state.status === "found" ? (
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-paper sm:text-4xl">{state.tour.displayName}</h1>
          <p className="mt-2 text-lg text-paper/70">{countryName(locale, state.tour.country)}</p>
          {state.tour.poiCount > 0 && (
            <p className="mt-6 text-xl font-semibold text-mint">{t.landmarks(state.tour.poiCount)}</p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-paper">{t.missingTitle}</h1>
          <p className="mt-3 text-paper/70">{t.missingText}</p>
        </div>
      )}
      <div className="mt-10 rounded-2xl border border-paper/10 bg-ink-800 p-6">
        <p className="text-lg font-semibold text-paper">{t.pitchTitle}</p>
        <p className="mt-2 text-paper/70">{t.pitch}</p>
        <div className="mt-5">
          <AppStoreBadge href={APP_STORE_URL[locale]} alt={t.badgeAlt} newTabLabel={t.newTab} />
        </div>
      </div>
    </main>
  );
}
