/*
  ── Site configuration ───────────────────────────────────────────────────────

  FACTION THEME (admin-controlled, build-time):
  Set which faction palette the whole site uses. This is NOT a visitor toggle —
  everyone sees whatever is set here when the site is built.

    - "colonial" → green/olive palette
    - "warden"   → blue/steel palette

  To switch: change the value below (or set the PUBLIC_FACTION env var when
  building, e.g. `PUBLIC_FACTION=warden npm run build`), then rebuild + redeploy.
*/

export type Faction = "colonial" | "warden";

const DEFAULT_FACTION: Faction = "colonial";

// Env override (optional) — lets the deployer flip factions without editing code.
const envFaction = import.meta.env.PUBLIC_FACTION as string | undefined;

export const faction: Faction =
  envFaction === "warden" || envFaction === "colonial"
    ? envFaction
    : DEFAULT_FACTION;

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
