/* eslint-disable @next/next/no-img-element -- static SVG badge, no optimization needed */

/** Apple's official "Download on the App Store" badge, linking to an app. */
export function AppStoreBadge({
  href,
  alt,
  newTabLabel,
  className = "h-12",
}: {
  href: string;
  alt: string;
  newTabLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-[0.6rem] transition-transform duration-300 ease-(--ease-out-expo) hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <img src="/badges/app-store.svg" alt={`${alt} ${newTabLabel}`} width={120} height={40} className={`${className} w-auto`} />
    </a>
  );
}
