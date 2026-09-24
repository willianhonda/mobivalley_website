import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

/** Full-width band with the site's vertical rhythm and a centered container. */
export function Section({ id, tone = "dark", className = "", children, labelledBy }: SectionProps) {
  const toneClass = tone === "light" ? "on-light bg-paper text-ink" : "bg-ink text-paper";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate py-24 sm:py-32 lg:py-40 ${toneClass} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

type HeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className = "",
}: HeaderProps) {
  const light = tone === "light";
  return (
    <header
      className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <p className={`eyebrow ${light ? "text-mint-deep" : "text-mint"}`}>{eyebrow}</p>
      <h2
        id={id}
        className="text-balance mt-5 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-pretty ${light ? "text-slate" : "text-fog"} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/** Serif italic accent used for a word or two inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal tracking-[-0.01em] italic">{children}</em>;
}
