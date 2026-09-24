import { Compass, Layers, RefreshCcw, Smartphone, type LucideIcon } from "lucide-react";
import { Accent, Section, SectionHeader } from "@/components/Section";

type Service = { icon: LucideIcon; title: string; text: string; items: string[] };

const services: Service[] = [
  {
    icon: Smartphone,
    title: "Desenvolvimento de aplicativos",
    text: "Apps nativos para iPhone, iPad, Apple Watch e Apple TV, com a performance e o acabamento que as pessoas esperam de um app na App Store.",
    items: ["Interfaces nativas e acessíveis", "Widgets, extensões e Game Center", "Assinaturas e compras no app"],
  },
  {
    icon: Layers,
    title: "Produtos digitais",
    text: "Da ideia ao produto completo: escopo, design de interface, backend e tudo o que o produto precisa para funcionar com usuários de verdade.",
    items: ["Descoberta e definição do MVP", "Design de interface e protótipos", "APIs, dados e recursos em tempo real"],
  },
  {
    icon: Compass,
    title: "Consultoria em tecnologia",
    text: "Orientação técnica para decisões que custam caro quando tomadas no escuro: arquitetura, escolha de stack, privacidade e o caminho até a publicação.",
    items: ["Arquitetura e revisão técnica", "Planejamento de publicação nas lojas", "Privacidade e processamento no aparelho"],
  },
  {
    icon: RefreshCcw,
    title: "Evolução e manutenção",
    text: "O lançamento é só o começo. Acompanhamos métricas e avaliações, corrigimos, otimizamos e entregamos novas funcionalidades em ciclos curtos.",
    items: ["Atualizações a cada nova versão do iOS", "Melhorias guiadas por dados e feedback", "Novas funcionalidades com frequência"],
  },
];

export function Services() {
  return (
    <Section id="servicos" labelledBy="servicos-title" className="border-t border-white/5">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <SectionHeader
          id="servicos-title"
          eyebrow="Serviços"
          title={
            <>
              Do primeiro esboço à <Accent>próxima versão</Accent>.
            </>
          }
          lead="Cuidamos do ciclo completo de um produto digital: quem desenha a solução também escreve o código, publica nas lojas e continua evoluindo o produto depois do lançamento."
          className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start"
        />

        <ol className="grid overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 gap-px lg:col-span-7">
          {services.map(({ icon: Icon, title, text, items }, i) => (
            <li
              key={title}
              className="reveal group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-paper ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-mint group-hover:text-ink group-hover:ring-mint">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-xs text-fog-2">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-3 leading-relaxed text-fog">{text}</p>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-fog">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span aria-hidden className="size-1 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
