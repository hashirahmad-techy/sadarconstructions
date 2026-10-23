import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PlanToReality } from "@/components/sections/ImageStatement";
import { CTASection } from "@/components/sections/CTASection";
import { projectImages } from "@/data/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/process")({
   head: () =>
    seo({
      title: "Construction Services in Bhopal | Sadar Constructions",
      description: "House construction, commercial buildings, design & build and renovation in Bhopal.",
      path: "/services",
    }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHero
        label="Process"
        title="A disciplined path to handover"
        description="Six stages, each with clear deliverables, approvals and quality checks."
        image={projectImages.floorPlan}
        imageAlt="Architectural floor plan drawing"
      />
      <ProcessTimeline />
      <PlanToReality />
      <CTASection />
    </>
  );
}
