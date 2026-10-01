"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  measurementId: string;
  privacyHref: string;
  t: { text: string; accept: string; decline: string; policy: string; label: string };
};

const KEY = "mv-analytics-consent";

function readChoice(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function loadGtag(id: string) {
  if (document.getElementById("gtag-js")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag expects the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "gtag-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/**
 * Google Analytics 4, loaded only after the visitor accepts the cookie notice
 * (LGPD). Renders nothing when no Measurement ID is configured.
 */
export function Analytics({ measurementId, privacyHref, t }: Props) {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") loadGtag(measurementId);
    // Reading localStorage has to happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (choice !== "denied") setAsk(true);
  }, [measurementId]);

  function decide(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
    if (granted) loadGtag(measurementId);
    setAsk(false);
  }

  if (!ask) return null;

  return (
    <div
      role="region"
      aria-label={t.label}
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-3xl bg-ink-800/95 p-5 text-sm text-fog shadow-2xl ring-1 ring-white/10 backdrop-blur-xl sm:bottom-5"
    >
      <p className="leading-relaxed">
        {t.text}{" "}
        <Link href={privacyHref} prefetch={false} className="text-paper underline underline-offset-4">
          {t.policy}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="h-10 rounded-full bg-mint px-5 font-medium text-ink transition-colors hover:bg-[#5ce8b5]"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="h-10 rounded-full px-5 text-paper ring-1 ring-white/15 transition-colors hover:bg-white/10"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}
