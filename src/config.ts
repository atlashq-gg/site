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
