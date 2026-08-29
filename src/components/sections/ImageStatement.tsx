import { projectImages } from "@/data/projects";
import { ImageReveal, Reveal } from "../Reveal";

export function ImageStatement() {
  return (
    <section className="relative">
      <ImageReveal className="relative h-[60vh] min-h-[380px] w-full overflow-hidden md:h-[78vh]">
        <img
          src={projectImages.urbanResidence}
          alt="Contemporary charcoal stone residence with cantilevered balconies"
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-deepcharcoal/55" />
        <div className="shell absolute inset-0 flex items-center">
          <Reveal className="max-w-2xl">
            <p className="label-micro text-ivory/60">Design intent</p>
            <p className="display-lg mt-6 text-ivory">
              We build what the drawing promises - proportion, material and light held to the
              millimetre.
            </p>
          </Reveal>
        </div>
      </ImageReveal>
    </section>
  );
}

export function PlanToReality() {
  return (
    <section className="section-y bg-ivory">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ImageReveal className="overflow-hidden">
          <img
            src={projectImages.floorPlan}
            alt="Architectural floor plan drawing with dimensions"
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
        </ImageReveal>

        <Reveal className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="hairline w-8 shrink-0" />
            <span className="label-micro">Plan to reality</span>
          </div>
          <h2 className="display-lg text-charcoal">Drawings translated with precision</h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Every project begins on paper: layouts, levels, service routes and finishing details
            resolved before the first pour. On site, that documentation becomes the reference for
            structure, joinery and finishing, so what is built matches what was designed.
          </p>
          <ul className="mt-2 grid gap-px border border-border bg-border sm:grid-cols-2">
            {[
              "Coordinated documentation",
              "Structural planning",
              "Material specification",
              "Site quality control",
            ].map((item) => (
              <li key={item} className="label-micro bg-ivory p-5 text-charcoal">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
