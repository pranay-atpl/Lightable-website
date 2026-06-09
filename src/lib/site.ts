// Central content + IA for the Lightable site. Swap copy/data here.

export const SITE = {
  name: "Lightable",
  tagline: "Lighting design and intelligent control — automated, tuned, controlled.",
  pillars: ["Design", "Automate", "Control"] as const,
  description:
    "Lightable is an architectural lighting design and automation studio. We design layered, scene-based light and control it seamlessly with KNX and Lutron — for high-end residences and boutique commercial spaces.",
  // Placeholder NAP — replace with real studio details before launch.
  url: "https://lightable.studio",
  email: "studio@lightable.studio",
  phone: "+44 20 7946 0102",
  address: {
    street: "Unit 4, The Foundry, 18 Clerkenwell Road",
    city: "London",
    region: "England",
    postal: "EC1M 5PQ",
    country: "GB",
  },
  social: {
    instagram: "https://instagram.com/lightable",
    linkedin: "https://linkedin.com/company/lightable",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
}

export const NAV: NavItem[] = [
  {
    label: "Lighting",
    href: "/lighting-design",
    children: [
      { label: "Lighting Design", href: "/lighting-design", note: "Our flagship service" },
      { label: "Fixtures & Supply", href: "/lighting-fixtures", note: "Architectural, not decorative" },
      { label: "Control & Automation", href: "/lighting-control", note: "KNX · Lutron" },
    ],
  },
  { label: "Shading", href: "/shading" },
  {
    label: "Automation",
    href: "/automation",
    children: [
      { label: "Smart Spaces", href: "/automation", note: "One app, one space" },
      { label: "Audio", href: "/automation#audio" },
      { label: "Video & AV/IP", href: "/automation#video" },
      { label: "Security", href: "/automation#security" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export interface Service {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  href: string;
  points: string[];
}

export const LIGHTING_SERVICES: Service[] = [
  {
    slug: "lighting-design",
    kicker: "Primary",
    title: "Lighting Design",
    summary:
      "Full-service architectural lighting design, from first brief to final commissioning. We design with light — layered, intentional, and entirely engineered.",
    href: "/lighting-design",
    points: ["Layered light plan", "Scene & mood strategy", "Tunable-white approach", "Full documentation"],
  },
  {
    slug: "lighting-fixtures",
    kicker: "Supply",
    title: "Fixtures & Supply",
    summary:
      "Architectural fixtures specified and supplied — downlights, linear, track, façade and landscape. Engineered light tools, never decorative lamps.",
    href: "/lighting-fixtures",
    points: ["Downlights & linear", "Track & façade", "Landscape", "Tunable white"],
  },
  {
    slug: "lighting-control",
    kicker: "Control",
    title: "Control & Automation",
    summary:
      "KNX and Lutron control for scenes, dimming, scheduling and daylight-follow — recalled from a keypad, an app, or your voice.",
    href: "/lighting-control",
    points: ["KNX & Lutron", "Scenes & tuning", "Scheduling", "App + voice"],
  },
];

export interface FixtureCategory {
  name: string;
  spec: string;
  blurb: string;
  ratio: string;
}

export const FIXTURES: FixtureCategory[] = [
  {
    name: "Recessed Downlights",
    spec: "Adjustable · trimless · 2700–4000K",
    blurb:
      "Precise, low-glare pools of light. Trimless plaster-in details that disappear into the ceiling and let the light do the talking.",
    ratio: "4 / 5",
  },
  {
    name: "Linear & Profile",
    spec: "Recessed · surface · suspended",
    blurb:
      "Continuous runs that draw architecture — coves, slots and grazing details that wash walls and define edges.",
    ratio: "4 / 5",
  },
  {
    name: "Track & Spot",
    spec: "Low-voltage · framing · accent",
    blurb:
      "Flexible accent light for art, joinery and feature walls — framing projectors that place light exactly where it belongs.",
    ratio: "4 / 5",
  },
  {
    name: "Façade & Exterior",
    spec: "IP65+ · grazing · uplight",
    blurb:
      "Architectural exterior light that models the building after dark — grazing, uplighting and discreet integrated detail.",
    ratio: "4 / 5",
  },
  {
    name: "Landscape",
    spec: "Path · spike · in-ground",
    blurb:
      "Gardens and approaches lit with restraint — layered, glare-free and weather-rated for the long term.",
    ratio: "4 / 5",
  },
  {
    name: "Tunable White",
    spec: "1800–6500K · dim-to-warm",
    blurb:
      "Fixtures whose colour temperature shifts through the day — energising at noon, intimate by evening, all on schedule.",
    ratio: "4 / 5",
  },
];

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
  deliverables: string[];
}

export const PROCESS: ProcessStep[] = [
  {
    no: "01",
    title: "Consultation & brief",
    body: "We study the space, its architecture and how you live in it — the moods you want, hour by hour. Light follows life, so we start with yours.",
    deliverables: ["Site survey", "Mood & lifestyle brief", "Reference study"],
  },
  {
    no: "02",
    title: "Concept & lighting design",
    body: "A layered light plan — ambient, task, accent and feature — with a scene strategy and a tunable-white approach that lets one space become many.",
    deliverables: ["Layered light plan", "Scene strategy", "Tunable-white study"],
  },
  {
    no: "03",
    title: "Technical design & specification",
    body: "We resolve the engineering: a full fixture schedule, circuiting, and the control topology across KNX or Lutron, with shading integrated from the start.",
    deliverables: ["Fixture schedule", "Circuiting & loads", "Control topology"],
  },
  {
    no: "04",
    title: "Documentation",
    body: "Coordinated drawings, schedules and a control-programming plan that your architect, M&E engineer and contractor can build from without ambiguity.",
    deliverables: ["RCP & details", "Schedules", "Programming plan"],
  },
  {
    no: "05",
    title: "Supply & coordination",
    body: "Fixtures supplied and coordinated with trades — we hold the line on quality from the spec sheet to the ceiling void.",
    deliverables: ["Procurement", "Trade coordination", "Sample approvals"],
  },
  {
    no: "06",
    title: "Programming & commissioning",
    body: "On site, we tune the result: scenes, dimming curves, schedules and daylight-follow, with the app and voice control set up and tested.",
    deliverables: ["Scene programming", "Dimming curves", "App + voice setup"],
  },
  {
    no: "07",
    title: "Handover & aftercare",
    body: "We train you on the system, fine-tune once you’ve lived with it, and stay on call. A designed environment deserves to keep its edge.",
    deliverables: ["Training", "Fine-tuning visit", "Ongoing support"],
  },
];

export interface AutomationService {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

export const AUTOMATION: AutomationService[] = [
  {
    id: "audio",
    title: "Audio",
    blurb:
      "Multi-room, distributed audio that disappears into the architecture — every room on its own source, or the whole space as one.",
    items: ["Distributed speakers", "Architectural in-ceiling", "Streaming sources", "Zoned volume"],
  },
  {
    id: "video",
    title: "Video",
    blurb:
      "Active LED video displays and televisions that arrive when wanted and vanish when not — sized and placed for the room, not the box.",
    items: ["Active LED walls", "Concealed televisions", "Cinema rooms", "Art-mode displays"],
  },
  {
    id: "av-ip",
    title: "AV over IP",
    blurb:
      "Distributed video and AV across the network — any source to any screen, scalable across a whole building.",
    items: ["Matrix distribution", "Networked sources", "Scalable zones", "Single backbone"],
  },
  {
    id: "security",
    title: "Security",
    blurb:
      "CCTV, video door phones and smart locks, woven into the same control layer — see, speak and admit from one place.",
    items: ["CCTV", "Video door phones", "Smart locks", "Access & alerts"],
  },
];

export interface Project {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  summary: string;
  scope: string[];
  systems: string[];
  ratio: string;
  outcomes: { label: string; value: string }[];
  story: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "penfold-house",
    title: "Penfold House",
    type: "Residential",
    location: "Hampstead, London",
    year: "2025",
    summary:
      "A six-bedroom family home re-lit around the rhythm of a day — cool and bright at breakfast, low and amber by night, all on one keypad.",
    scope: ["Lighting design", "Tunable white", "Lutron control", "Motorized shading"],
    systems: ["Lutron HomeWorks", "DALI dimming", "Motorized shades"],
    ratio: "16 / 10",
    outcomes: [
      { label: "Scenes", value: "42" },
      { label: "Control zones", value: "120" },
      { label: "Colour temp", value: "1800–4000K" },
    ],
    story: [
      "The brief was deceptively simple: a house that felt calm. In practice that meant dissolving the switches, layering four sources of light into every principal room, and giving the family a single, legible way to move between moods.",
      "We specified trimless downlights, concealed cove runs and a tunable-white backbone, then programmed the whole house onto a Lutron system with daylight-follow. Mornings open cool and energising; evenings settle to candle-warm without a single harsh edge.",
      "Shading was integrated from day one, so the blinds and the light move together — privacy, glare and mood handled in one gesture.",
    ],
  },
  {
    slug: "atelier-nove",
    title: "Atelier Nové",
    type: "Commercial",
    location: "Marylebone, London",
    year: "2024",
    summary:
      "A boutique flagship where light sells the product — crisp and precise on the floor, warm and generous at the threshold.",
    scope: ["Lighting design", "Track & framing", "KNX control", "Façade"],
    systems: ["KNX", "Framing projectors", "Façade grazing"],
    ratio: "16 / 10",
    outcomes: [
      { label: "Scenes", value: "18" },
      { label: "Accent CRI", value: "97+" },
      { label: "Energy vs. base", value: "−34%" },
    ],
    story: [
      "Retail light has to do two jobs at once — render product faithfully and shape the room. We used high-CRI framing projectors to place crisp accents on the merchandise, against a warmer ambient field that pulls people in from the street.",
      "A KNX backbone gives the team scene presets for trading hours, events and close-down, each one a single press. The façade grazes the stone after dark, so the shopfront reads as a lantern on the street.",
    ],
  },
  {
    slug: "riverside-facade",
    title: "Riverside Façade",
    type: "Façade",
    location: "Southbank, London",
    year: "2024",
    summary:
      "An architectural façade scheme that models a riverside building after dark — grazing light, integrated detail, zero glare to the water.",
    scope: ["Façade design", "Grazing & uplight", "KNX scheduling", "Glare control"],
    systems: ["KNX", "IP66 linear graze", "Astronomical scheduling"],
    ratio: "16 / 10",
    outcomes: [
      { label: "Run length", value: "210m" },
      { label: "IP rating", value: "IP66" },
      { label: "Spill to river", value: "Near-zero" },
    ],
    story: [
      "Exterior architectural lighting is an exercise in restraint. The building wanted presence on the skyline without throwing light across the water, so we grazed the masonry with concealed linear runs and uplit the structural rhythm only where it earned attention.",
      "An astronomical schedule fades the scheme up at dusk and trims it back through the night, balancing presence with neighbourliness — and with the energy budget.",
    ],
  },
];

export const PARTNERS = [
  "KNX",
  "Lutron",
  "DALI",
  "Casambi",
  "Crestron",
  "Sonos",
  "Araknis",
  "Control4",
];

export interface ProjectTypeOption {
  value: string;
  label: string;
}
export const PROJECT_TYPES: ProjectTypeOption[] = [
  { value: "residential", label: "Private residence" },
  { value: "commercial", label: "Boutique commercial" },
  { value: "facade", label: "Façade / exterior" },
  { value: "refurb", label: "Refurbishment" },
  { value: "other", label: "Something else" },
];
