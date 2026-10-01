// Syncs the portfolio with the App Store.
//
// - Reads every app of the Mobivalley developer account from the public
//   lookup API (US store for names, ratings and descriptions; BR store for
//   Portuguese names and genres).
// - Reads each app's privacy labels from its public App Store page.
// - Downloads icons and screenshots as optimized WebP into public/apps/<slug>/.
// - Writes data/apps.json, which the site renders from.
//
// Files are only rewritten when their content changes, so a run with no
// App Store changes leaves the working tree clean. If a request fails the
// script exits non-zero without touching data/apps.json.
//
// Run with: npm run apps:sync
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEVELOPER_ID = 1701006912;
const MAX_SCREENS = 8;
const DATA_FILE = path.join(root, "data/apps.json");

// Stable slugs for existing apps (URLs depend on them). New apps get a slug
// derived from their name.
const SLUGS = {
  6447742368: "place-guesser",
  6752722065: "aeroexplorer",
  1452023223: "sticker-maker",
  6772647088: "speakscroll",
  6772645489: "gallery-optimizer",
  6759080666: "offchat-ai",
  6752260529: "littletube",
  1547922378: "price-action",
  1515394611: "stock-calc",
  1425516744: "travel-budget",
};

const slugify = (name) =>
  name
    .split(/[:–-]/)[0]
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function get(url, as = "json") {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      if (as === "json") return await res.json();
      if (as === "text") return await res.text();
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt >= 3) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

const lookup = (country) =>
  get(`https://itunes.apple.com/lookup?id=${DEVELOPER_ID}&entity=software&country=${country}&limit=200`).then((d) =>
    d.results.filter((r) => r.wrapperType === "software"),
  );

// --- privacy labels ---------------------------------------------------------

function collect(node, kind, out = []) {
  if (Array.isArray(node)) node.forEach((n) => collect(n, kind, out));
  else if (node && typeof node === "object") {
    if (node.$kind === kind) out.push(node);
    Object.values(node).forEach((n) => collect(n, kind, out));
  }
  return out;
}

const categories = (list = []) =>
  list.map((c) => ({ category: c.identifier, dataTypes: c.dataTypes ?? [] }));

/** Returns the app's privacy labels, or null if the page could not be parsed. */
async function privacyLabels(id) {
  const html = await get(`https://apps.apple.com/us/app/id${id}`, "text");
  const match = html.match(/<script[^>]*id="serialized-server-data"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) return null;
  const types = collect(JSON.parse(match[1]), "PrivacyType");
  if (!types.length) return null;

  // The page repeats each label in a summary and a detail view; keep the
  // most detailed copy of each.
  const best = {};
  const weight = (t) => JSON.stringify(t).match(/dataTypes":\["/g)?.length ?? 0;
  for (const t of types) if (!best[t.identifier] || weight(t) > weight(best[t.identifier])) best[t.identifier] = t;

  const purposes = (t) =>
    (t?.purposes ?? []).map((p) => ({ purpose: p.identifier, categories: categories(p.categories) }));

  return {
    notCollected: !!best.DATA_NOT_COLLECTED,
    notProvided: !!best.DATA_NOT_PROVIDED,
    tracking: categories(best.DATA_USED_TO_TRACK_YOU?.categories),
    linked: purposes(best.DATA_LINKED_TO_YOU),
    notLinked: purposes(best.DATA_NOT_LINKED_TO_YOU),
  };
}

// --- images -----------------------------------------------------------------

function writeIfChanged(file, buffer) {
  if (fs.existsSync(file) && fs.readFileSync(file).equals(buffer)) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buffer);
}

/** Pastel version of the icon's dominant color, used behind screenshots. */
async function tintFrom(icon) {
  const { dominant } = await sharp(icon).stats();
  const mix = (c) => Math.round(c * 0.3 + 255 * 0.7);
  return "#" + [dominant.r, dominant.g, dominant.b].map((c) => mix(c).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// --- main -------------------------------------------------------------------

const [us, br] = await Promise.all([lookup("us"), lookup("br")]);
if (!us.length) throw new Error("App Store lookup returned no apps");
const brById = Object.fromEntries(br.map((a) => [a.trackId, a]));

const previous = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) : { apps: [] };
const previousById = Object.fromEntries(previous.apps.map((a) => [a.id, a]));

const apps = [];
for (const a of us) {
  const b = brById[a.trackId] ?? {};
  const slug = SLUGS[a.trackId] ?? slugify(a.trackName);
  const dir = path.join(root, "public/apps", slug);

  const iconPng = await get(a.artworkUrl512.replace(/\/\d+x\d+bb\.\w+$/, "/1024x1024bb.png"), "buffer");
  writeIfChanged(path.join(dir, "icon.webp"), await sharp(iconPng).resize(256, 256).webp({ quality: 88 }).toBuffer());

  const screens = [];
  for (const [i, url] of a.screenshotUrls.slice(0, MAX_SCREENS).entries()) {
    const img = await get(url.replace(/\/\d+x\d+bb\.(\w+)$/, "/1000x0w.$1"), "buffer");
    const webp = await sharp(img).resize({ width: 640 }).webp({ quality: 78 }).toBuffer();
    const { width, height } = await sharp(webp).metadata();
    writeIfChanged(path.join(dir, `screen-${i + 1}.webp`), webp);
    screens.push({ src: `/apps/${slug}/screen-${i + 1}.webp`, width, height });
  }
  // Drop screenshots Apple no longer lists.
  for (const f of fs.readdirSync(dir)) {
    const n = Number(f.match(/^screen-(\d+)\.webp$/)?.[1]);
    if (n > screens.length) fs.rmSync(path.join(dir, f));
  }

  let privacy = null;
  try {
    privacy = await privacyLabels(a.trackId);
  } catch (err) {
    console.warn(`! privacy labels for ${slug}: ${err.message}`);
  }
  privacy ??= previousById[a.trackId]?.privacy ?? null;

  apps.push({
    id: a.trackId,
    slug,
    name: a.trackName,
    nameBR: b.trackName ?? a.trackName,
    url: `https://apps.apple.com/br/app/id${a.trackId}`,
    genres: { en: a.genres, pt: b.genres ?? a.genres },
    releaseDate: a.releaseDate,
    updatedAt: a.currentVersionReleaseDate,
    version: a.version,
    minimumOsVersion: a.minimumOsVersion,
    fileSizeBytes: Number(a.fileSizeBytes),
    price: a.price ?? 0,
    languages: a.languageCodesISO2A ?? [],
    rating: { value: a.averageUserRating ?? 0, count: a.userRatingCount ?? 0, store: "us" },
    gameCenter: (a.features ?? []).includes("gameCenter"),
    universal: (a.features ?? []).includes("iosUniversal"),
    description: { en: a.description, pt: b.description ?? a.description },
    releaseNotes: a.releaseNotes ?? "",
    icon: `/apps/${slug}/icon.webp`,
    tint: await tintFrom(iconPng),
    screens,
    privacy,
  });
  console.log(`✓ ${slug}`);
}

// Remove folders of apps that left the store.
const live = new Set(apps.map((a) => a.slug));
for (const d of fs.readdirSync(path.join(root, "public/apps"))) {
  if (!live.has(d)) fs.rmSync(path.join(root, "public/apps", d), { recursive: true });
}

const next = { developerUrl: `https://apps.apple.com/br/developer/mobivalley/id${DEVELOPER_ID}`, apps };
const serialize = (d) => JSON.stringify(d, null, 2) + "\n";
if (serialize({ ...previous, syncedAt: undefined }) !== serialize({ ...next, syncedAt: undefined })) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, serialize({ syncedAt: new Date().toISOString(), ...next }));
  console.log("data/apps.json updated");
} else {
  console.log("no changes");
}
