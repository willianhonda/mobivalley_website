type Props = {
  className?: string;
  lines?: number;
  /** Stroke color; lines fade out toward the bottom of the valley. */
  color?: string;
};

/**
 * Topographic lines of a valley — the brand's background motif. Pure SVG,
 * stretched to fill its container without distorting the stroke width.
 */
export function Contours({ className = "", lines = 14, color = "currentColor" }: Props) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const t = i / (lines - 1);
    const y = 90 + i * 46; // where the line meets the edges
    const depth = 360 - t * 250; // how far the line dips in the middle
    const cx = 720 + Math.sin(i * 0.9) * 40; // slight drift so it feels hand-surveyed
    const d = `M-40 ${y} C 300 ${y}, ${cx - 380} ${y + depth}, ${cx} ${y + depth} S 1140 ${y}, 1480 ${y - 10}`;
    return { d, opacity: 0.2 - t * 0.14 };
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={color}
          strokeOpacity={p.opacity}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
