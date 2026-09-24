import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { Accent } from "@/components/Section";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink pt-32 pb-24 text-paper">
      <Contours className="-z-10 text-paper" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="font-mono text-sm text-mint">404</p>
        <h1 className="text-balance mt-6 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
          Esta página <Accent>se perdeu no vale</Accent>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-fog">
          O endereço pode ter mudado ou nunca ter existido. Vamos voltar ao começo?
        </p>
        <div className="mt-10">
          <Button href="/">Voltar para o início</Button>
        </div>
      </div>
    </section>
  );
}
