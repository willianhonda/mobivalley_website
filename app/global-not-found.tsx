import type { Metadata } from "next";
import Link from "next/link";
import { Contours } from "@/components/Contours";
import { Accent } from "@/components/Section";
import { fontClasses } from "@/components/SiteShell";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import en from "@/content/en";
import pt from "@/content/pt";
import "@/styles/globals.css";

// GitHub Pages serves this page (404.html) for every unknown URL, in either
// language, so it speaks both.
export const metadata: Metadata = {
  title: `${pt.notFound.title} · ${en.notFound.title} — Mobivalley`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontClasses}>
      <body>
        <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-paper">
          <Contours className="-z-10 text-paper" />
          <header className="mx-auto w-full max-w-7xl px-5 pt-8 sm:px-8">
            <Link href="/" prefetch={false} aria-label={pt.nav.home} className="inline-block">
              <Logo className="h-6 w-auto" title="" />
            </Link>
          </header>
          <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
            <p className="font-mono text-sm text-mint">404</p>
            <h1 className="text-balance mt-6 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
              {pt.notFound.heading.before}
              <Accent>{pt.notFound.heading.accent}</Accent>
              {pt.notFound.heading.after}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-fog">{pt.notFound.text}</p>
            <p lang="en" className="mx-auto mt-2 max-w-md text-fog-2">
              {en.notFound.text}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/">{pt.notFound.button}</Button>
              <Button href="/en/" variant="secondary" lang="en">
                {en.notFound.button}
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
