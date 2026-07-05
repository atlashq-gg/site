/*
  ── Site configuration ───────────────────────────────────────────────────────

  FACTION THEME (admin-controlled, build-time):
  Set which faction palette the whole site uses. This is NOT a visitor toggle —
  everyone sees whatever is set here when the site is built.

    - "colonial" → green/olive palette
    - "warden"   → blue/steel palette

  To switch: change FACTION below and push to main — the deploy workflow
  rebuilds and publishes automatically.
*/

export type Faction = "colonial" | "warden";

const FACTION: Faction = "colonial";

// Env override — internal plumbing for scripts/build-previews.mjs, which
// builds BOTH factions in one run. Not the way to switch the live site's
// faction; edit FACTION above instead.
const envFaction = import.meta.env.PUBLIC_FACTION as string | undefined;

export const faction: Faction =
  envFaction === "warden" || envFaction === "colonial"
    ? envFaction
    : FACTION;

// Regiment identity — edit these freely.
export const regiment = {
  name: "ATLAS",
  tagline:
    "Camaraderie, skill, achievement — and most importantly, FUN.",
};

// Splash art credit. The broadside hero art (src/assets/broadside.png) is the
// work of this artist; the footer credits them with a mailto link so people can
// reach out. Leave `email` empty ("") to show the name without a link.
export const splashArtist = {
  name: "Shyllelagh",
  email: "shyllelagh.mail@gmail.com",
};

// Crest credit. The ATLAS crests were a group effort; the footer lists each
// contributor with their part. Names only — the artists asked for no links
// (no socials, no email). An empty array hides the line.
export const crestArtists = [
  { name: "ambientlamp", role: "original idea" },
  { name: "Endet", role: "coloring, shading & touch-ups" },
  { name: "Zultragash", role: "border design" },
];
