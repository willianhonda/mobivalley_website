import type { MetadataRoute } from "next";
import pt from "@/content/pt";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: pt.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d12",
    theme_color: "#0b0d12",
    lang: "pt-BR",
    icons: [
      { src: "/brand/mobivalley-app-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/mobivalley-app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
