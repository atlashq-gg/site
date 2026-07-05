/*
  Build BOTH factions and produce both self-contained preview files
  (previews/atlas-colonial.html and previews/atlas-warden.html).

  Used by `npm run previews`. A normal `npm run build` only ever produces one
  faction's dist, so generating both previews means building each faction in
  turn. We spawn Astro directly with PUBLIC_FACTION set (cross-platform, no
  cross-env dependency) and call make-preview.mjs after each build. Finally we
  rebuild with no override so ./dist is left matching the configured default
  faction (src/config.ts), not whichever faction we built last.
*/
import { spawnSync } from "node:child_process";
import path from "node:path";

const astroBin = path.resolve("node_modules/astro/astro.js");
const makePreview = path.resolve("scripts/make-preview.mjs");

function run(label, env) {
  console.log(`\n── ${label} ──`);
  const build = spawnSync(process.execPath, [astroBin, "build"], {
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (build.status !== 0) return build.status ?? 1;

  // When building a specific faction, make-preview detects it from the dist.
  const inline = spawnSync(process.execPath, [makePreview], { stdio: "inherit" });
  return inline.status ?? 1;
}

// Build each faction explicitly and inline it.
let failed = run("Colonial", { PUBLIC_FACTION: "colonial" });
if (!failed) failed = run("Warden", { PUBLIC_FACTION: "warden" });

// Restore dist/ to the configured default faction (no env override) — even
// after a failure above, so dist/ never sits on a non-default faction.
console.log("\n── Restoring default build ──");
const baseEnv = { ...process.env };
delete baseEnv.PUBLIC_FACTION;
const restore = spawnSync(process.execPath, [astroBin, "build"], {
  stdio: "inherit",
  env: baseEnv,
});
process.exit(failed || (restore.status ?? 1));
