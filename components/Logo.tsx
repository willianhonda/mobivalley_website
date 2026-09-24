import { horizontalLockup as lockup, symbol, wordmark } from "@/lib/brand.generated";

type Props = {
  /** "full" is the horizontal lockup, "symbol" is the mark alone. */
  variant?: "full" | "symbol";
  className?: string;
  /** Accessible name. Pass an empty string when the logo sits next to visible text. */
  title?: string;
};

const Mark = () => (
  <g transform={`translate(0 ${symbol.shiftY})`}>
    <path d={symbol.hills} fill="currentColor" />
    <circle cx={symbol.dot.cx} cy={symbol.dot.cy} r={symbol.dot.r} fill="var(--logo-accent, #34e0a1)" />
  </g>
);

/**
 * Brand logo drawn inline, so it inherits `color` for the hills and wordmark
 * and `--logo-accent` for the dot.
 */
export function Logo({ variant = "full", className, title = "Mobivalley" }: Props) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  if (variant === "symbol") {
    const { x, y, w, h } = symbol.bounds;
    return (
      <svg viewBox={`${x} ${y} ${w} ${h}`} className={className} {...a11y}>
        <Mark />
      </svg>
    );
  }

  const s = lockup.symbolScale;
  return (
    <svg viewBox={`0 0 ${lockup.width} ${lockup.height}`} className={className} {...a11y}>
      <g transform={`translate(${-symbol.bounds.x * s} ${-symbol.bounds.y * s}) scale(${s})`}>
        <Mark />
      </g>
      <path
        transform={`translate(${lockup.symbolWidth + lockup.gap} ${lockup.baseline})`}
        d={wordmark.d}
        fill="currentColor"
      />
    </svg>
  );
}
