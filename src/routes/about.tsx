import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, ImageReveal } from "@/components/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySadar } from "@/components/sections/WhySadar";
import { projectImages } from "@/data/projects";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Sadar Constructions | Builders in Bhopal",
      description:
        "Meet Sadar Constructions, a Bhopal construction team led by Azhar, focused on design-led planning, precise detailing and lasting quality.",
      path: "/about",
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
        title={
          <>
            Building spaces,{" "}
            <span className="text-gradient-bronze animate-shimmer italic">creating legacies</span>
          </>
        }
        description={site.positioning}
        image={projectImages.familyResidence}
        imageAlt="Modern classical residential facade with arched windows"
      />

      <section className="relative overflow-hidden bg-background py-8 md:py-12 xl:py-14">
        <div
          aria-hidden="true"
          className="glow-bronze pointer-events-none absolute -right-28 top-10 size-80 opacity-20"
        />

        <div className="shell relative grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              label="Who we are"
              index="01"
              title={
                <>
                  A construction company with an{" "}
                  <span className="text-gradient-bronze animate-shimmer italic">
                    architect&apos;s eye
                  </span>
                </>
              }
            />

            <Reveal className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Sadar Constructions delivers residential and commercial projects where design
                quality and build quality are treated as one responsibility. We work across new
                builds, renovations and interior execution.
              </p>

              <div className="mt-1">
                <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
                  Meet Azhar
                </h3>
                <p className="label-micro mt-1.5 text-accent">
                  Owner, Sadar Constructions <span className="mx-1">|</span> Bhopal
                </p>
              </div>

              <blockquote className="rounded-r-2xl border-l-2 border-accent bg-card py-3 pl-5 pr-4 font-display text-base italic leading-relaxed text-foreground md:text-lg">
                “For Azhar, construction is more than putting walls and roofs together, it is about
                turning a vision into a space people are proud to call their own.”
              </blockquote>

              <p>
                Based in Bhopal, Azhar leads Sadar Constructions with a focus on thoughtful design,
                quality execution, and attention to architectural detail. His approach brings
                together practical construction knowledge and a clear appreciation for modern,
                elegant spaces.
              </p>

              <p className="label-micro pt-1 text-foreground">
                Built with vision.
                <span className="ml-2 text-accent">Executed with precision.</span>
              </p>
            </Reveal>
          </div>

          <ImageReveal className="group relative lg:col-span-5">
            {/* offset frame behind the photo */}
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 hidden size-full border border-accent/50 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 md:block"
            />
            <div className="relative overflow-hidden">
              <img
                src={projectImages.detailColumn}
                alt="Close detail of a stone column and arch"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105 lg:aspect-[3/4]"
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      <StatsBand />

      <section className="relative overflow-hidden border-b border-border bg-card py-8 md:py-12 xl:py-14">
        <div className="shell">
          <SectionHeading label="Our values" index="02" title="How we work" />

          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="h-full">
                <div className="group card-hover relative flex h-full flex-col gap-3 overflow-hidden rounded-[22px] border border-border bg-background p-6 md:p-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-8xl leading-none text-foreground/[0.05] transition-colors duration-700 group-hover:text-accent/20"
                  >
                    0{i + 1}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-border font-display text-sm text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="relative font-display text-xl leading-snug text-foreground md:text-2xl">
                    {v.title}
                  </h3>
                  <p className="relative text-[13px] leading-relaxed text-muted-foreground md:text-sm">
                    {v.body}
                  </p>
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
