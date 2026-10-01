import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { getApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";

const linkClass = "inline-flex items-center gap-1 text-fog transition-colors duration-300 hover:text-paper";
const headingClass = "font-mono text-xs tracking-[0.14em] text-fog-2 uppercase";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 md:py-20 lg:grid-cols-[1.3fr_1fr_1.4fr_1fr]">
        <div>
          <Link prefetch={false} href={home} aria-label={t.nav.home} className="inline-block">
            <Logo className="h-6 w-auto" title="" />
          </Link>
          <p className="mt-5 max-w-xs text-fog">{t.meta.tagline}</p>
        </div>

        <nav aria-label={t.footer.navLabel}>
          <h2 className={headingClass}>{t.footer.nav}</h2>
          <ul className="mt-5 space-y-3">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <Link prefetch={false} href={`${home}#${item.id}`} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                App Store <ArrowUpRight aria-hidden className="size-3.5" />
                <span className="sr-only">{t.nav.opensNewTab}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{t.footer.apps}</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {getApps(locale).map((app) => (
              <li key={app.slug}>
                <Link prefetch={false} href={localePath(locale, `/apps/${app.slug}/`)} className={linkClass}>
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t.footer.contact}</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={mailto(t.meta.mailSubject)} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            <li>
              <Link prefetch={false} href={localePath(locale, "/privacypolicy/")} className={linkClass}>
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={localePath(locale, "/marca/")} className={linkClass}>
                {t.footer.brand}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 px-5 py-6 text-sm text-fog-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} Mobivalley. {t.footer.rights}
        </p>
        <p>{t.footer.made}</p>
      </div>
    </footer>
  );
}
