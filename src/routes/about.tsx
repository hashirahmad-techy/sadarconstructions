import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, ImageReveal } from "@/components/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySadar } from "@/components/sections/WhySadar";
import { projectImages } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sadar Constructions | Design-Led Construction Company" },
      {
        name: "description",
        content:
          "Sadar Constructions is a premium construction company delivering design-led residential, commercial and renovation projects with a focus on craftsmanship.",
      },
      { property: "og:title", content: "About Sadar Constructions" },
      {
        property: "og:description",
        content:
          "A construction company built around architectural intent, material quality and transparent execution.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Architectural intent first",
    body: "Construction decisions follow the design. We protect proportion, alignment and material logic through every stage of execution.",
  },
  {
    title: "Craft over shortcuts",
    body: "Structure, plaster, joinery and finishing are each treated as a discipline with its own standard of completion.",
  },
  {
    title: "Clear, transparent process",
    body: "Clients know the scope, sequence and status of their project. No ambiguity around timelines or decisions.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Building spaces, creating legacies"
        description={site.positioning}
        image={projectImages.familyResidence}
        imageAlt="Modern classical residential facade with arched windows"
      />

      <section className="section-y bg-warmwhite">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              label="Who we are"
              index="01"
              title="A construction company with an architect's eye"
            />
            <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Sadar Constructions delivers residential and commercial projects where design
                quality and build quality are treated as one responsibility. We work across new
                builds, renovations and interior execution.
              </p>
              <p>
                Our teams coordinate documentation, structure, services and finishing so that the
                completed space reflects the drawings it came from — in proportion, in material and
                in detail.
              </p>
              <p>
                Company history, credentials and completed project details are placeholders on this
                site until verified information is supplied.
              </p>
            </div>
          </div>

          <ImageReveal className="overflow-hidden lg:col-span-6">
            <img
              src={projectImages.detailColumn}
              alt="Close detail of a stone column and arch"
              loading="lazy"
              className="aspect-3/4 w-full object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      <StatsBand />

      <section className="section-y bg-ivory">
        <div className="shell">
          <SectionHeading label="Our values" index="02" title="How we work" />
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-5 bg-ivory p-8 md:p-10">
                  <span className="label-micro text-bronze">0{i + 1}</span>
                  <h3 className="display-md text-charcoal">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhySadar />
      <CTASection />
    </>
  );
}
