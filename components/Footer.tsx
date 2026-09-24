import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import { mailto, nav, site } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-1 text-fog transition-colors duration-300 hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link prefetch={false} href="/" aria-label="Mobivalley — início" className="inline-block">
            <Logo className="h-6 w-auto" title="" />
          </Link>
          <p className="mt-5 max-w-xs text-fog">{site.tagline}</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-mono text-xs tracking-[0.14em] text-fog-2 uppercase">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                App Store <ArrowUpRight aria-hidden className="size-3.5" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs tracking-[0.14em] text-fog-2 uppercase">Contato</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={mailto()} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            <li>
              <Link prefetch={false} href="/privacypolicy/" className={linkClass}>
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/marca/" className={linkClass}>
                Identidade visual
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 px-5 py-6 text-sm text-fog-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} Mobivalley. Todos os direitos reservados.</p>
        <p>Feito no Brasil.</p>
      </div>
    </footer>
  );
}
