import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySadar } from "@/components/sections/WhySadar";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sadar Constructions | Premium Residential & Commercial Construction" },
      {
        name: "description",
        content:
          "Premium construction and architectural execution for residential and commercial projects — design-led planning, precise detailing and lasting quality.",
      },
      {
        property: "og:title",
        content: "Sadar Constructions | Premium Residential & Commercial Construction",
      },
      {
        property: "og:description",
        content:
          "Design-led construction for homes, commercial spaces and renovations. Built with precision, finished with care.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesSection limit={6} />
      <WhySadar />
      <ProjectsSection />
      {/* <ProcessTimeline /> */}
      <Testimonials />
      <InstagramGrid />
      <CTASection />
    </>
  );
}
