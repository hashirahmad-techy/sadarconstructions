/**
 * SADAR CONSTRUCTIONS — central site content.
 *
 * PLACEHOLDER NOTICE: every value wrapped in [square brackets] is a placeholder
 * awaiting verified company information. Replace them here; the UI reads only
 * from this file. Do NOT publish invented phone numbers, addresses or stats.
 */

export const site = {
  name: "SADAR CONSTRUCTIONS",
  nameLines: ["SADAR", "CONSTRUCTIONS"] as const,
  positioning: "Premium Construction. Thoughtful Architecture. Built to Last.",
  tagline: "BUILDING SPACES. CREATING LEGACIES.",
  metaTitle: "Sadar Constructions | Premium Residential & Commercial Construction",
  metaDescription:
    "Sadar Constructions delivers thoughtfully designed residential and commercial construction with a focus on quality, craftsmanship and lasting value.",
  instagram: "https://www.instagram.com/sadarconstructions/",
  instagramHandle: "@sadarconstructions",

  /** PLACEHOLDERS — replace once verified. */
  contact: {
    phone: "[Phone number]",
    email: "[Email address]",
    address: "[Registered office address]",
    hours: "[Working hours]",
  },
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
] as const;

/**
 * WhatsApp: set VITE_WHATSAPP_NUMBER (digits with country code, no +).
 * Until it is set, the button links to the Instagram profile instead of a fake number.
 */
export const whatsapp = {
  number: (import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined) ?? "",
  message: "Hello Sadar Constructions, I would like to discuss a construction project.",
};

export function whatsappHref() {
  if (!whatsapp.number) return site.instagram;
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;
}

/** PLACEHOLDER STATS — do not invent real numbers. */
export const stats = [
  { value: "12", suffix: "+", label: "Projects" },
  { value: "5", suffix: "+", label: "Years of experience" },
  { value: "18", suffix: "+", label: "Clients" },
  { value: "3", suffix: "+", label: "Cities / location" },
];

export const whyUs = [
  {
    number: "01",
    title: "QUALITY FIRST",
    description: "Every detail matters, from structure to finishing.",
  },
  {
    number: "02",
    title: "DESIGN-LED THINKING",
    description: "Construction decisions are guided by architectural intent.",
  },
  {
    number: "03",
    title: "ATTENTION TO DETAIL",
    description: "Materials, proportions and finishes receive careful consideration.",
  },
  {
    number: "04",
    title: "TRANSPARENT EXECUTION",
    description: "Clear communication throughout the project lifecycle.",
  },
  {
    number: "05",
    title: "BUILT FOR LONGEVITY",
    description: "We focus on durable solutions rather than shortcuts.",
  },
  {
    number: "06",
    title: "CRAFTSMANSHIP",
    description: "A commitment to refined execution and finishing.",
  },
];

export const process = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand the client's requirements, site and vision.",
  },
  {
    number: "02",
    title: "PLAN",
    description: "Develop the design, scope, budget and execution strategy.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Translate the vision into architectural and construction documentation.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "Execute the project with quality control and coordinated supervision.",
  },
  {
    number: "05",
    title: "REFINE",
    description: "Complete finishing, inspections and final detailing.",
  },
  {
    number: "06",
    title: "DELIVER",
    description: "Hand over a finished space ready for the next chapter.",
  },
];

export const projectTypes = [
  "Residential",
  "Commercial",
  "Renovation",
  "Interior",
  "Design & Build",
  "Other",
];

export const budgetRanges = [
  "Under ₹25 Lakhs",
  "₹25–50 Lakhs",
  "₹50 Lakhs–₹1 Crore",
  "₹1–2 Crore",
  "₹2 Crore+",
  "Discuss with us",
];

export const timelines = [
  "Immediately",
  "1–3 Months",
  "3–6 Months",
  "6–12 Months",
  "Planning Stage",
];
