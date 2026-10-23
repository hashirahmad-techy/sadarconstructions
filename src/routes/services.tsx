import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { services } from "@/data/services";
import { projectImages } from "@/data/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Construction Services in Bhopal | Sadar Constructions",
      description:
        "House construction, commercial buildings, design & build and renovation in Bhopal. Design-led planning, precise detailing and lasting quality.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            What we{" "}
            <span className="text-gradient-bronze animate-shimmer italic">build</span>
          </>
        }
        description="Integrated construction services spanning design, execution and delivery."
        image={projectImages.commercial}
        imageAlt="Stone and glass commercial development elevation"
      />

      <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
        <div
          aria-hidden="true"
          className="glow-bronze pointer-events-none absolute -right-28 top-0 size-80 opacity-20"
        />

        <div className="shell relative">
          <div className="border-t border-border">
            {services.map((service) => (
              <Reveal key={service.number}>
                <article className="group relative grid items-start gap-3 border-b border-border px-1 py-6 transition-all duration-500 hover:bg-card hover:pl-4 md:grid-cols-12 md:items-center md:gap-8 md:py-8">
                  {/* bronze marker that grows in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-accent transition-all duration-500 group-hover:h-3/5"
                  />

                  <div className="flex items-center gap-4 md:col-span-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border text-accent transition-all duration-500 group-hover:-rotate-6 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <service.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="label-micro text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                      {service.number}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl leading-tight text-foreground md:col-span-4 md:text-3xl">
                    {service.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-5 md:text-base">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <CTASection />
    </>
  );
}
