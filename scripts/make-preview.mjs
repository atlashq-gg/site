/*
  Inline the freshly-built ./dist into a single self-contained HTML file under
  ./previews — CSS becomes an inline <style>, and every /_astro asset becomes a
  base64 data: URI. The result opens in any browser with no server and no
  network, so it can be shared directly (Discord, email, USB) without deploying.

  This is invoked by `npm run previews` (scripts/build-previews.mjs), once per
  faction after that faction is built. It inlines whatever faction is currently
  in dist/, detected from <html data-faction>. It is intentionally NOT wired
  into `npm run build` — a plain deploy build should not emit preview files.
*/
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const indexPath = path.join(dist, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("make-preview: no dist/index.html — run `npm run build` first.");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");

// Which faction is this build? (stamped on <html data-faction="...">)
const faction = (html.match(/data-faction="([a-z]+)"/) || [, "site"])[1];

const mime = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

function dataUri(ref) {
  const clean = ref.split("?")[0].replace(/^\//, "");
  const p = path.join(dist, clean);
  if (!fs.existsSync(p)) return null;
  const ext = path.extname(p).toLowerCase();
  const buf = fs.readFileSync(p);
  return `data:${mime[ext] || "application/octet-stream"};base64,${buf.toString("base64")}`;
}

// 1) Inline <link rel="stylesheet"> → <style>…</style>
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, (tag) => {
  const m = tag.match(/href="([^"]+)"/);
  if (!m) return tag;
  const p = path.join(dist, m[1].replace(/^\//, ""));
  return fs.existsSync(p) ? `<style>${fs.readFileSync(p, "utf8")}</style>` : tag;
});

// 2) Inline every /_astro asset reference (src, srcset entries, href, css url())
let inlined = 0;
html = html.replace(
  /\/_astro\/[A-Za-z0-9._-]+\.(?:webp|png|jpe?g|svg|avif|gif)/g,
  (ref) => {
    const d = dataUri(ref);
    if (d) inlined++;
    return d || ref;
  },
);

const outDir = path.resolve("previews");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `atlas-${faction}.html`);
fs.writeFileSync(outFile, html);

const kb = (fs.statSync(outFile).size / 1024).toFixed(0);
console.log(
  `make-preview: wrote previews/atlas-${faction}.html (${kb} KB, ${inlined} assets inlined)`,
);
