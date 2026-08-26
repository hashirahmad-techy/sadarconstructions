import {
  Home,
  Building2,
  PenLine,
  Hammer,
  ClipboardList,
  Ruler,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Residential Construction",
    description:
      "Custom homes designed and built around lifestyle, functionality and architectural character.",
    icon: Home,
  },
  {
    number: "02",
    title: "Commercial Construction",
    description: "Professional construction solutions for commercial and mixed-use spaces.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Design & Build",
    description: "Integrated design and execution for a streamlined building experience.",
    icon: PenLine,
  },
  {
    number: "04",
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with thoughtful planning and quality craftsmanship.",
    icon: Hammer,
  },
  {
    number: "05",
    title: "Project Management",
    description: "Coordinated execution, scheduling and quality control from start to finish.",
    icon: ClipboardList,
  },
  {
    number: "06",
    title: "Architectural Execution",
    description:
      "Turning architectural drawings and design intent into accurately executed built spaces.",
    icon: Ruler,
  },
];
