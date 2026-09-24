"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

/** Shows the contact e-mail with a one-click copy, for people without a mail client. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-fog transition-colors hover:text-paper"
    >
      <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-mint">{site.email}</span>
      <span className="flex size-7 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
        {copied ? (
          <Check aria-hidden className="size-3.5 text-mint" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
      </span>
      <span className="sr-only">{copied ? "" : "Copiar e-mail"}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado" : ""}
      </span>
    </button>
  );
}
