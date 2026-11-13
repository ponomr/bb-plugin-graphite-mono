// Builds themes/<id>.css from src/common.css plus one palette file.
// `node scripts/build-themes.mjs --check` fails when a committed theme is stale.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themes = [
  { id: "graphite-mono", palette: "palette-graphite.css" },
  { id: "graphite-mono-matrix", palette: "palette-matrix.css" },
];
const check = process.argv.includes("--check");
const common = readFileSync(join(root, "src/common.css"), "utf8");

// Embedded JetBrains Mono (SIL OFL 1.1, see fonts/OFL.txt): one @font-face per
// style and subset, inlined as base64 so the theme makes no network requests.
const manifest = JSON.parse(readFileSync(join(root, "fonts/manifest.json"), "utf8"));
const fontFaces = manifest.map((f) => {
  const data = readFileSync(join(root, "fonts", f.file)).toString("base64");
  return [
    "@font-face {",
    '  font-family: "JetBrains Mono";',
    `  font-style: ${f.style};`,
    `  font-weight: ${f.weight};`,
    "  font-display: swap;",
    `  src: url(data:font/woff2;base64,${data}) format("woff2");`,
    `  unicode-range: ${f.unicodeRange};`,
    "}",
  ].join("\n");
}).join("\n");

let stale = 0;
for (const { id, palette } of themes) {
  const colors = readFileSync(join(root, "src", palette), "utf8");
  const header = `/* Generated from src/common.css and src/${palette} by scripts/build-themes.mjs; edit the sources. */`;
  // An @import must stay the first statement, so the header goes after it.
  const lines = common.trimEnd().split("\n");
  const head = lines[0].startsWith("@import") ? [lines.shift()] : [];
  const css = [...head, header, fontFaces, "", ...lines].join("\n") + `\n\n${colors.trimEnd()}\n`;
  const target = join(root, "themes", `${id}.css`);
  if (check) {
    let current = "";
    try { current = readFileSync(target, "utf8"); } catch {}
    if (current !== css) { console.error(`stale: themes/${id}.css`); stale++; }
  } else {
    writeFileSync(target, css);
    console.log(`wrote themes/${id}.css (${css.length} bytes)`);
  }
}
if (stale) process.exit(1);
