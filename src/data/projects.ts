import heroResidence from "@/assets/hero-residence.jpg";
import familyResidence from "@/assets/project-family-residence.jpg";
import urbanResidence from "@/assets/project-urban-residence.jpg";
import commercial from "@/assets/project-commercial.jpg";
import interior from "@/assets/project-interior.jpg";
import renovation from "@/assets/project-renovation.jpg";
import floorPlan from "@/assets/floor-plan.jpg";

export const projectImages = {
  heroResidence,
  familyResidence,
  urbanResidence,
  commercial,
  interior,
  renovation,
  floorPlan,
};

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Renovation"
  | "Architectural";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** PLACEHOLDER */
  location: string;
  /** PLACEHOLDER */
  year: string;
  /** PLACEHOLDER — Completed / Ongoing / Concept */
  status: string;
  /** PLACEHOLDER */
  area: string;
  description: string;
  designApproach: string;
  constructionApproach: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  /** Reference imagery only — not a claimed completed Sadar Constructions project. */
  isPlaceholder: boolean;
}

/**
 * PLACEHOLDER PROJECTS.
 * These entries use reference architectural imagery and concept copy. They are
 * NOT completed Sadar Constructions projects. Replace titles, locations, years,
 * statuses, areas, copy and images with verified project data when available.
 */
export const projects: Project[] = [
  {
    slug: "luxury-residence-concept",
    title: "Luxury Residence — Concept",
    category: "Residential",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "A classically proportioned residence organised around a tall entrance portal, with stone facades, arched openings and carefully layered architectural lighting.",
    designApproach:
      "Symmetry, proportion and restraint. Columns and arches set the rhythm of the elevation while material selection keeps the palette quiet and warm.",
    constructionApproach:
      "Structural planning coordinated with stone cladding, joinery and services so that finishes align precisely with the design intent.",
    heroImage: heroResidence,
    gallery: [heroResidence, familyResidence, interior, floorPlan],
    features: ["Stone facade", "Arched fenestration", "Entrance portal", "Architectural lighting"],
    isPlaceholder: true,
  },
  {
    slug: "modern-family-residence-concept",
    title: "Modern Family Residence — Concept",
    category: "Residential",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "A family home balancing a warm classical facade with contemporary interior volumes, generous glazing and a clear separation of private and shared spaces.",
    designApproach:
      "Clarity of plan first: circulation, daylight and privacy resolved before the elevation is refined.",
    constructionApproach:
      "Sequenced execution with quality checks at structure, plaster, joinery and finishing stages.",
    heroImage: familyResidence,
    gallery: [familyResidence, interior, floorPlan, heroResidence],
    features: ["Arched windows", "Balcony detail", "Warm plaster finish", "Landscaped frontage"],
    isPlaceholder: true,
  },
  {
    slug: "contemporary-urban-residence-concept",
    title: "Contemporary Urban Residence — Concept",
    category: "Architectural",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "A multi-level urban residence in charcoal stone, glass and warm timber soffits, with cantilevered balconies and deep shaded openings.",
    designApproach:
      "Rectangular forms stacked and offset to create shade, privacy and depth on a tight urban plot.",
    constructionApproach:
      "Careful coordination of concrete, cladding and glazing tolerances to keep lines sharp.",
    heroImage: urbanResidence,
    gallery: [urbanResidence, commercial, interior, floorPlan],
    features: ["Cantilevered balconies", "Timber soffits", "Full-height glazing", "Charcoal stone"],
    isPlaceholder: true,
  },
  {
    slug: "commercial-development-concept",
    title: "Commercial Development — Concept",
    category: "Commercial",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "A mixed-use commercial development with a stone-and-glass street elevation, active ground floor and efficient upper-level planning.",
    designApproach:
      "A calm, repeating structural bay that gives the building presence without visual noise.",
    constructionApproach:
      "Programme-driven execution with staged handover and coordinated MEP services.",
    heroImage: commercial,
    gallery: [commercial, urbanResidence, floorPlan],
    features: ["Curtain-wall glazing", "Stone piers", "Active frontage", "Staged delivery"],
    isPlaceholder: true,
  },
  {
    slug: "residential-renovation-concept",
    title: "Residential Renovation — Concept",
    category: "Renovation",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "A sensitive renovation retaining original facade detailing while rebuilding services, openings and interiors to contemporary standards.",
    designApproach: "Retain what has character, replace what has failed, add only what is needed.",
    constructionApproach:
      "Condition survey, structural strengthening, then restoration of plaster and stone detailing.",
    heroImage: renovation,
    gallery: [renovation, interior, floorPlan],
    features: ["Facade restoration", "New steel windows", "Services upgrade", "Interior rebuild"],
    isPlaceholder: true,
  },
  {
    slug: "interior-execution-concept",
    title: "Interior Execution — Concept",
    category: "Interior",
    location: "[Location]",
    year: "[Year]",
    status: "Concept",
    area: "[Area]",
    description:
      "Interior execution in a warm, quiet material palette: travertine, oak, lime plaster and linen, with concealed lighting and precise joinery.",
    designApproach: "A limited palette used consistently, letting proportion and light do the work.",
    constructionApproach: "Shop drawings and mock-ups approved before fabrication and installation.",
    heroImage: interior,
    gallery: [interior, familyResidence, floorPlan],
    features: ["Oak joinery", "Travertine floors", "Concealed lighting", "Lime plaster"],
    isPlaceholder: true,
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Renovation",
  "Architectural",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string, limit = 3) {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
}
