import residence1 from "@/assets/residence1.jpg";
import residence2 from "@/assets/residence2.jpg";
import residence3 from "@/assets/residence3.jpg";
import heroResidence from "@/assets/hero-residence.jpg";
import heroLuxury from "@/assets/hero-residence.jpg";
import urbanResidence from "@/assets/project-urban-residence.jpg";
import Architectural1 from "@/assets/Architectural1.jpg";
import Architectural2 from "@/assets/Architectural2.jpg";
import Architectural3 from "@/assets/Architectural3.jpg";
import commercial from "@/assets/project-commercial.jpg";
import interior from "@/assets/project-interior.jpg";
import interior1 from "@/assets/interior1.jpg";
import interior2 from "@/assets/interior2.jpg";
import interior3 from "@/assets/interior3.jpg";
import interior4 from "@/assets/interior4.jpg";
import interior5 from "@/assets/interior5.jpg";
import renovation from "@/assets/project-renovation.jpg";
import renovation1 from "@/assets/renovation1.jpg";
import renovation2 from "@/assets/renovation2.jpg";
import renovation3 from "@/assets/renovation3.jpg";
import floorPlan from "@/assets/floor-plan.jpg";
import detailColumn from "@/assets/detail-column.jpg";

export const projectImages = {
  heroResidence,
  residence1,
  residence2,
  residence3,
  heroLuxury,
  urbanResidence,
  Architectural1,
  Architectural2,
  Architectural3,
  commercial,
  interior,
  interior1,
  interior2,
  interior3,
  interior4,
  interior5,
  renovation,
  renovation1,
  renovation2,
  renovation3,  
  floorPlan,
  detailColumn,
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
    title: "Luxury Residence - Concept",
    category: "Residential",
    location: "Bhopal",
    year: "2026",
    status: "Concept",
    area: "[Area]",
    description:
      "A classically proportioned residence organised around a tall entrance portal, with stone facades, arched openings and carefully layered architectural lighting.",
    designApproach:
      "Symmetry, proportion and restraint. Columns and arches set the rhythm of the elevation while material selection keeps the palette quiet and warm.",
    constructionApproach:
      "Structural planning coordinated with stone cladding, joinery and services so that finishes align precisely with the design intent.",
    heroImage: residence1,
    gallery: [residence1, residence2, residence3],
    features: ["Stone facade", "Arched fenestration", "Entrance portal", "Architectural lighting"],
    isPlaceholder: true,
  },
  {
    slug: "contemporary-urban-residence-concept",
    title: "Contemporary Urban Residence - Concept",
    category: "Architectural",
    location: "Bhopal",
    year: "2025",
    status: "Concept",
    area: "[Area]",
    description:
      "A multi-level urban residence in charcoal stone, glass and warm timber soffits, with cantilevered balconies and deep shaded openings.",
    designApproach:
      "Rectangular forms stacked and offset to create shade, privacy and depth on a tight urban plot.",
    constructionApproach:
      "Careful coordination of concrete, cladding and glazing tolerances to keep lines sharp.",
    heroImage: urbanResidence,
    gallery: [Architectural1, Architectural2, Architectural3],
    features: ["Cantilevered balconies", "Timber soffits", "Full-height glazing", "Charcoal stone"],
    isPlaceholder: true,
  },
  {
    slug: "commercial-development-concept",
    title: "Commercial Development - Concept",
    category: "Commercial",
    location: "Bhopal",
    year: "2024",
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
    title: "Residential Renovation - Concept",
    category: "Renovation",
    location: "Bhopal",
    year: "2024",
    status: "Concept",
    area: "[Area]",
    description:
      "A sensitive renovation retaining original facade detailing while rebuilding services, openings and interiors to contemporary standards.",
    designApproach: "Retain what has character, replace what has failed, add only what is needed.",
    constructionApproach:
      "Condition survey, structural strengthening, then restoration of plaster and stone detailing.",
    heroImage: renovation,
    gallery: [renovation1, renovation2, renovation3],
    features: ["Facade restoration", "New steel windows", "Services upgrade", "Interior rebuild"],
    isPlaceholder: true,
  },
  {
    slug: "interior-execution-concept",
    title: "Interior Execution - Concept",
    category: "Interior",
    location: "Bhopal",
    year: "2026",
    status: "Concept",
    area: "[Area]",
    description:
      "Interior execution in a warm, quiet material palette: travertine, oak, lime plaster and linen, with concealed lighting and precise joinery.",
    designApproach: "A limited palette used consistently, letting proportion and light do the work.",
    constructionApproach: "Shop drawings and mock-ups approved before fabrication and installation.",
    heroImage: interior,
    gallery: [interior1, interior2, interior3, interior4, interior5],
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
