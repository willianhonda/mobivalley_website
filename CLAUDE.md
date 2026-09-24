@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for Mobivalley (`mobivalley.com.br`), built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4, and lucide-react. Content is in Brazilian Portuguese. `gh-pages` is the default branch. On every push, `.github/workflows/deploy.yml` lints, builds, and publishes `out/` to GitHub Pages, so a push to `gh-pages` goes live. Only `out/` is published, so repo files such as this one are not served. The Pages source must be set to "GitHub Actions" in the repo settings.

## Commands

- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`: static export to `out/`. Preview it with `npx serve out`.
- `npm run lint`: ESLint (next/core-web-vitals and TypeScript rules). Run `npx tsc --noEmit` for a type check.
- `npm run brand`: regenerates every logo and icon from `scripts/build-brand.mjs` (see Brand).
- `npm run apps:assets`: re-downloads app icons and screenshots from the App Store lookup API into `public/apps/<slug>/` as WebP.

There is no test suite.

## Structure

- `app/`: routes. `page.tsx` is the one-page landing site, and it also holds the JSON-LD. `layout.tsx` holds fonts, metadata, the header, and the footer. `privacypolicy/` and `marca/` (the brand guide) are the other pages. `sitemap.ts`, `robots.ts`, and `manifest.ts` need `dynamic = "force-static"` for the export.
- `sections/`: one component per landing section (Hero, Services, Products, Process, About, Technology, ContactCta). Anchor ids are `servicos`, `produtos`, `processo`, `sobre`, `tecnologia`, and `contato`. The header nav lives in `lib/site.ts`.
- `components/`: shared UI (Header is the only client component besides CopyEmail, plus Button, Section/SectionHeader/Accent, ProductCard, PhoneFrame, Contours, and Logo).
- `lib/apps.ts`: portfolio data. Every fact there comes from the public App Store listings of developer id1701006912. Don't add clients, numbers, or claims that aren't public. `lib/site.ts`: name, URL, contact e-mail (`mobivalleytech@gmail.com`), nav, and the Open Graph base.
- `styles/globals.css`: Tailwind theme tokens (ink/paper/mint palette, fonts) and the motion classes. `.intro` is the on-load fade-up, staggered by `--i`. `.reveal` is a CSS scroll-driven reveal. Both run only under `prefers-reduced-motion: no-preference`. Don't put `.reveal` on items inside a horizontal scroller, because the view timeline would bind to that scroller.
- `public/resources/place-guesser/`: `<country>_card.jpeg|jpg` images that the Place Guesser app loads remotely by URL (`/resources/place-guesser/...`). Renaming or removing them breaks the app.
- `/privacypolicy/` is referenced by App Store listings. Keep that path.

## Brand

`scripts/build-brand.mjs` is the single source for the identity. The symbol is two hills with a dot in the valley, the wordmark is "mobivalley" in Geist SemiBold converted to outlines (fonts in `scripts/assets/`), and the palette is Ink `#0B0D12`, Paper `#F4F4F0`, Mint `#34E0A1`, and Mint Deep `#0E9F6E`. The script writes `public/brand/*`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/og.png`, and `lib/brand.generated.ts`. Edit the script and rerun it. Don't edit the outputs by hand.

## Notes

- `next.config.ts` uses `output: "export"`, `trailingSlash: true`, and `images.unoptimized`. Images are pre-optimized WebP served through `next/image`. Server features (redirects, headers, API routes, server actions) are not available.
- Use `next/link` with `prefetch={false}` for internal links in the header and footer, so the static site doesn't prefetch page payloads.
- `next dev` may rewrite the managed block in `AGENTS.md`. Leave it in place.
