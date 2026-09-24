import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Minimal iPhone frame drawn in CSS around a real App Store screenshot. */
export function PhoneFrame({ src, alt, className = "", sizes = "320px", priority }: Props) {
  return (
    <div
      className={`relative rounded-[18%/8.4%] bg-[linear-gradient(145deg,#2a2f3a,#0d0f14_45%,#23272f)] p-[3.2%] shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7),inset_0_0_0_1px_rgb(255_255_255/0.12)] ${className}`}
    >
      <div className="relative aspect-[1000/2164] overflow-hidden rounded-[15%/7%] bg-ink-800">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
        <span
          aria-hidden
          className="absolute top-[1.9%] left-1/2 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
