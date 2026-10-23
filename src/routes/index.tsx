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
import { VideoSection } from "@/components/sections/VideoSection";

import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      // TODO: replace YOUR CITY with your real city, in both title and description
      title: "Residential & Commercial Construction in Bhopal | Sadar Constructions",
      description:
        "Sadar Constructions builds homes, commercial spaces and renovations in Bhopal. Design-led planning, precise detailing and lasting quality. Get in touch for a free consultation.",
      path: "/",
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
      <VideoSection />
      <ProjectsSection />
      {/* <ProcessTimeline /> */}
      <Testimonials />
      <InstagramGrid />
      <CTASection />
    </>
  );
}
