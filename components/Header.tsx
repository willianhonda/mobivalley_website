"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe, Mail, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import type { Dictionary } from "@/lib/dictionary";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  t: Dictionary["nav"];
  contactHref: string;
  email: string;
};

export function Header({ locale, t, contactHref, email }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const other: Locale = locale === "pt" ? "en" : "pt";
  const otherHref = switchLocalePath(pathname ?? "/", other);
  const otherLang = other === "pt" ? "pt-BR" : "en";
  const home = localePath(locale, "/");
  const section = (id: string) => `${home}#${id}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view (home page only).
  useEffect(() => {
    const sections = t.items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [t.items, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pr-2 pl-5 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-(--ease-out-expo) ${
          solid
            ? "bg-ink/90 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)] ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <Link prefetch={false} href={home} className="-m-2 rounded-full p-2 text-paper" aria-label={t.home}>
          <Logo className="h-[1.35rem] w-auto" title="" />
        </Link>

        <nav aria-label={t.main} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {t.items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    prefetch={false}
                    href={section(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300 ${
                      isActive ? "text-paper" : "text-fog hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mint transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            prefetch={false}
            href={otherHref}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.switchLabel}
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 font-mono text-xs tracking-wider text-fog transition-colors hover:text-paper sm:inline-flex"
          >
            <Globe aria-hidden className="size-3.5" />
            {t.switchToShort}
          </Link>
          <Link
            prefetch={false}
            href={section("contato")}
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-paper px-4 text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:bg-mint sm:inline-flex"
          >
            {t.cta}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.close : t.open}
            className="inline-flex size-10 items-center justify-center rounded-full text-paper ring-1 ring-white/15 transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-3 top-[4.75rem] bottom-3 overflow-y-auto rounded-[2rem] bg-ink-900/95 p-6 ring-1 ring-white/10 backdrop-blur-xl md:hidden"
      >
        <nav aria-label={t.mobile} className="flex h-full flex-col">
          <ul className="flex flex-col">
            {t.items.map((item, i) => (
              <li key={item.id} className="border-b border-white/10">
                <Link
                  prefetch={false}
                  href={section(item.id)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-[-0.03em] text-paper"
                >
                  {item.label}
                  <span className="font-mono text-xs text-fog-2">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            prefetch={false}
            href={otherHref}
            hrefLang={otherLang}
            lang={otherLang}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 self-start py-2 text-fog hover:text-paper"
          >
            <Globe aria-hidden className="size-4" /> {t.switchTo}
          </Link>
          <div className="mt-auto space-y-3 pt-10">
            <Link
              prefetch={false}
              href={section("contato")}
              onClick={() => setOpen(false)}
              className="flex h-13 items-center justify-center gap-2 rounded-full bg-mint font-medium text-ink"
            >
              {t.cta} <ArrowRight aria-hidden className="size-4" />
            </Link>
            <a
              href={contactHref}
              className="flex h-13 items-center justify-center gap-2 rounded-full text-paper ring-1 ring-white/15"
            >
              <Mail aria-hidden className="size-4" /> {email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
