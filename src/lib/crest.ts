/*
  ── Faction crest selection ──────────────────────────────────────────────────

  The regiment crest swings with the active faction (set at build time in
  src/config.ts). Both crest files are imported here so the choice can stay a
  runtime lookup — that keeps both the FACTION setting in config.ts and the
  internal PUBLIC_FACTION override (used by `npm run previews`) working.

  `inactiveCrest` is exported so Base.astro can run it through the image
  pipeline too. Astro only copies the original, full-size PNG into the build for
  an imported image that is NEVER processed; processing the inactive crest into
  a throwaway derivative keeps its ~1 MB original out of dist/.
*/
import { faction } from "../config";
import colonialCrest from "../assets/ATLASColonial.png";
import wardenCrest from "../assets/ATLASWarden.png";

export const activeCrest = faction === "warden" ? wardenCrest : colonialCrest;
export const inactiveCrest = faction === "warden" ? colonialCrest : wardenCrest;
