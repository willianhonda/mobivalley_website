import { Button } from "@/components/Button";
import { Contours } from "@/components/Contours";
import { CopyEmail } from "@/components/CopyEmail";
import { Logo } from "@/components/Logo";
import { Accent } from "@/components/Section";
import { mailto } from "@/lib/site";

export function ContactCta() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative isolate overflow-hidden bg-ink py-28 text-paper sm:py-36 lg:py-44"
    >
      <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" lines={16} />
      <div
        aria-hidden
        className="absolute bottom-[-30rem] left-1/2 -z-10 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(52_224_161/0.2),transparent)]"
      />

      <div className="reveal mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Logo variant="symbol" className="mx-auto h-12 w-auto text-paper" title="" />
        <h2
          id="contato-title"
          className="text-balance mt-10 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
        >
          Tem uma ideia?{" "}
          <span className="block">
            <Accent>
              Vamos <span className="whitespace-nowrap">transformá-la</span> em produto.
            </Accent>
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-pretty text-fog">
          Conte o que você quer construir. A Mobivalley ajuda da estratégia e do desenho do produto ao
          desenvolvimento, à publicação e às próximas versões.
        </p>
        <div className="mt-11 flex flex-col items-center gap-4">
          <Button href={mailto()} size="lg">
            Fale com a Mobivalley
          </Button>
          <CopyEmail />
        </div>
      </div>
    </section>
  );
}
