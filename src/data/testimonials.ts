/**
 * PLACEHOLDER TESTIMONIALS — NOT REAL CLIENT QUOTES.
 * Replace `quote`, `name` and `project` with verified, permissioned client
 * feedback before publishing. Keep `isPlaceholder: true` until then; the UI
 * shows a placeholder marker while it is true.
 */
export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  /** true = sample text shown until a real client quote is collected */
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  // ───── Real feedback ─────
  {
    quote:
      "Working with Sadar Constructions transformed our vision into a home that feels both timeless and completely our own.",
    name: "Mr. Mohammed Asif",
    project: "Residential Project",
    isPlaceholder: false,
  },
  {
    quote:
      "Clear communication at every stage, and a level of finishing that reflected the drawings exactly.",
    name: "Mr. Shubham Kumar",
    project: "Residential Project",
    isPlaceholder: false,
  },
  {
    quote:
      "The team treated detail as the priority - proportions, materials and finishes were all considered.",
    name: "Mr. Anil Sharma",
    project: "Renovation Project",
    isPlaceholder: false,
  },
  {
    quote: "The craftsmanship exceeded our expectations. The finished home feels refined, functional, and built to last.",
    name: "Mr. Ramesh Gupta",
    project: "Residential Project",
    isPlaceholder: false,
  },
  {
    quote: "The quality of work, communication, and finishing truly reflected their commitment to excellence.",
    name: "Mr. Sajid Hussain",
    project: "Commercial Project",
    isPlaceholder: false,
  },
  {
    quote: "Every stage of the project was handled with professionalism, transparency, and a genuine focus on quality.",
    name: "Mr. Rajesh Mehta",
    project: "Renovation Project",
    isPlaceholder: false,
  },
  {
    quote: "Sadar Constructions made what could have been a stressful process feel organized, collaborative, and remarkably smooth.",
    name: "Mrs. Pooja Sharma",
    project: "Residential Project",
    isPlaceholder: false,
  },
  {
    quote: "Their professionalism and attention to detail made the entire construction experience simple and reassuring.",
    name: "Mr. Javed",
    project: "Commercial Project",
    isPlaceholder: false,
  },
];
