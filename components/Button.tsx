import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "light" | "dark" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-mint text-ink hover:bg-[#5ce8b5] shadow-[0_0_0_1px_rgb(52_224_161/0.4),0_8px_30px_-8px_rgb(52_224_161/0.55)]",
  secondary: "bg-white/[0.06] text-paper ring-1 ring-inset ring-white/15 hover:bg-white/10 hover:ring-white/25",
  light: "bg-paper text-ink hover:bg-white",
  dark: "bg-ink text-paper hover:bg-ink-800",
  "outline-dark": "text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/35 hover:bg-ink/[0.03]",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

type Props = Omit<ComponentProps<"a">, "children"> & {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  /** "arrow" for in-page moves, "external" for links that leave the site. */
  icon?: "arrow" | "external" | "none";
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  className = "",
  ...props
}: Props) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "arrow" ? ArrowRight : null;
  const external = icon === "external";

  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,box-shadow,transform,color] duration-300 ease-(--ease-out-expo) active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {Icon && (
        <Icon
          aria-hidden
          className={`size-4 transition-transform duration-300 ease-(--ease-out-expo) ${
            external ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1"
          }`}
          strokeWidth={2.25}
        />
      )}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
