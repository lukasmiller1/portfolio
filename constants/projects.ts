import type { Project, ProjectType } from "@/types/project";

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  game: "Games",
  script: "Scripts",
  bot: "Bots",
  website: "Websites",
  other: "Other",
};

export const PROJECT_TYPES_ORDER: ProjectType[] = [
  "game",
  "script",
  "bot",
  "website",
  "other",
];

export const DEMO_PROJECTS: Project[] = [
  {
    _id: "demo-1",
    name: "Galaxy Runner",
    description:
      "An arcade-style endless runner game with a sci-fi twist.",
    source: "Private repository (available after purchase).",
    price: 19,
    image: "/file.svg",
    video: null,
    type: "game",
  },
  {
    _id: "demo-2",
    name: "AutoBackup Script",
    description:
      "A Node.js script that automatically backs up your projects to local or cloud storage.",
    source: "Private repository (available after purchase).",
    price: 9,
    image: null,
    video: "/window.svg",
    type: "script",
  },
  {
    _id: "demo-3",
    name: "Discord Support Bot",
    description:
      "Configurable bot for handling FAQs, tickets, and role assignments in your server.",
    source: "Private repository (available after purchase).",
    price: 24,
    image: "/globe.svg",
    video: null,
    type: "bot",
  },
  {
    _id: "demo-4",
    name: "Portfolio Landing Page",
    description:
      "Responsive, fast-loading landing page template for developers and creators.",
    source: "Private repository (available after purchase).",
    price: 29,
    image: "/window.svg",
    video: null,
    type: "website",
  },
];
