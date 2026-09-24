import { Accent, Section, SectionHeader } from "@/components/Section";

const steps = [
  {
    title: "Descoberta",
    text: "Entendemos o problema, o objetivo do negócio e quem vai usar o produto. Antes de qualquer tela, definimos o que precisa dar certo.",
  },
  {
    title: "Estratégia",
    text: "Definimos escopo, arquitetura e prioridades. O resultado é um plano enxuto, com um MVP que chega cedo às mãos dos usuários.",
  },
  {
    title: "Desenvolvimento",
    text: "Design e código andam juntos, em ciclos curtos, com versões testáveis desde as primeiras semanas.",
  },
  {
    title: "Lançamento",
    text: "Preparamos a publicação: página na loja, capturas de tela, revisão da Apple, assinaturas e monitoramento.",
  },
  {
    title: "Evolução",
    text: "Medimos, lemos as avaliações e melhoramos. Foi assim que o Place Guesser chegou à versão 1.62.",
  },
];

// Where each step sits on the valley curve (percent of the curve box).
const points = [
  { x: 10, y: 22 },
  { x: 30, y: 62 },
  { x: 50, y: 86 },
  { x: 70, y: 56 },
  { x: 90, y: 12 },
];

/** Smooth curve through the points (Catmull-Rom converted to cubic Béziers). */
function curve(pts: { x: number; y: number }[]) {
  const p = [{ x: -4, y: pts[0].y - 18 }, ...pts, { x: 104, y: pts[pts.length - 1].y - 16 }];
  let d = `M${p[0].x * 10} ${p[0].y * 2}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x * 10} ${c1.y * 2}, ${c2.x * 10} ${c2.y * 2}, ${p2.x * 10} ${p2.y * 2}`;
  }
  return d;
}

export function Process() {
  return (
    <Section id="processo" labelledBy="processo-title" className="overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <SectionHeader
        id="processo-title"
        eyebrow="Como trabalhamos"
        title={
          <>
            Um caminho claro, <Accent>da ideia ao produto</Accent>.
          </>
        }
        lead="Todo produto atravessa um vale entre a ideia e o lançamento. Nosso processo existe para cruzá-lo com método, entregas frequentes e decisões baseadas em evidências."
      />

      {/* desktop: the five steps laid out along the valley */}
      <div className="reveal relative mt-20 hidden h-56 lg:block" aria-hidden>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="valley-stroke" x1="0" x2="1">
              <stop offset="0" stopColor="#f4f4f0" stopOpacity="0.15" />
              <stop offset="0.55" stopColor="#f4f4f0" stopOpacity="0.35" />
              <stop offset="1" stopColor="#34e0a1" />
            </linearGradient>
          </defs>
          <path
            d={curve(points)}
            fill="none"
            stroke="url(#valley-stroke)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {points.map((pt, i) => {
          const last = i === points.length - 1;
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              {last && <span className="absolute inset-0 animate-ping rounded-full bg-mint/40 motion-reduce:hidden" />}
              <span
                className={`relative block rounded-full ${
                  last
                    ? "size-4 bg-mint shadow-[0_0_24px_4px_rgb(52_224_161/0.5)]"
                    : "size-3 bg-ink ring-2 ring-paper/60"
                }`}
              />
            </span>
          );
        })}
      </div>

      <ol className="relative mt-14 grid gap-0 lg:mt-10 lg:grid-cols-5 lg:gap-8">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal relative border-l border-white/10 pb-12 pl-8 last:pb-0 lg:border-l-0 lg:pb-0 lg:pl-0"
          >
            <span
              aria-hidden
              className={`absolute top-1 -left-[5px] size-2.5 rounded-full lg:hidden ${
                i === steps.length - 1 ? "bg-mint" : "bg-ink ring-2 ring-paper/50"
              }`}
            />
            <p className="font-mono text-sm text-mint">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-fog">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
