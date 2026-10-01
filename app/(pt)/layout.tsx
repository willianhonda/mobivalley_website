import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { rootMetadata, viewport as siteViewport } from "@/lib/metadata";

export const metadata = rootMetadata("pt");
export const viewport = siteViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell locale="pt">{children}</SiteShell>;
}
