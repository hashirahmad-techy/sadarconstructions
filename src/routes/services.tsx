import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { services } from "@/data/services";
import { projectImages } from "@/data/projects";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services | Sadar Constructions" },
      {
        name: "description",
        content:
          "Residential and commercial construction, design & build, renovation, project management and architectural execution by Sadar Constructions.",
      },
      { property: "og:title", content: "Construction Services | Sadar Constructions" },
      {
        property: "og:description",
        content:
          "Six core services covering new builds, commercial spaces, renovations, interiors and full project management.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="What we build"
        description="Integrated construction services spanning design, execution and delivery."
        image={projectImages.commercial}
        imageAlt="Stone and glass commercial development elevation"
      />

      <section className="section-y bg-warmwhite">
        <div className="shell flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.number}>
              <article className="grid items-start gap-6 border-b border-border py-12 md:grid-cols-12 md:gap-10 md:py-16">
                <div className="flex items-center gap-4 md:col-span-3">
                  <service.icon className="size-6 text-bronze" aria-hidden="true" />
                  <span className="label-micro text-muted-foreground">{service.number}</span>
                </div>
                <h2 className="display-lg text-charcoal md:col-span-5">{service.title}</h2>
                <p className="text-base leading-relaxed text-muted-foreground md:col-span-4">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessTimeline />
      <CTASection />
    </>
  );
}
