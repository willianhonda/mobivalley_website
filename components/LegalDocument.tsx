import type { ReactNode } from "react";
import Image from "next/image";
import { Contours } from "@/components/Contours";
import type { Block, LegalDoc } from "@/content/legal";

/** Renders text with [label](href) links. */
function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    const external = /^https?:/.test(m[2]);
    parts.push(
      <a
        key={m.index}
        href={m[2]}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-ink underline decoration-mint-deep/40 underline-offset-4 hover:decoration-mint-deep"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string")
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-mint-deep">
      {block.list.map((item) => (
        <li key={item}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

type Props = {
  doc: LegalDoc;
  eyebrow: string;
  updated: string;
  icon?: string;
  lang?: string;
  /** Extra content after the document (e.g. links to the other document). */
  footer?: ReactNode;
};

/** Dark title band followed by the document on paper. */
export function LegalDocument({ doc, eyebrow, updated, icon, lang, footer }: Props) {
  return (
    <article lang={lang}>
      <header className="relative isolate overflow-hidden bg-ink pt-36 pb-16 text-paper sm:pt-44 sm:pb-20">
        <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,transparent,black)]" lines={10} />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="flex items-center gap-4">
            {icon && <Image src={icon} alt="" width={48} height={48} className="size-12 rounded-[26%] ring-1 ring-white/10" />}
            <p className="eyebrow text-mint">{eyebrow}</p>
          </div>
          <h1 className="text-balance mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-fog">{updated}</p>
        </div>
      </header>

      <div className="on-light bg-paper py-16 text-ink sm:py-24">
        <div className="mx-auto max-w-3xl space-y-5 px-5 text-[1.0625rem] leading-relaxed text-slate sm:px-8">
          <p className="text-lg text-ink">
            <Rich text={doc.intro} />
          </p>
          {doc.sections.map((section) => (
            <section key={section.title} className="pt-6">
              <h2 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-ink">{section.title}</h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
          {footer}
        </div>
      </div>
    </article>
  );
}
