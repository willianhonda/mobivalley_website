// Downloads each app's icon and selected screenshots from the public App Store
// lookup API and writes optimized WebP files to public/apps/<slug>/.
//
// Run with: npm run apps:assets
// Screenshot indexes refer to the order of `screenshotUrls` in the lookup API.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEVELOPER_ID = 1701006912;

const apps = {
  6447742368: { slug: "place-guesser", shots: [1, 0, 3] },
  6752722065: { slug: "aeroexplorer", shots: [3, 2] },
  1452023223: { slug: "sticker-maker", shots: [0] },
  6772647088: { slug: "speakscroll", shots: [0] },
  6772645489: { slug: "gallery-optimizer", shots: [0] },
  6759080666: { slug: "offchat-ai", shots: [1] },
  6752260529: { slug: "littletube", shots: [0] },
  1547922378: { slug: "price-action", shots: [0] },
  1515394611: { slug: "stock-calc", shots: [0] },
  1425516744: { slug: "travel-budget", shots: [0] },
};

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const res = await fetch(
  `https://itunes.apple.com/lookup?id=${DEVELOPER_ID}&entity=software&country=us&limit=200`,
);
const { results } = await res.json();

for (const app of results.filter((r) => r.wrapperType === "software")) {
  const config = apps[app.trackId];
  if (!config) {
    console.warn(`New app not configured: ${app.trackName} (${app.trackId})`);
    continue;
  }
  const dir = path.join(root, "public/apps", config.slug);
  fs.mkdirSync(dir, { recursive: true });

  const icon = await download(app.artworkUrl512.replace(/\/\d+x\d+bb\.\w+$/, "/1024x1024bb.png"));
  await sharp(icon).resize(256, 256).webp({ quality: 88 }).toFile(path.join(dir, "icon.webp"));

  for (const [i, index] of config.shots.entries()) {
    const url = app.screenshotUrls[index].replace(/\/\d+x\d+bb\.(\w+)$/, "/1000x0w.$1");
    const img = await download(url);
    await sharp(img)
      .resize({ width: 640 })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `screen-${i + 1}.webp`));
  }
  console.log(`✓ ${config.slug}`);
}
