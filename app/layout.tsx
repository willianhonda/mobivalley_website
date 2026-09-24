import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { openGraphBase, site } from "@/lib/site";
import "@/styles/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Mobivalley" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "desenvolvimento de aplicativos",
    "desenvolvimento de apps iOS",
    "produtos digitais",
    "consultoria em tecnologia",
    "App Store",
    "Mobivalley",
  ],
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, url: "/", title: site.title, description: site.description },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-mint px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
