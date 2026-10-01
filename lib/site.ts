// Site-wide constants. Keep this file free of heavy imports: client
// components (CopyEmail, Header) import it.

export const site = {
  name: "Mobivalley",
  url: "https://mobivalley.com.br",
  email: "mobivalleytech@gmail.com",
  appStoreUrl: "https://apps.apple.com/br/developer/mobivalley/id1701006912",
  /**
   * GA4 Measurement ID (e.g. "G-XXXXXXXXXX"). Empty disables analytics, the
   * cookie notice and the analytics paragraph of the privacy policy.
   */
  gaMeasurementId: "",
} as const;

export const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
