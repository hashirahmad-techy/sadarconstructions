/**
 * PLACEHOLDER TESTIMONIALS — NOT REAL CLIENT QUOTES.
 * Replace `quote`, `name` and `project` with verified, permissioned client
 * feedback before publishing. Keep `isPlaceholder: true` until then; the UI
 * shows a placeholder marker while it is true.
 */
export interface Testimonial {
  quote: string;
  name: string;
  project: string;
  isPlaceholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Sadar Constructions transformed our vision into a home that feels both timeless and completely our own.",
    name: "[Client Name]",
    project: "Residential Project",
    isPlaceholder: true,
  },
  {
    quote:
      "Clear communication at every stage, and a level of finishing that reflected the drawings exactly.",
    name: "[Client Name]",
    project: "Commercial Project",
    isPlaceholder: true,
  },
  {
    quote:
      "The team treated detail as the priority - proportions, materials and finishes were all considered.",
    name: "[Client Name]",
    project: "Renovation Project",
    isPlaceholder: true,
  },
];
