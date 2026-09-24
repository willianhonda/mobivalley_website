import { ShieldCheck, Sparkles, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { Accent, Section } from "@/components/Section";

const principles: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Target,
    title: "Produto antes de código",
    text: "Tecnologia é meio. Começamos pelo problema, por quem vai usar e pelo que precisa ser medido.",
  },
  {
    icon: Sparkles,
    title: "Nativo quando faz diferença",
    text: "Mapas em 3D, câmera, Apple Watch, widgets: usamos o melhor de cada plataforma, sem atalhos que o usuário percebe.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade por padrão",
    text: "Sempre que possível, os dados ficam no aparelho, como no OffChat AI e no Gallery Optimizer.",
  },
  {
    icon: TrendingUp,
    title: "Lançar é o começo",
    text: "Produtos melhoram com uso real. A evolução entra no plano desde o primeiro dia, não depois.",
  },
];

export function About() {
  return (
    <Section id="sobre" tone="light" labelledBy="sobre-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-6">
          <p className="eyebrow text-mint-deep">Sobre a Mobivalley</p>
          <h2
            id="sobre-title"
            className="text-balance mt-5 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
          >
            Uma empresa de tecnologia que <Accent>constrói os próprios produtos</Accent>.
          </h2>
        </div>
        <div className="reveal space-y-6 text-lg leading-relaxed text-slate lg:col-span-5 lg:col-start-8 lg:pt-12">
          <p>
            A Mobivalley é uma empresa de tecnologia focada em desenvolvimento de aplicativos, produtos
            digitais e consultoria. Nosso primeiro app chegou à App Store em 2018, e seguimos cuidando de
            cada um depois do lançamento.
          </p>
          <p>
            Isso muda a forma como trabalhamos com clientes. Conhecemos o que vem depois do código: a
            revisão da Apple, as primeiras avaliações, a métrica que não se mexe, a atualização urgente
            para a nova versão do iOS. Quando assumimos um projeto, essa experiência vem junto.
          </p>
        </div>
      </div>

      <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
        {principles.map(({ icon: Icon, title, text }) => (
          <li key={title} className="reveal bg-paper p-7 sm:p-8">
            <Icon aria-hidden className="size-6 text-mint-deep" strokeWidth={1.75} />
            <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
            <p className="mt-2 leading-relaxed text-slate">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
