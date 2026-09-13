import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySadar } from "@/components/sections/WhySadar";
import { ImageStatement, PlanToReality } from "@/components/sections/ImageStatement";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

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
      <PlanToReality />
      <ServicesSection limit={6} />
      <WhySadar />
      <ImageStatement />

      <section className="section-y bg-warmwhite">
        <div className="shell">
          <SectionHeading
            label="Featured Projects"
            index="04"
            title="Projects"
            description="Reference concepts illustrating our design and execution language."
          />
          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <ActionLink to="/projects" variant="secondary">
              View all projects
            </ActionLink>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <Testimonials />
      <InstagramGrid />
      <CTASection />
    </>
  );
}
