/*
  ── Links ────────────────────────────────────────────────────────────────────

  Everything the landing page points at lives here. No markup needed.

  • `discord` is the big primary call-to-action in the hero.
  • `links` is the grid of tools & content below it.

  To add a link: copy one entry in `links`, fill in title/description/url.
  `category` is optional and just used as a small label on the card.
  The grid URLs below are PLACEHOLDERS (#) — swap in the real ones.
*/

export interface LinkItem {
  title: string;
  description: string;
  url: string;
  category?: string;
}

export const discord = {
  label: "Join our Discord",
  url: "https://discord.gg/atlashq",
  blurb: "Recruitment, public services, and the rest of the regiment — find us on Discord.",
};

export const links: LinkItem[] = [
  {
    title: "Live War Map",
    description: "Current front lines, hexes, and the state of the war.",
    url: "#",
    category: "Tools",
  },
  {
    title: "Logistics Tracker",
    description: "Our self-hosted logi tool — stockpiles, requests, and runs.",
    url: "#",
    category: "Tools",
  },
  {
    title: "Stockpile Manager",
    description: "Track what's where and who needs what.",
    url: "#",
    category: "Tools",
  },
  {
    title: "Foxhole Wiki",
    description: "Vehicles, weapons, crafting costs — the reference.",
    url: "#",
    category: "Reference",
  },
  {
    title: "Ops Calendar",
    description: "Upcoming operations and scheduled events.",
    url: "#",
    category: "Regiment",
  },
  {
    title: "Twitch / YouTube",
    description: "Streams, VODs, and highlights from the front.",
    url: "#",
    category: "Content",
  },
];
