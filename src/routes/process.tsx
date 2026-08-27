import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PlanToReality } from "@/components/sections/ImageStatement";
import { CTASection } from "@/components/sections/CTASection";
import { projectImages } from "@/data/projects";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process | Sadar Constructions" },
      {
        name: "description",
        content:
          "Discover, plan, design, build, refine, deliver — the six-stage construction process Sadar Constructions follows on every project.",
      },
      { property: "og:title", content: "Our Process | Sadar Constructions" },
      {
        property: "og:description",
        content:
          "A structured six-stage process that keeps design intent, budget and quality aligned from brief to handover.",
      },
    ],
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
